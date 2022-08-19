### @activities true
### @explicitHints true

# :MOVE Motor Line Following

## Introduction 
### Introduction Step @unplugged
Aprenda a utilizar los sensores de seguimiento de línea del motor :MOVE para navegar por una pista marcada.
Usaremos una línea oscura sobre una superficie clara. La cinta aislante negra funciona bien para una línea en un piso liso de color claro.

![:MOVE Motor front view](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-front.jpg)

### Step 1
El motor :MOVE tiene 2 sensores debajo que le permiten seguir una línea de color contrastante con el fondo.
Comenzaremos leyendo los valores del sensor.
Cree 2 variables, llamadas ``||variables:izquierdaSensor||`` y ``||variables:derechaSensor||``
coloca ``||variables:establecer izquierdaSensor||`` y ``||variables:establecer derechaSensor||`` en el ciclo forever.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
basic.forever(function () {
    rightSensor = 0
    leftSensor = 0
}
```

### Step 2
Ahora necesitamos leer los valores de los sensores. Desde la sección ``||Kitronik_Move_Motor.Sensores||`` de la categoría ``||Kitronik_Move_Motor.MOVE Motor||``, arrastre una línea ``||Kitronik_Move_Motor.Left del sensor de linea izquierdo||`` y ponlo en la sentencia ``||variables:establecer izquierdaSensor||``. Haga lo mismo para ``||variables:establecer derechaSensor||`` pero cambie el menú desplegable para leer el valor del sensor derecho

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
}
```

### Line sensing @unplugged

Debido a que los sensores son analógicos, su valor cambia según la superficie debajo de ellos. Sabemos que estamos tratando de seguir una línea contrastante, por lo que si los 2 sensores están leyendo valores diferentes, uno debe estar en la línea y el otro apagado. Si leen lo mismo, entonces ambos están detectando la línea, si la línea es ancha, o ambos están detectando el fondo, si la línea es delgada. Debido a que podemos comparar los sensores entre sí, no importa cuál sea el valor de detección, solo si hay una diferencia o no.

### Step 3
Cree una variable llamada ``||variables:diferenciaSensores||`` para mantener la diferencia en los valores del sensor.
Establezca ``||variables:diferenciaSensores||`` para que sea ``||math:izquierdaSensor - the derechaSensor||``. Como solo nos importa si los valores son diferentes, podemos usar el bloque ``||math:Absoluto de||`` para no tener que preocuparnos por un número negativo.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = Math.abs(leftSensor - rightSensor)
}

```

### Step 4
Si los sensores son diferentes, entonces debemos estar saliendo de la línea, pero si son iguales, todavía la estamos siguiendo. Agregue un bloque ``||logic:si no||`` debajo del bloque ``||variables:establecer diferenciaSensores||``. Usaremos la sección ``||logic:si no||`` para cuando todavía estemos en la línea. Agregue un bloque ``||basic:mostrar LEDS||`` en ``||logic:si no||`` y dibuje una flecha hacia arriba para indicar que vamos hacia adelante.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = Math.abs(leftSensor - rightSensor)
    if (true) {

    } else {
basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    }
})
```

### Step 5
Si nos estamos saliendo de la línea, tendremos que decidir en qué dirección y tomar medidas correctivas. En la condición ``||logic:si||`` agregue una verificación ``||logic:>||`` para ver si ``||variables:diferenciaSensores||`` es mayor que 10. Damos la poca diferencia de rango para permitir la tolerancia en la detección. En el primer ``||logic:si||`` agregue ``||logic:si no||``. Usaremos este ``||logic:si no||`` interno para decidir en qué dirección debemos girar para permanecer en la línea.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = Math.abs(leftSensor - rightSensor)
    if ((sensorDifference > 10) ) {
        if (true) {

        } else {
        
        }
    } else {
basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    }
})
```
### Sensor Values @unplugged
Los sensores del motor :MOVE dan un valor bajo si la superficie que detectan es oscura (no reflectante) y un valor alto si la superficie es clara (reflectante).
Como estamos buscando una línea oscura sobre un fondo claro, sabemos que si el sensor izquierdo ya no está sobre la línea, pero el sensor derecho todavía está sobre la línea, entonces el valor del sensor izquierdo será mayor que el derecho. Podemos usar este conocimiento para calcular que necesitamos girar a la derecha para volver a cruzar la línea.

### Step 6
En la condición interna ``||logic:si||`` agregue una comprobación ``||logic:>||`` para ver si ``||variables:izquierdaSensor||`` es mayor que ``||variables:derechaSensor||``. Esto significa que el sensor izquierdo está fuera de línea y el sensor derecho está en línea. Para volver a la línea debemos girar a la derecha. Agregue un bloque ``||basic:mostrar LEDS||`` y dibuje una flecha para indicar en qué dirección girar. El ``||logic:si no||`` necesita girar en la otra dirección, así que agregue la flecha opuesta allí.


#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = Math.abs(leftSensor - rightSensor)
    if ((sensorDifference > 10) ) {
        if ((leftSensor > rightSensor) ) {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        } else {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        }
    } else {
basic.showLeds(`
            . . # . .
            . # # # .
            # . # . #
            . . # . .
            . . # . .
            `)
    }
})
```

