### @activities true
### @explicitHints true

# :MOVE Motor Radio Control Transmitter (controller code)

## Introduction
### Introduction @unplugged
Learn how to use the :MOVE Motor with radio control's to drive your buggy around (this will require two BBC micro:bit's).  The code on the left editor will be for the controller (aka transmitter). The code on the right editor will be for the buggy (aka receiver).  This tutorial will take a step-by-step guide of both sides of the code.

![:MOVE Motor angled view with lights](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-lights.jpg)

## Basic Drive Forward
### Step 1
To start with, to help know which micro:bit is which, we will display a letter on the screen so we can identify which micro:bit is the transmitter and which the receiver.  Add ``||basic.show String||`` and add the letter "T" into the ``||basic.onStart||``.  This will indicate this is the transmitter micro:bit.

#### ~ tutorialhint
```blocks
basic.showString("T")
```

### Step 2
micro:bit radio's talk in groups. We need to set the radio group the two micro:bit's are in, so that they wil communicate with each other. The group can be any number 1-255, in this example we will use 1. If there are several micro:bit radio pairs then each pair should use a different number.     
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
Now we have a basic controller to send a message to the :MOVE Motor to drive forward.  Connect your BBC micro:bit and click ``|Download|``.  Once programmed, power the BBC micro:bit and check a letter "T" appears on the screen.


### Transmitter Code Done @unplugged
Now we have a basic transmitter.  Click the OK button on the right editor and start work on the receiver code.  Once that tutorial is complete, come back and click OK to get to the next stage.
![Right Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/right-arrow.jpg)

## Controllable speed 

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
Create a new variable called "speed". Place a ``||variables:set speed||`` at the start of our ``||logic:if||`` bracket. From the Math section add the ``||math:map||`` into the ``||variables:set speed||`` block.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch > 0) {
        speed = Math.map(0, 0, 1023, 0, 4)
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
        speed = Math.map(pitch, 0, 90, 0, 100)
    }
})
```

### Step 10
Move the ``||radio:send Value||`` from ``||input:onButtonA||`` to after the setting of "speed". Insert the variable "speed" into the `||radio:send Value||`` where the speed (currently 100) is sent.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch > 0) {
        speed = Math.map(pitch, 0, 90, 0, 100)
        radio.sendValue("Forward", speed)
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
        speed = Math.map(pitch, 0, 90, 0, 100)
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
        speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", speed)
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
        speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", speed)
    } else if (pitch > 0) {
    	
    } 
})
```

### Step 16
Duplicate the ``||variables:set speed||`` block and place into the bracket below. Duplicate the ``||radio:send Value||`` and place below the newely copied ``||variables:set mappedDrive||`` block
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch < 0) {
        speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", mappedDrive)
    } else if (pitcj > 0) {
    	speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", mappedDrive)
    }
})
```

### Step 17
The values in these duplicate blocks are slightly wrong. Let's adjust these so they work when try to drive in reverse.  Firstly change the text in the ``||radio:send Value||`` from "Forward" to "Reverse".
Previously we had the :MOVE Motor driving, when tilting the micro:bit backwards.  This was with the pitch being a positive number. Change the newly copied map block from -90 to 90.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch < 0) {
        speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", speed)
    } else if (pitch > 0) {
    	speed = Math.map(pitch, 0, 90, 0, 100)
        radio.sendValue("Reverse", speed)
    } 
})
```

### Step 18
Click and ``|Download|`` the code to the controller micro:bit.

### Transmitter Code Pause @unplugged
We now have Transmitter code which can command forward and reverse. Next we need to adjust the reciever micro:bit code to accept the new commands sent over the radio.  Click the OK button on the right editor and start work on the receiver code.  Once that tutorial is complete, come back and click OK to get to the next stage.
![Right Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/right-arrow.jpg)

### Transmitter Code Pause @unplugged
The :MOVE Motor moves when the micro:bit is moved.  This can be frustrating when you accidentally move the micro:bit and did not mean to. We can prevent this by adding what is called a "dead man's switch". 
This type of switch is designed to require the user to press it, or the what ever is being controlled stops. They are often found on trains.

### Step 19
For the :MOVE motor we can wrap the "if pitch < 0" if statement inside another "if else" statement so that it is only active if the dead mans switch is activated.
Add an ``||logic:if else||`` to below the ``||variables:set pitch||``, and move the previous ``||logic:if else||`` into the top ``||logic:if||`` bracket.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (true) {
      if (pitch < 0) {
        speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", speed)
      } else if (pitch > 0) {
        speed = Math.map(pitch, 0, 90, 0, 100)
        radio.sendValue("Reverse", speed)
    } 
})
```

### Step 20
Add ``||input:button A pressed||`` to the top of the newly inserted if statement.  Button A will become our Dead mans switch, and we will only send movement messages when button A is pressed.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (input.buttonIsPressed(Button.A)) {
      if (pitch < 0) {
        speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", speed)
      } else if (pitch > 0) {
        speed = Math.map(pitch, 0, 90, 0, 100)
        radio.sendValue("Reverse", speed)
    } 
})
```

### Step 21
When button A is not pressed, we want the :MOVE Motor to stop. Add another ``||radio:send Value||`` into the ``||logic:else||`` bracket To send the message "Stop" with a number '0'. 
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (input.buttonIsPressed(Button.A)) {
      if (pitch < 0) {
        mappedDrive = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", speed)
      } else if (pitch > 0) {
        mappedDrive = Math.map(pitch, 0, 90, 0, 100)
        radio.sendValue("Reverse", speed)
      }
    } 
    else {
       radio.sendValue("Stop", 0)
    }  	
})
```

