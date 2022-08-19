### @activities true
### @explicitHints true

# :MOVE Motor Radio Control Transmitter (controller code)

## Introduction
### Introduction @unplugged
Aprenda a usar el motor :MOVE con control de radio para conducir su buggy (esto requerirá dos BBC micro:bit). El código en el editor de la izquierda será para el controlador (también conocido como transmisor). El código en el editor de la derecha será para el buggy (también conocido como receptor). Este tutorial tomará una guía paso a paso de ambos lados del código.

![:MOVE Motor angled view with lights](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-lights.jpg)

## Basic Drive Forward
### Step 1
Para empezar, para ayudar a saber qué micro:bit es cuál, mostraremos una letra en la pantalla para que podamos identificar qué micro:bit es el transmisor y cuál el receptor. Agregue ``||basic.show cadena||`` y agregue la letra "T" en ``||basic.onStart||``. Esto indicará que este es el transmisor micro: bit.

#### ~ tutorialhint
```blocks
basic.showString("T")
```

### Step 2
Dialogo de micro:bit radio en grupos. Necesitamos configurar el grupo de radio en el que están los dos micro:bit, para que se comuniquen entre sí. El grupo puede ser cualquier número del 1 al 255, en este ejemplo usaremos 1. Si hay varios pares de radio de micro:bit, cada par debe usar un número diferente.
Desde la sección de radio, coloca ``||radio:establecer grupo||`` en el bloque ``||basic.onStart||`` y establece el grupo en 1.

#### ~ tutorialhint
```blocks
basic.showString("T")
radio.setGroup(1)
```

### Step 3
Queremos enviar un mensaje de radio al :MOVE Motor para que haga algo, como avanzar al presionar un botón. Al enviar cualquier mensaje de radio le enviaremos un nombre y un valor. El nombre actúa como una 'clave', por lo que el receptor sabe qué valor ha recibido.
Agregue ``||input:al presionarse el botón A||``. Para enviar el mensaje, desde la sección de radio agregue ``||radio:enviar valor||`` esto nos permitirá enviar un nombre y valor al :MOVE Motor.
El nombre será una dirección y el valor será nuestra velocidad. Establezca el nombre en "Adelante" y el valor en 100.
#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    radio.sendValue("Forward", 100)
})
```

### Step 4
Ahora tenemos un controlador básico para enviar un mensaje al :MOVE Motor para que avance. Conecte su BBC micro:bit y haga clic en ``|Descargar|``. Una vez programado, encienda el BBC micro:bit y compruebe que aparece una letra "T" en la pantalla.


### Transmitter Code Done @unplugged
Ahora tenemos un transmisor básico. Haga clic en el botón Aceptar en el editor derecho y comience a trabajar en el código del receptor. Una vez que se complete el tutorial, regrese y haga clic en Aceptar para pasar a la siguiente etapa.
![Right Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/right-arrow.jpg)

## Controllable speed 

### Adjustable speed control @unplugged
Ahora que tenemos el motor :MOVE avanzando, podemos usar los sensores del transmisor BBC micro:bit para controlar la velocidad del motor :MOVE.

### Step 5
Vamos a crear una variable llamada "paso", colocamos ``||variables:configurar paso||`` en el ciclo para siempre.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = 0
})
```

### Step 6
Ahora necesitamos configurar la variable "paso" para obtener su valor del acelerómetro del micro: bit.
Desde los bloques de entrada en la sección "...más", inserte ``||input:rotación||`` en el bloque ``||variables:establecer paso||``.
Asegúrese de que la selección del bloque esté configurada en "timbre". La variable lee el acelerómetro y cambia a medida que mueve el micro:bit
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
})
```

### Step 7
paso da un número de -90 a 90. Esto representa el ángulo de inclinación del micro:bit. Para impulsar adelante tomaremos los valores positivos. Debajo del conjunto de variables, agregue ``||logic:si||`` para verificar si el tono de la variable es mayor que 0.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch > 0) {
    	
    }
})
```

### Step 8
Como se mencionó anteriormente, el paso nos da un número de hasta 90, sin embargo, la velocidad del motor sube a 100. Este es un buen momento para usar un bloque llamado mapa. Esto nos permite mapear el rango de un número a una nueva escala.
Cree una nueva variable llamada "velocidad". Coloca ``||variables:set speed||`` al comienzo de nuestro corchete ``||logic:if||``. Desde la sección Matemáticas, agregue ``||math:ajustar intervalo||`` en el bloque ``||variables:establecer velocidad||``.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch > 0) {
        speed = Math.map(0, 0, 1023, 0, 4)
    }
})
```

### Step 9
Ahora necesitamos ingresar el rango de números que queremos cambiar. La primera entrada debe ser el valor que queremos cambiar, este será "tono". Los siguientes dos números son los números alto y bajo de la variable, esto es 0 y 90.
Las últimas dos entradas serán la nueva escala a la que queremos que cambie nuestro valor, esto coincidirá con el rango de velocidad del motor de 0 a 100.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch > 0) {
        speed = Math.map(pitch, 0, 90, 0, 100)
    }
})
```

