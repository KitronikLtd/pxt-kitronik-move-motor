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
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor. Then move a box in front of the :MOVE Motor and see the micro:bit display show the distance to the box.

## Follow the Object
### Follow the Object @unplugged
Now we know the distance to the box, we can use that to drive the motors and make the :MOVE Motor follow the box if it moves away.

### Step 1
Start by removing the ``||basic:show number||`` block, then add an ``||logic:if||`` statement, with ``||variables:distance||`` ``||logic:> 10||`` as the test condition.
Inside the ``||logic:if||`` block, make the :MOVE Motor ``||Kitronik_Move_Motor.move forward||`` if the condition is met.

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
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor. 
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
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor. 
As before, place a box in front of the :MOVE Motor and see it follow as the box is moved away, but this time, it stops when it gets within 10cm. 

### Step 5
Currently, the code only allows the :MOVE Motor to follow the object if it moves away. If the object comes closer, we want to reverse the :MOVE Motor.
To do this, we need another test condition to check whether the distance is less than 10cm. If it is, we reverse.

Click the ``||logic:+||`` icon on the ``||logic:if else||`` block to add an ``||logic:else if||`` statement. 
Put in ``||variables:distance||`` ``||logic:< 10||`` as the test condition, and make the :MOVE Motor ``||Kitronik_Move_Motor.reverse||`` if the condition is met.

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
The sensor reads zero when it does not know the distance between itself and the object. This can happen if the object reflects the sound waves at an angle, meaning they aren’t bounced back towards the sensor, or if the object absorbs the sound waves, then they aren’t bounced back at all.
This case sits inside of our distance is less than 10cm condition, however, we should stop if our sensor doesn't know the distance between itself and an object

Click the ``||logic:+||`` icon on the ``||logic:if else||`` block to add an ``||logic:else if||`` statement.
Move down the condition ``||variables:distance||`` ``||logic:< 10||`` to the new ``||logic:if else||`` block, along with its :MOVE Motor ``||Kitronik_Move_Motor.reverse||`` code.
Put in ``||variables:distance||`` ``||logic:= 0||`` as the test condition in the empty block, and make the :MOVE Motor ``||Kitronik_Move_Motor.stop||`` if the condition is met.

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (distance == 0) {
        Kitronik_Move_Motor.stop()
    } else if (distance < 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 100)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 7
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor. 
Now try out making the :MOVE Motor drive forwards and backwards as you move the box.

## Free Roaming
### Free Roaming @unplugged
Great! The :MOVE Motor can now move forwards and backwards, keeping the same distance from the box as you move it.
But it can only move in a straight line. It would be much better if it could drive around by itself and not crash into things...

### Step 1
To turn :MOVE Motor into a free roaming robot, we just need to make a few changes to our code.
Begin by moving the ``||Kitronik_Move_Motor.stop||`` block from ``||logic:else||`` to the ``||logic:else if||`` section, above the ``||Kitronik_Move_Motor.reverse||`` block.
Then, click the ``||logic:-||`` icon on the ``||logic:else||`` statement to remove it.

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (distance == 0) {
        Kitronik_Move_Motor.stop()
    } else if (distance < 10) {
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 100)
    }
})
```

### Step 2
Next, add a 500ms ``||basic:pause||`` after the ``||Kitronik_Move_Motor.stop||``, and a 1 second ``||basic:pause||`` after the ``||Kitronik_Move_Motor.reverse||`` block.
We also want to slow :MOVE Motor down a bit when it's avoiding obstacles, so change the ``||Kitronik_Move_Motor.reverse||`` speed to 50.

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (distance == 0) {
        Kitronik_Move_Motor.stop()
    } else if (distance < 10) {
        Kitronik_Move_Motor.stop()
        basic.pause(500)
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
        basic.pause(1000)
    }
})
```

### Step 3
Finally, we need to make :MOVE Motor turn away from the obstacle it has detected. 
Add a ``||Kitronik_Move_Motor.spin left at speed 50||`` block to the ``||logic:else if||`` section, followed by another 500ms ``||basic:pause||`` and a ``||Kitronik_Move_Motor.stop||`` block.

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (distance == 0) {
        Kitronik_Move_Motor.stop()
    } else if (distance < 10) {
        Kitronik_Move_Motor.stop()
        basic.pause(500)
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
        basic.pause(1000)
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 50)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 4
CODING COMPLETE! If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor. 
Now put :MOVE Motor on the floor and watch it roam around avoiding obstacles.