### @activities true
### @explicitHints true

# :MOVE Motor Line Following

## Introduction 
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
basic.forever(function () {
    rightSensor = 0
    leftSensor = 0
}
```

### Step 2
Now we need to read the sensors values. From the ``||Kitronik_Move_Motor.Sensors||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||`` category, drag in a ``||Kitronik_Move_Motor.Left line following sensor value||`` block and put it into the ``||variables:set leftSensor||``  statement. Do the same for the ``||variables:set rightSensor||``  but change the drop down to read the Right sensor value

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

Because the sensors are analog their value changes depending on what the surface below them is. We know we are trying to follow a contrasting line, so if the 2 sensors are reading different values one must be on the line and one off. If they read the same then either they are both sensing on the line - if the line is wide, or they are both sensing the background - if the line is thin. Because we can compare the sensors against each other it doesn't matter what the sensing value is, only if there is a difference or not. 

### Step 3
Create a variable called ``||variables:sensorDifference||`` to hold the difference in the sensor values.
Set ``||variables:sensorDifference||`` to be the ``||math:leftSensor - the rightSensor||``. Because we only care if the values are different we can use the ``||math:Absolute||`` block so we don't have to worry about a negative number. 

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
If the sensors are different then we must be heading off the line, but if they are the same we are still following it. Add a ``||logic:if else||`` block below the ``||variables:set sensorDifference||`` block. We will use the ``||logic:else||`` section for when we are still on the line. Add a ``||basic:show LEDS||`` block into the ``||logic:else||`` and draw a straight up arrow to indicate we are going forward.

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
If we are leaving the line we will need to decide which way, and take corrective action. Into the ``||logic:if||`` condition add a ``||logic:>||`` check to see if ``||variables:sensorDifference||`` is greater than 10. We give the difference little range to allow for tolerence in the sensing. Into this ``||logic:if||`` add a ``||logic:if else||``. We will use this inner ``||logic:if else||`` to decide which way we need to turn to stay on the line.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
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
As we are looking for a dark line on a light background we know that if the left sensor is no longer over the line, but the right sensor is still over the line then the left sensor value will be larger than the right one. We can use this knowledge to work out we need to turn to the right to get back over the line.

### Step 6
Into the inner ``||logic:if||`` condition add a``||logic:>||`` check to see if ``||variables:leftSensor||`` is greater than ``||variables:rightSensor||``. This means the left sensor is off the line and the right sensor is on the line. To get back on the line we need to turn to the right. Add a ``||basic:show LEDS||`` block into is and draw an arrow to indicate which way to turn. The ``||logic:else||`` needs to turn the other direction, so add the opposite arrow into there .


#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
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
That is the line following algorithm complete. If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor.  

## Check the Logic @unplugged
Now we can check the logic is correct. Create a continuous track for :MOVE Motor to drive around and set it on the line. The line should be about 10-20mm wide (black insulation tape is great for this).  
We haven't yet put any motor driving commands into the code, but by moving the :MOVE Motor by hand side to side across the line you should see the LED arrows showing which way the logic is going to turn.

## Drive the motors

### Driving the motors @unplugged
Next we will replace the arrows with the correct motor driving commands, so the :MOVE motor can drive itself.

### Step 1
The simplest arrow to replace is the straight ahead on one. Change this to a ``||Kitronik_Move_Motor:Move Forwards||`` block from the ``||Kitronik_Move_Motor.Motors||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||``. Set the speed set to 30. Dont forget to delete the ``||basic:Show LEDs||`` block. Displaying the LEDs at the saem time as following the line can cause the code to run too slow to work correctly.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
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

###Step 2 
Now we need to deal with turning back onto the line. In the ``||logic:if(leftSensor>rightSensor)||`` we want to turn to the right. To do this we will stop the right motor and run the left motor. Replace the ``||basic:show LEDS||`` with a ``||Kitronik_Move_Motor.turn off Left motor||`` using the block from the ``||Kitronik_Move_Motor.Motors||`` section. Change the drop down so that the ``||Kitronik_Move_Motor:Right||`` motor is stopped. Add a ``||Kitronik_Move_Motor.turn Left motor on direction Forward speed 0||``, and set the speed to 30. Do a similar change to the ``||logic:else||`` section, but turning off the Left motor and running the Right motor at speed 30.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
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


### Step 3
CODING COMPLETE! If you have a @boardname@ connected, click ``|Download|`` to transfer your code.
Place your :MOVE MOtor on the line, and switch it on. It should follow the line. 
If it doesnt then you might not have a dark enough line, the speed maybe too high, or the batteries might be going flat. 

## Iterating the Code

### Making the code more elegant @unplugged
The code so far is pretty small, but it can be made more efficient, and potentially run a little bit faster.
By taking the ``||math:absolute||`` value of the sensor difference we make the code simpler to follow, but also threw away a small piece of information.
If the value is positive we know that the right sensor is on the line, and the left is not.
In the previous code we do this check separately, but we can save a small amount of computation by combining the "are we on the line" check with the "which way to turn" check. 

Software can often be improved by iteration, which is what we are about to do in the next section.

### Step 1
We are going to use the sign value of the sensor difference to decide which motors to turn on and off. Start by removing the ``||math:Absolute||`` block, so ``||variables:sensorDifference||`` becomes just ``||variables:leftSensor||````||math:-||````||variables:rightSensor||``

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
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

###Step 2
Now ``||variables:sensorDifference||`` is a signed value, so we need to check if it is positive or negative. Our ``||logic:if||`` statement already does this when it checks it if is > 10. Press the ``||logic:+||`` on the outer ``||logic:if||`` to add a  ``||logic:else if||`` section. Duplicate the ``||logic:if(sensorDifference>10)||`` condition and place it in the ``||logic:else if||``, changing the ``||logic:>||`` to a ``||logic:<||``, and the 10 to a -10. This will check for negative differences.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
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

###Step 3
The code in the inner ``||logic:if||`` statement can now be moved around. ``||logic:if(sensorDifference>10)||`` is equivalent to the ``||logic:if(leftSensor>rightSensor)||``, so move that motor control code out of the inner ``||logic:if||``. Check the hint if you are unsure what to do.  

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = leftSensor - rightSensor
    if ((sensorDifference > 10) ) {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        if ((leftSensor > rightSensor) ) {
 
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

###Step 4
The code in the inner ``||logic:else||`` statement is equivalent to the code we need in the ``||logic:else if(sensorDifference<-10)||``, so move it into the ``||logic:else if||`` block. Again check the hint if you are unsure what to move where.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = leftSensor - rightSensor
    if ((sensorDifference > 10) ) {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        if ((leftSensor > rightSensor) ) {
 
        } else {

        }
    } else if ((sensorDifference <-10) ) {
                Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 30)
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    }
})
```

###Step 5
You should now have an empty ``||logic:if else||`` statement. This is no longer needed, so delete it.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = leftSensor - rightSensor
    if ((sensorDifference > 10) ) {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 30)
    } else if ((sensorDifference <-10) ) {
                Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 30)
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    }
})
```

### Step 6
Iteration complete! If you have a @boardname@ connected, click ``|Download|`` to transfer your code.
Place your :MOVE Motor on the line, and switch it on. It should still follow the line. 
If it doesnt then you might have the speed too high, or the batteries might be going flat. 

### Making the code more elegant @unplugged
The code is now smaller, and more efficient. We only do a single sum to get the sensor difference, and from that we can determine how to control the :MOVE Motor.
We have saved an ``||math:Absolute||`` operation, and an extra ``||logic:if else||`` test.
One trade off is that although the code is smaller and more efficient it is slightly harder to follow. 
In some cases ease of following the code is more important than ultimate efficiency. Often however efficient, elegant code is more readble as well.
