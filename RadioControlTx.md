### @activities true
### @explicitHints true

# :MOVE Motor Radio Control Transmitter (controller code)

## Introduction
### Introduction @unplugged
Learn how to use the :MOVE Motor with radio control's to drive your buggy around (this will require two BBC micro:bit's).  The code on the left editor will be for the controller (aka transmitter). The code on the right editor will be for the buggy (aka receiver).  This tutorial will take a step-by-step guide of both sides ofthe code.

![:MOVE Motor angled view with lights](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-lights.jpg)

## Basic Drive Forward
### Step 1
To start with, to help know which micro:bit is which, we will display a letter on the screen so we know which is the transmitter and the receiver.  Add ``||basic.show String||`` and add the letter T into the ``||basic.onStart||``.  This will indicate this is the transmitter micro:bit.

#### ~ tutorialhint
```blocks
basic.showString("T")
```

### Step 2
We need to set which radio group the two micro:bit's can talk to each other.  This is important so no there is no miscommunication.  
First, from the radio section, place the ``||radio:set Group||`` into the ``||basic.onStart||`` block and set the group to 1.

#### ~ tutorialhint
```blocks
basic.showString("T")
radio.setGroup(1)
```

### Step 3
Next we want to send a radio message to the :MOVE Motor to drive forward on the button press. When sending any radio messages we will send a word (also known as name) and a value.
Add ``||input:onButtonA||``. To send the message, from the radio section add ``||radio:send Value||`` this will let us send a name and value to the :MOVE Motor.  
The name will be a direction and the value will be our speed. Set the name to "Forward" and the value to 100.
#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    radio.sendValue("Forward", 100)
})
```

### Step 4
Now we have a basic controller to send a message to the :MOVE Motor to drive forward.  Connect your BBC micro:bit and click ``|Download|``.  Once programmed, power the BBC micro:bit and see if a letter 'T' appears on the screen.

### Transmitter Code Done @unplugged
So, the transmitter code at this stage is complete.  Click the OK button on the right editor and start work on the receiver code.  Once that tutorial is complete, come back and click OK to get to the next stage.
![Right Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/right-arrow.jpg)

### Adjustable speed control @unplugged
Now we got the :MOVE Motor driving forward, we can use the sensors on the BBC micro:bit to control the speed of the :MOVE Motor.

### Step 5
Let's create a variable called "drive", place a ``||variables:set drive||`` into the forever loop.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = 0
})
```

### Step 6
Now we need to set the "drive" varaible to have a number from the accelemetre of the micro:bit. From the Input blocks in the more section insert the ``||input:rotation||`` into the ``||variables:set drive||`` block.
Make sure the selection of the block is set to "pitch".  The variable will take a number from the micro:bit and this changes as you move the micro:bit
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
})
```

### Step 7
The pitch gives a number from -90 to 90. This represents the number of degrees moved.  To drive forward let just look at the positive values.  Below the variable set, add in an ``||logic:if||`` to check if variable drive is greater than 0.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    if (drive > 0) {
    	
    }
})
```

### Step 8
As previously mentioned the pitch give us a number upto 90, however, the motor speed goes upto 100.  This is a great time to use a block called map.  This allows us to change the range of a number to a new scale.
Let's create a variable called "mappedDrive". Place a ``||variables:set mappedDrive||`` atthe start of our if bracket. From the Math section add the ``||math:map||`` into the "set mappedDrive" block.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    if (drive > 0) {
        mappedDrive = Math.map(0, 0, 1023, 0, 4)
    }
})
```

### Step 9
Now we need to input the range of numbers that we want to change.  The first input needs to be the value we want to change, this will be "drive".  The next two number are the low and high numbers of the pitch, this is 0 and 90.
The last two entries will be the new scale we want our value to be changed to, this will match the motor speed range from 0 to 100.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    if (drive > 0) {
        mappedDrive = Math.map(drive, 0, 90, 0, 100)
    }
})
```

### Step 10
Move the ``||radio:send Value||`` from ``||input:onButtonA||`` to after the setting of "mappedDrive". Change the variable from "drive" to "mappedDrive".
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    if (drive > 0) {
        mappedDrive = Math.map(drive, 0, 90, 0, 100)
        radio.sendValue("Forward", mappedDrive)
    }
})
```

### Step 11
Connect your transmitter BBC micro:bit and click ``|Download|``. Let's try the code and see how it controls the speed on the :MOVE Motor.

### Step 12
Did the :MOVE Motor only drive when the micro:bit was tilted backwards? Let's change this so that when the micro:bit is tilted forwards, the :MOVE Motor drives forwards.  This is where we need to check if the variable "drive" is a negative number.
Change the 'if' condition from greater than ">" to less than "<".
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    if (drive < 0) {
        mappedDrive = Math.map(drive, 0, 90, 0, 100)
        radio.sendValue("Forward", mappedDrive)
    }
})
```