### Step 7
Ese es el algoritmo de seguimiento de línea completo. Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código y encienda el :MOVE Motor.

## Check the Logic @unplugged
Ahora podemos comprobar que la lógica es correcta. Cree una pista continua para que el :MOVE Motor circule y colóquelo en la línea. La línea debe tener unos 10-20 mm de ancho (la cinta aislante negra es excelente para esto).
Todavía no hemos puesto ningún comando de conducción del motor en el código, pero al mover el :MOVE Motor con la mano de lado a lado a lo largo de la línea, debería ver las flechas LED que muestran en qué dirección girará la lógica.

## Drive the motors

### Driving the motors @unplugged
A continuación, reemplazaremos las flechas con los comandos de conducción del motor correctos, para que el motor :MOVE pueda conducirse solo.

### Step 1
La flecha más simple de reemplazar es la de línea recta en uno. Cámbielo a un bloque ``||Kitronik_Move_Motor:Move Adelante||`` de la sección ``||Kitronik_Move_Motor.Motors||`` de ``||Kitronik_Move_Motor.MOVE Motor||``. Establece la velocidad en 30. No olvides eliminar el bloque ``||basic:mostrar LEDS||``. Mostrar los LED al mismo tiempo que se sigue la línea puede hacer que el código se ejecute demasiado lento para funcionar correctamente.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = Math.abs(leftSensor - rightSensor)
    if ((sensorDifference > 10) ) {
        if ((leftSensor > rightSensor) ) {
basic.showLeds(`
            . . # . .
            . # . . .
            # # # # #
            . # . . .
            . . # . .
            `)
        } else {
        basic.showLeds(`
            . . # . .
            . . . # .
            # # # # #
            . . . # .
            . . # . .
            `)
        }
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    }
})
```

###Step 2 
Ahora tenemos que ocuparnos de volver a la línea. En ``||logic:si(izquierdaSensor>derechaSensor)||`` queremos girar a la derecha. Para ello pararemos el motor derecho y pondremos en marcha el motor izquierdo. Reemplace ``||basic:show LEDS||`` con ``||Kitronik_Move_Motor.turn el motor Izquierdo||`` usando el bloque de la sección ``||Kitronik_Move_Motor.Motors||``. Cambie el menú desplegable para que el motor ``||Kitronik_Move_Motor:Right||`` se detenga. Agregue ``||Kitronik_Move_Motor.turn Izquierda motor en dirección Adelante velocidad 0||``, y establezca la velocidad en 30. Haga un cambio similar a la sección ``||logic:si no||``, pero apague el motor izquierdo y haciendo funcionar el motor derecho a la velocidad 30.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = Math.abs(leftSensor - rightSensor)
    if ((sensorDifference > 10) ) {
        if ((leftSensor > rightSensor) ) {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        } else {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        }
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    }
})
```


### Step 3
¡CODIFICACIÓN COMPLETA! Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código.
Coloque su :MOVE Motor en la línea y enciéndalo. Debe seguir la línea.
Si no es así, es posible que no tenga una línea lo suficientemente oscura, que la velocidad sea demasiado alta o que las baterías se estén descargando.

## Iterating the Code

### Making the code more elegant @unplugged
El código hasta ahora es bastante pequeño, pero puede hacerse más eficiente y, potencialmente, ejecutarse un poco más rápido.
Al tomar el valor ``||math:absoluto de||`` de la diferencia del sensor, hacemos que el código sea más simple de seguir, pero también desechamos una pequeña parte de la información.
Si el valor es positivo, sabemos que el sensor derecho está en la línea y el izquierdo no.
En el código anterior, hacemos esta verificación por separado, pero podemos ahorrar una pequeña cantidad de cálculo al combinar la verificación "¿estamos en línea?" con la verificación "hacia dónde girar".