### Step 10
Mueva ``||radio:enviar Valor||`` de ``||input:al presionar el botón A||`` a después de la configuración de "velocidad". Inserte la variable "velocidad" en ``||radio:enviar Valor||`` donde se envía la velocidad (actualmente 100).
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch > 0) {
        speed = Math.map(pitch, 0, 90, 0, 100)
        radio.sendValue("Forward", speed)
    }
})
```

### Step 11
Conecte su transmisor BBC micro:bit y haga clic en ``|Descargar|``. Probemos el código y veamos cómo controla la velocidad en el motor :MOVE.

### Step 12
¿El motor :MOVE solo funcionaba cuando el micro:bit estaba inclinado hacia atrás? Cambiemos esto para que cuando el micro:bit se incline hacia adelante, el motor :MOVE se mueva hacia adelante. Para hacer esto, debemos verificar si la variable "paso" es un número negativo.
Cambie la condición ``||logic:si||`` de mayor que ``||logic:>||`` a menor que ``||logic:<||``.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch < 0) {
        speed = Math.map(pitch, 0, 90, 0, 100)
        radio.sendValue("Forward", speed)
    }
})
```

### Step 13
Los valores de velocidad que hemos estado enviando eran números positivos cada vez. Ahora necesitamos cambiar el número negativo a un rango útil para los motores. Esto se puede hacer cambiando los números de bloque del mapa. Cambia el número 90 a -90
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch < 0) {
        speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", speed)
    }
})
```

### Step 14
Haga clic y ``|Descargar|`` el código al controlador micro:bit y vea si los controles se han invertido. Cuando su código esté funcionando, pasemos a la siguiente sección.

### Changing Directions @unplugged
El controlador puede cambiar la velocidad de avance. Es hora de hacer que :MOVE Motor responda a la marcha atrás.

### Step 15
Actualmente estamos buscando si el valor de "tono" es menor que '0'. Ahora tenemos que buscar que sea mayor que '0'. Por lo tanto, haga clic en el icono ``||logic:+||`` dos veces para agregar ``||logic:si no||`` haga clic en ``||logic:-||`` al lado de ` `||logic:si no||`` para eliminar la condición else.
En la condición ``||logic:si no, si||``, comprueba si el tono es mayor que '0'.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch < 0) {
        speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", speed)
    } else if (pitch > 0) {
    	
    } 
})
```

### Step 16
Duplique el bloque ``||variables:establecer velocidad||`` y colóquelo en el corchete de abajo. Duplique ``||radio:enviar Valor||`` y colóquelo debajo del bloque ``||variables:establecer velocidad||`` recién copiado
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch < 0) {
        speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", speed)
    } else if (pitch > 0) {
    	speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", speed)
    }
})
```

### Step 17
Los valores en estos bloques duplicados son ligeramente incorrectos. Ajustemos estos para que funcionen para conducir en reversa. En primer lugar, cambie el texto en ``||radio:radio enviar Valor||`` de "Adelante" a "Atrás". Como el paso para invertir es un número positivo, cambie el bloque de mapa recién copiado de -90 a 90.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (pitch < 0) {
        speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", speed)
    } else if (pitch > 0) {
    	speed = Math.map(pitch, 0, 90, 0, 100)
        radio.sendValue("Reverse", speed)
    } 
})
```

### Step 18
Haga clic y ``|Descargar|`` el código al controlador micro:bit.
### Transmitter Code Pause @unplugged
Ahora tenemos un código de transmisor que puede ordenar hacia adelante y hacia atrás. A continuación, debemos ajustar el código micro:bit del receptor para aceptar los nuevos comandos enviados por radio. Haga clic en el botón Aceptar en el editor derecho y comience a trabajar en el código del receptor. Una vez que se complete el tutorial, regrese y haga clic en Aceptar para pasar a la siguiente etapa.
![Right Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/right-arrow.jpg)


## Adding a safety switch 

### Transmitter Code Pause @unplugged
El motor :MOVE se mueve cuando se mueve el micro:bit. Esto puede ser frustrante cuando accidentalmente mueves el micro:bit sin querer. Podemos evitar esto agregando lo que se llama un "interruptor de hombre muerto".
Este tipo de interruptor está diseñado para requerir que el usuario lo presione, o lo que sea que esté siendo controlado se detiene. A menudo se encuentran en los trenes.

