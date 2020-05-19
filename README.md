# pxt-kitronik-move-motor

Custom blocks for www.kitronik.co.uk/5683 :MOVE Motor for BBC micro:bit.
The blocks in this extension are in four main groups, ZIP LEDs, Sensors, Motors and .Sounds

## Use this extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/kitronikltd/pxt-kitronik-move-motor** and import

## ZIP LEDs
The Lights section contains blocks to control the 4 ZIP LEDs on the :MOVE motor.
Any block which does not have show in the name needs to be followed by a show block to make the changes visible.

The first block sets up the ZIP LEDs attached to the :MOVE motor board as a variable, enabling them to be controlled in the program. The number of ZIP LEDs can be changed to match the number connected, but BBC micro:bit pin connection is automatically assigned:
```blocks
moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
```
To set the colour of all the ZIP leds use the set color block. To view the changes ther needs to be a show block after this block
```blocks
moveMotorZIP.setColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
```
To set an individual LED to a colour use the set ZIP Led block. To view the changes ther needs to be a show block after this block
```blocks
moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
```
The brightness of the LEDs can be controlled with the set brightness block. To view the changes ther needs to be a show block after this block
```blocks
moveMotorZIP.setBrightness(255)
```
Rotate moves each LED along the chain, and then takes the end one back to the first. To view the changes ther needs to be a show block after this block 
```blocks
moveMotorZIP.rotate(1)
```
To clear the LEDs use the clear block. To view the changes ther needs to be a show block after this block
```blocks
moveMotorZIP.clear()
```
The show block shows the changes that have ben made since the last time a show was called.

```blocks
moveMotorZIP.show()
```

Show rainbow shows a rainbow pattern. this block does not need a seperate show block following it.
```blocks
moveMotorZIP.showRainbow(1, 360)
```
Show Colour sets the LEDS to a colour and shows the change
```blocks
moveMotorZIP.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
```
The range block allows a variable to be created that represents a selection fo the LEDs
```blocks
let ZipLEDRange = moveMotorZIP.range(0, 4)
```
The colours that can be set in a handy list
```blocks
moveMotorZIP.setColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Yellow))
```
You can set any mix of red,green and blue using the set colour block.
```blocks
moveMotorZIP.setColor(Kitronik_Move_Motor.rgb(255, 255, 255))
```

## Sensors
As well as all the micro:bit sensors the :MOVE motor has 2 addiotnal ones: An Ultrasonic distance sensor, and a pair of Line following sensors.
### Ultrasonic
 The measure distances in block sets the units of measurement - cm or inches.
 The measure distance block gives a value that corresponds to the distance that the senors has measured.
 ```blocks
basic.showNumber(Kitronik_Move_Motor.measure())
```

### Line Following
The digital block Line followign sensor detects is used to give a true /false for eh line folowing sensor detecting a light or dark surface. 
```blocks
if (Kitronik_Move_Motor.sensorDigitalDetection(Kitronik_Move_Motor.LfSensor.Left, Kitronik_Move_Motor.LightSelection.Light)) {
        Kitronik_Move_Motor.beepHorn()
    }
```
The Line following sensor value block returns the value of the analog input form the line following sensor. 
```blocks
basic.showNumber(Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left))
```
The sensors have a sensitivity level that can be set with the set sensors block. 

## Motors
### Drive
The Drive blocks allow the control of the :MOVE motor simply.
move in a direction:
```blocks
Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
```
When the Left or Right directions are used then the buggy will move forwards, but turn as it does so.
To spin on the spot use the spin block:
```blocks
Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 35)
```
The stop block stops the :MOVE motor driving.
```blocks
Kitronik_Move_Motor.stop()
```


### Setup
The Setup block control the way the :MOVE motor drives.
The bias block can be used to balance the motor speeds so that the :MOVE motor drives in a straight line
```blocks
Kitronik_Move_Motor.motorBalance(Kitronik_Move_Motor.SpinDirections.Left, 5)
```
The tighness of the turns made by the move block is controlled by the set turn radius block.
```blocks
Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
```

### Motor Control
The motor control blocks allow the individual motors to be controlled for both direction and speed.
```blocks
Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 100)
```
The individual motors can be stopped by calling the turn off block. 
```blocks
Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
```
## Sounds

There are two blocks in the Sounds section; one to beep the horn, and one to turn on /off the siren.

This block beeps the onboard buzzer like a horn:
```blocks
Kitronik_Move_Motor.beepHorn()
```

The second block can run a siren in the background
```blocks
Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.On)
```
The buzzer is connected to pin 0, so the normal music blocks can also be used.


## License

MIT

## Supported targets

* for PXT/microbit