### @activities true
### @explicitHints true

# :MOVE Motor Ultrasonic Sensor

## Introduction
### Introduction Step @unplugged
Learn how to use the :MOVE motors Ultrasonic distance sensor to detect objects and stay a certain distance from them.

![Ticking Halo HD Clock animation](https://AlasdairAtKitronik.github.io/pxt-kitronik-halohd/assets/Ticking-Clock-Animation.gif)

### Step 1
First, let's use the sensor to display the distance to an object.
Start by creating a variable called ``||variables:distance||`` and place the ``||variables:set distance to||`` block in the ``||basic:forever||`` loop.
Make ``||variables:distance||`` equal to ``||Kitronik_Move_Motor.measure distance||`` by dropping the block inside (this can be found in the ``||Kitronik_Move_Motor.Sensors||`` of the ``||Kitronik_Move_Motor.MOVE Motor||`` category).

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
Now we know the distance to the box, we can use that to drive the motors and make the buggy follow the box if it moves away.

### Step 1
Add an if, using distance >10 as the test.
inside the if turn on both motors in the forwards direction.
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure(Kitronik_Move_Motor.Units.Centimeters)
    basic.showNumber(distance)
    if (distance > 10) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 100)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 100)
    }
})

### Step 2
If you have a @boardname@ connected, click ``|Download|`` to transfer your code. 
Then move a box in front of the :MOVE motor and as you move it away see the MOVE motor follow. 
But there is a problem. We only start the motors!



### Step 3
This will mean the motors start as soon as the block is more than 10 cm away. 
But they never stop, so the :MOVE motor will just keep going. 
We need to stop when we are closer to the object.
So click the + and in the 'else' Place one of these ``||Kitronik_Move_Motor.motorOff||`` blocks for each motor  in the else

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure(Kitronik_Move_Motor.Units.Centimeters)
    basic.showNumber(distance)
    if (distance > 10) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 100)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 100)
    } else {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
    }
})
```

```ghost
~WHAT IS THIS???
```


### Step 2
If you have a @boardname@ connected, click ``|Download|`` to transfer your code. 
Then move a box in front of the :MOVE motor and as you move it away see the MOVE motor follow. 
This time the MOVE motor stops when it get so 10cm from the box. 



### Step 3
Currently, the code will only follwo the object if it moves away. If the object comes closer we want to reverse the MOVE motor.
To do this we need another condition where if the distance is less than 10 we reverse.

Click the + on the If-else and in the else if which appears add this condition - distance < 10.


#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure(Kitronik_Move_Motor.Units.Centimeters)
    basic.showNumber(distance)
    if (distance > 10) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 100)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 100)
    } else if (distance < 10) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Reverse, 100)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Reverse, 100)
    } else {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
    }
})
```

```ghost
????
```
