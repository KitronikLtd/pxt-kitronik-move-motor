### @activities true
### @explicitHints true

# :MOVE Motor Radio Control Transmitter (controller code)

## Introduction
### Introduction @unplugged
Learn how to use the :MOVE Motor with radio control's to drive your buggy around (this will require two BBC micro:bit's).  The code on the left editor will be for the controller (aka transmitter). The code on the right editor will be for the buggy (aka receiver).  This tutorial will take a step-by-step guide of both sides of the code.

![:MOVE Motor angled view with lights](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-lights.jpg)

## Basic Drive Forward
### Step 1
To start with, to help know which micro:bit is which, we will display a letter on the screen so we can identify which micro:bit is the transmitter and which the receiver.  Add ``||basic.show String||`` and add the letter T into the ``||basic.onStart||``.  This will indicate this is the transmitter micro:bit.

#### ~ tutorialhint
```blocks
basic.showString("T")
```

### Step 2
micro:bit radio's talk in groups. We need to set the radio group the two micro:bit's are in, so that they wil communicate with each other. THe group can be any number 1-255, in this example we will use 1. If there are several micro:bit radio pairs then each pair should use a different number.     
From the radio section, place the ``||radio:set Group||`` into the ``||basic.onStart||`` block and set the group to 1.

#### ~ tutorialhint
```blocks
basic.showString("T")
radio.setGroup(1)
```

### Step 3
We want to send a radio message to the :MOVE Motor to do something, such as drive forward on a button press. When sending any radio messages we will send a name and a value. The name acts as a 'key', so the reciever knows which value it has received.
Add ``||input:onButtonA||``. To send the message, from the radio section add ``||radio:send Value||`` this will let us send a name and value to the :MOVE Motor.  
The name will be a direction and the value will be our speed. Set the name to "Forward" and the value to 100.
#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    radio.sendValue("Forward", 100)
})
```

### Step 4
Now we have a basic controller to send a message to the :MOVE Motor to drive forward.  Connect your BBC micro:bit and click ``|Download|``.  Once programmed, power the BBC micro:bit and check a letter 'T' appears on the screen.

### Transmitter Code Done @unplugged
Now we have a basic transmitter.  Click the OK button on the right editor and start work on the receiver code.  Once that tutorial is complete, come back and click OK to get to the next stage.
![Right Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/right-arrow.jpg)

### Adjustable speed control @unplugged
Now we have the :MOVE Motor driving forward, we can use the sensors on the transmitter BBC micro:bit to control the speed of the :MOVE Motor.

### Step 5
Let's create a variable called "pitch", place a ``||variables:set pitch||`` into the forever loop.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = 0
})
```

### Step 6
Now we need to set the "pitch" variable to get the its value from the micro:bit's accelerometer. 
From the Input blocks in the "...more" section insert the ``||input:rotation||`` into the ``||variables:set pitch||`` block.
Make sure the selection of the block is set to "pitch".  The variable reads the accelerometer, and changes as you move the micro:bit
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
})
```

### Step 7
Pitch gives a number from -90 to 90. This represents angle of pitch of the micro:bit.  To drive forward we will take the positive values.  Below the variable set, add in an ``||logic:if||`` to check if variable pitch is greater than 0.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch > 0) {
    	
    }
})
```

### Step 8
As previously mentioned the pitch gives us a number upto 90, however, the motor speed goes upto 100.  This is a great time to use a block called map.  This allows us to map the range of a number to a new scale.
Create a new variable called "Speed". Place a ``||variables:set Speed||`` at the start of our ``||logic:if||`` bracket. From the Math section add the ``||math:map||`` into the ``||variables:set Speed||`` block.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch > 0) {
        SPeed = Math.map(0, 0, 1023, 0, 4)
    }
})
```

### Step 9
Now we need to input the range of numbers that we want to change.  The first input needs to be the value we want to change, this will be "pitch".  The next two number are the low and high numbers of the variable, this is 0 and 90.
The last two entries will be the new scale we want our value to be changed to, this will match the motor speed range from 0 to 100.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch > 0) {
        Speed = Math.map(drive, 0, 90, 0, 100)
    }
})
```

### Step 10
Move the ``||radio:send Value||`` from ``||input:onButtonA||`` to after the setting of "Speed". Insert the variable "Speed" into the `||radio:send Value||`` where the speed (currently 100) is sent.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch > 0) {
        Speed = Math.map(drive, 0, 90, 0, 100)
        radio.sendValue("Forward", Speed)
    }
})
```

### Step 11
Connect your transmitter BBC micro:bit and click ``|Download|``. Let's try the code and see how it controls the speed on the :MOVE Motor.