Software can often be improved by iteration, which is what we are about to do in the next section.

### Step 1
Vamos a utilizar el valor del signo de la diferencia del sensor para decidir qué motores encender y apagar. Comience eliminando el bloque ``||math:Absoluto de||``, de modo que ``||variables:diferenciaSensores||`` se convierta simplemente en ``||variables:izquierdaSensor||`` ``||math:-||`` ``||variables:sensorderecho||``

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = leftSensor - rightSensor
    if ((sensorDifference > 10) ) {
        if ((leftSensor > rightSensor) ) {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        } else {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        }
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    }
})
```

###Step 2
Ahora ``||variables:diferenciaSensores||`` es un valor con signo, por lo que debemos verificar si es positivo o negativo. Nuestra declaración ``||logic:si||`` ya hace esto cuando comprueba si es > 10. Presione ``||logic:+||`` en el exterior ``||logic:si|| `` para agregar una sección ``||logic:si no if||``. Duplique la condición ``||logic:si(diferenciaSensores>10)||`` y colóquela en ``||logic:si no if||``, cambiando ``||logic:>||`` a un ``||logic:<||``, y el 10 a un -10. Esto comprobará si hay diferencias negativas.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = leftSensor - rightSensor
    if ((sensorDifference > 10) ) {
        if ((leftSensor > rightSensor) ) {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        } else {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        }
    } else if ((sensorDifference <-10) ) {
    
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    }
})
```

###Step 3
El código en la declaración interna ``||logic:si||`` ahora se puede mover. ``||logic:si(diferenciaSensores>10)||`` es equivalente a ``||logic:si(izquierdaSensor>derechaSensor)||``, así que mueva ese código de control del motor fuera del ``||logic:si||``. Consulte la sugerencia si no está seguro de qué hacer.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = leftSensor - rightSensor
    if ((sensorDifference > 10) ) {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        if ((leftSensor > rightSensor) ) {
 
        } else {
            Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        }
    } else if ((sensorDifference <-10) ) {
    
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    }
})
```

###Step 4
El código en la declaración interna ``||logic:si no||`` es equivalente al código que necesitamos en ``||logic:si no, si(diferenciaSensores<-10)||``, así que muévalo a la bloque ``||logic:si no, si||``. Vuelva a comprobar la sugerencia si no está seguro de qué mover a dónde.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = leftSensor - rightSensor
    if ((sensorDifference > 10) ) {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 30)
        if ((leftSensor > rightSensor) ) {
 
        } else {

        }
    } else if ((sensorDifference <-10) ) {
                Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 30)
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    }
})
```

###Step 5
Ahora debería tener una declaración ``||logic:si no||`` vacía. Esto ya no es necesario, así que elimínelo.

#### ~ tutorialhint
```blocks
let rightSensor = 0
let leftSensor = 0
let sensorDifference = 0
basic.forever(function () {
    rightSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    leftSensor = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    sensorDifference = leftSensor - rightSensor
    if ((sensorDifference > 10) ) {
        Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorRight)
        Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, 30)
    } else if ((sensorDifference <-10) ) {
                Kitronik_Move_Motor.motorOff(Kitronik_Move_Motor.Motors.MotorLeft)
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorRight, Kitronik_Move_Motor.MotorDirection.Forward, 30)
    } else {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 30)
    }
})
```

### Step 6
Iteración completa! Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código.
Coloque su :MOVE Motor en la línea y enciéndalo. Todavía debe seguir la línea.
Si no es así, es posible que la velocidad sea demasiado alta o que las baterías se estén descargando.

### Making the code more elegant @unplugged
El código ahora es más pequeño y más eficiente. Solo hacemos una única suma para obtener la diferencia del sensor y, a partir de ahí, podemos determinar cómo controlar el motor :MOVE.
Hemos guardado una operación ``||math:Absoluto de||`` y una prueba extra ``||logic:si no||``.
Una desventaja es que, aunque el código es más pequeño y más eficiente, es un poco más difícil de seguir.
En algunos casos, la facilidad para seguir el código es más importante que la máxima eficiencia. A menudo, sin embargo, el código elegante y eficiente también es más legible.