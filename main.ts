/**
 * Blocks for driving the Kitronik MOVE Motor Buggy
 */
//% weight=100 color=#00A654 icon="\uf1b9" block="MOVE Motor"
//% groups='["Ultrasonic","Line Following","Drive", "Setup", "Motor Control"]'
namespace Kitronik_Move_Motor {
    //Constants 
    let CHIP_ADDR = 0x62 // CHIP_ADDR is the standard chip address for the PCA9632, datasheet refers to LED control but chip is used for PWM to motor driver
    let MODE_1_REG_ADDR = 0x00 //mode 1 register address
    let MODE_2_REG_ADDR = 0x01  //mode 2 register address
    let MOTOR_OUT_ADDR = 0x08  //MOTOR output register address

    let MODE_1_REG_VALUE = 0x00 //setup to normal mode and not to respond to sub address
    let MODE_2_REG_VALUE = 0x04  //Setup to make changes on ACK, outputs set to open-drain
    let MOTOR_OUT_VALUE = 0xAA  //Outputs set to be controled PWM registers

    /*GENERAL*/
    export enum OnOffSelection {
        //% block="on"
        On = 1,
        //% block="off"
        Off = 0
    }

    /* ZIPLEDS*/
    //Well known colors for ZIP LEDs
    export enum ZipLedColors {
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
    // List of motors for the motor blocks to use. These represent register offsets in the PCA9832 driver IC.
    export enum Motors {
        //% block="Left"
        MotorLeft = 0x04,
        //% block="Right"
        MotorRight = 0x02
    }
    // Directions the motors can rotate.
    export enum MotorDirection {
        //% block="Forward"
        Forward,
        //% block="Reverse"
        Reverse
    }
    // directions the :MOVE motor can drive. Implicit moving forward in the turns 
    export enum DriveDirections {
        Forward,
        Reverse,
        Left,
        Right
    }
    //directions the :MOVE motor can spin on the spot. 
    export enum SpinDirections {
        Left,
        Right
    }
    
    export enum TurnRadii {
        Tight,
        Standard,
        Wide
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
        //% block="Left"
        Left,
        //% block="Right"
        Right
    }
    //Light level detection mode selection
    export enum LightSelection {
        //% block="Light"
        Light,
        //% block="Dark"
        Dark
    }
    
    //Detection mode selection
    export enum DetectorSensitivity 
    {
        //% block="Low"
        Low,
        //% block="Medium"
        Medium,
        //% block="High"
        High
    }

    let initalised = false //a flag to allow us to initialise without the user having to explicitly call the initialisation routine
    //Motor global variables to allow user to 'bias' the motors to drive the :MOVE motor in a straight line
    let rightMotorBias = 0
    let leftMotorBias = 0
    let turnTightness = 4
    //Sound global variables
    let sirenOn = false
    //Ultrasonic global variables
    let triggerPin = DigitalPin.P13
    let echoPin = DigitalPin.P14
    let units = Units.Centimeters
    //Line following sensors global variables
    let detectionLevel = 245


	/*
		This sets up the PCA9632 I2C driver chip for controlling the motors
    */
    function setup(): void {
        let buf = pins.createBuffer(2)

        buf[0] = MODE_1_REG_ADDR
        buf[1] = MODE_1_REG_VALUE
        pins.i2cWriteBuffer(CHIP_ADDR, buf, false)
        buf[0] = MODE_2_REG_ADDR
        buf[1] = MODE_2_REG_VALUE
        pins.i2cWriteBuffer(CHIP_ADDR, buf, false)
        buf[0] = MOTOR_OUT_ADDR
        buf[1] = MOTOR_OUT_VALUE
        pins.i2cWriteBuffer(CHIP_ADDR, buf, false)
        basic.pause(1)

        initalised = true
    }

