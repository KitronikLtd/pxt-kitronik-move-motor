### @activities true
### @explicitHints true

# :MOVE Motor Lights and Sound

## Introduction
### Introduction @unplugged
Learn how to use the :MOVE Motor's lights to make headlights and indicators, and then combine with the buzzer to create a police car.

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
Add an ``||logic:if||`` block to the function, then click the ``||logic:+||`` icon twice. This will add an extra ``||logic:else||`` and ``||logic:else if||`` section, but don't need the ``||logic:else||``, so click the ``||logic:-||`` icon to remove it. 
Now we need some test conditions. In the ``||logic:if||`` statement, check if ``||variables:direction||`` ``||logic:= left||`` (drag ``||variables:direction||`` in from the ``||functions:function||`` block). Use the same test block in the ``||logic:else if||`` statement, but instead check for ``right``.
**Note:** Make sure to use the text comparison block.

#### ~ tutorialhint
```blocks
function indicate (direction: string) {
    if (direction == "left") {
    	
    } else if (direction == "right") {
    	
    }
}
```

### Step 3
Next, we need to set up the left indicator. Put a ``||loops:repeat 4 times||`` loop into the ``||logic:if||`` statement, then inside, ``||Kitronik_Move_Motor.set ZIP LED||`` 0 and 3 to be orange. Follow this with a ``||Kitronik_Move_Motor.show||`` block.

#### ~ tutorialhint
```blocks
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
function indicate (direction: string) {
    if (direction == "left") {
        for (let index = 0; index < 4; index++) {
            moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.show()
        }
    } else if (direction == "right") {
    	
    }
}
```

### Step 4
If the function is called, the ZIP LEDs on the left side will now turn on. But indicators flash on and off, so we need to add some pauses and turn the LEDs off.
After the ``||Kitronik_Move_Motor.show||`` add a 200ms ``||basic:pause||``, followed by a ``||Kitronik_Move_Motor.clear||`` and ``||Kitronik_Move_Motor.show||`` block, and finally another 200ms ``||basic:pause||``. The ``||loops:repeat||`` loop will make the indicators turn on and off 4 times.

#### ~ tutorialhint
```blocks
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
function indicate (direction: string) {
    if (direction == "left") {
        for (let index = 0; index < 4; index++) {
            moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.show()
            basic.pause(200)
            moveMotorZIP.clear()
            moveMotorZIP.show()
            basic.pause(200)
        }
    } else if (direction == "right") {
    	
    }
}
```

### Step 5
The code for the right indicator is almost identical to the left, so right click and duplicate the ``||loops:repeat||`` loop and everything inside, then put the new code in the ``||logic:else if||`` section. The only thing left to change is the LEDs. To use the right side lights, ``||Kitronik_Move_Motor.set ZIP LED||`` 1 and 2 to be orange. 

#### ~ tutorialhint

![Animation that shows how to duplicate sections of code](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/duplicate-blocks.gif)

```ghost
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
function indicate (direction: string) {
    if (direction == "left") {
        for (let index = 0; index < 4; index++) {
            moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.show()
            basic.pause(200)
            moveMotorZIP.clear()
            moveMotorZIP.show()
            basic.pause(200)
        }
    } else if (direction == "right") {
        for (let index = 0; index < 4; index++) {
            moveMotorZIP.setZipLedColor(1, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.setZipLedColor(2, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.show()
            basic.pause(200)
            moveMotorZIP.clear()
            moveMotorZIP.show()
            basic.pause(200)
        }
    }
}
```

### Step 6
Now that we've completed the function, it's time to use it. Bring in an ``||input:on button A pressed||`` block and use the ``||Kitronik_Move_Motor.MOVE Motor||`` blocks make :MOVE Motor drive forward, turn left and then stop. Immediately after the ``||Kitronik_Move_Motor.move Left at speed||`` block, add the ``||functions:call indicate||`` block from the ``||functions:Function||`` category. Type ``left`` into the function call block.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(2000)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, 40)
    indicate("left")
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
})
function indicate (direction: string) {}
```

### Step 7
Duplicate the ``||input:button A||`` block. Then, change the drop-down to be ``||input:button B||``, change the ``||Kitronik_Move_Motor.move Left||`` to ``||Kitronik_Move_Motor.move Right||``, and the function call to ``right``.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(2000)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, 40)
    indicate("left")
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
})
input.onButtonPressed(Button.B, function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(2000)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 40)
    indicate("right")
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
})
function indicate (direction: string) {}
```

### Step 8
If you have a @boardname@ connected, click ``|Download|`` to transfer your code.
Press ``||input:button A||`` or ``||input:button B||`` and see :MOVE Motor turn and indicate. However, there might be some issues with our automatic headlights, so there's a couple more things we need to do...

### Step 9
To stop interference from the headlights, we need to temporarily stop the headlights functioning. Create a new variable called ``||variables:indicating||``, set it to be ``||logic:true||`` at the start of the ``||functions:indicate||`` function, and ``||logic:false||`` at the end. Finally, put everything in the ``||basic:forever||`` loop inside another ``||logic:if||`` statement checking ``||logic:if not||`` ``||variables:indicating||``. This will make sure that when :MOVE Motor is indicating, the headlights won't try and turn on at the same time.

#### ~ tutorialhint
```blocks
let indicating = false
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let headlights = moveMotorZIP.range(0, 2)
let rearlights = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (!(indicating)) {
        if (input.lightLevel() < 20) {
            headlights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
            rearlights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
        } else {
            moveMotorZIP.clear()
            moveMotorZIP.show()
        }
    }
})
```

