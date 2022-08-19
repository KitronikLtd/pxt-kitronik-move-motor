### @activities true
### @explicitHints true

# :MOVE Motor Radio Control Receiver (Buggy Code)

## Introduction
### Introduction @unplugged
Lea la introducción en el editor de la izquierda y siga las instrucciones. Cuando el tutorial indique que debe comenzar con este tutorial, haga clic en el botón Aceptar para comenzar.

![Left Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/left-arrow.jpg)

## Basic Drive Forward Receiver

### Step 1
Ahora que el código del tutorial del transmisor está listo, comencemos con el código del receptor. Tendremos que programar esto en el segundo micro: bit.
Al igual que al comienzo del código del transmisor, debemos indicar qué micro: bit de la BBC es este y configurar el grupo de radio.
Agregue ``||basic.show Cadena||`` a ``||basic.onStart||`` y muestre la letra "R", esto muestra que es el receptor BBC micro:bit. Agregue ``||radio:radio establecer grupo||`` y configure su grupo para que coincida con el transmisor (usamos 1 en nuestro ejemplo).

#### ~ tutorialhint
```blocks
basic.showString("R")
radio.setGroup(1)
```

### Step 2
Ahora nuestro código está listo para recibir mensajes. Desde la sección de radio, arrastre ``||radio:al recibir radio ||``, esto tendrá las variables "name" y "value".

#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
	
})
```

### Step 3
Dentro de ``||radio:al Recibir radio||``, necesitamos verificar que el mensaje recibido es lo que estamos esperando. Si el mensaje es algo que conocemos, podemos manejarlo - llamamos controlador al código que hace algo.
Agregue ``||logic:si||`` a la función y compare el name con "Adelante".
Coloque un bloque de comparación ``||logic:igual||`` en ``||logic:si||``. Desde ``||radio:al recibir radio||``, haz clic y arrastra la variable "name" al inicio del bloque ``||logic:igual||``. Ahora agregue un bloque ``||text:texto||`` y escriba "Adelante".
La palabra "Adelante" debe escribirse igual que el código del transmisor y distingue entre mayúsculas y minúsculas.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "Forward") {
    	
    }	
})
```

### Step 4
Luego, dentro del bloque if, necesitamos decirle al :MOVE Motor que avance. Agregue ``||Kitronik_Move_Motor.move dirección||`` en el bloque if y asegúrese de que esté seleccionado "Adelante".
Haga clic y arrastre el "value" del bloque ``||radio:al recibir radio||`` a la sección de velocidad del bloque ``||Kitronik_Move_Motor.move dirección||``.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "Forward") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, value)
    }
})
```

### Step 5
Haz clic en ``|Descargar|`` para transferir tu código a tu otro micro:bit de BBC. Conéctelo al :MOVE Motor, coloque la silla de paseo en el suelo y enciéndala.
### Receiver Code Done @unplugged
Ahora tenemos dos micro: bit codificados. Si no lo ha hecho, conecte el receptor micro:bit al motor :MOVE.
Aplique energía al transmisor micro: bit (puede usar el cable USB de su computadora para esto).
Presione el botón A en su controlador y vea lo que hace el motor :MOVE. Si su código no funciona, verifique el número de su grupo de radio y cómo deletreó "Adelante" en ambos tutoriales.
Cuando esté listo, volvamos al tutorial del transmisor para la siguiente etapa.
![Left Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/left-arrow.jpg)

## Changing Directions

### Changing Directions @unplugged
Vamos a recibir nuevos mensajes de radio para tratar con el cambio de dirección y la parada. Haga clic en el botón Aceptar y comencemos.
### Step 6
En el bloque si, haga clic en el icono ``||logic:+||`` dos veces para agregar una declaración ``||logic:si no||`` y ``||logic:entonces||``. Cree una copia de la condición de declaración ``||logic:si||`` y colóquela en la entrada ``||logic:si no, si||`` a continuación.
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
Desde la condición dentro de la instrucción ``||logic:si no, si||``, agregue una verificación de comparación (similar a la anterior con la verificación de que el nombre es "Adelante") que verifica si el nombre es igual a "Atrás".
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
Ahora, agregue los bloques para controlar los motores en los corchetes ``||logic:si no, si||`` y ``||logic:entonces||``. Agregue un bloque ``||Kitronik_Move_Motor.move dirección||`` en el corchete ``||logic:si no, si||``.
Coloque la variable "value" en la entrada de velocidad (haga clic y arrastre la palabra "value" desde la parte superior del bloque ``||radio:al recibir radio||``).
Establezca la dirección para que sea "Atrás". Seleccione esto del menú desplegable en el bloque.
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
La condición final que queremos es detener los motores si recibimos un mensaje que no es "Adelante" o "Atrás". Este es un controlador predeterminado y proporciona una forma segura de capturar mensajes desconocidos. Desde la sección :MOVE Motor en motores, agregue un bloque ``||Kitronik_Move_Motor.stop||`` dentro del corchete ``||logic:entonces||``.
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
Conecte el BBC micro:bit en el :MOVE Motor y haga clic en ``|Descargar|`` para transferir su código. Es hora de probar su código para ver si podemos avanzar y retroceder.
### Receiver Code Done @unplugged
Así que el motor :MOVE funciona en dos direcciones, ¡increíble! Sin embargo, el motor :MOVE funciona cada vez que deja el transmisor en el suelo o simplemente lo golpea.
Volvamos al código del transmisor y veamos qué podemos hacer. El tutorial del transmisor le informará cuando necesitemos ajustar el código del receptor.
![Left Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/left-arrow.jpg)

## Adding Steering 

### Radio receive adjustments
Una vez más tenemos algunos mensajes de radio nuevos para tratar: Los mensajes son para cada motor, con el valor de un número positivo o negativo. Revisaremos la señal para determinar en qué dirección deben girar los motores.
### Step 11
En primer lugar, cambiemos el nombre que buscamos al recibir un mensaje. Cambie "Adelante" a "IMotor" y cambie "Atrás" a "DMotor".
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "LMotor") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, value)
    } else if (name == "RMotor") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, value)   	
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 12
Los bloques de corriente utilizados para impulsar la dirección controlan ambos motores. Sin embargo, ahora que estamos agregando dirección, necesitamos poder controlar cada uno de estos motores individualmente.
Quitemos los dos bloques de conducción del motor.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "LMotor") {
        
    } else if (name == "RMotor") {
        
    } else {
       Kitronik_Move_Motor.stop()
    }
})
```

