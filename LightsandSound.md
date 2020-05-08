### @activities true
### @explicitHints true

# :MOVE Motor Lights and Sound

## Introduction
### Introduction @unplugged
Learn how to use the :MOVE Motor's lights to make headlights and indicators, and then combine with the buzzer create a police car.

![:MOVE Motor angled view with lights](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-lights.jpg)

## Headlights and Rear Lights
### Step 1
To start with, let's make some headlights and rear lights for :MOVE Motor.
First, place the ``||variables:set moveMotorZIP to||`` ``||Kitronik_Move_Motor.MOVE Motor with 4 ZIP LEDs||`` block from the ``||Kitronik_Move_Motor.Lights||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||`` category into the ``||basic:on start||`` block. This sets up the ZIP LEDs on :MOVE Motor, ready to be used.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
```
### Step 2
As we're going to have front lights and back lights, we also need to create two variables, ``||variables:headlights||`` and ``||variables:rearlights||``.
Using the ``||variables:set variable to||`` block, make ``||variables:headlights||`` equal to a ``||Kitronik_Move_Motor.range from 0 with 2 leds||`` and ``||variables:rearlights||`` equal to ``||Kitronik_Move_Motor.range from 2 with 2 leds||``. The seperate ranges mean the two sets of lights can be controlled individually.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let headlights = moveMotorZIP.range(0, 2)
let rearlights = moveMotorZIP.range(2, 2)
```

### Step 3
Now we need to set the lights to be their correct colours: white for headlights, red for rear lights.
Use the ``||Kitronik_Move_Motor.show colour||`` block from the ``||Kitronik_Move_Motor.Lights||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||`` category, changing the drop-down to select the ``||variables:headlights||`` and ``||variables:rearlights||`` variables in the different blocks. Place these in the ``||basic:forever||`` loop.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let headlights = moveMotorZIP.range(0, 2)
let rearlights = moveMotorZIP.range(2, 2)
basic.forever(function () {
    headlights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
    rearlights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
})
```

### Step 4
If you have a @boardname@ connected, click ``|Download|`` to transfer your code. Then switch on :MOVE Motor and see the lights turn on!

### Automatic Lights @unplugged
So, :MOVE Motor now has nice bright lights, but on real vehicles, the lights aren't on all the time - they only need to be used when it's dark.
Lots of modern cars have lights which turn on automatically when a certain light level is reached, and we can do the same with :MOVE Motor...

### Step 5
The micro:bit LED display can also function as a light sensor, which we can then use like a switch to turn :MOVE Motor's lights on and off.
Drag the ``||Kitronik_Move_Motor.show colour||`` blocks out of the ``||basic:forever||`` loop, leaving them to one side, and add an ``||logic:if||`` block from the ``||logic:Logic||`` category.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let headlights = moveMotorZIP.range(0, 2)
let rearlights = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (true) {
    	
    }
})
```

### Step 6
Add a test condition to the ``||logic:if||`` statement to check whether ``||input:light level||`` (found in the ``||input:Input||`` category) is ``||logic:< 20||``.
**Note:** The actual number might need to be varied for your particular light conditions. 20 worked well during testing.
Finally, drag those ``||Kitronik_Move_Motor.show colour||`` blocks inside the ``||logic:if||`` block.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let headlights = moveMotorZIP.range(0, 2)
let rearlights = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (input.lightLevel() < 20) {
        headlights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
        rearlights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    }
})
```

### Step 7
If you have a @boardname@ connected, click ``|Download|`` to transfer your code.
Try varying the light shining on the micro:bit display and see the :MOVE Motor lights turn on all by themselves.

### Step 8
The lights now turn on when it gets dark enough, but at the moment, they stay on forever. We need to make them turn off again when the light levels are high enough.
Click the ``||logic:+||`` icon on the ``||logic:if||`` block to add an ``||logic:else||`` section, then add a ``||Kitronik_Move_Motor.clear||`` block followed by a ``||Kitronik_Move_Motor.show||`` block from the ``||Kitronik_Move_Motor.Lights||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||`` category.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let headlights = moveMotorZIP.range(0, 2)
let rearlights = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (input.lightLevel() < 20) {
        headlights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
        rearlights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    } else {
        moveMotorZIP.clear()
        moveMotorZIP.show()
    }
})
```

### Step 9
If you have a @boardname@ connected, click ``|Download|`` to transfer your code.
Now as you vary the light levels, the :MOVE Motor lights will turn on and off.

## Indicators
### Introduction @unplugged
Now that :MOVE Motor's headlights and rear lights are in place, let's move on to indicating when we turn.

### Step 1
When indicating, we're going to want to turn either left or right. This means we're going to need to use different ZIP LEDs for each action.
However, because nearly everything else is the same, we can use a ``||functions:function||`` to make things easier.
Click on ``Advanced`` to reveal more block categories, and then in the ``||functions:Functions||`` category, click ``||functions:Make a Function...||``.
Add a ``Text`` paramenter and call it ``direction``, name the function ``indicate`` and click ``Done``. 

#### ~ tutorialhint

![Animation that shows how to create a function](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/create-function.gif)

```ghost
function indicate (direction: string) {
	
}
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let headlights = moveMotorZIP.range(0, 2)
let rearlights = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (input.lightLevel() < 20) {
        headlights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
        rearlights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    } else {
        moveMotorZIP.clear()
        moveMotorZIP.show()
    }
})
```

### Step 2