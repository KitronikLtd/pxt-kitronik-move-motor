### @explicitHints true

# :MOVE Motor Advanced Motor Adjustment

### Introduction Step @unplugged
Los motores son geniales, pero incluso cuando se supone que son idénticos, no siempre funcionan a la misma velocidad.
En este tutorial, vamos a aprender cómo ajustar las salidas de motor individuales en :MOVE Motor para que siga funcionando en línea recta.

![:MOVE Motor front view](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-front.jpg)

### Step 1
Antes de comenzar a realizar ajustes, debemos verificar en qué dirección :MOVE Motor tiende a girar cuando se supone que debe conducir en línea recta.
En el bucle ``||basic:para siempre||``, agregue un bloque ``||Kitronik_Move_Motor.mover adelante a la velocidad de 100||``

#### ~ tutorialhint
```blocks
basic.forever(function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
})
```

### Step 2
Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código.
Asegúrese de que haya una buena área abierta para que :MOVE Motor funcione y luego enciéndalo. Observe con atención y vea si tiende a ir hacia la izquierda o hacia la derecha.
(Es posible que funcione en una línea perfecta, en cuyo caso no es necesario ajustarlo. Sin embargo, los motores también se ven afectados por el voltaje de la batería, por lo que es posible que no se mantenga recto para siempre).

### Step 3
Para ajustar realmente los motores, deberá tirar del bloque ``||Kitronik_Move_Motor.sesgo a la izquierda por 0||``. Póngalo en el bucle ``||basic:para siempre||``, encima del bloque ``||Kitronik_Move_Motor.mover Adelante||``. Si :MOVE Motor giró más a la izquierda en su prueba, establezca el menú desplegable en ``||Kitronik_Move_Motor.Derecha||``; de lo contrario, déjelo como ``||Kitronik_Move_Motor.Izquierda||``.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    Kitronik_Move_Motor.motorBalance(Kitronik_Move_Motor.SpinDirections.Left, 0)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
})
```

### Step 4
En lugar de tener que seguir reprogramando @boardname@ cada vez que el número de polarización necesita cambiarse, vamos a usar los botones en su lugar.
Cree una variable llamada ``||variables:valorSesgo||`` y en el bloque ``||basic:al iniciar||``, ``||variables:establecer valorSesgo a 0||``. Agregue un bloque ``||input:al presionar el botón A||`` y luego coloque un bloque ``||variables:cambiar valorSesgo por -1||`` dentro. Finalmente, coloque ``||variables:valorSesgo||`` en el bloque ``||Kitronik_Move_Motor.sesgo a Izquierda/Derecha||``.

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
Agrega un bloque ``||input:al presionar el botón B||`` y dentro de ``||variables:cambiar valoSesgo por 1||``.
Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código.
Configure :MOVE Motor en marcha nuevamente, probando diferentes valores de polarización presionando ``||input:botón A||`` o ``||input:botón B||``. (**Nota:** El sesgo puede estar en el rango de 0 a 10).

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
Con suerte, el bloque de polarización con la configuración correcta ahora significa que :MOVE Motor se mueve en línea recta. Solo vamos a hacer algunos cambios más en el código para que sea más útil. Para empezar, sería útil saber cuál es el ``||variables:valorSesgo||`` actual. Agrega un bloque ``||input:al presionar el botón A+B||``, y luego dentro ``||basic:mostrar numero||`` ``||variables:valorSesgo||``.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(biasValue)
})
```

### Step 7
Finalmente, queremos asegurarnos de no intentar establecer ``||variables:valorSesgo||`` en algo fuera del rango 0-10.
En el bloque ``||input:boton A||``, agregue una declaración ``||logic:si si no||``, colocando ``||variables:cambiar valorSesgo por -1||`` dentro la sección ``||logic:si||``. La condición de prueba debe ser ``||logic:si||`` ``||variables:valorSesgo||`` ``||logic:> 0||`` En ``||logic:si||`` sección, ``||variables: establezca valorSesgo en 0||``.
Haga lo mismo para el bloque ``||input:al presionarse el botón B||``, pero la condición de prueba debe ser ``||logic:si||`` ``||variables:valorSesgo||`` ``||logic:< 10||``, y ``||variables:establecer valorSesgo a 10||`` en la sección ``||logic:si no||``.

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
¡CODIFICACIÓN COMPLETA! Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código. Ahora puede ajustar la polarización del motor como antes, pero ahora no puede configurarlo fuera de los límites y puede ver qué valor tiene presionando ``||input:botones A+B||``. Una vez que tenga este valor, puede ingresar el valor en el bloque ``||Kitronik_Move_Motor.sesgo||`` para cualquier otro código.