### Step 13
Una vez que hemos comprobado para qué motor es el mensaje de radio, la siguiente comprobación es ver si es un número positivo o negativo. Agregue un ``||logic:si no||`` dentro de "if name = IMotor".
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "LMotor") {
        if (true) {

        } else {
        
        }
    } else if (name == "RMotor") {

    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 14
Agregue la comparación en el nuevo bloque de declaración ``||logic:si||``, para comprobar si "valor >= 0". Esto es para comprobar si el valor que se ha enviado es un número positivo.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "LMotor") {
        if (value >= 0) {

        } else {
        
        }
    } else if (name == "RMotor") {

    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 15
Dentro de la sección :MOVE Motor en los bloques de motor, hay ``||Kitronik_Move_Motor.turn motor||`` que permite el control de cada motor individualmente. Agregue uno de estos bloques al corchete superior de la declaración if recién agregada.
Seleccione el motor "Izquierdo" e inserte la variable "value" en la velocidad del bloque.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "LMotor") {
        if (value >= 0) {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, value)
        } else {
        
        }
    } else if (name == "RMotor") {

    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 16
Ahora tenemos que lidiar con si el valor recibido es un número negativo. Agregue otro ``||Kitronik_Move_Motor.turn motor||`` en el corchete else, una vez más seleccionando el motor "Izquierda", pero tenga la dirección inversa.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "LMotor") {
        if (value >= 0) {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, value)
        } else {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Reverse, 0)
        }
    } else if (name == "RMotor") {

    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 17
El valor recibido es un número negativo que indica la velocidad, pero a la inversa. Sin embargo, ``||Kitronik_Move_Motor.turn motor||`` no toma un número negativo. Para permitirnos usar simplemente la magnitud de un número, podemos usar el bloque ``||math.absoluto de||``.
Inserte esto en ``||Kitronik_Move_Motor.turn motor||`` luego el valor de la variable.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "LMotor") {
        if (value >= 0) {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, value)
        } else {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Reverse, Math.abs(value))
        }
    } else if (name == "RMotor") {

    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Step 18
El código del motor izquierdo está completo, este mismo código debe hacerse para el motor derecho. Vea si puede crear el mismo código pero para el motor correcto.
#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "LMotor") {
        if (value >= 0) {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Forward, value)
        } else {
            Kitronik_Move_Motor.motorOn(Kitronik_Move_Motor.Motors.MotorLeft, Kitronik_Move_Motor.MotorDirection.Reverse, Math.abs(value))
        }
    } else if (name == "RMotor") {
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
Haga clic en ``|Descargar|`` para transferir su código al :MOVE Motor. Encienda su buggy para que esté listo para recibir mensajes del controlador. No olvides encender tu controlador.

### Receiver Code Done @unplugged
Felicitaciones, ha completado el tutorial controlado por radio. Disfrute conduciendo su :MOVE Motor. ¿Por qué no ver si puede agregar funciones adicionales a su buggy, como luces y bocina en la radio?