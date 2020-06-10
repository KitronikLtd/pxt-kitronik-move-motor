### @activities true
### @explicitHints true

# :MOVE Motor Radio Control Receiver (Buggy Code)

## Introduction
### Introduction @unplugged
Please read the introduction on the left editor and follow the instructions.  When the tutorial indicates to start on this tutorial, then click the OK button to start. 

![Left Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/left-arrow.jpg)

## Basic Drive Forward
### Step 1
Now the transmitter tutorial code is done, lets start on the receiver code.  We wil need to program this into the second micro:bit.
Like at the start of the Transmitter code we need to indicate which BBC micro:bit this is and set the radio group.
Add the ``||basic.show String||`` to the ``||basic.onStart||`` and display the letter "R", this shows its the receiver BBC micro:bit.  Add the ``||radio:set Group||`` and set its group to match the transmitor (we used 1 in our example).

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
Within the ``||radio:on Receive Value||``, we need to check the received message is what we are expecting.  
Add ``||logic:if||`` into the function, and compare the name equals "Forward".
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
Next, within the if block, we need to tell the :MOVE Motor to drive forward.  Add the ``||Kitronik_Move_Motor.move direction||`` into the if block and ensure "Forward" is selected.
Click and drag the "value" from the ``||radio:on Receive Value||`` block into the speed section of the  ``||Kitronik_Move_Motor.move direction||`` block.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "Forward") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, value)
    }
})
```

### Step 5
Click ``|Download|`` to transfer your code, to your other BBC micro:bit. Plug it into the :MOVE Motor, place the buggy on the floor and switch on.

### Receiver Code Done @unplugged
We now have two micro:bit's coded.  If not done so, plug the receiver micro:bit into the :MOVE motor. Apply power to the transmitter micro:bit (you can use the USB lead from your computer for this).  
Press Button A on your controller and see what the :MOVE Motor does. If your code doesnt work, check your radio group number and how you spelt "Forward" in both tutorials.  When you are ready, lets go back to the Transmitter tutorial for the next stage.
![Left Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/left-arrow.jpg)

### Changing Directions @unplugged
We are going to receive some new radio messages to deal with from the changing of directions and stopping. Click the OK button and let's get started.

### Step 6
On the if block, click the ``||logic:+||`` icon twice to add an ``||logic:if else||`` and ``||logic:else||`` statement. Create a copy of the if statement condition and place it in the 'else if' entry below.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "Forward") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, value)
    } else if (name == "Forward") {
    	
    } else {
    	
    }
})
```

### Step 7
From the condition within the ``||logic:else if||`` statement, add a compare check (similar to the one above with checking the name is "Forward") that checks if the name is equal to "Reverse".
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "Forward") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, value)
    } else if (name == "Reverse") {
    	
    } else {
    	
    }
})
```

### Step 8
Now to add the blocks for driving the motors in ``||logic:else if||`` and ``||logic:else||`` brackets. Add a ``||Kitronik_Move_Motor.move direction||`` block in the ``||logic:else if||`` bracket. 
Place the variable "value" into the speed entry (Click and drag the word "value" from the top of the ``||radio:on Receive Value||`` block.)
Set the direction to be "Reverse".  Select this from the drop down in the block.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "Forward") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, value)
    } else if (name == "Reverse") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, value) 	
    } else {
    	
    }
})
```

### Step 9
The final condition we want is to stop the motors if  we receive the a message that isnt "Forward" or "Reverse". From the :MOVE Motor section in motors add a ``||Kitronik_Move_Motor.stop||`` block to within the ``||logic:else||`` bracket.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "Forward") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, value)
    } else if (name == "Reverse") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, value)   	
    } else {
    	Kitronik_Move_Motor.stop()
    }
})
```
### Step 10
Connect the BBC micro:bit in the :MOVE Motor and click ``|Download|`` to transfer your code.  Time to test your code if we can drive forward and reverse.

### Receiver Code Done @unplugged
So the :MOVE Motor is driving in two directions, awesome!.  However, it will be better if we have a method of steering as it drives.  Let's go back to the transmitter code and see what we can do.  The transmitter tutorial will inform you of when we need to adjust the receiver code.
![Left Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/left-arrow.jpg)

### Radio receive adjustments
Once again we have got some new radio messages to deal with: The messages will be for each motor and checking is the value is a positive or negative number.  This check will determine which direction the motors will be turning.

### Step 11
Firstly, lets change the name we check for when receiving a message.  Change "Forward" to "motorL" and change "Reverse" to "motorR".
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "motorL") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, value)
    } else if (name == "motorR") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, value)   	
    } else {
    	Kitronik_Move_Motor.stop()
    }
})
```

### Step 12
The current blocks used for driving the direction control both motors.  However, now we are adding in steering we need to be able to control each of these motors individually.
Let's remove the two motor driving blocks,
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "motorL") {
        
    } else if (name == "motorR") {
        
    } else {
    	Kitronik_Move_Motor.stop()
    }
})
```

### Step 13
Once we have checked which motor the radio message is for, the next check is to see if its a positive or negative number. Add an ``||logic:if else||`` inside the "if name = motorL".
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "motorL") {
        if (true) {

        } else {
        
        }
    } else if (name == "motorR") {

    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 14
Add the compare in the new ``||logic:if||`` statement block, to check if "value >= 0".  This is to check if the value that has been sent is a positive number.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "motorL") {
        if (value >= 0) {

        } else {
        
        }
    } else if (name == "motorR") {

    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 15
Inside the :MOVE Motor section in the motor blocks, there is ``||Kitronik_Move_Motor.move motor||`` which allows control of each motor individually.  Add one of these blocks to the top bracket of the newly added if statement.
Select the "Left" motor and have the variable "value" inserted into the speed of the block.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "motorL") {
        if (value >= 0) {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, value)
        } else {
        
        }
    } else if (name == "motorR") {

    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 16
Now we need to deal with if the value received is a negative number.  Add another ``||Kitronik_Move_Motor.move motor||`` into the else bracket, once again selecting the "Left" motor, but have the direction as reverse.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "motorL") {
        if (value >= 0) {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, value)
        } else {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Reverse, 0)
        }
    } else if (name == "motorR") {

    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 17
The value received is a negative number that indicates the speed, but in reverse.  However, the ``||Kitronik_Move_Motor.move motor||`` does not take a negative number.  To allow us to just use the magnitude of a number we can use the ``||math.abs||`` block.  
Insert this into the ``||Kitronik_Move_Motor.move motor||`` then the variable value.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "motorL") {
        if (value >= 0) {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, value)
        } else {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Reverse, Math.abs(value))
        }
    } else if (name == "motorR") {

    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 18
The left motor code is complete, this same code needs to be done for the right motor.  See if you are able to create the same code but for the right motor.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "motorL") {
        if (value >= 0) {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, value)
        } else {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Reverse, Math.abs(value))
        }
    } else if (name == "motorR") {
        if (value >= 0) {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, value)
        } else {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Reverse, Math.abs(value))
        }
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 19
Click ``|Download|`` to transfer your code, to the :MOVE Motor.  Switch on your buggy so it is ready to receive message from the controller. Dont forget to turn on your controller.


### Receiver Code Done @unplugged
Congratulations, you have completed the radio controlled tutorial. Enjoy driving your :MOVE Motor around.  Why not see if you can add extra features onto your buggy such as lights and horn sounding over the radio.
