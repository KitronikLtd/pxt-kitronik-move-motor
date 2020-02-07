/**
 * Blocks for driving the Kitronik MOVE Motor Board
 */
// % weight=100 color=#00A654 icon="\uf1b9" %
// block="Move Motor" % groups='["Lights", "Sensors",
// "Motors", "Sound"]'
namespace Kitronik_Move_Motor {
    //Constants 
    let CHIP_ADDR = 0xE0 // CHIP_ADDR is the standard chip address for the PCA9632
    let MODE_1_REG_ADDR = 0x00 //mode 1 register address
    let MODE_2_REG_ADDR = 0x01  //mode 2 register address
    let LED_OUT_ADDR = 0x08  //LED output register address

    let MODE_1_REG_VALUE = 0x00 //the prescale register address
    let MODE_2_REG_VALUE = 0x10  //The mode 1 register address
    let LED_OUT_VALUE = 0xAA  //The mode 1 register address

    let MOTOR_DUTY_CYCLE_RATION = 0.4

    /*GENERAL*/
    export enum OnOffSelection {
        //% block="on"
        On = 1,
        //% block="off"
        Off = 0
    }

    /* ZIPLEDS*/
    //Well known colors for ZIP LEDs
    enum ZipLedColors {
        //% block=red
        Red = 0xFF0000,
        //% block=orange
        Orange = 0xFFA500,
        //% block=yellow
        Yellow = 0xFFFF00,
        //% block=green
        Green = 0x00FF00,
        //% block=blue
        Blue = 0x0000FF,
        //% block=indigo
        Indigo = 0x4b0082,
        //% block=violet
        Violet = 0x8a2be2,
        //% block=purple
        Purple = 0xFF00FF,
        //% block=white
        White = 0xFFFFFF,
        //% block=black
        Black = 0x000000
    }

    /*MOTORS*/
    // List of motors for the motor blocks to use. These represent register offsets in the PCA9865 driver IC.
    export enum Motors {
        //% block="Left"
        MotorLeft = 0x02,
        //% block="Right"
        MotorRight = 0x04
    }
    // Directions the motors can rotate.
    export enum MotorDirection {
        //% block="Forward"
        Forward,
        //% block="Reverse"
        Reverse
    }

    /*ULTRASONIC*/
    // Units for ultrasonic sensors to measure
    export enum Units {
        //% block="cm"
        Centimeters,
        //% block="inches"
        Inches
    }

    /*LINE FOLLOWING*/
    // Selection of line following sensor
    export enum LfSensor {
        //% block="left"
        left,
        //% block="right"
        right
    }
    //Light level detection mode selection
    export enum LightSelection {
        //% block="Light"
        Light,
        //% block="Dark"
        Dark
    }

    let initalised = false //a flag to allow us to initialise without explicitly calling the secret incantation
    //Motor global variables
    let sirenOn = false
    //Ultrasonic global variables
    let triggerPin = DigitalPin.P13
    let echoPin = DigitalPin.P14
    //Line following sensors global variables
    let sensorLeftRef = 0
    let sensorRightRef = 0
    let detectionLevel = 45		//reading is done by converting 0.13V into ADC reading (3/1024)*45, this is the default setting


	/*
		This secret incantation sets up the PCA9632 I2C driver chip to be running 
    */
    function setup(): void {
        let buf = pins.createBuffer(2)

        buf[0] = MODE_1_REG_ADDR
        buf[1] = MODE_1_REG_VALUE
        pins.i2cWriteBuffer(CHIP_ADDR, buf, false)
        buf[0] = MODE_2_REG_ADDR
        buf[1] = MODE_2_REG_VALUE
        pins.i2cWriteBuffer(CHIP_ADDR, buf, false)
        buf[0] = LED_OUT_ADDR
        buf[1] = LED_OUT_VALUE
        pins.i2cWriteBuffer(CHIP_ADDR, buf, false)

        sensorLeftRef = pins.analogReadPin(AnalogPin.P1)
        sensorRightRef = pins.analogReadPin(AnalogPin.P2)
        initalised = true
    }

    //////////////
    //  LIGHTS  //
    //////////////

    /**
    * Turns on and off the horn.
    * @param motor which motor to turn off
    */
    //% subcategory=Lights
    //% group="Tail Lights"
    //% blockId=kitronik_move_motor_tail_light
    //% weight=95 blockGap=8
    //% block="turn tail light %illuminate"
    export function shineTailLight(illuminate: OnOffSelection): void {
        if (illuminate == OnOffSelection.On) {
            pins.digitalWritePin(DigitalPin.P12, 1);
        }
        else {
            pins.digitalWritePin(DigitalPin.P12, 0);
        }
    }

