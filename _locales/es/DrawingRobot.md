### @activities true
### @explicitHints true

# :MOVE Motor Drawing Robot

## Introduction
### Introduction Step @unplugged
Aprenda a utilizar el motor :MOVE para dibujar formas con el soporte del lápiz.
![:MOVE Motor front view](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-front.jpg)

### Step 1
El motor :MOVE tiene un orificio de montaje de lápiz justo en el medio de las ruedas, lo que lo hace ideal para dibujar formas y todo tipo de cosas.
Comience por encontrar un bolígrafo que encaje bien en el orificio, permitiendo que la punta toque el papel debajo (un Sharpie funciona muy bien).

## Circles
### Step 1
Ahora vamos al código. Vamos a usar varias ``||functions:funciones||`` en este tutorial para hacer que dibujar diferentes formas sea mucho más fácil.
El primero va a ser un círculo grande (luego haremos uno pequeño). Haga clic en **``Avanzado``** para revelar más categorías de bloques, y luego en la categoría ``||functions:funciones||``, haga clic en ``||functions:Crear una función...||``. Nombre la función **``círculoGrande``** y haga clic en **``Listo``**.

#### ~ tutorialhint

![Create bigCircle function image](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/create-bigcircle-function.png)

### Step 2
Dentro de nuestro nuevo bloque ``||functions:función círculoGrande||``, agregue un bloque ``||Kitronik_Move_Motor.establecer un radio de giro Estrecho||`` de la sección ``||Kitronik_Move_Motor.Motores||`` de la categoría ``||Kitronik_Move_Motor.MOVE Motor||`` y cambie el menú desplegable a ``||Kitronik_Move_Motor.Estándar||``. Es este valor el que podemos cambiar para variar el tamaño de nuestros círculos.
#### ~ tutorialhint
```blocks
function bigCircle () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
}
```

### Step 3
A continuación, agregue un bloque ``||Kitronik_Move_Motor.mover Derecha a velocidad 75||``, seguido de ``||basic:pausa||`` de 4000 ms y luego ``||Kitronik_Move_Motor.parar||``.
**Nota:** Los valores dados en este tutorial para velocidades y tiempos ``||basic:pausa||`` funcionaron para nosotros, pero es posible que deba modificarlos ligeramente para que funcionen para su :MOVE Motor.

#### ~ tutorialhint
```blocks
function bigCircle () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(4000)
    Kitronik_Move_Motor.stop()
}
```

### Step 4
Estamos listos para llamar a nuestra función y dibujar un círculo. Extraiga un bloque ``||input:en el botón A presionado||``, y luego agregue el bloque ``||functions:llamar círculoGrande||`` de la categoría ``||functions:Funciones||`` . Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código y encienda :MOVE Motor.
Asegúrese de que :MOVE Motor esté sobre una hoja de papel lo suficientemente grande y tenga un bolígrafo montado, luego presione ``||input:botón A||`` para intentar dibujar un círculo.

#### ~ tutorialhint
```blocks
function bigCircle () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(4000)
    Kitronik_Move_Motor.stop()
}
input.onButtonPressed(Button.A, function () {
    bigCircle()
})
```

### Step 5
Esperemos que haya dibujado un bonito círculo en su papel; ahora vamos a habilitar :MOVE Motor para dibujar uno más pequeño.
Crea otro ``||functions:función||``, y esta vez llámalo **``círculoPequeño``**. Copie todo desde dentro del bloque ``||functions:función círculoGrande||`` y colóquelo en el bloque ``||functions:función círculoPequeño||`` (**``clic derecho``** y **``Duplicate``**).

#### ~ tutorialhint
```blocks
function smallCircle () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(4000)
    Kitronik_Move_Motor.stop()
}
```

### Step 6
Solo un par de cambios para hacer en nuestra nueva función. Cambie al menú desplegable ``||Kitronik_Move_Motor.radio de giro||`` para que sea ``||Kitronik_Move_Motor.Apretado||``, y cambie ``||basic:pausa||`` para que sea 3000ms.
#### ~ tutorialhint
```blocks
function smallCircle () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(3000)
    Kitronik_Move_Motor.stop()
}
```

