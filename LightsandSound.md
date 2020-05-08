### @activities true
### @explicitHints true

# :MOVE Motor Lights and Sound

### Introduction @unplugged
Learn how to use the :MOVE Motor's lights to make headlights and indicators, and then combine with the buzzer create a police car.

![:MOVE Motor angled view with lights](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-lights.jpg)

## Headlights and Rear Lights
### Step 1
To start with, let's make some headlights and rear lights for :MOVE Motor.
First, place the ``||variables:set moveMotorZIP to||`` ``||Kitronik_Move_Motor.MOVE Motor with 4 ZIP LEDs||`` block from the ``||Kitronik_Move_Motor.Lights||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||`` category into the ``||basic:on start||`` block. This sets up the ZIP LEDs on :MOVE Motor, ready to be used.
As we're going to have front lights and back lights, we also need to create two variables, ``||variables:headlights||`` and ``||variables:rearlights||``.
Using the ``||variables:set variable to||`` block, make ``||variables:headlights||`` equal to a ``||Kitronik_Move_Motor.range from 0 with 2 leds||`` and ``||variables:rearlights||`` equal to ``||Kitronik_Move_Motor.range from 2 with 2 leds||``. The seperate ranges mean the two sets of lights can be controlled individually.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let headlights = moveMotorZIP.range(0, 2)
let rearlights = moveMotorZIP.range(2, 2)
```

### Step 2
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
```### @activities true
### @explicitHints true

# :MOVE Motor Lights and Sound

### Introduction @unplugged
Learn how to use the :MOVE Motor's lights to make headlights and indicators, and then combine with the buzzer create a police car.

![:MOVE Motor angled view with lights](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-lights.jpg)

## Headlights and Rear Lights
### Step 1
To start with, let's make some headlights and rear lights for :MOVE Motor.
First, place the ``||variables:set moveMotorZIP to||`` ``||Kitronik_Move_Motor.MOVE Motor with 4 ZIP LEDs||`` block from the ``||Kitronik_Move_Motor.Lights||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||`` category into the ``||basic:on start||`` block. This sets up the ZIP LEDs on :MOVE Motor, ready to be used.
As we're going to have front lights and back lights, we also need to create two variables, ``||variables:headlights||`` and ``||variables:rearlights||``.
Using the ``||variables:set variable to||`` block, make ``||variables:headlights||`` equal to a ``||Kitronik_Move_Motor.range from 0 with 2 leds||`` and ``||variables:rearlights||`` equal to ``||Kitronik_Move_Motor.range from 2 with 2 leds||``. The seperate ranges mean the two sets of lights can be controlled individually.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let headlights = moveMotorZIP.range(0, 2)
let rearlights = moveMotorZIP.range(2, 2)
```

### Step 2
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