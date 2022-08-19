### @activities true
### @explicitHints true

# :MOVE Motor Lights and Sound

## Introduction
### Introduction @unplugged
Aprende a usar las luces de :MOVE Motor para hacer faros e indicadores, y luego combínalos con el zumbador para crear un coche de policía.

![:MOVE Motor angled view with lights](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-lights.jpg)

## Headlights and Rear Lights
### Step 1
Para empezar, hagamos algunos faros y luces traseras para :MOVE Motor.  
Primero, coloque el ``||variables:establecer moveMotorZIP para||`` ``||Kitronik_Move_Motor.MOVE Motor con 4 ZIP LEDs||`` bloque de la ``||Kitronik_Move_Motor.Luces||`` sección de la ``||Kitronik_Move_Motor.MOVE Motor||`` categoría en el ``||basic:al iniciar||`` block.  
Esto configura los LED ZIP en :MOVE Motor listos para usar.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
```

### Step 2
Como vamos a tener luces delanteras y luces traseras, también necesitamos crear dos variables, ``||variables:farosDelanteros||`` y ``||variables:pilotosTraseros||``.  
En el ``||basic:al iniciar||`` bloque, use el ``||variables:configurar variable a||`` bloque para hacer ``||variables:farosDelanteros||`` igual a ``||Kitronik_Move_Motor.rango desde 0 hasta 2 leds||`` y ``||variables:pilotosTraseros||`` igual a``||Kitronik_Move_Motor.rango desde 0 hasta 2 leds||``. Los rangos separados significan que los dos juegos de luces se pueden controlar individualmente.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let headlights = moveMotorZIP.range(0, 2)
let rearlights = moveMotorZIP.range(2, 2)
```

### Step 3
Ahora debemos configurar las luces para que tengan los colores correctos: **blanco** para los faros, **rojo** para las luces traseras.  
En el ``||basic:para siempre||`` bucle, usa el ``||Kitronik_Move_Motor.mostrar color||`` bloque de la ``||Kitronik_Move_Motor.Luces||`` sección de la ``||Kitronik_Move_Motor.MOVE Motor||`` categoría para mostrar los colores. Cambie el menú desplegable para seleccionar el ``||variables:farosDelanteros||`` y ``||variables:pilotosTraseros||`` variables en los diferentes bloques.

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
Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código. A continuación, encienda :MOVE Motor y vea cómo se encienden las luces.

### Automatic Lights @unplugged
Por lo tanto, :MOVE Motor ahora tiene bonitas luces brillantes, pero en los vehículos reales, las luces no están encendidas todo el tiempo, solo deben usarse cuando está oscuro.
Muchos coches modernos tienen luces que se encienden automáticamente cuando se alcanza un cierto nivel de luz, y podemos hacer lo mismo con :MOVE Motor...

### Step 5
La pantalla LED micro:bit también puede funcionar como un sensor de luz, que luego podemos usar como un interruptor para encender y apagar las luces de :MOVE Motor.  
Arrastrar el ``||Kitronik_Move_Motor.mostrar color||`` bloques fuera de la ``||basic:para siempre||`` bucle, dejándolos a un lado, y añadir un ``||logic:si||`` bloque de la ``||logic:Lógica||`` categoria.

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
Agregue una condición de prueba a la ``||logic:si||`` declaración para comprobar si ``||input:nivel de luz||`` (encontrado en el ``||input:Entradas||`` categoría) es ``||logic:< 20||``.  
**Nota:** Es posible que sea necesario variar el número real para sus condiciones de luz particulares. 20 funcionó bien durante las pruebas.  
Finalmente, arrastre esos ``||Kitronik_Move_Motor.mostrar color||`` bloques dentro de la ``||logic:si||`` bloque.

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
Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código.
Intente variar la luz que brilla en la pantalla de micro: bit y observe cómo las luces del motor :MOVE se encienden solas.

### Step 8
Las luces ahora se encienden cuando oscurece lo suficiente, pero por el momento, permanecen encendidas para siempre. Necesitamos hacer que se apaguen nuevamente cuando los niveles de luz sean lo suficientemente altos.
Click en el ``||logic:+||`` icono en el ``||logic:si||`` bloque para añadir una ``||logic:si no||`` sección, entoces añadir un ``||Kitronik_Move_Motor.borrar||`` bloque seguido por un ``||Kitronik_Move_Motor.mostrar||`` bloque dede el ``||Kitronik_Move_Motor.Luces||`` sección de la ``||Kitronik_Move_Motor.MOVE Motor||`` categoría.

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


Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código.
Ahora, a medida que varíe los niveles de luz, las luces del motor :MOVE se encenderán y apagarán.
## Indicators
### Introduction @unplugged
Ahora que los faros y las luces traseras de :MOVE Motor están en su lugar, pasemos a indicar cuándo giramos.