### Step 12
Did the :MOVE Motor only drive when the micro:bit was tilted backwards? Let's change this so that when the micro:bit is tilted forwards, the :MOVE Motor drives forwards.  This is where we need to check if the variable "pitch" is a negative number.
Change the ``||logic:if||`` condition from greater than ``||logic:>||`` to less than ``||logic:<||``.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch < 0) {
        Speed = Math.map(drive, 0, 90, 0, 100)
        radio.sendValue("Forward", mappedDrive)
    }
})
```

### Step 13
The speed values that we have been sending were positive numbers each time. Now we need to change the  negative number to a range useful for the motors.  This can be done by changing the map block numbers. Change the number 90 to -90
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch < 0) {
        Speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", Speed)
    }
})
```

### Step 14
Click and ``|Download|`` the code to the controller micro:bit and see if controls have reversed. When your code is working, let's move to the next section.

### Changing Directions @unplugged
The controller can change the speed moving forward.  Time to look at making the :MOVE Motor to respond to driving in reverse.

### Step 15
Currently we are looking if the value of "pitch" is less than '0'. Now we need to look for it being greater than '0'.  So, click the ``||logic:+||`` icon twice to add an ``||logic:if else||`` click on the ``||logic:-||`` next to the ``||logic:if else||``.
In the ``||logic:else if||`` condition, check for pitch greater than '0'.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch < 0) {
        Speed = Math.map(drive, 0, -90, 0, 100)
        radio.sendValue("Forward", Speed)
    } else if (pitch > 0) {
    	
    } 
})
```

### Step 16
Duplicate the ``||variables:set Speed||`` block and place into the bracket below. Duplicate the ``||radio:send Value||`` and place below the newely copied ``||variables:set mappedDrive||`` block
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch < 0) {
        Speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", mappedDrive)
    } else if (pitcj > 0) {
    	Speed = Math.map(pitch, 0, -90, 0, 100)
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
    pitch = input.rotation(Rotation.Pitch)
    if (pitch < 0) {
        Speed = Math.map(drive, 0, -90, 0, 100)
        radio.sendValue("Forward", Speed)
    } else if (pitch > 0) {
    	Speed = Math.map(drive, 0, 90, 0, 100)
        radio.sendValue("Reverse", Speed)
    } 
})
```

### Step 18
Click and ``|Download|`` the code to the controller micro:bit.

### Transmitter Code Pause @unplugged
We now have Transmitter code which can command forward and reverse. Next we need to adjust the reciever micro:bit code to accept the new commands sent over the radio.  Click the OK button on the right editor and start work on the receiver code.  Once that tutorial is complete, come back and click OK to get to the next stage.
![Right Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/right-arrow.jpg)


### Step 19
So the :MOVE Motor moves when the micro:bit is moved.  This can be frustrating when you accidently move the micro:bit and did not mean to. This can be adjusted by adding in whats called a "dead man's switch". This type of switch is designed to be active or deactived if the operator has loss of consciousness.
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
When button A is not pressed, we want the :MOVE Motor to stop. Add another ``||radio:send Value||`` into the ``||logic:else||`` bracket with the text "Stop" and number '0'. 
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

### Transmitter Code Done @unplugged
Let's have a summary of what we have learnt so far. 
+ How to send and receive a radio message
+ Sending required messages to control motors
+ Reading sensory inputs for controls
+ Implementing a dead man's switch

- All this is just for going driving the :MOVE Motor forwards and backwards.  Now its time to see how we can steer our buggy with only two wheels.

### Steering the buggy @unplugged
Well done on the code so far. Steerling on the :MOVE Motor requires the motors to be driven at differnet speeds.  This will need to be blended with the forward and reverse inputs. This will give a full range of steerling and direction driving for the :MOVE Motor.
Next section will be working towards adding another sensor input for the steering of the :MOVE Motor.

### Step 24
Previously we saw the pitch input from the sensors on the BBC micro:bit.  There is another input called "roll" which works the same way but on the Y-axis instead of the X-axis.
Create a variable call "turn", now insert a ``||variables:set turn||`` underneath the ``||variables:set drive||`` block.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    turn = 0
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

### Step 25
From the Input blocks in the more section insert the ``||input:rotation||`` into the ``||variables:set turn||`` block.
Make sure the selection of the block is set to "roll" from the selection box.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    turn = input.rotation(Rotation.Roll)
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
### Blending sensor inputs
We now have multiple directions of inputs from the controller. This will require to blend both inputs together to give one value to be sent for each motor.  From this how we send messages will change slightly.

### Step 26
To make sure both inputs are working on the same scale, let make sure the mapping of both are done before any maths is taken place.
Duplicate one of the ``||variables:set mappedDrive||`` block and place after the button A if statement.  Change the mapped range 90 to -90, and -100 to 100

#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    turn = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        mappedDrive = Math.map(drive, 90, -90, -100, 100)
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