    export class MoveMotorZIP {
        buf: Buffer;
        pin: DigitalPin;
        brightness: number;
        start: number;
        _length: number;


        /**
         * Shows a rainbow pattern on all LEDs. 
         * @param startHue the start hue value for the rainbow, eg: 1
         * @param endHue the end hue value for the rainbow, eg: 360
         */
        //% subcategory=Lights
        //% group="ZIP LEDs"
        //% blockId="kitronik_move_motor_rainbow" 7
        //% block="%moveMotorZIP|show rainbow from %startHue|to %endHue"
        //% weight=94 blockGap=8
        showRainbow(startHue: number = 1, endHue: number = 360) {
            if (this._length <= 0) return;

            startHue = startHue >> 0;
            endHue = endHue >> 0;
            const saturation = 100;
            const luminance = 50;
            const steps = this._length;
            const direction = HueInterpolationDirection.Clockwise;

            //hue
            const h1 = startHue;
            const h2 = endHue;
            const hDistCW = ((h2 + 360) - h1) % 360;
            const hStepCW = Math.idiv((hDistCW * 100), steps);
            const hDistCCW = ((h1 + 360) - h2) % 360;
            const hStepCCW = Math.idiv(-(hDistCCW * 100), steps);
            let hStep: number;
            if (direction === HueInterpolationDirection.Clockwise) {
                hStep = hStepCW;
            } else if (direction === HueInterpolationDirection.CounterClockwise) {
                hStep = hStepCCW;
            } else {
                hStep = hDistCW < hDistCCW ? hStepCW : hStepCCW;
            }
            const h1_100 = h1 * 100; //we multiply by 100 so we keep more accurate results while doing interpolation

            //sat
            const s1 = saturation;
            const s2 = saturation;
            const sDist = s2 - s1;
            const sStep = Math.idiv(sDist, steps);
            const s1_100 = s1 * 100;

            //lum
            const l1 = luminance;
            const l2 = luminance;
            const lDist = l2 - l1;
            const lStep = Math.idiv(lDist, steps);
            const l1_100 = l1 * 100

            //interpolate
            if (steps === 1) {
                this.setPixelRGB(0, hsl(h1 + hStep, s1 + sStep, l1 + lStep))
            } else {
                this.setPixelRGB(0, hsl(startHue, saturation, luminance));
                for (let i = 1; i < steps - 1; i++) {
                    const h = Math.idiv((h1_100 + i * hStep), 100) + 360;
                    const s = Math.idiv((s1_100 + i * sStep), 100);
                    const l = Math.idiv((l1_100 + i * lStep), 100);
                    this.setPixelRGB(i, hsl(h, s, l));
                }
                this.setPixelRGB(steps - 1, hsl(endHue, saturation, luminance));
            }
            this.show();
        }

		/**
         * Displays a vertical bar graph based on the `value` and `high` value.
         * If `high` is 0, the chart gets adjusted automatically.
         * @param value current value to plot
         * @param high maximum value, eg: 255
         */
        //% subcategory=Lights
        //% group="ZIP LEDs"
        //% weight=84 blockGap=8
        //% blockId=kitronik_move_motor_show_bar_graph 
        //% block="%moveMotorZIP|show bar graph of %value|up to %high"
        showBarGraph(value: number, high: number): void {
            if (high <= 0) {
                this.clear();
                this.setPixelRGB(0, 0xFFFF00);
                this.show();
                return;
            }

            value = Math.abs(value);
            const n = this._length;
            const n1 = n - 1;
            let v = Math.idiv((value * n), high);
            if (v == 0) {
                this.setPixelRGB(0, 0x666600);
                for (let j = 1; j < n; ++j)
                    this.setPixelRGB(j, 0);
            } else {
                for (let k = 0; k < n; ++k) {
                    if (k <= v) {
                        const g = Math.idiv(k * 255, n1);
                        //this.setPixelRGB(i, moveMotorZIP.rgb(0, g, 255 - g));
                        this.setPixelRGB(k, rgb(g, 255 - g, 0));
                    }
                    else this.setPixelRGB(k, 0);
                }
            }
            this.show();
        }

