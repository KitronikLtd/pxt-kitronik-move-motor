### @activities true
### @explicitHints true

# :MOVE Motor Drawing Robot

## Introduction
### Introduction Step @unplugged
Learn how to use the :MOVE Motor to draw shapes using the pen mount.

![:MOVE Motor front view](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-front.jpg)

### Step 1
The :MOVE Motor has a pen mount hole right in the middle of the wheels, making it ideal for drawing shapes and all sorts of things.
Start by finding a pen that fits nicely in the hole, allowing the tip to touch the paper underneath (a Sharpie works really nicely).

## Circles
### Step 1
Now on to the code. We're going to be using several ``||functions:functions||`` in this tutorial in order to make drawing different shapes much easier.  
The first one is going to be a big circle (we'll do a small one afterwards). Click on **``Advanced``** to reveal more block categories, and then in the ``||functions:Functions||`` category, click ``||functions:Make a Function...||``. Name the function **``bigCircle``** and click **``Done``**. 

#### ~ tutorialhint

![Create bigCircle function image](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/create-bigcircle-function.png)

### Step 2
Inside side our new ``||functions:function bigCircle||`` block, add a ``||Kitronik_Move_Motor.set turn radius Tight||`` block from the ``||Kitronik_Move_Motor.Motors||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||`` category, and change the drop-down to ``||Kitronik_Move_Motor.Standard||``. It's this value we can change to vary the size of our circles.

#### ~ tutorialhint
```blocks
function bigCircle () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
}
```

### Step 3
Next, add a ``||Kitronik_Move_Motor.move Right at speed 75||`` block, followed by a 4000ms ``||basic:pause||`` and then ``||Kitronik_Move_Motor.stop||``.  
**Note:** The values given in this tutorial for speeds and ``||basic:pause||`` times worked for us, but you might need to alter them slightly to make it work for your :MOVE Motor.

#### ~ tutorialhint
```blocks
function bigCircle () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(4000)
    Kitronik_Move_Motor.stop()
}
```

### Step 4
We're ready to call our function and draw a circle. Pull in an ``||input:on button A pressed||`` block, and then add the ``||functions:call bigCircle||`` block from the ``||functions:Functions||`` category. If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor.  
Make sure :MOVE Motor is over a big enough piece of paper and has a pen mounted, then press ``||input:button A||`` to try drawing a circle.

#### ~ tutorialhint
```blocks
function bigCircle () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(4000)
    Kitronik_Move_Motor.stop()
}
input.onButtonPressed(Button.A, function () {
    bigCircle()
})
```

### Step 5
Hopefully you've got a nice circle drawn on your paper - now we're going to enable :MOVE Motor to draw a smaller one.  
Create another ``||functions:function||``, and this time call it **``smallCircle``**. Copy everything from inside the ``||functions:function bigCircle||`` block and put it into the ``||functions:function smallCircle||`` block (**``right-click``** and **``Duplicate``**).

#### ~ tutorialhint
```blocks
function smallCircle () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(4000)
    Kitronik_Move_Motor.stop()
}
```

### Step 6
Just a couple of changes to make in our new function. Change to the ``||Kitronik_Move_Motor.turn radius||`` drop-down to be ``||Kitronik_Move_Motor.Tight||``, and change the ``||basic:pause||`` to be 3000ms.

#### ~ tutorialhint
```blocks
function smallCircle () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(3000)
    Kitronik_Move_Motor.stop()
}
```

### Step 7
Finally, delete the ``||functions:call bigCircle||`` block in the ``||input:on button A pressed||`` and replace it with ``||functions:call smallCircle||`` from the ``||functions:Functions||`` category.  
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor. Same as before, press ``||input:button A||`` to try drawing a smaller circle.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    smallCircle()
})
function smallCircle () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(3000)
    Kitronik_Move_Motor.stop()
}
```

## Squares
### Introduction @unplugged
We've done circles, so let's move onto another shape, this time a square.

### Step 1
Time to create another new ``||functions:function||`` and give it the name **``square``**.  
Inside the ``||functions:function square||`` block, make :MOVE Motor start to ``||Kitronik_Move_Motor.move Forward at speed 75||``, ``||basic:pause||`` for 500ms and then ``||Kitronik_Move_Motor.stop||``. This will be the first side of our square.

#### ~ tutorialhint
```blocks
function square () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
    basic.pause(500)
    Kitronik_Move_Motor.stop()
}
```

### Step 2
Next, pull in a ``||Kitronik_Move_Motor.spin Left at speed 45||`` block and put this after the ``||Kitronik_Move_Motor.stop||``. Add another 500ms ``||basic:pause||`` and then another ``||Kitronik_Move_Motor.stop||``. This will be our first corner.  
Delete the ``||functions:call smallCircle||`` block in the ``||input:on button A pressed||`` and replace it with ``||functions:call square||`` from the ``||functions:Functions||`` category.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    square()
})
function square () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
    basic.pause(500)
    Kitronik_Move_Motor.stop()
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 45)
    basic.pause(500)
    Kitronik_Move_Motor.stop()
}
```

