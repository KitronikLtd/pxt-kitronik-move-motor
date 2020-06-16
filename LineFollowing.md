### @explicitHints true

# :MOVE Motor Line Following

### Introduction Step @unplugged
Learn how to use the :MOVE Motor's Line Following Sensors to navigate around a marked out track.
We will use a dark line on a light surface. Black insulation tape works well for a line on a smooth light coloured floor.

![:MOVE Motor front view](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-front.jpg)

### Step 1
The :MOVE Motor has 2 sensors underneath to allow it to follow a line of contrasting colour to the background. 
We will start by reading the sensor values. 
Create 2 variables, called ``||variables:leftSensor||`` and ``||variables:rightSensor||``
place a ``||variables:set leftSensor||`` and a  ``||variables:set rightSensor||`` into the forever loop.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0

```

### Step 2
Now we need to read the sensors conditions. From the ``||Kitronik_Move_Motor.Sensors||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||`` category, drag in a ``||Kitronik_Move_Motor.Left line following sensor value||`` block and put it into the ``||variables:set leftSensor||``  statement. Do the same for the ``||variables:set rightSensor||``  but change the drop down to read the Right sensor value

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
}
```

### Line sensing @unplugged

Because the sensors are analog their value changes depending on what the surface below them is. We know we are trying to follow a contrasting line, so if the 2 sensors are reading different values one must be on the line and one off. If they read the same then either they are both on the line - if the line is wide, or they are both seeing the background - if the line is thin. Because we can compare the sensors against each other it doesn't matter what the sensing value is, only if there is a difference or not. 

### Step 3
Create a variable called sensorDifference for the difference in the sensor values.
Set sensorDifference to be the leftSensor - the rightSensor. Because we only care if the values are different we can use the ``||math:Absolute||`` block so we don't have to worry about a negative number. 

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = Math.abs(leftSensor - rightSensor)
}

```

### Step 4
If the sensors are different then we must be heading off the line, but if they are the same we are still following it. Add a ``||logic:if else||`` block below the ``||vaiables:set sensorDifference||`` block. The ``||logic:else||`` section will be if we are still on the line. Add a ``||basic:show LEDS||`` block into the ``||logic:else||`` and draw a straight up arrow to indicate we are going forward.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = Math.abs(leftSensor - rightSensor)
    if (true) {

    } else {
basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    }
})
```

### Step 5
If we are leaving the line we will need to decide which way, and take corrective action. Into the ``||logic:if||`` condition add a ``||logic:>||`` check to see if ``||variables:sensorDifference||`` is greater than 10. Into this ``||logic:if||`` add a ``||logic:if else||``. We will use this to decide which way we need to turn to stay on the line.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    sensorDifference = Math.abs(leftSensor - rightSensor)
    if ((sensorDifference > 10) ) {
        if (true) {

        } else {
        
        }
    } else {
basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    }
})
```
### Sensor Values @unplugged
The sensors on the :MOVE motor give a low value if the surface they are sensing is dark (none reflective) and a high value if the surface is light (reflective).
As we are looking for a dark line on a light background we know that if the left sensor is no longer over the line, but the right sensor is still over the line then the left sensor value will be larger than the right one. We can use this knowledge to work out what corrective action to take.

### Step 6
Into the inner ``||logic:if||`` condition add a``||logic:>||`` check to see if ``||variables:leftSensor||`` is greater than ``||variables:rightSensor||``. This means the left sensor is off the line and the right sensor is on the line. To get back on the line we need to turn to the right. Add a ``||basic:show LEDS||`` block into is and draw an arrow to indicate which way to turn. The ``||logic:else||`` needs to turn the other direction, so add into there the opposite arrow.


#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    sensorDifference = Math.abs(leftSensor - rightSensor)
    if ((sensorDifference > 10) ) {
        if ((leftSensor > rightSensor) ) {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        } else {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        }
    } else {
basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    }
})
```

### Step 7
CODING COMPLETE! If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor.  
### Check the Logic @unplugged
Now, create a continuous track for :MOVE Motor to drive around and set it on the line. The line should be about 10-20mm wide ( black insulation tape is great for this).  
We haven't yet put any motor driving commands into the code, but by moving the :MOVE Motor by hand across the line you should see the LED arrows showing which way the logic is going to turn.

Next we will replace the arrows with the correct motor driving commands, so the :MOVE motor can drive itself.

### Step 8
The simplest arrow to replace is the straight on one. change this to a ``||Kitronik_Move_Motor.Motors:Move Forwards||`` block, with the speed set to 30. 

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    sensorDifference = Math.abs(leftSensor - rightSensor)
    if ((sensorDifference > 10) ) {
        if ((leftSensor > rightSensor) ) {
basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        } else {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        }
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    }
})
```

###Step 9 
Now we need to deal with turning back onto the line. In the ``||logic:if(leftSensor>rightSensor)||`` we want to turn to the right. To do this we will stop the right motor and run the left motor. Replace the ``||basic:show LEDS||`` with a ``||Kitronik_Move_Motor.turn off Right motor||`` using the block from the ``||Kitronik_Move_Motor.Motors||`` section. Add a ``||Kitronik_Move_Motor.turn Left motor on direction Forward speed 0||``, and set the speed to 30. Do a similar change to the ``||logic:else||`` section, but turning off the left motor and running the Right motor at speed 30.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    sensorDifference = Math.abs(leftSensor - rightSensor)
    if ((sensorDifference > 10) ) {
        if ((leftSensor > rightSensor) ) {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        } else {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        }
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    }
})
```


### Step 10
CODING COMPLETE! If you have a @boardname@ connected, click ``|Download|`` to transfer your code.
Place your :MOVE MOtor on the line, and switch it on. It should follow the line. 
If it doesnt then you might have the speed too high, or the batteries might be going flat. 

## Iterating the Code

### Making the code more elegant @unplugged
The code so far is pretty small, but it can be made more elegant, and potentially run a little bit faster.
By taking the absolute value of the sensor difference we make the code simpler to follow, but also throw away a small piece of information.
If the value is positive we know that the right sensor is on the line, and the left is not.
In the previous code we do this check seperatly, but we can save a small amount of computaion by combining it. 
Software can often be improved by iteration, which is what we are about to do in the next section.

### Step 11
We are going to use the sign value to decide which motors to turn on and off. Start by removing the ``||math:Absolute||`` block, so we just take ``||variable:rightSensor||`` from ``||leftSensor||``
#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    sensorDifference = leftSensor - rightSensor
    if ((sensorDifference > 10) ) {
        if ((leftSensor > rightSensor) ) {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        } else {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        }
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    }
})
```
###Step 12
Now ``||variable:sensorDifference||`` is a signed value, so we need to check if it is postive or negative. Our ``||logic:if||`` statement already checks it if it > 10. press the ``||logic:+||`` on the outer ``||logic:if||`` to add a  ``||logic:else if||`` section. Duplicate the ``||logic:if(sensorDifference>10)||`` condition and place it in the ``||logic:else if||``, changing the ``||logic:>||`` to a ``||logic:>||``, and the 10 to a -10.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    sensorDifference = leftSensor - rightSensor
    if ((sensorDifference > 10) ) {
        if ((leftSensor > rightSensor) ) {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        } else {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        }
    } else if ((sensorDifference <-10) ) {
    
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    }
})
```





