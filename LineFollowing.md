### @explicitHints true

# :MOVE Motor Line Following

### Introduction Step @unplugged
Learn how to use the :MOVE Motor's Line Following Sensors to navigate around a marked out track.

![:MOVE Motor front view](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-front.jpg)

### Step 1
We're going to create a simple program which continuously checks whether :MOVE Motor is drifting away from the line it's following, and makes small corrections if it is.  
Start by adding an ``||logic:if else||`` block from the ``||logic:Logic||`` category to the ``||basic:forever||`` loop, and then click the ``||logic:+||`` icon at the bottom of it to add an extra ``||logic:else if||`` statement section. 

#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (true) {
        
    } else if (false) {
        
    } else {
        
    }
})
```

### Step 2
Now we need to some test conditions. From the ``||Kitronik_Move_Motor.Sensors||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||`` category, drag in a ``||Kitronik_Move_Motor.Left line following sensor detects Light||`` block and put it in the top ``||logic:if||`` statement. Change the end drop-down to detect ``||Kitronik_Move_Motor.Dark||``. Add the same block to the ``||logic:else if||`` statement, change the end drop-down to detect ``||Kitronik_Move_Motor.Dark||`` and make the first drop-down check the ``||Kitronik_Move_Motor.Right||`` sensor. This setup means :MOVE Motor will be following a **Dark line** on a **light background** (keep the drop-downs as ``||Kitronik_Move_Motor.Light||`` if you want the opposite).

#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (Kitronik_Move_Motor.sensorDigitalDetection(Kitronik_Move_Motor.LfSensor.Left, Kitronik_Move_Motor.LightSelection.Dark)) {
        
    } else if (Kitronik_Move_Motor.sensorDigitalDetection(Kitronik_Move_Motor.LfSensor.Right, Kitronik_Move_Motor.LightSelection.Dark)) {
        
    } else {
        
    }
})
```

### Step 3
Next we need to make :MOVE Motor take action depending on the different test conditions in our ``||logic: if else||`` block.  
We'll start with the ``||logic:else||`` section, which will be the default action - make :MOVE Motor ``||Kitronik_Move_Motor.move Forward at speed 50||`` using the block from the ``||Kitronik_Move_Motor.Motors||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||`` category. 

#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (Kitronik_Move_Motor.sensorDigitalDetection(Kitronik_Move_Motor.LfSensor.Left, Kitronik_Move_Motor.LightSelection.Dark)) {
        
    } else if (Kitronik_Move_Motor.sensorDigitalDetection(Kitronik_Move_Motor.LfSensor.Right, Kitronik_Move_Motor.LightSelection.Dark)) {
        
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    }
})
```

### Step 4
Now the ``||logic:if||`` ``||Kitronik_Move_Motor.Left line following sensor||`` section. This is the action to take if :MOVE Motor starts drifting across the line towards the right. To correct this, we want to make :MOVE Motor turn to the left. Drag in **2** of the ``||Kitronik_Move_Motor.turn Left motor on direction Forward speed 0||`` blocks from the ``||Kitronik_Move_Motor.Motors||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||`` category, and place them in the top ``||logic:if||`` section. These blocks allow us to control each motor individually. Keep one exactly the same as the default, but in the other, change the first drop-down to be ``||Kitronik_Move_Motor.Right||`` and set the speed to **``"50"``**.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (Kitronik_Move_Motor.sensorDigitalDetection(Kitronik_Move_Motor.LfSensor.Left, Kitronik_Move_Motor.LightSelection.Dark)) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 0)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 50)
    } else if (Kitronik_Move_Motor.sensorDigitalDetection(Kitronik_Move_Motor.LfSensor.Right, Kitronik_Move_Motor.LightSelection.Dark)) {
        
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    }
})
```

### Step 5
We're going to do something very similar in the ``||logic:else if||`` section, but change the direction we make :MOVE Motor turn, as this time we want to correct it drifting left by turning to the right. Add in 2 more ``||Kitronik_Move_Motor.turn Left motor on||`` blocks, placing them in the empty ``||logic:else if||`` section.  
Make one ``||Kitronik_Move_Motor.turn Left motor on direction Forward at speed 50||``, and the other the ``||Kitronik_Move_Motor.Right motor||`` at speed **``"0"``**.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (Kitronik_Move_Motor.sensorDigitalDetection(Kitronik_Move_Motor.LfSensor.Left, Kitronik_Move_Motor.LightSelection.Dark)) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 0)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 50)
    } else if (Kitronik_Move_Motor.sensorDigitalDetection(Kitronik_Move_Motor.LfSensor.Right, Kitronik_Move_Motor.LightSelection.Dark)) {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 50)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 0)
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    }
})
```

### Step 6
CODING COMPLETE! If you have a @boardname@ connected, click ``|Download|`` to transfer your code and switch on :MOVE Motor.  
Now, create a continuous track for :MOVE Motor to drive around and set it going. The line should be about 10-12mm wide (thin insulation tape is great for this).  
If you find :MOVE Motor is struggling to follow the line, you could try changing the sensor sensitivity by adding a ``||Kitronik_Move_Motor.set sensors to Low/Medium/High sensitivity||`` block in an ``||basic:on start||`` block. You can also adjust the speed :MOVE Motor is driving.

#### ~ tutorialhint
```blocks
Kitronik_Move_Motor.sensorSetup(Kitronik_Move_Motor.DetectorSensitivity.High)
```