### Step 27
Next we need to remove some code.  The ``||logic:if||`` statement checking for the value of "drive" can be removed.  Click and drag the blocks over to the left side of the screen.  Use the hint screen if you are unsure what your code should look like after.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    turn = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        mappedDrive = Math.map(drive, 90, -90, -100, 100)
    } 
    else {
       radio.sendValue("Stop", 0)
    }  	
})
```

### Step 28
Create a new variable called "mappedTurn".  Create the same blocks as the "mappedDrive", but have the variables "mappedTurn" and "turn" in the correct place. The mapped range has to be -90 to 90 and -100 to 100.  This does not get switched  around (like the pitch mapping) as the values are in the correct sign required. 
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    turn = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        mappedDrive = Math.map(drive, 90, -90, -100, 100)
        mappedTurn = Math.map(turn, -90, 90, -100, 100)
    } 
    else {
       radio.sendValue("Stop", 0)
    }  	
})
```

### Step 29
Next we need some more variables.  These are for determining the turn value to help blend and the speed for the motors to be sent.  Create the following variables
"turnLeft", "turnRight", "leftMotorSpeed", "rightMotorSpeed".

### Step 30
Now ``||variables:set turnLeft||`` variable to "mappedTurn".  With setting "turnRight", this needs to be the opposite to "turnLeft". 
Create a new variable called "mappedTurn".  Create the same blocks as the "mappedDrive", but have the variables "mappedTurn" and "turn" in the correct place. The mapped range has to be -90 to 90 and -100 to 100.  This does not get switched  around (like the pitch mapping) as the values are in the correct sign required. 
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    turn = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        mappedDrive = Math.map(drive, 90, -90, -100, 100)
        mappedTurn = Math.map(turn, -90, 90, -100, 100)
        turnLeft = mappedTurn
        turnRight = 0 - mappedTurn
    } 
    else {
       radio.sendValue("Stop", 0)
    }  	
})
```

### Step 31
We have our drive value in "mappedDrive" and out left and right turn value with "turnLeft" and "turnRight".  To combine them together they we be summed togther for each motor.
Variable "leftMotorSpeed" will equal "mappedDrive" plus "turnLeft".  Using ``||variables:set leftMotorSpeed||`` insert the ``||math:add||``, then insert both variables "mappedDrive" and "turnLeft"
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    turn = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        mappedDrive = Math.map(drive, 90, -90, -100, 100)
        mappedTurn = Math.map(turn, -90, 90, -100, 100)
        turnLeft = mappedTurn
        turnRight = 0 - mappedTurn
        leftMotorSpeed = mappedDrive + turnLeft
    } 
    else {
       radio.sendValue("Stop", 0)
    }  	
})
```

### Step 32
Let's repeat the same process for the right motor speed.
Variable "rightMotorSpeed" will equal "mappedDrive" plus "turnRight".  Using ``||variables:set rightMotorSpeed||`` insert the ``||math:add||``, then insert both variables "mappedDrive" and "turnRight"
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    turn = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        mappedDrive = Math.map(drive, 90, -90, -100, 100)
        mappedTurn = Math.map(turn, -90, 90, -100, 100)
        turnLeft = mappedTurn
        turnRight = 0 - mappedTurn
        leftMotorSpeed = mappedDrive + turnLeft
        rightMotorSpeed = mappedDrive + turnRight
    } 
    else {
       radio.sendValue("Stop", 0)
    }  	
})
```

### Step 33
The two motor speed value now can be sent over the radio link.  From the radio section insert two ``||radio:send Value||`` after ``||variables:set rightMotorSpeed||``. The name we will send this time will not be forwards and reverse like previously.  Now we need to control each motor seperately. 
Let's use the names "motorL" and "motorR". Add these names into the radio blocks that have been inserted.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    turn = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        mappedDrive = Math.map(drive, 90, -90, -100, 100)
        mappedTurn = Math.map(turn, -90, 90, -100, 100)
        turnLeft = mappedTurn
        turnRight = 0 - mappedTurn
        leftMotorSpeed = mappedDrive + turnLeft
        rightMotorSpeed = mappedDrive + turnRight
        radio.sendValue("motorL", 0)
        radio.sendValue("motorR", 0)
    } else {
        radio.sendValue("Stop", 0)
    }
})
```

### Step 34
The value we are going to be sending are the "leftMotorSpeed" and the "rightMotorSpeed".  See if you can insert these variables into the correct radio blocks.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    drive = input.rotation(Rotation.Pitch)
    turn = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        mappedDrive = Math.map(drive, 90, -90, -100, 100)
        mappedTurn = Math.map(turn, -90, 90, -100, 100)
        turnLeft = mappedTurn
        turnRight = 0 - mappedTurn
        leftMotorSpeed = mappedDrive + turnLeft
        rightMotorSpeed = mappedDrive + turnRight
        radio.sendValue("motorL", leftMotorSpeed)
        radio.sendValue("motorR", rightMotorSpeed)
    } else {
        radio.sendValue("Stop", 0)
    }
})
```

### Step 35
Click and ``|Download|`` the code to the controller micro:bit. 

### Transmitter Code Done @unplugged
With having made some changes to the how the radio messages are sent, we now need to adjust the receiver code on the :MOVE Motor.  Let's now start making the adjustments. 
![Right Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/right-arrow.jpg)
