### @activities true
### @explicitHints true

# :MOVE Motor Radio Control Receiver (Buggy Code)

## Introduction
### Introduction @unplugged
Please read the introduction on the left editor and follow the instructions.  When the tutorial indicates to start on this tutorial, then click the OK button to start. 

![Left Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/left-arrow.jpg)

## Basic Drive Forward
### Step 1
Now the transmitter tutorial code is done, let start on the receiver code.  Like at the start of the previous stage we need to indicate which BBC micro:bit this is and set the radio group.
Add the ``||basic.show String||`` to the ``||basic.onStart||`` and display the letter "R", this shows its the receiver BBC micro:bit.  Add the ``||radio:set Group||`` and set it to group 1.

#### ~ tutorialhint
```blocks
basic.showString("R")
radio.setGroup(1)
```

### Step 2
Now our code is ready to receive messages.  From the radio section drag in the ``||radio:on Receive Value||``, this will have the variables "name" and "value".

#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
	
})
```

### Step 3
With in the ``||radio:on Receive Value||``, we need to check the message sent is what we are expecting.  Add ``||logic:if||`` into the function, and compare the name equals "Forward".
Place an ``||logic:equals||`` compare block into the ``||logic:if||``. From the ``||radio:on Receive Value||``, click and drag the "name" variable into the start of the ``||logic:equals||`` block.  Now add a ``||text:text||`` block and type in "Forward".
The word "Forward" needs to be spelt the same as the transmitter code and is case sensitive.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "Forward") {
    	
    }	
})
```

### Step 4
Next, within the if block, we need to tell the :MOVE Motor to drive forward.  Add two of the ``||Kitronik_Move_Motor.move motor||`` into the if block.  Set one block to "Left" motor and the other to "Right".
Click and drag the "value" from the ``||radio:on Receive Value||`` block into a ``||Kitronik_Move_Motor.move motor||`` and repeat again for the other ``||Kitronik_Move_Motor.move motor||`` block
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "Forward") {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, value)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, value)
    }
})
```

### Step 5
Click ``|Download|`` to transfer your code, to your other BBC micro:bit. Connect it to the :MOVE Motor and switch on.

### Receiver Code Done @unplugged
We now have two micro:bit's coded.  If not done so, plug the receiver micro:bit into the :MOVE motor. Apply power to the transmitter micro:bit (you can use the USB lead from your computer for this).  
Press Button A on your controller and see what the :MOVE Motor does. If your code doesnt work, check your radio group number and how you spelt "Forward" in both tutorials.  When you are ready, lets go back to the Transmitter tutorial for the next stage.
![Left Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/left-arrow.jpg)

### Changing Directions @unplugged
We have got some new radio messages to deal with from the changing of directions and stopping. Click the OK button and let's get started.

### Step 6
Similar to the previsouly done on the if block, click the ||logic:+|| icon twice to add an ||logic:if else|| and ||logic:else|| statement. Create a copy of the if statement condition and place it in the 'else if' entry below.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "Forward") {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, value)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, value)
    } else if (name == "Forward") {
    	
    } else {
    	
    }
})
```

### Step 7
From the condition within the 'else if' statement, change the test from "Forward" to "Reverse".
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "Forward") {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, value)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, value)
    } else if (name == "Reverse") {
    	
    } else {
    	
    }
})
```

### Step 8
Now to add the blocks for driving the motors in 'else if' and 'else' brackets. Add two ``||Kitronik_Move_Motor.move motor||`` blocks in the 'else if' bracket. 
Set one to "Left" motor and the other to "Right" motor. Place the variable "value" into the speed entry same as below (Click and drag the word "value" from the top of the ``||radio:on Receive Value||`` block. 
The motor direction in these two blocks need to be "Reverse".  Select this from the drop down in the block.  Do this for both motors.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "Forward") {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, value)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, value)
    } else if (name == "Reverse") {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Reverse, value)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Reverse, value)   	
    } else {
    	
    }
})
```

### Step 9
The final condition we want is to stop the motors if it does not receive the name "Forward" or "Reverse". From the :MOVE Motor section in motors add a ``||Kitronik_Move_Motor.stop||`` block to within the 'else' bracket.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "Forward") {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, value)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, value)
    } else if (name == "Reverse") {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Reverse, value)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Reverse, value)   	
    } else {
    	Kitronik_Move_Motor.stop()
    }
})
```
### Step 10
Connect the BBC micro:bit in the :MOVE Motor and click ``|Download|`` to transfer your code.  Time to test your code if we can drive forward and reverse.

### Receiver Code Done @unplugged
So the :MOVE Motor is driving in two directions, awesome!.  However, it will be better if we have a method of controlling when it drives.  Let's go back to the transmitter code and see what we can do.
![Left Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/left-arrow.jpg)
