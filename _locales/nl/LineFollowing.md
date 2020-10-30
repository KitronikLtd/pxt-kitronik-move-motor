### @activities true
### @explicitHints true

# :MOVE Motor Lijn volgen

## Introductie
### Introductie en voorbereiding @unplugged
Leer hoe je de lijnvolgsensoren van de :MOVE Motor kunt gebruiken om dit robotje zelfstandig over een lijn te laten rijden. Gebruik een donkere lijn op een lichte achtergrond. Bijvoorbeeld zwart isolatietape op een lichte vloer of een lijn van zwarte schoolverf op een stuk papier.


![:MOVE Motor front view](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-front.jpg)

### Stap 1
De :MOVE Motor heeft aan de onderkant twee lijnvolgsensoren. Die zorgen ervoor dat het robotje het verschil kan zien tussen een donkere lijn en een lichte achtergrond. 
We willen de uitgelezen waarden van de sensoren kunnen opslaan in een variabele. Maak daarvoor twee variabelen. Geef die de namen ``||variables:sensorLinks||`` en ``||variables:sensorRechts||``. Plaats nu de volgende twee blokken in een herhaalblok: ``||variables:stel sensorLinks in op||`` en  ``||variables:stel sensorRechts in op||``.

#### ~ tutorialhint
```blocks
let sensorRechts = 0
let sensorLinks = 0
basic.forever(function () {
    sensorRechts = 0
    sensorLinks = 0
}
```

### Stap 2
Nu gaan we de sensorwaarden uitlezen. Pak het blok ``||Kitronik_Move_Motor.waarde lijnvolgsensor rechts||``, dat je vindt in het ``||Kitronik_Move_Motor.Sensoren||`` gedeelte van de speciale :MOVE Motor-blokken, en plaats dat blok in het  ``||variables:stel sensorRechts in op||``  statement. Doe hetzelfde bij het blok  ``||variables:stel sensorLinks in op||``, maar kies dan via het witte driehoekje de optie om de waarde van de linker sensor uit te lezen.

#### ~ tutorialhint
```blocks
let sensorRechts = 0
let sensorLinks = 0
basic.forever(function () {
    sensorRechts = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    sensorLinks = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
}
```

### Lijn volgen @unplugged

De analoge waarden die de sensoren doorgeven hangen af van de kleur van het oppervlak dat onder de sensoren zit. We proberen een donkere lijn op een lichte achtergrond te volgen. 

Dus als de twee sensoren, die vlak naast elkaar zitten, een verschillende waarde doorgeven betekent dat dat de ene boven de lijn staat en de andere niet. Als ze allebei dezelfde waarde doorgeven staan ze of allebei op de lijn als die breed is, of ze zien juist allebei de achtergrond als de lijn dun is. 

Omdat we de waarden van twee sensoren vergelijken, maakt het niet uit hoe hoog de  waarden zijn die de sensoren doorgeven. Het enige wat belangrijk is, is of ze wel of niet verschillend zijn.

### Stap 3
Maak een variabele met de naam ``||variables:verschilSensoren||`` om het verschil tussen de waarden van beide sensoren op te slaan.   ``||variables:Stel verschilSensoren in op||``  ``||math:sensorLinks - sensorRechts||``.  Voeg nu nog een blok toe: ``||math:absolute waarde van||`` uit de categorie ``||math:Rekenen||``.  Dit blok maakt een positief getal van negatieve getallen. Dat is handig om te gebruiken als je alleen het verschil tussen de waarden van beide sensoren wilt weten.

#### ~ tutorialhint
```blocks
let sensorRechts = 0
let sensorLinks = 0
let verschilSensoren = 0
basic.forever(function () {
    sensorRechts = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    sensorLinks = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    verschilSensoren = Math.abs(sensorLinks - sensorRechts)
}

```

### Stap 4
Als de sensorwaarden hetzelfde zijn, is de robot de lijn aan het volgen. Zoniet, dan is hij van de lijn af aan het gaan.  Plaats een ``||logic:als anders||`` blok onder het blok ``||variables:stel verschilSensoren in op||``. We gebruiken het ``||logic:anders||`` gedeelte voor als de robot nog op de lijn rijdt. Plaats een  ``||basic:toon lichtjes||`` blok in het ``||logic:anders||`` blok en teken een pijl omhoog om aan te geven dat het robotje vooruit gaat.