### Step 3
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor. **Without** inserting a pen, press ``||input:button A||`` to make :MOVE Motor drive forward for the first side and spin left for the first corner.  
We need to check whether :MOVE Motor spins 90 degrees - if it doesn't, adjust speed of the ``||Kitronik_Move_Motor.spin Left||`` block; increasing the speed if it was **less** than 90 degrees, decreasing the speed if it was **more** than 90 degrees. Keep downloading and testing your code until you're happy with the corner spin.

### Step 4
Now that the first side and corner are sorted, all we need to do is repeat that code 4 times and :MOVE Motor will be able to draw a square.  
Add a ``||loops:repeat 4 times||`` loop from the ``||loops:Loops||`` category to the ``||functions:function square||`` block, putting everything currently inside the ``||functions:function||`` into the new loop. 

#### ~ tutorialhint
```blocks
function square () {
    for (let index = 0; index < 4; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 45)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
}
```

### Step 5
If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor.  
Put :MOVE Motor over some paper, mount a pen and press ``||input:button A||`` to try drawing a square.

## Triangles
### Introduction @unplugged
And now... triangles!

### Step 1
Drawing triangles is pretty similar to drawing squares, there's just one less side and the corners are a bit different. So, create another new ``||functions:function||``, and call it **``triangle``**. Copy everything from inside the ``||functions:function square||`` block and put it into the ``||functions:function triangle||`` block (just like with the circles).

#### ~ tutorialhint
```blocks
function triangle () {
    for (let index = 0; index < 4; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 45)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
}
```

### Step 2
To make :MOVE Motor draw one less side, change the ``||loops:repeat||`` loop in the ``||functions:function triangle||`` block to only ``||loops:repeat 3 times||``. We also need to make sharper corners, 60 degrees rather than 90 degrees, so change the speed of the ``||Kitronik_Move_Motor.spin Left||`` to be 60. 

#### ~ tutorialhint
```blocks
function triangle () {
    for (let index = 0; index < 3; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 60)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
}
```

### Step 3
Finally, delete the ``||functions:call square||`` block in the ``||input:on button A pressed||`` and replace it with ``||functions:call triangle||`` from the ``||functions:Functions||`` category. 

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    triangle()
})
function triangle () {
    for (let index = 0; index < 3; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 60)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
}
```

### Step 4
CODING COMPLTE! If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor. Put :MOVE Motor over some paper, mount a pen and press ``||input:button A||`` to try drawing a triangle. If :MOVE Motor doesn't return to the point it started from, vary the ``||Kitronik_Move_Motor.spin Left||`` speed to adjust the corner angle; increasing the speed if it needs to be less sharp, decreasing the speed if it needs to be sharper. Keep downloading and testing your code until you're happy with the corner spin.