        /** 
        * Create a range of LEDs.
        * @param start offset in the LED strip to start the range
        * @param length number of LEDs in the range. eg: 4
        */
        //% subcategory=Lights
        //% group="ZIP LEDs"
        //% weight=89 blockGap=8
        //% blockId="kitronik_move_motor_range" 
        //% block="%moveMotorZIP|range from %start|with %length|leds"
        range(start: number, length: number): MoveMotorZIP {
            start = start >> 0;
            length = length >> 0;
            let moveMotorZIP = new MoveMotorZIP();
            moveMotorZIP.buf = this.buf;
            moveMotorZIP.pin = this.pin;
            moveMotorZIP.brightness = this.brightness;
            moveMotorZIP.start = this.start + Math.clamp(0, this._length - 1, start);
            moveMotorZIP._length = Math.clamp(0, this._length - (moveMotorZIP.start - this.start), length);
            return moveMotorZIP;
        }

        /**
         * Rotate LEDs forward.
         * You need to call ``show`` to make the changes visible.
         * @param offset number of ZIP LEDs to rotate forward, eg: 1
         */
        //% subcategory=Lights
        //% group="ZIP LEDs"
        //% blockId="kitronik_move_motor_display_rotate" 
        //% block="%moveMotorZIP|rotate ZIP LEDs by %offset" 
        //% weight=93 blockGap=8
        rotate(offset: number = 1): void {
            this.buf.rotate(-offset * 3, this.start * 3, this._length * 3)
        }
    	/**
         * Sets whole ZIP Halo display as a given color (range 0-255 for r, g, b). Call Show to make changes visible 
         * @param rgb RGB color of the LED
         */
        //% subcategory=Lights
        //% group="ZIP LEDs"
        //% blockId="kitronik_move_motor_display_only_set_strip_color" 
        //% block="%moveMotorZIP|set color %rgb=kitronik_move_motor_colors"
        //% weight=99 blockGap=8
        setColor(rgb: number) {
            rgb = rgb >> 0;
            this.setAllRGB(rgb);
        }
    	/**
         * Shows whole ZIP Halo display as a given color (range 0-255 for r, g, b). 
         * @param rgb RGB color of the LED
         */
        //% subcategory=Lights
        //% group="ZIP LEDs"
        //% blockId="kitronik_move_motor_display_set_strip_color" 
        //% block="%moveMotorZIP|show color %rgb=kitronik_move_motor_colors"
        //% weight=99 blockGap=8
        showColor(rgb: number) {
            rgb = rgb >> 0;
            this.setAllRGB(rgb);
            this.show();
        }

        /**
         * Set particular ZIP LED to a given color. 
         * You need to call ``show changes`` to make the changes visible.
         * @param zipLedNum position of the ZIP LED in the string
         * @param rgb RGB color of the ZIP LED
         */
        //% subcategory=Lights
        //% group="ZIP LEDs"
        //% blockId="kitronik_move_motor_set_zip_color" 
        //% block="%moveMotorZIP|set ZIP LED %zipLedNum|to %rgb=kitronik_move_motor_colors"
        //% weight=98 blockGap=8
        setZipLedColor(zipLedNum: number, rgb: number): void {
            this.setPixelRGB(zipLedNum >> 0, rgb >> 0);
        }

        /**
         * Send all the changes to the ZIP Halo display.
         */
        //% subcategory=Lights
        //% group="ZIP LEDs"
        //% blockId="kitronik_move_motor_display_show" 
        //% block="%moveMotorZIP|show" blockGap=8
        //% weight=96
        show() {
            //use the Kitronik version which respects brightness for all 
            ws2812b.sendBuffer(this.buf, this.pin, this.brightness);
        }

        /**
         * Turn off all LEDs on the ZIP Halo display.
         * You need to call ``show`` to make the changes visible.
         */
        //% subcategory=Lights
        //% group="ZIP LEDs"
        //% blockId="kitronik_move_motor_display_clear"
        //% block="%moveMotorZIP|clear"
        //% weight=95 blockGap=8
        clear(): void {
            this.buf.fill(0, this.start * 3, this._length * 3);
        }

        /**
         * Set the brightness of the ZIP Halo display. This flag only applies to future show operation.
         * @param brightness a measure of LED brightness in 0-255. eg: 255
         */
        //% subcategory=Lights
        //% group="ZIP LEDs"
        //% blockId="kitronik_move_motordisplay_set_brightness"
        //% block="%moveMotorZIP|set brightness %brightness" 
        //% weight=92 blockGap=8
        //% brightness.min=0 brightness.max=255
        setBrightness(brightness: number): void {
            //Clamp incoming variable at 0-255 as values out of this range cause unexpected brightnesses as the lower level code only expects a byte.
            if (brightness < 0) {
                brightness = 0
            }
            else if (brightness > 255) {
                brightness = 255
            }
            this.brightness = brightness & 0xff;
            basic.pause(1) //add a pause to stop wierdnesses
        }