### Step 7
Finalmente, elimine el bloque ``||functions:llamar círculoGrande||`` en ``||input:en el botón A presionado||`` y reemplácelo con ``||functions:llamar círculoPequeño||`` from la categoría ``||functions:Funciones||``.
Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código y encienda :MOVE Motor. Igual que antes, presione ``||input:botón A||`` para intentar dibujar un círculo más pequeño.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    smallCircle()
})
function smallCircle () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(3000)
    Kitronik_Move_Motor.stop()
}
```

## Squares
### Introduction @unplugged
Hemos hecho círculos, así que pasemos a otra forma, esta vez un cuadrado.
### Step 1
Es hora de crear otro nuevo ``||functions:función||`` y darle el nombre **``cuadrado``**.
Dentro del bloque ``||functions:función cuadrado||``, haga que :MOVE Motor comience a ``||Kitronik_Move_Motor.mover Adelante a velocidad 75||``, ``||basic:parar||`` for 500ms y luego ``||Kitronik_Move_Motor.parar||``. Este será el primer lado de nuestro cuadrado.

#### ~ tutorialhint
```blocks
function square () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
    basic.pause(500)
    Kitronik_Move_Motor.stop()
}
```

### Step 2
A continuación, extraiga un bloque ``||Kitronik_Move_Motor.giro Izquierda a velocidad 45||`` y colóquelo después de ``||Kitronik_Move_Motor.parar||``. Agregue otros 500ms ``||basic:pausa||`` y luego otro ``||Kitronik_Move_Motor.parar||``. Esta será nuestra primera esquina.
Elimine el bloque ``||functions:llamar círculoPequeño||`` en ``||input:en el botón A presionado||`` y reemplácelo con ``||functions:llamar cuadrado||`` del ` Categoría `||functions:Funciones||``.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    square()
})
function square () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
    basic.pause(500)
    Kitronik_Move_Motor.stop()
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 45)
    basic.pause(500)
    Kitronik_Move_Motor.stop()
}
```

### Step 3
Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código y encienda :MOVE Motor. **Sin** insertar un bolígrafo, presione ``||input:botón A||`` para hacer que :MOVE Motor avance hacia el primer lado y gire hacia la izquierda para la primera esquina.
Necesitamos verificar si :MOVE Motor gira 90 grados; si no es así, ajuste la velocidad del bloque ``||Kitronik_Move_Motor.giro Izquierda||``; aumentando la velocidad si **menos** de 90 grados, disminuyendo la velocidad si **más** de 90 grados. Siga descargando y probando su código hasta que esté satisfecho con el giro de la esquina.

### Step 4
Ahora que el primer lado y la esquina están ordenados, todo lo que tenemos que hacer es repetir ese código 4 veces y :MOVE Motor podrá dibujar un cuadrado.
Agrega un bucle ``||loops:repetir 4 veces||`` de la categoría ``||loops:Bucles||`` al bloque ``||functions:cuadrado de funciones||``, colocando todo lo que hay dentro las ``||functions:función||`` en el nuevo bucle.

#### ~ tutorialhint
```blocks
function square () {
    for (let index = 0; index < 4; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 45)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
}
```

### Step 5
Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código y encienda :MOVE Motor.
Coloque :MOVE Motor sobre papel, monte un bolígrafo y presione ``||input:botón A||`` para intentar dibujar un cuadrado.

## Triangles
### Introduction @unplugged
Y ahora... ¡triángulos!

### Step 1
Dibujar triángulos es bastante similar a dibujar cuadrados, solo hay un lado menos y las esquinas son un poco diferentes. Por lo tanto, cree otro nuevo ``||functions:función||``, y llámelo **``triángulo``**. Copie todo desde dentro del bloque ``||functions:cuadrado de funciones||`` y colóquelo en el bloque ``||functions:triángulo de funciones||`` (al igual que con los círculos).

#### ~ tutorialhint
```blocks
function triangle () {
    for (let index = 0; index < 4; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 45)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
}
```

### Step 2
Para hacer que :MOVE Motor dibuje un lado menos, cambie el bucle ``||loops:repetir||`` en el bloque ``||functions:triángulo de funciones||`` a solo ``||loops:repetir 3 veces||``. También necesitamos hacer esquinas más nítidas, 60 grados en lugar de 90 grados, así que cambie la velocidad de ``||Kitronik_Move_Motor.giro Izquierda||`` a 60.

#### ~ tutorialhint
```blocks
function triangle () {
    for (let index = 0; index < 3; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 60)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
}
```

### Step 3
Finalmente, elimine el bloque ``||functions:llamar cuadrado||`` en ``||input:en el botón A presionado||`` y reemplácelo con ``||functions:llamar triángulo||`` de la categoría ``||functions:Funciones||``.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    triangle()
})
function triangle () {
    for (let index = 0; index < 3; index++) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 60)
        basic.pause(500)
        Kitronik_Move_Motor.stop()
    }
}
```

### Step 4
¡CODIFICACIÓN COMPLETA! Si tiene un @boardname@ conectado, haga clic en ``|Descargar|`` para transferir su código y encienda :MOVE Motor. Coloque :MOVE Motor sobre papel, monte un bolígrafo y presione ``||input:botón A||`` para intentar dibujar un triángulo. Si :MOVE Motor no vuelve al punto de partida, varíe la velocidad ``||Kitronik_Move_Motor.giro Izquierda||`` para ajustar el ángulo de la esquina; aumentando la velocidad si necesita ser menos agudo, disminuyendo la velocidad si necesita ser más agudo. Siga descargando y probando su código hasta que esté satisfecho con el giro de la esquina.