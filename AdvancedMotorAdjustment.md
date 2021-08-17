### @explicitHints true

# :MOVE Motor Advanced Motor Adjustment

### Introduction Step @unplugged
Motors are great, but even when they are supposed to be identical, they don't always run at the same speed.  
In this tutorial, we're going to learn how to adjust the individual motor outputs on :MOVE Motor to keep it driving in a straight line.

![:MOVE Motor front view](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-front.jpg)

### Step 1
Before we start making adjustments, we need to check which way :MOVE Motor is tending to turn when it's supposed to be driving in a straight line.
In the ``||basic:forever||`` loop, add a ``||Kitronik_Move_Motor.move Forward at speed 100||`` block.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
})
```

### Step 2
If you have a @boardname@ connected, click ``|Download|`` to transfer your code.  
Make sure there is a good, open area for :MOVE Motor to drive on, and then switch it on. Watch carefully and see whether it tends to go towards the left or the right.  
(It might drive in a perfect line, in which case, it doesn't need to be adjusted. However, the motors are also affected by the battery voltage, so it might not stay straight forever!)

### Step 3
To actually adjust the motors, you'll need to pull in the ``||Kitronik_Move_Motor.bias to Left by 0||`` block. Put it in the ``||basic:forever||`` loop, above the ``||Kitronik_Move_Motor.move Forward||`` block. If :MOVE Motor turned more left in your test, set the drop-down to ``||Kitronik_Move_Motor.Right||``, otherwise leave it as ``||Kitronik_Move_Motor.Left||``.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    Kitronik_Move_Motor.motorBalance(Kitronik_Move_Motor.SpinDirections.Left, 0)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
})
```

### Step 4
Rather than having to keep reprogramming the @boardname@ each time the bias number needs changing, we're going to use the buttons instead.  
Create a variable called ``||variables:biasValue||`` and in the ``||basic:on start||`` block, ``||variables:set biasValue to 0||``. Add an ``||input:on button A pressed||`` block and then put a ``||variables:change biasValue by -1||`` block inside. Finally, put ``||variables:biasValue||`` in the ``||Kitronik_Move_Motor.bias to Left/Right||`` block. 

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    biasValue += -1
})
let biasValue = 0
basic.forever(function () {
    Kitronik_Move_Motor.motorBalance(Kitronik_Move_Motor.SpinDirections.Left, biasValue)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
})
```

### Step 5
Add an ``||input:on button B pressed||`` block and inside ``||variables:change biasValue by 1||``.  
If you have a @boardname@ connected, click ``|Download|`` to transfer your code.  
Set :MOVE Motor going again, trying different bias values by pressing ``||input:button A||`` or ``||input:button B||``. (**Note:** The bias can be in the range 0 to 10).

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    biasValue += -1
})
input.onButtonPressed(Button.B, function () {
    biasValue += 1
})
let biasValue = 0
basic.forever(function () {
    Kitronik_Move_Motor.motorBalance(Kitronik_Move_Motor.SpinDirections.Left, biasValue)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
})

```

### Step 6
Hopefully the bias block with the correct setting now means that :MOVE Motor drives in a straight line. We're just going to make a few more changes to the code to make it more useful. To start with, it would be helpful to know what the current ``||variables:biasValue||`` is. Add an ``||input:on button A+B pressed||`` block, and then inside, ``||basic:show number||`` ``||variables:biasValue||``. 

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(biasValue)
})
```

### Step 7
Finally, we want to make sure we don't try to set ``||variables:biasValue||`` to something outside the 0-10 range.  
In the ``||input:button A||`` block, add an ``||logic:if else||`` statement, putting the ``||variables:change biasValue to -1||`` inside the ``||logic:if||`` section. The test condition needs to be ``||logic:if||`` ``||variables:biasValue||`` ``||logic:> 0||`` In the ``||logic:else||`` section, ``||variables:set biasValue to 0||``.  
Do the same for the ``||input:on button B pressed||`` block, but the test condition should be ``||logic:if||`` ``||variables:biasValue||`` ``||logic:< 10||``, and ``||variables:set biasValue to 10||`` in the ``||logic:else||`` section.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    if (biasValue > 0) {
        biasValue += -1
    } else {
        biasValue = 0
    }
})
input.onButtonPressed(Button.B, function () {
    if (biasValue < 10) {
        biasValue += 1
    } else {
        biasValue = 10
    }
})
```

### Step 8
CODING COMPLETE! If you have a @boardname@ connected, click ``|Download|`` to transfer your code. You can now adjust the motor bias as before, but now you can't set it outside the limits and you can see what value it is by pressing ``||input:buttons A+B||``. Once you have this value, you can enter the value into the ``||Kitronik_Move_Motor.bias||`` blocks for any other code.
