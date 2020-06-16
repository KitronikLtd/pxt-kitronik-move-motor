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
basic.forever(function () {
    rightSensor = 0
    leftSensor = 0
})
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
Because we only care if the values are different we can use the ``||math:Absolute||`` block so we don't have to worry about a negative number. 

#### ~ tutorialhint
```blocks
   let difference = Math.abs(leftSensor - rightSensor)
```

### Step 4
If the sensors are different then we must be heading off the line, but if they are the same we are still following it. Add a ``||logic:if else||`` block. The ``||logic:else||`` section will be if we are still on the line. Add a ``||basic:show LEDS||`` block into is and draw a straight up arrow to indicate we are going forward.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = Math.abs(leftSensor - rightSensor)
    if () {

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
If we are leaving the line we will need to decide which way, and take corrective action. Into the ``||logic:if||`` condition add a``||logic:>||`` check to see if ``||variables:difference||`` is greater than 10. Into this ``||logic:if||`` add a ``||logic:if else||``. We will use this to decide which way we need to turn to stay on the line.

#### ~ tutorialhint
```blocks
    sensorDifference = Math.abs(leftSensor - rightSensor)
    if ((sensorDifference > 10) ) {
        if () {

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
```
### Sensor Values @unplugged
The sensors on the :MOVE motor give a low value if the surface they are sensing is dark (none reflective) and a high value if the surface is light (reflective).
As we are looking for a dark line on a light background we know that if the left sensor has left the line, but the right sensor is still on the line then the left sensor value will be larger than the right one. We can use this knowledge to work out what corrective action to take.

### Step 6
Into the inner ``||logic:if||`` condition add a``||logic:>||`` check to see if ``||variables:leftSensor||`` is greater than ``||variables:rightSensor||``. This means the left sensor is off the line and the right sensor is on the line. To get back on the line we need to turn to the right. Add a ``||basic:show LEDS||`` block into is and draw an arrow to indicate which way to turn. The ``||logic:else||`` needs to turn the other direction, so add into there the opposite arrow.


#### ~ tutorialhint
```blocks
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
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
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
```

### Step 7
CODING COMPLETE! If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor.  
Now, create a continuous track for :MOVE Motor to drive around and set it going. The line should be about 10-20mm wide ( black insulation tape is great for this).  
If you find :MOVE Motor is struggling to follow the line, you could try slowing the speed :MOVE Motor is driving.