### Step 10
If you have a @boardname@ connected, click ``|Download|`` to transfer your code.
Try it out. Now there should be no problem with the headlights or the indicators.

## Police Car
### Introduction @unplugged
We're now able to control :MOVE Motors lights to be headlights, rear lights and indicators. In this last section, we're going to combine the lights with :MOVE Motor's buzzer to make a police car.

### Step 1
Just like with the indicators, the police car "mode" is going to be activated with button presses. Pull in an ``||input:on button A+B pressed||`` block, and then add the ``||Kitronik_Move_motor.turn siren on||`` block from the ``||Kitronik_Move_Motor.Sounds||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||`` category. This will make the buzzer emit a continuous siren sound until it is switched off.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.AB, function () {
    Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.On)
})
```

### Step 2
That's the sound sorted, now for some police style lights. Use 4 of the ``||Kitronik_Move_Motor.set ZIP LED # to colour||`` blocks to set:
* LED 0 to ``||variables:red||``
* LED 1 to ``||basic:blue||``
* LED 2 to ``||variables:red||``
* LED 3 to ``||basic:blue||``  
Follow these with a ``||Kitronik_Move_Motor.show||`` block to make them display. 

#### ~ tutorialhint
```blocks
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
input.onButtonPressed(Button.AB, function () {
    Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.On)
    moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    moveMotorZIP.setZipLedColor(1, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Blue))
    moveMotorZIP.setZipLedColor(2, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Blue))
    moveMotorZIP.show()
})
```

### Step 3
Next, put in a 1 second ``||basic:pause||``, and then start :MOVE Motor moving forward at 100% speed.
If you have a @boardname@ connected, click ``|Download|`` to transfer your code. 
Press ``||input:buttons A + B||`` together and see :MOVE Motor drive away with siren going and red and blue lights.

#### ~ tutorialhint
```blocks
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
input.onButtonPressed(Button.AB, function () {
    Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.On)
    moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    moveMotorZIP.setZipLedColor(1, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Blue))
    moveMotorZIP.setZipLedColor(2, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Blue))
    moveMotorZIP.show()
    basic.pause(1000)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
})
```

### Flashing Lights @unplugged
Now, that was ok, but lights on police cars are usually flashing, and you may have noticed that :MOVE Motor won't stop moving forward. There's a couple more bit to do to make the police car just right.

### Step 4
Pull in another ``||loops:repeat 4 times||`` loop, but change the repeat number to be 30. Inside this loop add a ``||Kitronik_Move_Motor.rotate ZIP LEDs by 1||`` block, followed by a ``||Kitronik_Move_Motor.show||`` and then a 100ms ``||basic:pause||``. As the colours rotate around the 4 LEDs, this will make them look they're flashing between ``||variables:red||`` and ``||basic:blue||``.

#### ~ tutorialhint
```blocks
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
input.onButtonPressed(Button.AB, function () {
    Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.On)
    moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    moveMotorZIP.setZipLedColor(1, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Blue))
    moveMotorZIP.setZipLedColor(2, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Blue))
    moveMotorZIP.show()
    basic.pause(1000)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    for (let index = 0; index < 30; index++) {
        moveMotorZIP.rotate(1)
        moveMotorZIP.show()
        basic.pause(100)
    }
})
```

### Step 5
After the lights have completed their 30 flashes, let's ``||Kitronik_Move_Motor.stop||`` :MOVE Motor and ``||Kitronik_Move_Motor.turn siren off||``.

#### ~ tutorialhint
```blocks
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
input.onButtonPressed(Button.AB, function () {
    Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.On)
    moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    moveMotorZIP.setZipLedColor(1, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Blue))
    moveMotorZIP.setZipLedColor(2, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Blue))
    moveMotorZIP.show()
    basic.pause(1000)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    for (let index = 0; index < 30; index++) {
        moveMotorZIP.rotate(1)
        moveMotorZIP.show()
        basic.pause(100)
    }
    Kitronik_Move_Motor.stop()
    Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.Off)
})
```

### Step 6
When you tested the police car lights and siren earlier, you may have noticed that the headlights and rearlights were causing problems again.
Again, we need to temporarily stop the headlights functioning. Create a new variable called ``||variables:police||``, set it to be ``||logic:true||`` at the start of the ``||input:on button A+B pressed||`` block, and ``||logic:false||`` at the end. Finally, in the ``||basic:forever||`` loop first ``||logic:if||`` statement, change the check to be ``||logic:if not||`` ``||variables:indicating||`` ``||logic:and not||`` ``||variables:police||``. This will make sure that when :MOVE Motor is indicating or in police car mode, the headlights won't try and turn on at the same time.

#### ~ tutorialhint
```blocks
let indicating = false
let police = false
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let headlights = moveMotorZIP.range(0, 2)
let rearlights = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (!(indicating) && !(police)) {
        if (input.lightLevel() < 20) {
            headlights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
            rearlights.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
        } else {
            moveMotorZIP.clear()
            moveMotorZIP.show()
        }
    }
})
```

### Step 7
CODING COMPLETE! If you have a @boardname@ connected, click ``|Download|`` to transfer your code.
Try pressing ``||input:buttons A+B||`` now. Watch the siren turn on, the lights flash and :MOVE Motor drive forward, all with no headlight inteference.