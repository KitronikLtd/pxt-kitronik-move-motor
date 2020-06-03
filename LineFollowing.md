### @explicitHints true

# :MOVE Motor Line Following

### Introduction Step @unplugged
Learn how to use the :MOVE Motor's Line Following Sensors to navigate around a marked out track.

![:MOVE Motor front view](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-front.jpg)

### Step 1
We're going to create a simple program which continuously checks whether :MOVE Motor is drifting away from the line it's following, and makes small corrections if it is.  
Start by adding an ``||logic:if else||`` block from the ``||logic:Logic||`` category to the ``||basic:forever||`` loop. 

#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (true) {
        
    } else {
        
    }
})
```

### Step 2
Now we need to some test conditions. From the ``||Kitronik_Move_Motor.Sensors||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||`` category, drag in a ``||Kitronik_Move_Motor.Left line following sensor detects Light||`` block and put it in the top ``||logic:if||`` statement. For this example, we will be looking for the sensors to detect light as we are following a black line. If your following a light line, simples change the end drop-down to detect ``||Kitronik_Move_Motor.Dark||`` so you can detect a darker surface. 

#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (Kitronik_Move_Motor.sensorDigitalDetection(Kitronik_Move_Motor.LfSensor.Left, Kitronik_Move_Motor.LightSelection.Light)) {
        
    } else {
        
    }
})
```

### Step 3
Next we need to make :MOVE Motor take action depending on the different test conditions in our ``||logic:if else||`` block.  
We'll start with the ``||logic:if||`` section, which will be the conditional action. If the left line follow sensor has detected (in our example) light.  The :MOVE Motor is too far over to the right.  This means we have to stop the right motor moving. Add a ``||Kitronik_Move_Motor.right motor off||`` using the block from the ``||Kitronik_Move_Motor.Motors||`` section of the ``||Kitronik_Move_Motor.MOVE Motor||`` category. 

#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (Kitronik_Move_Motor.sensorDigitalDetection(Kitronik_Move_Motor.LfSensor.Left, Kitronik_Move_Motor.LightSelection.Light)) {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
    }  else {
        
    }
})
```

### Step 4
Now the ``||logic:else||`` section. If the sensor is on the line the right motor needs to move forward. Drag a ``||Kitronik_Move_Motor.turn Right motor on direction Forward speed 0||``, set the speed to 30. The speed maybe require to change depending on your line following circuit.  Ifyou go too fast, the :MOVE Motor will go past the line before the sensors have change to react.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (Kitronik_Move_Motor.sensorDigitalDetection(Kitronik_Move_Motor.LfSensor.Left, Kitronik_Move_Motor.LightSelection.Light)) {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
    }  else {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 30)
    }
})
```

### Step 5
We're going to do something very similar in another ``||logic:if else||`` section, but change the which sensor if detecting and which motor is being driven. You can right mouse click on the ``||logic:if else||`` just completed and select duplicate to recreate the code.  Place it after the code previous created. Now changed the selection ofthe line following sensor block to Right and the motors to Left
#### ~ tutorialhint
```blocks
basic.forever(function () {
    if (Kitronik_Move_Motor.sensorDigitalDetection(Kitronik_Move_Motor.LfSensor.Right, Kitronik_Move_Motor.LightSelection.Light)) {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
    } else {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 30)
    }
    if (Kitronik_Move_Motor.sensorDigitalDetection(Kitronik_Move_Motor.LfSensor.Left, Kitronik_Move_Motor.LightSelection.Light)) {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
    } else {
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 30)
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