### Step 1
Al indicar, vamos a querer girar o bien a la izquierda o bien a la derecha. Esto significa que vamos a necesitar usar diferentes ZIP LED para cada acción..
Sin embargo, debido a que casi todo lo demás es igual, podemos usar ``||functions:función||`` para facilitar las cosas.  
Click en **``Advanced``** para revelar más categorías de bloques, y luego en el ``||functions:Functiones||`` categoría, haga clic ``||functions:Crear una función...||``.
Añadir un **``Text``** parámetro y llamarlo **``direction``**, nombra la función **``intermitencia``** y click **``Listo``**. 

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
Añadir un ``||logic:si||`` bloque a la función, luego haga clic en el ``||logic:+||`` icono dos veces. Esto agregará un extra ``||logic:si no||`` y ``||logic:si no, si||`` Sección, pero no necesitamos la ``||logic:si no||``, así que haga clic en el ``||logic:-||`` icono para eliminarlo. 
Ahora necesitamos algunas condiciones de prueba. En el ``||logic:si||`` declaración, verifique si ``||variables:dirección||`` ``||logic:=||`` **``"izquierda"``** (arrastra ``||variables:dirección||`` desde el ``||functions:función||`` bloquear). Utilice el mismo bloque de prueba en el ``||logic:si no, si||`` declaración, pero en lugar de comprobar si hay **``"right"``**.
**Nota:** Asegúrate de usar el bloque de comparación de texto.

#### ~ tutorialhint
```blocks
function indicate (direction: string) {
    if (direction == "left") {
    	
    } else if (direction == "right") {
    	
    }
}
```

### Step 3
A continuación, debemos configurar el indicador izquierdo. Poner un``||loops:repetir 4 veces||`` bucle en el ``||logic:si||`` Comprobación de declaración de **``"left"``**, luego adentro, ``||Kitronik_Move_Motor.establecer ZIP LED||`` 0 y 3 ser naranja. Sigue esto con un ``||Kitronik_Move_Motor.mostrar||`` bloque.

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
Si se llama a la función, ahora se encenderán los LED ZIP del lado izquierdo. Pero los indicadores se encienden y apagan, por lo que debemos agregar algunas pausas y apagar los LED.
Después de ``||Kitronik_Move_Motor.mostrar||`` agregue 200 ms ``||basic:pausa||`` , seguido de ``||Kitronik_Move_Motor.borrar||`` y ``||Kitronik_Move_Motor.mostrar||``bloque, y finalmente otros 200ms ``||basic:pausa||``. El bucle ``||loops:repetir||`` hará que los indicadores se enciendan y apaguen 4 veces.

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
El código para el indicador de la derecha es casi idéntico al de la izquierda, así que haga clic con el botón derecho y duplique el ``||loops:repeti||`` bucle y todo lo que hay dentro, luego pon el nuevo código en el ``||logic:si no, si||`` sección. Lo único que queda por cambiar son los LED. Para usar las luces laterales derechas, ``||Kitronik_Move_Motor.establecer ZIP LED||`` 1 y 2 para ser naranja. 

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
Ahora que hemos completado la función, es hora de usarla. Introduzca un bloque ``||input:al presionarse el botón A||`` y use los bloques ``||Kitronik_Move_Motor.MOVE Motor||`` para hacer que :MOVE Motor avance, gire a la izquierda y luego se detenga (usted necesita ``||basic:pausa||`` después de que el movimiento se bloquee para darle a :MOVE Motor tiempo para moverse).
Inmediatamente después del bloque ``||Kitronik_Move_Motor.mover izquierda a velocidad||``, agregue el bloque ``||functions:llamada intermitencia||`` de la categoría ``||functions:Funciónes||``. Escriba **``"izquierda"``** en el bloque de llamada de función.

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
Duplica el bloque ``||input:botón A||``. Luego, cambie el menú desplegable para que sea ``||input:botón B||``, cambie ``||Kitronik_Move_Motor.mover Izquierda||`` a ``||Kitronik_Move_Motor.mover Derecha||``, y la llamada de función a **``"derecha"``**.

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

```ghost
indicating = true
indicating = false
```

### Step 8
Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código.
Presione ``||input:botón A||`` o ``||input:botón Button B||`` y vea :MOVE Motor gire e indique. Sin embargo, puede haber algunos problemas con nuestros faros automáticos, por lo que hay un par de cosas más que debemos hacer...