    //////////////
    //  LIGHTS  //
    //////////////


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
        //% subcategory="Lights"
        //% blockId="kitronik_move_motor_rainbow"
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
         * Create a range of LEDs.
         * @param start offset in the LED strip to start the range
         * @param length number of LEDs in the range. eg: 4
         */
        //% subcategory="Lights"
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
        //% subcategory="Lights"
        //% blockId="kitronik_move_motor_display_rotate" 
        //% block="%moveMotorZIP|rotate ZIP LEDs by %offset" 
        //% weight=97 blockGap=8
        rotate(offset: number = 1): void {
            this.buf.rotate(-offset * 3, this.start * 3, this._length * 3)
        }
    	/**
         * Sets whole Move Motor LEDs as a given color (range 0-255 for r, g, b). Call Show to make changes visible 
         * @param rgb RGB color of the LED
         */
        //% subcategory="Lights"
        //% blockId="kitronik_move_motor_display_only_set_strip_color" 
        //% block="%moveMotorZIP|set color %rgb=kitronik_move_motor_colors"
        //% weight=99 blockGap=8
        setColor(rgb: number) {
            rgb = rgb >> 0;
            this.setAllRGB(rgb);
        }
    	/**
         * Shows whole Move Motor LEDs as a given color (range 0-255 for r, g, b). 
         * @param rgb RGB color of the LED
         */
        //% subcategory="Lights"
        //% blockId="kitronik_move_motor_display_set_strip_color" 
        //% block="%moveMotorZIP|show color %rgb=kitronik_move_motor_colors"
        //% weight=93 blockGap=8
        showColor(rgb: number) {
            rgb = rgb >> 0;
            this.setAllRGB(rgb);
            this.show();
        }

        /**
         * Set particular ZIP LED on the board to a given color. 
         * You need to call ``show changes`` to make the changes visible.
         * @param zipLedNum position of the ZIP LED in the string
         * @param rgb RGB color of the ZIP LED
         */
        //% subcategory="Lights"
        //% blockId="kitronik_move_motor_set_zip_color" 
        //% block="%moveMotorZIP|set ZIP LED %zipLedNum|to %rgb=kitronik_move_motor_colors"
        //% weight=98 blockGap=8
        setZipLedColor(zipLedNum: number, rgb: number): void {
            this.setPixelRGB(zipLedNum >> 0, rgb >> 0);
        }

        /**
         * Send all the changes to the Move Motor ZIP LEDs.
         */
        //% subcategory="Lights"
        //% blockId="kitronik_move_motor_display_show" 
        //% block="%moveMotorZIP|show" blockGap=8
        //% weight=95
        show() {
            //use the Kitronik version which respects brightness for all 
            ws2812b.sendBuffer(this.buf, this.pin, this.brightness);
        }

        /**
         * Turn off all LEDs on the Move Motor ZIP LEDs.
         * You need to call ``show`` to make the changes visible.
         */
        //% subcategory="Lights"
        //% blockId="kitronik_move_motor_display_clear"
        //% block="%moveMotorZIP|clear"
        //% weight=96 blockGap=8
        clear(): void {
            this.buf.fill(0, this.start * 3, this._length * 3);
        }

