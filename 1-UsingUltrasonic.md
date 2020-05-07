### @activities true
### @explicitHints true

# :MOVE Motor Ultrasonic Sensor

## Introduction
### Introduction Step @unplugged
Learn how to use the :MOVE Motor's Ultrasonic Distance Sensor to detect objects and stay a certain distance from them.

![:MOVE Motor front view](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-front.jpg)

### Step 1
First, let's use the sensor to display the distance to an object.
Start by creating a variable called ``||variables:distance||`` and place the ``||variables:set distance to||`` block in the ``||basic:forever||`` loop.
Make ``||variables:distance||`` equal to ``||Kitronik_Move_Motor.measure distance||`` by dropping the block inside (this can be found in the ``||Kitronik_Move_Motor.Sensors||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||`` category).

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
})
```

### Step 2
Now add a ``||basic:show number||`` block below the set variable block.
Place the variable ``||variables:distance||`` inside the ``||basic:show number||`` block.

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    basic.showNumber(distance)
})
```

### Step 3
If you have a @boardname@ connected, click ``|Download|`` to transfer your code. Then move a box in front of the :MOVE Motor and see the micro:bit display show the distance to the box.

## Follow the Object
### Follow the Object @unplugged
Now we know the distance to the box, we can use that to drive the motors and make the :MOVE Motor follow the box if it moves away.

### Step 1
Start by removing the ``||basic:show number||`` block, then add an ``||logic:if||`` statement, with ``||variables:distance||`` ``||logic:> 10||`` as the test condition.
Inside the ``||logic:if||`` block, make the :MOVE Motor move forward if the condition is met.

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    }
})
```

### Step 2
If you have a @boardname@ connected, click ``|Download|`` to transfer your code. 
Place a box in front of the :MOVE Motor and, as you move it away, see the :MOVE Motor follow. 
But there is a problem. We only start the motors!

### Step 3
This means the motors start as soon as the box is more than 10cm away, but they never stop, so the :MOVE motor will just keep going. 
We need to stop when we are closer to the object.
So, click the ``||logic:+||`` icon to add an ``||logic:else||`` statement and place a ``||Kitronik_Move_Motor.stop||`` block inside.

#### ~ tutorialhint

![Animation that shows how to add an else statement](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/add-else-statement-stop.gif)

```ghost
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else {
        Kitronik_Move_Motor.stop()
    }
})

```

### Step 4
If you have a @boardname@ connected, click ``|Download|`` to transfer your code. 
As before, place a box in front of the :MOVE Motor and see it follow as the box is moved away, but this time, it stops when it gets within 10cm. 

### Step 5
Currently, the code only allows the :MOVE Motor to follow the object if it moves away. If the object comes closer, we want to reverse the :MOVE Motor.
To do this, we need another test condition to check whether the distance is less than 10cm. If it is, we reverse.

Click the ``||logic:+||`` icon on the ``||logic:if else||`` block to add an ``||logic:else if||`` statement. 
Put in ``||variables:distance||`` ``||logic:< 10||`` as the test condition, and make the :MOVE Motor reverse if the condition is met.

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (distance < 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 100)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 6
CODING COMPLETE! If you have a @boardname@ connected, click ``|Download|`` to transfer your code. 
Now try out making the :MOVE Motor drive forwards and backwards as you move the box.