### Step 19
Para el motor :MOVE, podemos envolver la declaración "si paso < 0" if dentro de otra declaración "si entonces" para que solo esté activa si el interruptor de hombre muerto está activado.
Agregue un ``||logic:si||`` debajo de ``||variables:establecer paso||``, y mueva el anterior ``||logic:si no||`` al superior ``||logic:si||`` corchete.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (true) {
      if (pitch < 0) {
        speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", speed)
      } else if (pitch > 0) {
        speed = Math.map(pitch, 0, 90, 0, 100)
        radio.sendValue("Reverse", speed)
    } 
})
```

### Step 20
Agregue ``||input:al presionar el botón A||`` en la parte superior de la declaración if recién insertada. El botón A se convertirá en nuestro interruptor de hombre muerto, y solo enviaremos mensajes de movimiento cuando se presione el botón A.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (input.buttonIsPressed(Button.A)) {
      if (pitch < 0) {
        speed = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", speed)
      } else if (pitch > 0) {
        speed = Math.map(pitch, 0, 90, 0, 100)
        radio.sendValue("Reverse", speed)
    } 
})
```

### Step 21
Cuando no se presiona el botón A, queremos que :MOVE Motor se detenga. Presione ``||logic:+||`` para agregar otra cosa, luego agregue otra ``||radio:radio enviar valor||`` en el corchete ``||logic:si no||`` Para enviar la mensaje "Stop" con un número '0'.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    if (input.buttonIsPressed(Button.A)) {
      if (pitch < 0) {
        mappedDrive = Math.map(pitch, 0, -90, 0, 100)
        radio.sendValue("Forward", speed)
      } else if (pitch > 0) {
        mappedDrive = Math.map(pitch, 0, 90, 0, 100)
        radio.sendValue("Reverse", speed)
      }
    } 
    else {
       radio.sendValue("Stop", 0)
    }  	
})
```

### Step 22
Haga clic y ``|Descargar|`` el código al controlador micro:bit. Probemos el código para ver si solo puede controlar el motor :MOVE mientras se presiona el botón A. Esto funcionará porque anteriormente agregamos un controlador predeterminado para mensajes que no conocemos, y esto tiene la misma característica segura de detener el motor :MOVE.

### Transmitter Code Done @unplugged
Hagamos un resumen de lo que hemos aprendido hasta ahora.
+ Cómo enviar y recibir un mensaje de radio
+ Que un mensaje recibido puede ser 'manejado', y podemos tener un manejador por defecto para mensajes que no conocemos.
+ Lectura de entradas sensoriales para controles
+ Envío de mensajes requeridos para controlar motores
+ Implementación de un interruptor de hombre muerto

Todo esto es solo para ir conduciendo el :MOVE Motor hacia adelante y hacia atrás.
Ahora es el momento de ver cómo podemos conducir nuestro buggy con solo dos ruedas.

## Adding steering 

### Steering the buggy @unplugged
Bien hecho en el código hasta ahora. La dirección en :MOVE Motor requiere que los motores funcionen a diferentes velocidades.
Para permitir una dirección suave, la entrada izquierda/derecha deberá combinarse con la entrada de avance/retroceso. Esto se conoce como mezcla.
Si la combinación se realiza correctamente, se obtendrá una gama completa de dirección y dirección para el motor :MOVE.

La siguiente sección agregará otra entrada de sensor para controlar la dirección del motor :MOVE.

### Step 23

Primero elimine todo el código en el bloque ``||logic:si||`` ``||input:al presionarse el botón A||``.
Todavía queremos el interruptor Dead mans, pero cambiaremos mucho el código que envía los mensajes.
Use la pantalla de sugerencias si no está seguro de cómo debería verse su código después.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch =  input.rotation(Rotation.Pitch)
    if (input.buttonIsPressed(Button.A)) {
   
    } 
    else {
       radio.sendValue("Stop", 0)
    }  	
})
```

### Step 24
Anteriormente, usamos la entrada de tono de los sensores en el micro: bit de la BBC.
Hay otra entrada llamada "rodar" que funciona de la misma manera pero en el eje Y en lugar del eje X.
Cree una llamada de variable "roll" e inserte un ``||variables:establecer roll||`` debajo del bloque ``||variables:establecer paso||``.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    roll = 0
    if (input.buttonIsPressed(Button.A)) {
      
    } 
    else {
       radio.sendValue("Stop", 0)
    }  	
})
```

### Step 25
Desde los bloques de entrada en la sección ``||input:...mas||``, inserte ``||input:rotación||`` en el bloque ``||variables:establecer roll||``.
Asegúrese de que el bloque esté configurado para "girar" en el cuadro de selección.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
      
    } 
    else {
       radio.sendValue("Stop", 0)
    }  	
})
```

