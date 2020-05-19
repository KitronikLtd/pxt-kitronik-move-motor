input.onButtonPressed(Button.AB, function () {
    Kitronik_Move_Motor.beepHorn()
})
input.onButtonPressed(Button.B, function () {
    basic.showNumber(Kitronik_Move_Motor.measure())
})
input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(200)
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 35)
    basic.pause(200)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
    basic.pause(200)
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Right, 35)
    basic.pause(200)
    Kitronik_Move_Motor.stop()
})
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
moveMotorZIP.showRainbow(1, 360)
basic.forever(function () {
    moveMotorZIP.rotate(1)
    moveMotorZIP.show()
})