        /**
         * Set the brightness of the Move Motor ZIP LEDs. This flag only applies to future show operation.
         * @param brightness a measure of LED brightness in 0-255. eg: 255
         */
        //% subcategory="Lights"
        //% blockId="kitronik_move_motordisplay_set_brightness"
        //% block="%moveMotorZIP|set brightness %brightness" 
        //% weight=97 blockGap=8
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
    //% subcategory="Lights"
    //% blockId="kitronik_move_motor_ZIP_LED_create" 
    //% block="to MOVE Motor with %numZips|ZIP LEDs"
    //% weight=100 blockGap=8
    //% trackArgs=0,2
    //% blockSetVariable=moveMotorZIP
    export function createMoveMotorZIPLED(numZips: number): MoveMotorZIP {
        let moveMotorZIP = new MoveMotorZIP();
        moveMotorZIP.buf = pins.createBuffer(numZips * 3);
        moveMotorZIP.start = 0;
        moveMotorZIP._length = numZips;
        moveMotorZIP.setBrightness(128)
        moveMotorZIP.pin = DigitalPin.P8;
        pins.digitalWritePin(moveMotorZIP.pin, 8);
        return moveMotorZIP;
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
    //% subcategory="Lights"
    //% weight=1 blockGap=8
    //% blockId="kitronik_move_motor_rgb" block="red %red|green %green|blue %blue"
    export function rgb(red: number, green: number, blue: number): number {
        return packRGB(red, green, blue);
    }

    /**
     * Gets the RGB value of a known color
    */
    //% subcategory="Lights"
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
     * Set the distance measurement units to cm or inches (cm is default)
     * @param unit desired conversion unit
     */
    //% subcategory="Sensors"
    //% group="Ultrasonic"
    //% blockId=kitronik_move_motor_ultrasonic_units
    //% block="measure distances in %unit"
    //% weight=100 blockGap=8
    export function setUltrasonicUnits(unit: Units): void {
        units = unit
    }
    
    /**
     * Measure the echo time (after trigger) and converts to cm or inches and returns as an int
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% subcategory="Sensors"
    //% group="Ultrasonic"
    //% blockId=kitronik_move_motor_ultrasonic_measure
    //% block="measure distance"
    //% weight=95 blockGap=8
    export function measure(maxCmDistance = 500): number {
        // send pulse
        pins.setPull(triggerPin, PinPullMode.PullNone);
        pins.digitalWritePin(triggerPin, 0);
        control.waitMicros(2);
        pins.digitalWritePin(triggerPin, 1);
        control.waitMicros(10);
        pins.digitalWritePin(triggerPin, 0);

        // read pulse
        const pulse = pins.pulseIn(echoPin, PulseValue.High, maxCmDistance * 39);
        //From the HC-SR04 datasheet the formula for calculating distance is "microSecs of pulse"/58 for cm or "microSecs of pulse"/148 for inches.
        //When measured actual distance compared to calculated distanceis not the same.  There must be an timing measurement with the pulse.
        //values have been changed to match the correct measured distances so 58 changed to 39 and 148 changed to 98
        switch (units) {
            case Units.Centimeters: return Math.idiv(pulse, 39);
            case Units.Inches: return Math.idiv(pulse, 98);
            default: return 0;
        }
    }
    


    /**
    * Set the sensor sensitivity value in case the sensors are not working well on different surfaces. 
    * Low sensitivity is for more reflective surfaces / closer distances. 
    * High sensitivity is for less reflective surfaces / longer distances.
    * Medium is the default, and a reasonable balance for most surfaces.
    * @param setupSelected is the selection of preset sensor sensitivity
    */
    //% subcategory="Sensors"
    //% group="Line Following"
    //% blockId=kitronik_move_motor_line_follower_setup
    //% block="set sensors to %setupSelected| sensitivity"
    //% weight=80 blockGap=8
    export function sensorSetup(setupSelected: DetectorSensitivity) 
    {
        switch(setupSelected)
        {
            case DetectorSensitivity.Low: 
            detectionLevel =250
            break
            case DetectorSensitivity.Medium: 
            detectionLevel =205
            break
            case DetectorSensitivity.High: 
            detectionLevel =180
            break
        }
    }

    // not a block, but here in case someone advanced in the java world want sto set the value directly.
    // No checking of 'goodness' of value as if your here you should know what you are doing.
    // It should be analog in (0-1023)
    export function setSensorDetectionLevel(value:number)
    {
        detectionLevel = value
    }

    /**
    * Read sensor block allows user to read the value of the sensor (returns value in range 0-1023)
    * @param pinSelected is the selection of pin to read a particular sensor
    */
    //% subcategory="Sensors"
    //% group="Line Following"
    //% blockId=kitronik_move_motor_line_follower_read_sensor
    //% block="%pinSelected| line following sensor value"
    //% weight=85 blockGap=8
    export function readSensor(sensorSelected: LfSensor) {
        let value = 0

        if (sensorSelected == LfSensor.Left) {
            value = pins.analogReadPin(AnalogPin.P2)
        }
        else if (sensorSelected == LfSensor.Right) {
            value = pins.analogReadPin(AnalogPin.P1)
        }
        return value;
    }

    /**
    * Sensor on pin detection returns a true or false when the sensor has detected
    * @param sensorSelected is the selection of pin to read a particular sensor
    * @param lightSelection is the selection of the sensor detecting light or dark
    */
    //% subcategory="Sensors"
    //% group="Line Following"
    //% blockId=kitronik_move_motor_line_follower_digital_sensor
    //% block="%sensorSelected| line following sensor detects %LightSelection"
    //% weight=90 blockGap=8
    export function sensorDigitalDetection(sensorSelected: LfSensor, lightLevel: LightSelection): boolean {
        let value = 0
        let result = false
        value = readSensor(sensorSelected)
        switch (lightLevel)
        {
            case LightSelection.Light:  //Light and Object are the same - but called out differently for ease of use.
            {
                if (value >= detectionLevel){
                    result = true
                }
                else { 
                    result = false
                }
            }
            break
            case LightSelection.Dark:
            {
                if (value <= detectionLevel)
                {
                    result = true
                }
                else { 
                    result = false
                }
            }
            break
        }
        return result;
    }

    //////////////
    //  MOTORS  //
    //////////////
    /**
     * Drives the :MOVE motor in the specified direction. Turns have a small amount of forward motion.
     * @param motor which motor to turn off
     */
    //% subcategory=Motors
    //% group="Drive"
    //% blockId=kitronik_move_motor_drive
    //% weight=100 blockGap=8
    //% block="move %direction|at speed %speed"
    //% speed.min=0, speed.max=100
    export function move(direction: DriveDirections, speed: number): void {
         if (initalised == false) {
            setup()
        }
        switch (direction)
        {
            case DriveDirections.Forward:
                motorOn(Motors.MotorLeft, MotorDirection.Forward, speed)
                motorOn(Motors.MotorRight,MotorDirection.Forward, speed)
            break
            case DriveDirections.Reverse:
                motorOn(Motors.MotorLeft, MotorDirection.Reverse, speed)
                motorOn(Motors.MotorRight,MotorDirection.Reverse, speed)
            break
            case DriveDirections.Left:
                motorOn(Motors.MotorLeft,MotorDirection.Forward, (speed/turnTightness))
                motorOn(Motors.MotorRight, MotorDirection.Forward, speed)
            break
            case DriveDirections.Right:
                motorOn(Motors.MotorLeft,MotorDirection.Forward, speed)
                motorOn(Motors.MotorRight, MotorDirection.Forward, (speed/turnTightness))
            break
            default: //just in case. Should never get here
                motorOff(Motors.MotorLeft)
                motorOff(Motors.MotorRight)
            break
        }
            
        
        
    }

    /**
     * Tunrs on the spot in the direction requested.
     * @param motor which motor to turn off
     */
    //% subcategory=Motors
    //% group="Drive"
    //% blockId=kitronik_move_motor_spin
    //% weight=95 blockGap=8
    //% block="spin %direction|at speed %speed"
    //% speed.min=0, speed.max=100
    export function spin(direction: SpinDirections, speed: number): void {
         if (initalised == false) {
            setup()
        }
        switch (direction)
        {
            case SpinDirections.Left:
                 motorOn(Motors.MotorLeft, MotorDirection.Reverse, speed)
                 motorOn(Motors.MotorRight,MotorDirection.Forward, speed)
            break
            case SpinDirections.Right:
                 motorOn(Motors.MotorLeft, MotorDirection.Forward, speed)
                 motorOn(Motors.MotorRight,MotorDirection.Reverse, speed)
            break
            default: //just in case. Should never get here
                motorOff(Motors.MotorLeft)
                motorOff(Motors.MotorRight)
            break
        }
    }
    
    /**
     * Stops the :MOVE motor
     * @param motor which motor to turn off
     */
    //% subcategory=Motors
    //% group="Drive"
    //% blockId=kitronik_move_motor_stop
    //% weight=90 blockGap=8
    //% block="stop"
    export function stop(): void {
         if (initalised == false) {
            setup()
        }
        motorOff(Motors.MotorLeft)
        motorOff(Motors.MotorRight)
    }

    /**
     * TO help the MOVE motor drive in a straight line you can bias the motors.
     * @param balance number between 0 and 10 to help balance the motor speeds eg: 0
     */
    //% subcategory=Motors
    //% group="Setup"
    //% blockId=kitronik_move_motor_motor_balance
    //% weight=85 blockGap=8
    //% block="bias to %direction by %balance"
    //% balance.min=0 balance.max=10
    export function motorBalance(direction: SpinDirections, balance: number): void {
        leftMotorBias = 0
        rightMotorBias = 0
        switch (direction)
        {
            case SpinDirections.Left:
            leftMotorBias = Math.round(balance*1.75)
            break
            case SpinDirections.Right:
            rightMotorBias = Math.round(balance*1.75)
        }
    }
    
        /**
     * Move the slider to the direction the MOVE Motor drives when not balanced. This will make the adjustment so it drives in a straight line.
     * @param balance number between -10 and 10 to help balance the motor speeds eg: 0
     */
    //% subcategory=Motors
    //% group="Setup"
    //% blockId=kitronik_move_motor_motor_turn_radius
    //% weight=80 blockGap=8
    //% block="set turn radius %radius"
    export function turnRadius(radius:TurnRadii): void {
        switch (radius)
        {
            case TurnRadii.Tight:
                turnTightness = 8
            break
            case TurnRadii.Wide:
                turnTightness= 1.6
            break
            case TurnRadii.Standard: 
                turnTightness = 3
            break
        }
    }
    
    //Here for the more advanced user - this function sets the divider for the speed of the slower wheel in a turn.
    //setting it to 2 will result in the inner wheel of the turn runnign at 1/2 the speed of the outer wheel.
    // No checking of what the value is - If you are using this it is expected you know what you are doing
    export function setTurnRadius(radiusDivider:number)
    {
        turnTightness = radiusDivider
    }
    
        /**
     * Sets the requested motor running in chosen direction at a set speed.
     * if the PCA has not yet been initialised calls the initialisation routine.
     * @param motor which motor to turn on
     * @param dir   which direction to go
     * @param speed how fast to spin the motor
     */
    //% subcategory=Motors
    //% group="Motor Control"
    //% blockId=kitronik_move_motor_motor_on
    //% block="turn %motor|motor on direction %dir|speed %speed"
    //% weight=75 blockGap=8
    //% speed.min=0 speed.max=100
    export function motorOn(motor: Motors, dir: MotorDirection, speed: number): void {
        if (initalised == false) {
            setup()
        }
        /*convert 0-100 to 0-255 by a simple multiple by 2.55*/
        let outputVal = Math.round(speed*2.55)
        if (outputVal > 255){ 
            outputVal = 255 
        }
        let motorOnbuf = pins.createBuffer(2)
        if (motor == Motors.MotorRight){
            switch (dir) {
                case MotorDirection.Forward:
                    motorOnbuf[0] = motor
                    motorOnbuf[1] = 0x00
                    pins.i2cWriteBuffer(CHIP_ADDR, motorOnbuf, false)
                    motorOnbuf[0] = motor + 1
                    motorOnbuf[1] = outputVal  - rightMotorBias
                    pins.i2cWriteBuffer(CHIP_ADDR, motorOnbuf, false)
                    break
                case MotorDirection.Reverse:
                    motorOnbuf[0] = motor
                    motorOnbuf[1] = outputVal - rightMotorBias
                    pins.i2cWriteBuffer(CHIP_ADDR, motorOnbuf, false)
                    motorOnbuf[0] = motor + 1
                    motorOnbuf[1] = 0x00
                    pins.i2cWriteBuffer(CHIP_ADDR, motorOnbuf, false)
                    break
            }
        }
        else if (motor == Motors.MotorLeft){
            switch (dir) {
                case MotorDirection.Forward:
                    motorOnbuf[0] = motor
                    motorOnbuf[1] = outputVal - leftMotorBias
                    pins.i2cWriteBuffer(CHIP_ADDR, motorOnbuf, false)
                    motorOnbuf[0] = motor + 1
                    motorOnbuf[1] = 0x00
                    pins.i2cWriteBuffer(CHIP_ADDR, motorOnbuf, false)
                    break
                case MotorDirection.Reverse:
                    motorOnbuf[0] = motor
                    motorOnbuf[1] = 0x00
                    pins.i2cWriteBuffer(CHIP_ADDR, motorOnbuf, false)
                    motorOnbuf[0] = motor + 1
                    motorOnbuf[1] = outputVal - leftMotorBias
                    pins.i2cWriteBuffer(CHIP_ADDR, motorOnbuf, false)
                    break
            }
        }
    }

    /**
     * Turns off the specified motor.
     * @param motor which motor to turn off
     */
    //% subcategory=Motors
    //% group="Motor Control"
    //% blockId=kitronik_move_motor_motor_off
    //% weight=70 blockGap=8
    //% block="turn off %motor| motor"
    export function motorOff(motor: Motors): void {
        if (initalised == false) {
            setup()
        }
        let motorOffbuf = pins.createBuffer(2)
        motorOffbuf[0] = motor
        motorOffbuf[1] = 0x00
        pins.i2cWriteBuffer(CHIP_ADDR, motorOffbuf, false)
        motorOffbuf[0] = motor + 1
        motorOffbuf[1] = 0x00
        pins.i2cWriteBuffer(CHIP_ADDR, motorOffbuf, false)
    }

    //////////////
    //  SOUNDS  //
    //////////////

    /**
     * Beep horn 
     */
    //% subcategory=Sounds
    //% blockId=kitronik_move_motor_horn
    //% weight=95 blockGap=8
    //%block="beep the horn"
    export function beepHorn(): void {
            music.playTone(185, music.beat(BeatFraction.Quarter))
            basic.pause(75)
    }

    /**
    * Turns on and off the siren that plays in the background.
    * @param OnOffSelection which selects the status of the siren being on or off
    */
    //% subcategory=Sounds
    //% blockId=kitronik_move_motor_siren
    //% weight=90 blockGap=8
    //% block="turn siren %siren"
    export function soundSiren(siren: OnOffSelection): void {
        if (siren == OnOffSelection.On) {
            sirenOn = true
            control.inBackground(() => {
            while (sirenOn) {
                music.playTone(370, music.beat(BeatFraction.Half))
                basic.pause(75)
                music.playTone(262, music.beat(BeatFraction.Half))
                basic.pause(75)
            }

        })
        }
        else {
            sirenOn = false
            music.stopMelody(MelodyStopOptions.Background)
        }
    }
}