### Blending sensor inputs @unplugged
Ahora tenemos 2 entradas del controlador. Los combinaremos para dar las diferentes velocidades de los motores. Entonces necesitaremos enviar 2 mensajes, uno para cada velocidad del motor, en lugar de un simple comando "Adelante" o "Retroceso".

### Step 26
Previamente, invertimos el valor de tono en el mapeo al rango del motor. Aquí lo invertiremos antes de combinar las entradas.
Agregue un bloque ``||Math:0-0||`` de la sección ``||Math:Matemática||`` y tome el valor de tono de 0.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = 0 - input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
    } else {
        radio.sendValue("Stop", 0)
    }
})
```

### Step 27
Para combinar los valores de cabeceo y balanceo, pensamos en cómo deberían variar las velocidades del motor con los valores de entrada.
Para girar a la izquierda queremos hacer rodar el micro:bit a la izquierda. Esto da un valor de rollo negativo.
Al girar a la izquierda, el motor izquierdo está en el interior, por lo que gira más lento.
Si sumamos el valor del balanceo al valor del motor (del cabeceo) esto es lo que sucede.
El motor correcto necesita girar más rápido, así que tomamos el valor de balanceo del valor del motor (quitar un número negativo es equivalente a sumarlo)
Cree 2 variables, denominadas "izquierda" y "derecha" para los valores combinados que controlarán cada motor, luego mezcle el tono y gire en ellos usando ``||math:+||`` y ``||math:-||`` bloques

#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = 0 - input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        left = pitch + roll
        right = pitch - roll

    } else {
        radio.sendValue("Stop", 0)
    }
})
```

### Step 28 
Ahora que hemos combinado las entradas, podemos asignarlas al rango del motor.
Tenemos rangos de entrada de -90 a +90 y los motores toman una velocidad de -100 a +100.
Cree 2 variables para las velocidades del motor llamadas "velocidadMotorIzquierdo" y "velocidadMotorDerecho" y use el bloque ``||math:ajustar intervalo||``


#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = 0 - input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        left = pitch + roll
        right = pitch - roll
        leftMotorSpeed = Math.map(left, -90, 90, -100, 100)
        rightMotorSpeed = Math.map(right, -90, 90, -100, 100)

    } else {
        radio.sendValue("Stop", 0)
    }
})
```

### Step 29

El valor de la velocidad de los dos motores ahora se puede enviar a través del enlace de radio. Desde la sección de radio, inserte dos ``||radio:radio enviar Valor||`` después de ``||variables:establecer velocidadMotorDerecho||``.
Podríamos usar MotorDerecho y MotorIzquierdo para identificar los mensajes, pero el enlace de radio solo permite 8 letras para el nombre, así que usemos los nombres "IMotor" y "DMotor". Agregue estos nombres en los bloques de radio que se han insertado.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = 0 - input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        left = pitch + roll
        right = pitch - roll
        leftMotorSpeed = Math.map(left, -90, 90, -100, 100)
        rightMotorSpeed = Math.map(right, -90, 90, -100, 100)
        radio.sendValue("LMotor", 0)
        radio.sendValue("RMotor",0)
    } else {
        radio.sendValue("Stop", 0)
    }
})
```

### Step 34
El valor que vamos a enviar es "velocidadMotorIzquierdo" y "velocidadMotorDerecho". Vea si puede insertar estas variables en los bloques de radio correctos.
#### ~ tutorialhint
```blocks
basic.forever(function () {
    pitch = 0 - input.rotation(Rotation.Pitch)
    roll = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        left = pitch + roll
        right = pitch - roll
        leftMotorSpeed = Math.map(left, -90, 90, -100, 100)
        rightMotorSpeed = Math.map(right, -90, 90, -100, 100)
        radio.sendValue("lMotor", leftMotorSpeed)
        radio.sendValue("rMotor", rightMotorSpeed)
    } else {
        radio.sendValue("Stop", 0)
    }
})
```

### Step 35
Haga clic y ``|Descargar|`` el código al controlador micro:bit.

### Transmitter Code Done @unplugged
Hemos cambiado mucho los mensajes de radio, por lo que ahora debemos ajustar el código del receptor en el motor :MOVE. Vamos a empezar a hacer los ajustes.
![Right Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/right-arrow.jpg)
