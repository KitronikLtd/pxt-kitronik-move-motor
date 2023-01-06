### @activities true
### @explicitHints true

# :MOVE Motor Advanced Drawing Robot

## Introduction
### Introduction @unplugged
Learn how to use the :MOVE Motor and Pen Lifter to draw shapes using the pen mount.

![:MOVE Motor front view](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-front.jpg)

### Step 1
The :MOVE Motor has a pen mount hole right in the middle of the wheels, making it ideal for drawing shapes and all sorts of things. Start by fitting your Pen Lifter attachment and finding a pen that fits nicely in the hole, allowing the tip to touch the paper underneath (a Sharpie works really nicely).

### Step 2
This tutorial starts with the code from the Kitronik :MOVE Motor Drawing Robot tutorial. We recommend that you complete this tutorial first, before starting this one.
[:MOVE Motor Drawing Robot tutorial](https://makecode.microbit.org/#tutorial:https://github.com/KitronikLtd/pxt-kitronik-move-motor/DrawingRobot)

### Step 3
It is important to note that the turn values and timing used for drawing shapes may differ for each :MOVE Motor. The values used in this tutorial worked for us in our testing but you may have to alter them slightly to work best with your :MOVE Motor.

## Circles
### Introduction @unplugged
Let's get started with drawing some circles. We are going to setup a function to lift the pen up and a function to put the pen down. To move the pen lifter we will need to control the servo which is connected to. In this tutorial we assume the pen lifter is connected to servo 1.

### Step 1
```template
function bigCircle() {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(4000)
    Kitronik_Move_Motor.stop()
}
function smallCircle() {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(3000)
    Kitronik_Move_Motor.stop()
}
function square() {
    for (let index = 0; index < 4; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 45)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
}
function triangle() {
    for (let index = 0; index < 3; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 60)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
}
input.onButtonPressed(Button.A, function() {
    bigCircle()
    smallCircle()
    square()
    triangle()
})
```

We can control the pen lifter with the ``||Kitronik_Move_Motor.write servo||`` block, which is in the ``||Kitronik_Move_Motor:Pins||`` section of the MOVE Motor extension. First let's create a ``||functions:penUp||`` function. Inside the function we are going to put in a ``||Kitronik_Move_Motor.write servo 1||`` block which updates servo 1. We then want to set the servo to a value of 140, to lift up the pen lifter attachment.

#### ~ tutorialhint
```blocks
function penUp() {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 140)
}
```

### Step 2
Now let's create a ``||functions:penDown||`` function. Inside the function we are going to put in a ``||Kitronik_Move_Motor.write servo 1||`` block which updates servo 1. We then want to set the servo to a value of 60, to push down the pen lifter attachment.

#### ~ tutorialhint
```blocks
function penDown() {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 60)
}
```

### Step 3
With our pen lifter functions ready we can now use these inside of our shape functions. Let's update the bigCircle function to put the pen down at the start of drawing the shape using ``||functions:call penDown||``. At the end of the bigCircle function we also want to lift the pen up using ``||functions:call penUp||``.

#### ~ tutorialhint
```blocks
function bigCircle() {
    penDown()
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(4000)
    Kitronik_Move_Motor.stop()
    penUp()
}
function penUp() {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 140)
}
function penDown() {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 60)
}
```

### Step 4
Let's also update the smallCircle function to put the pen down at the start of drawing the shape using ``||functions:call penDown||``. At the end of the smallCircle function we also want to lift the pen up using ``||functions:call penUp||``.

#### ~ tutorialhint
```blocks
function smallCircle() {
    penDown()
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(3000)
    Kitronik_Move_Motor.stop()
    penUp()
}
function penUp() {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 140)
}
function penDown() {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 60)
}
```

### Step 5
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor. With the :MOVE Motor turned on and sat on a piece of paper, press ``||input:button A||`` to try drawing two circles.

## Squares
### Introduction @unplugged
We've done circles, so let's move onto another shape, this time a square.

### Step 1
Now we can update the square function to put the pen down at the start of drawing the shape using ``||functions:call penDown||``. Then again we'll lift the pen up at the end of the square function using ``||functions:call penUp||``.

#### ~ tutorialhint
```blocks
function square() {
    penDown()
    for (let index = 0; index < 4; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 45)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
    penUp()
}
function penUp() {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 140)
}
function penDown() {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 60)
}
```

### Step 2
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor. Again with the :MOVE Motor turned on and sat on a piece of paper, press ``||input:button A||`` to try drawing a square.

## Triangles
### Introduction @unplugged
And now... triangles!

### Step 1
Following the same steps as before, let's update the triangle function to put the pen down at the start and lift the pen up at the end of drawing the shape. For these we'll use ``||functions:call penDown||`` and using ``||functions:call penUp||``.

#### ~ tutorialhint
```blocks
function triangle() {
    penDown()
    for (let index = 0; index < 3; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 60)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
    penUp()
}
function penUp() {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 140)
}
function penDown() {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 60)
}
```

### Step 2
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor. Again with the :MOVE Motor turned on and sat on a piece of paper, press ``||input:button A||`` to try drawing a triangle.

## Multiple Shapes
### Introduction @unplugged
Now that we can draw circles, squares and triangles, let's try drawing multiple shapes that aren't connected. To draw shapes that aren't connect we are going to have to tell the :MOVE Motor to move in between drawing the next shape.

### Step 1
To do this we can use the ``||Kitronik_Move_Motor.move||`` block to get the :MOVE Motor to move away from where it has just drawn a shape. Let's add a ``||Kitronik_Move_Motor.move Forward at speed 50||`` block in between the ``||functions:call bigCircle||`` and ``||functions:call smallCircle||`` blocks.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function() {
    bigCircle()
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    smallCircle()
    square()
    triangle()
})
function penUp() {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 140)
}
function penDown() {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 60)
}
function bigCircle() {
    penDown()
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(4000)
    Kitronik_Move_Motor.stop()
    penUp()
}
function smallCircle() {
    penDown()
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(3000)
    Kitronik_Move_Motor.stop()
    penUp()
}
function square() {
    penDown()
    for (let index = 0; index < 4; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 45)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
    penUp()
}
function triangle() {
    penDown()
    for (let index = 0; index < 3; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 60)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
    penUp()
}
```

### Step 2
After the ``||Kitronik_Move_Motor.move||`` block we are going to need to add a ``||basic:pause||`` block to give the :MOVE Motor time to move forward. Let's set this to move forward for 2 seconds or 2000 milliseconds before telling the :MOVE Motor to stop using the ``||Kitronik_Move_Motor.stop||`` block.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function() {
    bigCircle()
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(2000)
    Kitronik_Move_Motor.stop()
    smallCircle()
    square()
    triangle()
})
function penUp() {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 140)
}
function penDown() {
    Kitronik_Move_Motor.writeServoPin(Kitronik_Move_Motor.ServoSelection.servo1, 60)
}
function bigCircle() {
    penDown()
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(4000)
    Kitronik_Move_Motor.stop()
    penUp()
}
function smallCircle() {
    penDown()
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(3000)
    Kitronik_Move_Motor.stop()
    penUp()
}
function square() {
    penDown()
    for (let index = 0; index < 4; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 45)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
    penUp()
}
function triangle() {
    penDown()
    for (let index = 0; index < 3; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 60)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
    penUp()
}
```

### Step 3
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor. Again with the :MOVE Motor turned on and sat on a piece of paper, press ``||input:button A||`` to try drawing multiple shapes that aren't connected to each other.
