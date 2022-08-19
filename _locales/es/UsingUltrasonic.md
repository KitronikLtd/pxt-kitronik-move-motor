### @activities true
### @explicitHints true

# :MOVE Motor Ultrasonic Sensor

## Introduction
### Introduction Step @unplugged
Aprenda a utilizar el sensor de distancia ultrasónico de :MOVE Motor para detectar objetos y mantenerse a cierta distancia de ellos.

![:MOVE Motor front view](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-front.jpg)

### Step 1
Primero, usemos el sensor para mostrar la distancia a un objeto.
Comience creando una variable llamada ``||variables:distancia||`` y coloque el bloque ``||variables:establecer distancia para ||`` en el bucle ``||basic:para siempre||``.
Haga ``||variables:distancia||`` igual a ``||Kitronik_Move_Motor.medir distancia||`` soltando el bloque dentro (esto se puede encontrar en la sección ``||Kitronik_Move_Motor.Sensores||`` de la categoría ``||Kitronik_Move_Motor.MOVE Motor||``).

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
})
```

### Step 2
Ahora agregue un bloque ``||basic:mostrar número||`` debajo del bloque de variables establecidas.
Coloque la variable ``||variables:distancia||`` dentro del bloque ``||basic:mostrar número||``.

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    basic.showNumber(distance)
})
```

### Step 3
Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código y encienda :MOVE Motor. A continuación, mueva un cuadro delante del motor :MOVE y vea que la pantalla de micro:bit muestra la distancia hasta el cuadro.

## Follow the Object
### Follow the Object @unplugged
Ahora que conocemos la distancia a la caja, podemos usarla para accionar los motores y hacer que el :MOVE Motor siga la caja si se aleja.

### Step 1
Comience eliminando el bloque ``||basic:mostrar numero||``, luego agregue una declaración ``||logic:si||``, con ``||variables:distancia||`` ``|| lógica:> 10||`` como condición de prueba.
Dentro del bloque ``||logic:si||``, haga que :MOVE Motor ``||Kitronik_Move_Motor.mover adelante||`` si se cumple la condición.

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    }
})
```

### Step 2
Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código y encienda :MOVE Motor.
Coloque un cuadro delante del motor :MOVE y, a medida que lo aleja, verá que sigue el motor :MOVE.
Pero hay un problema. ¡Solo arrancamos los motores!

### Step 3
Esto significa que los motores arrancan tan pronto como la caja está a más de 10 cm de distancia, pero nunca se detienen, por lo que el motor :MOVE seguirá funcionando.
Tenemos que parar cuando estemos más cerca del objeto.
Por lo tanto, haga clic en el icono ``||logic:+||`` para agregar una declaración ``||logic:si no||`` y coloque un bloque ``||Kitronik_Move_Motor.parar||`` dentro.

#### ~ tutorialhint

![Animación que muestra cómo agregar una instrucción else](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/add-else-statement-stop.gif)

```ghost
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else {
        Kitronik_Move_Motor.stop()
    }
})

```

### Step 4
Si tiene un @boardname@ conectado, haga clic en ``|Download|`` para transferir su código y encienda :MOVE Motor.
Como antes, coloque una caja frente al motor :MOVE y observe cómo se aleja la caja, pero esta vez se detiene cuando se acerca a 10 cm.

### Step 5
Actualmente, el código solo permite que :MOVE Motor siga al objeto si se aleja. Si el objeto se acerca, queremos invertir el :MOVE Motor.
Para ello, necesitamos otra condición de prueba para comprobar si la distancia es inferior a 10 cm. Si es así, damos marcha atrás.

Haga clic en el icono ``||logic:+||`` en el bloque ``||logic:si no||`` para agregar una declaración ``||logic:si no si||``.
Ponga ``||variables:distancia||`` ``||logic:< 10||`` como la condición de prueba, y haga :MOVE Motor ``||Kitronik_Move_Motor.atras||`` si la condición se cumple.

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (distance < 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 100)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 6
Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código y encienda :MOVE Motor.
Ahora intente hacer que el motor :MOVE avance y retroceda a medida que mueve la caja.

## Free Roaming
### Free Roaming @unplugged
¡Excelente! El motor :MOVE ahora puede moverse hacia adelante y hacia atrás, manteniendo la misma distancia de la caja a medida que la mueve.
Pero solo puede moverse en línea recta. Sería mucho mejor si pudiera conducir por sí mismo y no chocar contra las cosas...

### Step 1
Para convertir :MOVE Motor en un robot itinerante libre, solo necesitamos hacer algunos cambios en nuestro código.
Comience moviendo el bloque ``||Kitronik_Move_Motor.parar||`` a la sección ``||logic:si no si||``, arriba del bloque ``||Kitronik_Move_Motor.atrás||``.
Luego, haga clic en el ícono ``||logic:-||`` en la declaración ``||logic:si no||`` para eliminarlo.

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (distance < 10) {
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 100)
    }
})
```

### Step 2
A continuación, agregue ``||basic:pausa||`` de 500 ms después de ``||Kitronik_Move_Motor.parar||``, y ``||basic:pausa||`` de 1 segundo después de ``||Kitronik_Move_Motor.atrás||`` bloque.
También queremos reducir un poco la velocidad de :MOVE Motor cuando está evitando obstáculos, así que cambie la velocidad ``||Kitronik_Move_Motor.atrás||`` a 50.

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (distance < 10) {
        Kitronik_Move_Motor.stop()
        basic.pause(500)
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
        basic.pause(1000)
    }
})
```

### Step 3
Finalmente, necesitamos hacer que :MOVE Motor se aleje del obstáculo que ha detectado.
Agregue un bloque ``||Kitronik_Move_Motor.girar izquierda a velocidad 50||`` a la sección ``||logic:si no, si||``, seguido de otros 500ms ``||basic:pausa||`` y un bloque ``||Kitronik_Move_Motor.parar||``.

#### ~ tutorialhint
```blocks
let distance = 0
basic.forever(function () {
    distance = Kitronik_Move_Motor.measure()
    if (distance > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (distance < 10) {
        Kitronik_Move_Motor.stop()
        basic.pause(500)
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
        basic.pause(1000)
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 50)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 4
¡CODIFICACIÓN COMPLETA! Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código y encienda :MOVE Motor.
Ahora coloque :MOVE Motor en el suelo y observe cómo se desplaza evitando obstáculos.