        //Sets up the buffer for pushing LED control data out to LEDs
        private setBufferRGB(offset: number, red: number, green: number, blue: number): void {
            this.buf[offset + 0] = green;
            this.buf[offset + 1] = red;
            this.buf[offset + 2] = blue;
        }

        //Separates out Red, Green and Blue data and fills the LED control data buffer for all LEDs
        private setAllRGB(rgb: number) {
            let red = unpackR(rgb);
            let green = unpackG(rgb);
            let blue = unpackB(rgb);

            const end = this.start + this._length;
            for (let m = this.start; m < end; ++m) {
                this.setBufferRGB(m * 3, red, green, blue)
            }
        }

        //Separates out Red, Green and Blue data and fills the LED control data buffer for a single LED
        private setPixelRGB(pixeloffset: number, rgb: number): void {
            if (pixeloffset < 0
                || pixeloffset >= this._length)
                return;

            pixeloffset = (pixeloffset + this.start) * 3;

            let red2 = unpackR(rgb);
            let green2 = unpackG(rgb);
            let blue2 = unpackB(rgb);

            this.setBufferRGB(pixeloffset, red2, green2, blue2)
        }
    }

    /**
     * Create a new ZIP LED driver for MOVE Motor board.
	 * @param numZips number of leds in the strip, eg: 4
     */
    //% subcategory=Lights
    //% group="ZIP LEDs"
    //% blockId="kitronik_move_motor_ZIP_LED_create" 
    //% block="to Halo HD with %numZips|ZIP LEDs"
    //% weight=100 blockGap=8
    //% trackArgs=0,2
    //% blockSetVariable=moveMotorZIP
    export function createMoveMotorZIPLED(numZips: number): MoveMotorZIP {
        let moveMotorZIP2 = new MoveMotorZIP();
        moveMotorZIP2.buf = pins.createBuffer(numZips * 3);
        moveMotorZIP2.start = 0;
        moveMotorZIP2._length = numZips;
        moveMotorZIP2.setBrightness(128)
        moveMotorZIP2.pin = DigitalPin.P8;
        pins.digitalWritePin(moveMotorZIP2.pin, 8);
        return moveMotorZIP2;
    }

    /*  The LEDs we are using have centre wavelengths of 470nm (Blue) 525nm(Green) and 625nm (Red) 
    * 	 We blend these linearly to give the impression of the other wavelengths. 
    *   as we cant wavelength shift an actual LED... (Ye canna change the laws of physics Capt)*/

    /**
     * Converts value to red, green, blue channels
     * @param red value of the red channel between 0 and 255. eg: 255
     * @param green value of the green channel between 0 and 255. eg: 255
     * @param blue value of the blue channel between 0 and 255. eg: 255
     */
    //% subcategory=Lights
    //% group="ZIP LEDs"
    //% weight=1 blockGap=8
    //% blockId="kitronik_move_motor_rgb" block="red %red|green %green|blue %blue"
    export function rgb(red: number, green: number, blue: number): number {
        return packRGB(red, green, blue);
    }

    /**
     * Gets the RGB value of a known color
    */
    //% subcategory=Lights
    //% group="ZIP LEDs"
    //% weight=2 blockGap=8
    //% blockId="kitronik_move_motor_colors" block="%color"
    export function colors(color: ZipLedColors): number {
        return color;
    }

    //Combines individual RGB settings to be a single number
    function packRGB(a: number, b: number, c: number): number {
        return ((a & 0xFF) << 16) | ((b & 0xFF) << 8) | (c & 0xFF);
    }
    //Separates red value from combined number
    function unpackR(rgb: number): number {
        let r = (rgb >> 16) & 0xFF;
        return r;
    }
    //Separates green value from combined number
    function unpackG(rgb: number): number {
        let o = (rgb >> 8) & 0xFF;
        return o;
    }
    //Separates blue value from combined number
    function unpackB(rgb: number): number {
        let b = (rgb) & 0xFF;
        return b;
    }