#### ~ tutorialhint
```blocks
let sensorRechts = 0
let sensorLinks = 0
let verschilSensoren = 0
basic.forever(function () {
    sensorRechts = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    sensorLinks = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    verschilSensoren = Math.abs(sensorLinks - sensorRechts)
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

### Stap 5
Als het robotje van de lijn af aan het gaan is, moeten we weten aan welke kant dat gebeurt. Plaats in het  ``||logic:als||`` blok een ``||logic:>||`` blok om te checken of de variabele ``||variables:verschilSensoren||`` groter is dan 10.  We maken het getal niet te klein, omdat de sensorwaarden boven dezelfde ondergrond soms toch iets verschillen. Plaats in het eerste ``||logic:als||`` blok een ``||logic:als anders||``. We gebruiken het binnenste ``||logic:als anders||`` statement om te beslissen welke kant het robotje op moet draaien om op de lijn te blijven.

#### ~ tutorialhint
```blocks
let sensorRechts = 0
let sensorLinks = 0
let verschilSensoren = 0
basic.forever(function () {
    sensorRechts = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    sensorLinks = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    verschilSensoren = Math.abs(sensorLinks - sensorRechts)
    if ((verschilSensoren > 10) ) {
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
### Sensorwaarden @unplugged
De lijnvolgsensoren van de :MOVE Motor geven een laag getal door als ze op een donker oppervlak staan, dat weinig licht reflecteert, en een hoog getal als de ondergrond een lichte kleur heeft en daardoor relatief veel licht reflecteert.

Dus als de linker sensor niet meer op een donkere lijn staat, maar op de licht gekeurde achtergrond, geeft deze een hogere waarde door dan de rechter sensor die nog wel op de zwarte lijn staat. Die kennis kunnen we in onze code gebruiken. Als de waarde van de linker sensor hoger is dan die van de rechter, moet het robotje dus een beetje bijsturen naar rechts om weer over de lijn te gaan rijden.



### Stap 6

Plaats in het binnenste ``||logic:als||`` blok een ``||logic:>||`` om te checken of ``||variables:sensorLinks||`` groter is dan ``||variables:sensorRechts||``. Als dat zo is, dan staat de linker sensor naast de lijn en de rechter sensor op de lijn.
Om het robotje weer op de lijn te krijgen, moet hij een beetje naar rechts draaien. Voeg een  ``||basic:toon lichtjes||`` blok toe en teken er een pijl in die aangeeft welke kant het robotje op moet draaien.  Plaats in het ``||logic:anders||`` gedeelte een blok met een pijl de andere kant op.


#### ~ tutorialhint
```blocks
let sensorRechts = 0
let sensorLinks = 0
let verschilSensoren = 0
basic.forever(function () {
    sensorRechts = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    sensorLinks = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    verschilSensoren = Math.abs(sensorLinks - sensorRechts)
    if ((verschilSensoren > 10) ) {
        if ((sensorLinks > sensorRechts) ) {
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

### Stap 7
Het lijnvolgalgoritme is nu compleet. Als je een @boardname@ hebt aangesloten, klink dan op ``|Download|`` om je code erop te zetten en zet de :MOVE Motor aan.  

## De logica controleren 

### De logica controleren@unplugged

Controleer nu of de logica klopt. Maak een ononderbroken parcours waar de :MOVE Motor op kan rondrijden. Ze het robotje op de lijn. Die moet ongeveer 10 tot 20 mm breed zijn (zwart isolatietape is hier perfect voor, zwarte schoolverf werkt ook goed).
We hebben nog geen code gemaakt om het robotje te laten rijden, maar door de :MOVE Motor met je hand op en naast de lijn te zetten, kun je kijken of de pijltjes op het LED-schermpje de goede kant op wijzen.


## De motortjes aansturen

### De motertjes aansturen @unplugged
Nu gaan we de pijlen vervangen door de goede codeblokken voor de motortjes, zodat de :MOVE Motor zelfstandig over de lijn kan gaan rijden.

### Stap 1
Het pijltje omhoog is het makkelijkst te vervangen, namelijk door een  ``||Kitronik_Move_Motor:ga vooruit||`` blok uit het ``||Kitronik_Move_Motor.Motoren||`` gedeelte van de speciale ``||Kitronik_Move_Motor.MOVE Motor||`` blokken. Kies 30 als snelheid. 
Vergeet niet het  ``||basic:toon lichtjes||`` blok eruit te halen. Als de micro:bit steeds andere LED-lampjes moet tonen, wordt de code te langzaam om goed te werken, oftewel om de robot op de lijn te houden.

#### ~ tutorialhint
```blocks
let sensorRechts = 0
let sensorLinksr = 0
let verschilSensoren = 0
basic.forever(function () {
    sensorRechts = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    sensorLinksr = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    verschilSensoren = Math.abs(sensorLinks - sensorRechts)
    if ((verschilSensoren > 10) ) {
        if ((sensorLinks > sensorRechts) ) {
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

### Stap 2

Nu maken we de code om het robotje terug naar de lijn te laten draaien. In het ``||logic:als (sensorLinks>sensorRechts)||`` gedeelte moet het robotje naar rechts draaien. Om dat voor elkaar te krijgen, moet alleen de linker motor aanstaan. De rechter motor moet stoppen met draaien. Vervang daarom het blok ``||basic:toon lichtjes||`` door een ``||Kitronik_Move_Motor.zet motor rechts uit||`` blok. Voeg daaronder een ``||Kitronik_Move_Motor.zet motor links aan met richting vooruit||`` toe en stel de snelheid in op 30. Pas het ``||logic:anders||`` gedeelte op vergelijkbare manier aan, alleen zet nu de linker motor uit en de rechter motor op snelheid 30.

#### ~ tutorialhint
```blocks
let sensorRechts = 0
let sensorLinks = 0
let verschilSensoren = 0
basic.forever(function () {
    sensorRechts = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Right)
    sensorLinks = Kitronik_Move_Motor.readSensor(Kitronik_Move_Motor.LfSensor.Left)
    verschilSensoren = Math.abs(sensorLinks - sensorRechts)
    if ((verschilSensoren > 10) ) {
        if ((sensorLinks > sensorRechts) ) {
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


### Stap 3
KLAAR! Download je code naar de micro:bit. Zet de :MOVE Motor op de lijn en zet hem aan. Het robotje zou nu de lijn moeten volgen.

Gaat het niet goed, dan is je lijn misschien niet donker genoeg. Ook kan de snelheid te hoog zijn. Of misschien zijn de batterijen niet vol genoeg meer.