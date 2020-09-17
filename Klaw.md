### @activities true
### @explicitHints true

# :MOVE Motor Klaw basic tutorial

## Introduction
### Introduction @unplugged
Learn how to use the Kitronik :MOVE Motor Klaw and code with a BBC micro:bit. 

![Klaw image](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/klaw.png)

## Assembly
### Step 1 @unplugged
If not already done, attach the Klaw to your :MOVE Motor and insert the BBC micro:bit.  Click [Here](https://kitronik.co.uk/5698) is a link to the assembly instructions to guide you.
The tutorial will have the servo connected to servo 1 pin header, make sure yours is connected as well.  Later will show how to change between the servo connection. 


### Step 2
All the blocks required for the Klaw are within the MOVE Motor extension, under pins section. This could will be a basic introduction, add ``||input:onButtonA||`` and add ``||input:onButtonB||``

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
	
})

input.onButtonPressed(Button.B, function () {
	
})
```

### Step 3
From the :MOVE motor blocks, add into the ``||input:onButtonA||`` bracket a ``||Kitronik_MOVE_Motor.write servo||`` block, select servo "1" and set it to "90". This will move the servo to 90 degrees and open the klaw.
The klaw can move upto 180 degrees, this is also limited by the block.  This block you can select between the two servo connections on the :MOVE Motor.
#### ~ tutorialhint
input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 90)
})
input.onButtonPressed(Button.B, function () {

})
```

### Step 4
Add the same ``||Kitronik_MOVE_Motor.write servo||`` into the ``||input:onButtonB||`` bracket and set it to "0". This will move the servo to 0 degrees and Close the klaw.
#### ~ tutorialhint
input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 90)
})
input.onButtonPressed(Button.B, function () {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 0)
})
```

### Step 5
Connect your BBC micro:bit and click ``|Download|``.  Once programmed, power the BBC micro:bit and press button A and B to see if the klaw opens and closes.


### Klaw is working @unplugged
The Klaw is working, for fun lets, lets make the klaw open and close depending how close the :MOVE Motor is to an object.  We have got the ultrasonic on the :MOVE Motor that can be used.


### Step 5
To continously read the distance on the ultrasonic sensor, our code will be using the ``||basic:forever||`` bracket.  The previously used code in the ``||input:onButtonA||`` and ``||input:onButtonB||`` can be removed.
#### ~ tutorialhint
```blocks
basic.forever(function () {

})
```

### Step 6
Now to create a variable name called "distance". Insert an ``||variable:set distance||`` into the ``||basic:forever||`` bracket and add ``||Kitronik_MOVE_Motor.measure distance||`` into this variable block.
This will set our variable "distance" to the measured distance from the :MOVE Motor block.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
})
```

### Step 6
After, insert an ``||logic:if else||``. Our condition will be if ``||variable:distance||`` ``||logic:less than or equal to||`` "10".  This will check if our measured distance is 10cm or less, if so it will run the code.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance <= 10) {

    } else {

    }
})
```

### Step 7
So if the measured distance is 10cm or less, we want to open the klaw proportionally to the distance.  For example if we have measured 5cm which is half of 10cm, the klaw should be half opened.  
Create another variable ``||variable:angle||`` and insert ``||variable:set angle||`` into the first "if" bracket
#### ~ tutorialhint
```blocks
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance <= 10) {
        angle = 0
    } else {

    }
})
```

### Step 8
To create change of distance to angle of the klaws, there is a block called ``||pins:map||``.  What map gives the ability to do is to change the scale of a variable.  
For example if a variable gave a number between 0 and 10, it could be changed to 0 and 200.  Insert ``||pins:map||`` into ``||variable:set angle||``
#### ~ tutorialhint
```blocks
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance <= 10) {
        angle = pins.map(
        0,
        0,
        1023,
        0,
        4
        )
    } else {

    }
})
```

### Step 9
Within ``||pins:map||`` we need to change the inputs to match what we require.  Firstly we want to map "distance". Insert ``||variable:distance||`` into the top entry.

The next two entries is the range we want to change.  Our distance was between low of 0cm and high of 10cm.

Next two entries are what the new range we want is.  The klaw fully open is at 180 and closed is 0.  We want the klaw to open when an object is close.  See if you can entery 0 and 180 into the correct sections.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance <= 10) {
        angle = pins.map(
        distance,
        0,
        10,
        180,
        0
        )
    } else {

    }
})
```

### Step 10
Now our angle is mapped to the correct distance.  Let's add ``||Kitronik_MOVE_Motor.servo write||`` and write with the ``||variable:angle||``.  This will set the servo to our newly create value.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance <= 10) {
        angle = pins.map(
        distance,
        0,
        10,
        180,
        0
        )
        Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, angle)
    } else {

    }
})
```

### Step 11
If the distanced measure is greater than 10cm, the klaw should be closed. Insert ``||Kitronik_MOVE_Motor.servo write||`` into the else bracket and set to "0" to close the klaw.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance <= 10) {
        angle = pins.map(
        distance,
        0,
        10,
        180,
        0
        )
        Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, angle)
    } else {
        Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 0)
    }
})
```

### Step 12
Connect your BBC micro:bit and click ``|Download|``.  Once programmed, power the BBC micro:bit place your hand in front of the ultrasonic sensor and move closer and away to see how the Klaw reacts.

### :MOVE Motor Klaw Tutorial Complete @unplugged
We have successful complete the basic tutorial for the :MOVE Motor klaw.  We have learnt which blocks to use to control servos on the :MOVE Motor, also about mapping inputs to another range. 

If you wish to know more on the Kitronik :MOVE Motor Klaw visit  http://www.kitronik.co.uk/5698 

or about the :MOVE Motor visit http://www.kitronik.co.uk/5683