    /**
     * Converts a hue saturation luminosity value into a RGB color
     */
    function hsl(h: number, s: number, l: number): number {
        h = Math.round(h);
        s = Math.round(s);
        l = Math.round(l);

        h = h % 360;
        s = Math.clamp(0, 99, s);
        l = Math.clamp(0, 99, l);
        let c = Math.idiv((((100 - Math.abs(2 * l - 100)) * s) << 8), 10000); //chroma, [0,255]
        let h12 = Math.idiv(h, 60);//[0,6]
        let h22 = Math.idiv((h - h12 * 60) * 256, 60);//[0,255]
        let temp = Math.abs((((h12 % 2) << 8) + h22) - 256);
        let x = (c * (256 - (temp))) >> 8;//[0,255], second largest component of this color
        let r$: number;
        let g$: number;
        let b$: number;
        if (h12 == 0) {
            r$ = c; g$ = x; b$ = 0;
        } else if (h12 == 1) {
            r$ = x; g$ = c; b$ = 0;
        } else if (h12 == 2) {
            r$ = 0; g$ = c; b$ = x;
        } else if (h12 == 3) {
            r$ = 0; g$ = x; b$ = c;
        } else if (h12 == 4) {
            r$ = x; g$ = 0; b$ = c;
        } else if (h12 == 5) {
            r$ = c; g$ = 0; b$ = x;
        }
        let p = Math.idiv((Math.idiv((l * 2 << 8), 100) - c), 2);
        let t = r$ + p;
        let q = g$ + p;
        let d = b$ + p;
        return packRGB(t, q, d);
    }

    /**
     * Options for direction hue changes, used by rainbow block (never visible to end user)
     */
    export enum HueInterpolationDirection {
        Clockwise,
        CounterClockwise,
        Shortest
    }

    //////////////
    //  SENSORS //
    //////////////
    /**
     * Measure the echo time (after trigger) and converts to cm or inches and returns as an int
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% subcategory=Sensors
    //% group="Ultrasonic"
    //% blockId=kitronik_move_motor_ultrasonic_measure
    //% block="measure distances in |unit %unit"
    export function measure(unit: Units, maxCmDistance = 500): number {
        // send pulse
        pins.setPull(triggerPin, PinPullMode.PullNone);
        pins.digitalWritePin(triggerPin, 0);
        control.waitMicros(2);
        pins.digitalWritePin(triggerPin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(triggerPin, 0);

        // read pulse
        const pulse = pins.pulseIn(echoPin, PulseValue.High, maxCmDistance * 39);
        switch (unit) {
            case Units.Centimeters: return Math.idiv(pulse, 39);
            case Units.Inches: return Math.idiv(pulse, 98);
            default: return 0;
        }
    }


    /**
    * Set sensor threshold block allows the user to adjust the point at which the sensor detects
    * @param level is the threshold percentage
    */
    //% subcategory=Sensors
    //% group="Line Following"
    //% blockId=kitronik_move_motor_line_follower_set_threshold
    //% block="set sensor threshold to %level|"
    //% level.min=0 level.max=100 level.defl=50
    //% weight=85 blockGap=8
    export function setSensorDetectionLevel(level: number) {
        if (initalised == false) {
            setup()
        }
        detectionLevel = (level / 2) + 10
    }

    /**
    * Read sensor block allows user to read the value of the sensor (returns value in range 0-1023)
    * @param pinSelected is the selection of pin to read a particular sensor
    */
    //% subcategory=Sensors
    //% group="Line Following"
    //% blockId=kitronik_move_motor_line_follower_read_sensor
    //% block="read sensor on pin %pinSelected"
    //% weight=90 blockGap=8
    export function readSensor(sensorSelected: LfSensor) {
        let value = 0

        if (initalised == false) {
            setup()
        }

        if (sensorSelected == LfSensor.left) {
            value = pins.analogReadPin(AnalogPin.P1)
        }
        else if (sensorSelected == LfSensor.right) {
            value = pins.analogReadPin(AnalogPin.P1)
        }
        return value;
    }

    /**
    * Sensor on pin detection returns a true or false when the sensor has detected
    * @param pinSelected is the selection of pin to read a particular sensor
	* @param lightSelection is the selection of the sensor detecting light or dark
    */
    //% subcategory=Sensors
    //% group="Line Following"
    //% blockId=kitronik_move_motor_line_follower_digital_sensor
    //% block="sensor on pin %pinSelected| detected %LightSelection"
    //% weight=95 blockGap=8
    export function sensorDigitalDetection(pinSelected: LfSensor, lightLevel: LightSelection): boolean {
        let value2 = 0
        let ref = 0
        let result = false

        if (initalised == false) {
            setup()
        }

        if (pinSelected == LfSensor.left) {
            value2 = pins.analogReadPin(AnalogPin.P1)
            ref = sensorLeftRef
        }
        else if (pinSelected == LfSensor.right) {
            value2 = pins.analogReadPin(AnalogPin.P2)
            ref = sensorRightRef
        }

        if (lightLevel == LightSelection.Light) {
            if (value2 >= (ref + detectionLevel)) {
                result = true
            }
            else {
                result = false
            }
        }
        else if (lightLevel == LightSelection.Dark) {
            if (value2 <= (ref - detectionLevel)) {
                result = true
            }
            else {
                result = false
            }
        }
        return result;
    }