### Step 13
The speed values that we have been sending were positive numbers each time. Now we need to change the  negative number to a range useful for the motors.  This can be done by changing the map block numbers. Change the number 90 to -90
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    if (drive < 0) {
        mappedDrive = Math.map(drive, 0, -90, 0, 100)
        radio.sendValue("Forward", mappedDrive)
    }
})
```

### Step 14
Click and ``|Download|`` the code to the controller micro:bit and see if controls have reversed. When your code is working, let's move to the next section.

### Changing Directions @unplugged
The controller can change the speed moving forward.  Time to look at making the :MOVE Motor to respond to driving in reverse.

### Step 15
Currently we are looking if the value of "drive" is less than '0'. Now we need to look for it being greater than '0'.  So, click the ||logic:+|| icon twice to add an ||logic:if else|| click on the ||logic:-|| next to the ||logic:if else||.
In the "else if" condition, check for drive greater than '0'.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    if (drive < 0) {
        mappedDrive = Math.map(drive, 0, -90, 0, 100)
        radio.sendValue("Forward", mappedDrive)
    } else if (drive > 0) {
    	
    } 
})
```

### Step 16
Duplicate the ``||variables:set mappedDrive||`` block and place into the bracket below. Duplicate the ``||radio:send Value||`` and place below the newely copied ``||variables:set mappedDrive||`` block
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    if (drive < 0) {
        mappedDrive = Math.map(drive, 0, -90, 0, 100)
        radio.sendValue("Forward", mappedDrive)
    } else if (drive > 0) {
    	mappedDrive = Math.map(drive, 0, -90, 0, 100)
        radio.sendValue("Forward", mappedDrive)
    }
})
```

### Step 17
The values in these duplicate blocks are slightly wrong. Let's adjust these so they work when try to drive in reverse.  Firstly change the text in the ``||radio:send Value||`` from "Forward" to "Reverse".
Previously we had the :MOVE Motor driving, when tilting the micro:bit backwards.  This was with the pitch being a positive number. Change the newely copied map block from -90 to 90.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    if (drive < 0) {
        mappedDrive = Math.map(drive, 0, -90, 0, 100)
        radio.sendValue("Forward", mappedDrive)
    } else if (drive > 0) {
    	mappedDrive = Math.map(drive, 0, 90, 0, 100)
        radio.sendValue("Reverse", mappedDrive)
    } 
})
```

### Step 18
Click and ``|Download|`` the code to the controller micro:bit.

### Transmitter Code Pause @unplugged
Let's pause the transmitter code so its ready to test with the :MOVE Motor. Next we need to adjust the reciever micro:bit code to accept the new commands sent over the radio.  Click the OK button on the right editor and start work on the receiver code.  Once that tutorial is complete, come back and click OK to get to the next stage.
![Right Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/right-arrow.jpg)


### Step 19
So the :MOVE Motor moves when the micro:bit is moved.  This can be a pain when you accidently move the micro:bit and did not mean to. This can be adjusted by adding in whats called a "dead man's switch". This type of switch is designed to be active or deactived if the operator has loss of consciousness.
In other words, it is only active when the button is being pressed. We can wrap the "if drive < 0" if statement inside another "if else" statement. 
Add an ``||logic:if else||`` to below the ``||variables:set drive||``.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    if (true) {
    	
    } else {
    	
    }
    if (drive < 0) {
        mappedDrive = Math.map(drive, 0, -90, 0, 100)
        radio.sendValue("Forward", mappedDrive)
    } else if (drive > 0) {
        mappedDrive = Math.map(drive, 0, 90, 0, 100)
        radio.sendValue("Reverse", mappedDrive)
    }
})
```

### Step 20
Now move the previous ``||logic:if else||`` into the top ``||logic:if||`` bracket.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    if (true) {
      if (drive < 0) {
        mappedDrive = Math.map(drive, 0, -90, 0, 100)
        radio.sendValue("Forward", mappedDrive)
      } else if (drive > 0) {
        mappedDrive = Math.map(drive, 0, 90, 0, 100)
        radio.sendValue("Reverse", mappedDrive)
    } 
    else {

    }  	
})
```

### Step 21
Add ``||input:button A pressed||`` to the top of the newely inserted if statement.  The code inside the bracket will only work when button A is pressed.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    if (input.buttonIsPressed(Button.A)) {
      if (drive < 0) {
        mappedDrive = Math.map(drive, 0, -90, 0, 100)
        radio.sendValue("Forward", mappedDrive)
      } else if (drive > 0) {
        mappedDrive = Math.map(drive, 0, 90, 0, 100)
        radio.sendValue("Reverse", mappedDrive)
    } 
    else {

    }  	
})
```

### Step 22
When button A is not pressed, we want the :MOVE Motor to stop. Add another ``||radio:send Value||`` into the ``||logic:lse||`` bracket with the text "Stop" and number '0'. 
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    if (input.buttonIsPressed(Button.A)) {
      if (drive < 0) {
        mappedDrive = Math.map(drive, 0, -90, 0, 100)
        radio.sendValue("Forward", mappedDrive)
      } else if (drive > 0) {
        mappedDrive = Math.map(drive, 0, 90, 0, 100)
        radio.sendValue("Reverse", mappedDrive)
      }
    } 
    else {
       radio.sendValue("Stop", 0)
    }  	
})
```

### Step 23
Click and ``|Download|`` the code to the controller micro:bit.  Lets test the code see if can only control the :MOVE Motor while button A is pressed.

### Steering the buggy @unplugged
Well done on the code so far. Next section will be adding another sensor input for the steering of the buggy.