### Step 22
Click and ``|Download|`` the code to the controller micro:bit.  Lets test the code see if can only control the :MOVE Motor while button A is pressed. This will work because previously we added a default handler for messages we dont know, and this has the same safe characteristic of stoping the :MOVE motor.

### Transmitter Code Done @unplugged
Let's have a summary of what we have learnt so far. 
+ How to send and receive a radio message
+ That a received message can be 'handled', and we can have a default handler for messages we dont know about.
+ Reading sensory inputs for controls
+ Sending required messages to control motors
+ Implementing a dead man's switch

All this is just for going driving the :MOVE Motor forwards and backwards.  Now its time to see how we can steer our buggy with only two wheels.

## Adding steering 

### Steering the buggy @unplugged
Well done on the code so far. Steering on the :MOVE Motor requires the motors to be driven at different speeds.  
To allow smooth steering the left right inputs will need to be combined with the forward and reverse inputs. This is known as blending.
Done correctly blending will give a full range of steering and direction driving for the :MOVE Motor.

Next section will add another sensor input to control the steering of the :MOVE Motor.

### Step 23

First remove all the code in the ``||logic:if||`` ``||input:button A pressed||`` block. 
We still want the Dead mans switch, but we will be changing the code that sends the messages quite a lot. 
Use the hint screen if you are unsure what your code should look like afterwards.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch =  input.rotation(Rotation.Pitch)
    if (input.buttonIsPressed(Button.A)) {
   
    } 
    else {
       radio.sendValue("Stop", 0)
    }  	
})
```

### Step 24
Previously we used the pitch input from the sensors on the BBC micro:bit. 
There is another input called "roll" which works the same way but on the Y-axis instead of the X-axis.
Create a variable call "roll", now insert a ``||variables:set roll||`` underneath the ``||variables:set pitch||`` block.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    roll = 0
    if (input.buttonIsPressed(Button.A)) {
      
    } 
    else {
       radio.sendValue("Stop", 0)
    }  	
})
```

### Step 25
From the Input blocks in the ...more section insert the ``||input:rotation||`` into the ``||variables:set roll||`` block.
Make sure the selection of the block is set to "roll" from the selection box.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
      
    } 
    else {
       radio.sendValue("Stop", 0)
    }  	
})
```

### Blending sensor inputs @unplugged
We now have 2 inputs from the controller. We wil blend these together to give the different speeds for the motors. We will then need to send 2 messages, one for each motor speed, rather than a simple "Forwards" or "Reverse" command. 

### Step 26
Previously we inverted the pitch value in the mapping to the motor range. Here we will invert it before we blend the inputs.
Add a ``||Math:0-0||`` block from the ``||Math:Math||`` section and take the pitch value from 0.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = 0 - input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
    } else {
        radio.sendValue("Stop", 0)
    }
})
```

### Step 27
To blend the pitch and roll values we think about how the motor speeds should vary with the input values.
To turn left we want to roll the micro:bit to the left. This gives a negative roll value.
When turning left the left motor is on the inside, and so turns slower. 
If we add the roll value to the motor value (from the pitch) this is what happens.
The Right motor needs to turn faster, so we take the roll value from the motor value (take away a negative number is equivalent to adding it)
Make 2 variables, one each for the Left and Right values, and blend the pitch and roll into them using the ``||math:+||`` and ``||math:-||`` blocks

#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = 0 - input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        left = pitch + roll
        right = pitch - roll

    } else {
        radio.sendValue("Stop", 0)
    }
})
```

### Step 28 
Now we have blended the inputs we can map them to the motor range. 
We have input ranges from -90 to +90 and the motors take a speed from -100 to +100
Create 2 variables for the motor speeds and use the ``||math:map||`` block 


#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = 0 - input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        left = pitch + roll
        right = pitch - roll
        leftMotorSpeed = Math.map(Left, -90, 90, -100, 100)
        rightMotorSpeed = Math.map(Right, -90, 90, -100, 100)

    } else {
        radio.sendValue("Stop", 0)
    }
})
```

### Step 29

The two motor speed value now can be sent over the radio link.  From the radio section insert two ``||radio:send Value||`` after ``||variables:set rightMotorSpeed||``.  
We could use leftMotor and rightMotor to identify the messages, but the radio link only allows 8 letters for the name, so let's use the names "lMotor" and "rMotor". Add these names into the radio blocks that have been inserted.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = 0 - input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        Left = pitch + roll
        Right = pitch - roll
        leftMotorSpeed = Math.map(Left, -90, 90, -100, 100)
        rightMotorSpeed = Math.map(Right, -90, 90, -100, 100)
        radio.sendValue("lMotor", 0)
        radio.sendValue("rMotor",0)
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
    pitch = 0 - input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        Left = pitch + roll
        Right = pitch - roll
        leftMotorSpeed = Math.map(Left, -90, 90, -100, 100)
        rightMotorSpeed = Math.map(Right, -90, 90, -100, 100)
        radio.sendValue("lMotor", leftMotorSpeed)
        radio.sendValue("rMotor", rightMotorSpeed)
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