    //////////////
    //  MOTORS  //
    //////////////

    /**
     * Sets the requested motor running in chosen direction at a set speed.
     * if the PCA has not yet been initialised calls the initialisation routine.
     * @param motor which motor to turn on
     * @param dir   which direction to go
     * @param speed how fast to spin the motor
     */
    //% subcategory=Motors
    //% group=Motors
    //% blockId=kitronik_move_motor_motor_on
    //% block="turn %motor|motor on direction %dir|speed %speed"
    //% weight=100 blockGap=8
    //% speed.min=0 speed.max=100
    export function motorOn(motor: Motors, dir: MotorDirection, speed: number): void {
        if (initalised == false) {
            setup()
        }

        /*convert 0-100 to 0-250 (approx) We wont worry about the last 95 to make life simpler*/
        let outputVal = Math.idiv(speed, MOTOR_DUTY_CYCLE_RATION)

        let buf2 = pins.createBuffer(2)

        switch (dir) {
            case MotorDirection.Forward:
                buf2[0] = motor
                buf2[1] = outputVal
                pins.i2cWriteBuffer(CHIP_ADDR, buf2, false)
                buf2[0] = motor + 1
                buf2[1] = 0x00
                pins.i2cWriteBuffer(CHIP_ADDR, buf2, false)
                break
            case MotorDirection.Reverse:
                buf2[0] = motor + 1
                buf2[1] = outputVal
                pins.i2cWriteBuffer(CHIP_ADDR, buf2, false)
                buf2[0] = motor
                buf2[1] = 0x00
                pins.i2cWriteBuffer(CHIP_ADDR, buf2, false)
                break
        }
    }

    /**
     * Turns off the specified motor.
     * @param motor which motor to turn off
     */
    //% subcategory=Motors
    //% group=Motors
    //% blockId=kitronik_move_motor_motor_off
    //% weight=95 blockGap=8
    //%block="turn off %motor| motor"
    export function motorOff(motor: Motors): void {
        let buf3 = pins.createBuffer(2)
        buf3[0] = motor
        buf3[1] = 0x00
        pins.i2cWriteBuffer(CHIP_ADDR, buf3, false)
        buf3[0] = motor + 1
        buf3[1] = 0x00
        pins.i2cWriteBuffer(CHIP_ADDR, buf3, false)
    }


    //////////////
    //  SOUNDS  //
    //////////////

    /**
     * Turns on and off the horn.
     * @param hornTimes is the number of times to sound the horn
     */
    //% subcategory=Sounds
    //% group=Sounds
    //% blockId=kitronik_move_motor_horn
    //% weight=95 blockGap=8
    //% block="beep the horn %hornTimes"
    //% hornTimes.min = 1 hornTimes.max = 5 hornTimes.defl = 1
    export function beepHorn(hornTimes: number): void {
        for (let u = 0; u <= hornTimes; u++) {
            music.playTone(185, music.beat(BeatFraction.Quarter))
            basic.pause(75)
            music.playTone(185, music.beat(BeatFraction.Quarter))
            basic.pause(75)
        }
    }

    /**
    * Turns on and off the horn.
    * @param siren is the selection to turn on or off the siren
    */
    //% subcategory=Sounds
    //% group=Sounds
    //% blockId=kitronik_move_motor_siren
    //% weight=95 blockGap=8
    //% block="turn siren %siren"
    export function soundSiren(siren: OnOffSelection): void {
        if (siren == OnOffSelection.On) {
            sirenOn = true
            turnOnSiren()
        }
        else {
            sirenOn = false
        }
    }

    function turnOnSiren(): void {
        control.inBackground(() => {
            while (sirenOn) {
                music.playTone(370, music.beat(BeatFraction.Half))
                basic.pause(75)
                music.playTone(262, music.beat(BeatFraction.Half))
                basic.pause(75)
            }

        })
    }

}