### Step 9
Para detener la interferencia de los faros, debemos detener temporalmente el funcionamiento de los faros. Cree una nueva variable llamada ``||variables:indicación||``, configúrela para que sea ``||logic:cierto||`` al comienzo de la función ``||functions:intermitencia||``, y ``||logic:falso||`` al final. Finalmente, coloque todo en el bucle ``||basic:para siempre||`` dentro de otra declaración ``||logic:si||`` verificando ``||logic:si no||`` ``||variables:indicación||``. Esto asegurará que cuando :MOVE Motor esté indicando, los faros no intentarán encenderse al mismo tiempo.

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
Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código.
Pruébalo. Ahora no debería haber ningún problema con los faros o los indicadores.

## Police Car
### Introduction @unplugged
Ahora podemos controlar las luces de :MOVE Motors para que sean faros delanteros, luces traseras e indicadores. En esta última sección, vamos a combinar las luces con el zumbador de :MOVE Motor para crear un coche de policía.

### Step 1
Al igual que con los indicadores, el "modo" de coche de policía se activará con la pulsación de botones. Extraiga un bloque ``||input:al presionarse el botón A+B||``, y luego agregue el bloque ``||Kitronik_Move_motor.activar sirena||`` del ``||Kitronik_Move_Motor.Sonidos||`` sección `` de la categoría ``||Kitronik_Move_Motor.MOVE Motor||``. Esto hará que el zumbador emita un sonido de sirena continuo hasta que se apague.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.AB, function () {
    Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.On)
})
```

### Step 2
Ese es el sonido ordenado, ahora para algunas luces estilo policía. También en el bloque ``||input:botón A+B||``, use 4 de los bloques ``||Kitronik_Move_Motor.establecer ZIP LED # a color||`` para establecer:
* LED 0 to ``||variables:rojo||``
* LED 1 to ``||basic:azul||``
* LED 2 to ``||variables:rojo||``
* LED 3 to ``||basic:azul||``  
Siga estos con un bloque ``||Kitronik_Move_Motor.mostrar||`` para que se muestren.

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
Luego, ingrese ``||basic:pausa||`` de 1 segundo, y luego inicie :MOVE El motor avanza al 100% de la velocidad.
Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código.
Presione ``||input:butones A+B||`` juntos y vea :MOVER Motor alejándose con sirena sonando y luces rojas y azules.

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
Eso estuvo bien, pero las luces de los coches de policía suelen parpadear y es posible que haya notado que :MOVE Motor no deja de moverse hacia adelante. Hay un par de cosas más que hacer para que el coche de policía quede perfecto.

### Step 4
Introduce otro bucle ``||loops:repetir 4 veces||`` y colócalo en el bloque ``||input:al presionarse el botón A+B||`` después del bloque ``||Kitronik_Move_Motor.mover Adelante||``, pero cambia el número de repetición a 30. Dentro de este ciclo, agrega un bloque ``||Kitronik_Move_Motor.rotar los LEDs ZIP a 1||``, seguido de un ``||Kitronik_Move_Motor.mostrar||`` y luego 100ms ``||basic:pausa||``. A medida que los colores giran alrededor de los 4 LED, parecerá que parpadean entre ``||variables:rojo||`` y ``||basic:azul||``.

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
Después de que las luces hayan completado sus 30 parpadeos, ``||Kitronik_Move_Motor.parar||`` :MOVE Motor y ``||Kitronik_Move_Motor.activar sirena apagado||``.

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
Cuando probó las luces y la sirena del coche de policía anteriormente, es posible que haya notado que los faros y las luces traseras estaban causando problemas nuevamente, por lo que debemos detener temporalmente el funcionamiento de los faros.
Cree una nueva variable llamada ``||variables:policía||``, configúrela para que sea ``||logic:cierto||`` al comienzo de ``||input:on button A+B pressed| |`` y ``||logic:falso||`` al final. Finalmente, en el bucle ``||basic:para siempre||`` primero ``||logic:si||``, cambie la verificación para que sea ``||logic:si not||`` ``||variables:indicación||`` ``||logic:y not||`` ``||variables:policía||``. Esto asegurará que cuando :MOVE Motor esté indicando o en modo de coche de policía, las luces delanteras no intentarán encenderse al mismo tiempo.

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
¡CODIFICACIÓN COMPLETA! Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código.
Intenta presionar ``||input:botones A+B||`` ahora. Mira cómo se enciende la sirena, las luces parpadean y :MOVER el motor avanza, todo sin interferencia de los faros.