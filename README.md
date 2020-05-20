# pxt-kitronik-move-motor

Custom blocks for the :MOVE Motor for BBC micro:bit (www.kitronik.co.uk/5683).
The blocks in this extension are in four main groups: Lights, Sensors, Motors and Sounds.

## Use this extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **"move motor"** and import

## Lights
The Lights section contains blocks to control the 4 ZIP LEDs on the :MOVE motor.
Any block which does not have "show" in the name needs to be followed by a ``"show"`` block to make the changes visible. 

The first block sets up the ZIP LEDs attached to the :MOVE motor board as a variable, enabling them to be controlled in the program. The number of ZIP LEDs can be changed to match the number connected, but BBC micro:bit pin connection is automatically assigned:
```blocks
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
```
To set the colour of all the ZIP LEDs use the ``"set color"`` block. To view the changes there needs to be a show block after this block.
```blocks
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
moveMotorZIP.setColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
```
To set an individual LED to a colour use the ``"set ZIP LED"`` block. To view the changes there needs to be a show block after this block.
```blocks
moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
```
The brightness of the LEDs can be controlled with the ``"set brightness"`` block. To view the changes there needs to be a show block after this block.
```blocks
moveMotorZIP.setBrightness(255)
```
``"Rotate"`` moves each LED along the chain, and then takes the end one back to the first. To view the changes there needs to be a show block after this block. 
```blocks
moveMotorZIP.rotate(1)
```
To clear the LEDs use the ``"clear"`` block. To view the changes there needs to be a show block after this block.
```blocks
moveMotorZIP.clear()
```
The ``"show"`` block shows the changes that have been made since the last time a ``"show"`` was called.
```blocks
moveMotorZIP.show()
```
``"Show rainbow"`` displays a rainbow pattern. This block does not need a separate ``"show"`` block following it.
```blocks
moveMotorZIP.showRainbow(1, 360)
```
``"Show color"`` sets the LEDS to a colour and shows the change.
```blocks
moveMotorZIP.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
```
The range block allows a variable to be created that represents a selection of the LEDs.
```blocks
let ZipLEDRange = moveMotorZIP.range(0, 4)
```
The colours that can be set in a handy list.
```blocks
moveMotorZIP.setColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Yellow))
```
You can set any mix of red, green and blue using the ``"set color"`` block.
```blocks
moveMotorZIP.setColor(Kitronik_Move_Motor.rgb(255, 255, 255))
```

## Sensors
As well as all the micro:bit sensors, the :MOVE motor has 2 additional ones: An Ultrasonic Distance Sensor, and a pair of Line Following Sensors.
### Ultrasonic
The ``"measure distances in"`` block sets the units of measurement - cm or inches.
The ``"measure distance"`` block gives a value that corresponds to the distance that the sensor has measured.
```blocks
basic.showNumber(Kitronik_Move_Motor.measure())
```

### Line Following
The digital block ``"line following sensor detects"`` is used to give a true/false for the line following sensor detecting a light or dark surface. 
```blocks
if (Kitronik_Move_Motor.sensorDigitalDetection(Kitronik_Move_Motor.LfSensor.Left, Kitronik_Move_Motor.LightSelection.Light)) {
        Kitronik_Move_Motor.beepHorn()
    }
```
The ``"line following sensor value"`` block returns the value of the analog input from the line following sensor. 
```blocks
basic.showNumber(Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left))
```
The sensors have a sensitivity level that can be adjusted with the ``"set sensors to"`` block. 
```blocks
Kitronik_Move_Motor.sensorSetup(Kitronik_Move_Motor.DetectorSensitivity.Low)
```

## Motors
### Drive
The Drive blocks enable simple control of the :MOVE Motor.  
Move in a direction:
```blocks
Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
```
When the Left or Right directions are used then the buggy will move forwards, but turn as it does so.
To rotate on the spot use the spin block:
```blocks
Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 35)
```
The ``"stop"`` block stops the :MOVE Motor driving.
```blocks
Kitronik_Move_Motor.stop()
```

### Setup
The Setup blocks control the way the :MOVE Motor drives.
The ``"bias to"`` block can be used to balance the motor speeds so that the :MOVE Motor drives in a straight line.
```blocks
Kitronik_Move_Motor.motorBalance(Kitronik_Move_Motor.SpinDirections.Left, 5)
```
The tightness of the turns made using the ``"move"`` block is controlled by the ``"set turn radius"`` block.
```blocks
Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
```

### Motor Control
The motor control blocks allow the individual motors to be controlled for both direction and speed.
```blocks
Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 100)
```
The individual motors can be stopped by calling the ``"turn off"`` block. 
```blocks
Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
```

## Sounds
There are two blocks in the Sounds section; one to beep the horn, and one to turn on/off the siren.

This block beeps the onboard buzzer like a horn:
```blocks
Kitronik_Move_Motor.beepHorn()
```
The second block can run a siren in the background:
```blocks
Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.On)
```
The buzzer is connected to pin 0, so the normal music blocks can also be used.

## License

MIT

## Supported targets

* for PXT/microbit