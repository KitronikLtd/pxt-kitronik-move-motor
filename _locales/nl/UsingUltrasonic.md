### @activities true
### @explicitHints true

# :MOVE Motor Ultrasone Sensor

## Introductie
### Introductie @unplugged
Leer hoe je de ultrasone sensor van de :MOVE Motor kunt gebruiken om voorwerpen te “zien” en hoe je het robotje afstand kunt laten houden van voorwerpen en obstakels kunt laten ontwijken.

![:MOVE Motor front view](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-front.jpg)

### Stap 1
We gebruiken de ultrasone sensor eerst om de afstand tot een voorwerp te meten. Maak een variabele met de naam ``||variables:afstand||`` en plaats het blok ``||variables:stel afstand in op||`` in een ``||basic:de hele tijd||`` blok. Maak de variabele ``||variables:afstand||`` gelijk aan de waarde van het blok ``||Kitronik_Move_Motor.meet afstand||``. Dit groene blok vind je in de categorie ``||Kitronik_Move_Motor.Sensoren||`` van de speciale :MOVE motor-blokken.


#### ~ tutorialhint
```blocks
let afstand = 0
basic.forever(function () {
    afstand = Kitronik_Move_Motor.measure()
})
```

### Stap 2
Voeg een ``||basic:toon nummer||`` blok onder het blok ``||variables:stel variabele in op||``  ``||Kitronik_Move_Motor.meet afstand||``. Plaats de variabele ``||variables:afstand||``, die je vindt in de categorie ‘Variabelen’, in het ``||basic:toon nummer||`` blok.


#### ~ tutorialhint
```blocks
let afstand = 0
basic.forever(function () {
    afstand = Kitronik_Move_Motor.measure()
    basic.showNumber(afstand)
})
```

### Stap 3
Je kunt nu je code ``|Download|`` naar de micro:bit en de :MOVE Motor aanzetten. Zet een doos voor het robotje en lees op het LED-schermpje af wat de afstand is tot de doos. Het getal geeft de afstand in centimeters weer.

## Volg een voorwerp
### Volg een voorwerp @unplugged
Nu we weten wat de afstand tot de doos is, kunnen we dat gebruiken om de :MOVE Motor de doos te laten volgen als je de die naar achteren beweegt. Dan moeten de motortjes dus aangaan. 


### Stap 1
Verwijder eerst het ``||basic:toon nummer||`` blok, en voeg een ``||logic:als||`` statement toe om te testen of de afstand groter dan 10 is, oftewel ``||variables:afstand||`` ``||logic:> 10||``. Gebruik het ``||Kitronik_Move_Motor.ga vooruit||`` blok om het robotje te laten rijden als dit statement waar is, oftewel als de afstand groter is dan 10.

#### ~ tutorialhint
```blocks
let afstand = 0
basic.forever(function () {
    afstand = Kitronik_Move_Motor.measure()
    if (afstand > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    }
})
```

### Uittesten maar @unplugged
Je kunt nu je code ``|Download|`` naar de micro:bit en de :MOVE Motor aanzetten.

Plaats de doos voor de :MOVE Motor en zie hem achter de doos aan rijden als je de doos naar achteren beweegt. 

Maar er is nog wel een probleem. We zetten de motortjes alleen maar aan! Dat betekent dat de motoren aan gaan zodra de afstand tussen de sensor van het robotje en de doos meer dan 10 centimeter is, maar dat ze nooit stoppen, en de :MOVE Motor dus maar door blijft rijden. 

### Stap 2
Het robotje moet stoppen als het weer dicht bij een voorwerp komt. Klik daarom op de ``||logic:+||`` linksonder om een ``||logic:anders||`` statement toe te voegen en plaats daar een ``||Kitronik_Move_Motor.stop||`` blok van de speciale :MOVE Motor-blokken in.

#### ~ tutorialhint

![Animation that shows how to add an else statement](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/nl_add-else-statement-stop.gif)

```ghost
let afstand = 0
basic.forever(function () {
    afstand = Kitronik_Move_Motor.measure()
    if (afstand > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else {
        Kitronik_Move_Motor.stop()
    }
})

```

### Nog een test @unplugged
Je kunt nu je code ``|Download|`` naar de micro:bit en de :MOVE Motor aanzetten.

Zet nu opnieuw een doos voor de :MOVE Motor en beweeg deze naar achteren. Nu volgt de :MOVE Motor de doos weer, maar deze keer stopt die ook als die dichtbij komt (op een afstand minder dan 10 centimeter).

### Stap 3
Het robotje rijdt nu alleen vooruit, achter een voorwerp aan. We gaan de code zo aanpassen dat het robotje de andere kant op rijdt als die dicht bij de doos komt. Hiervoor moeten we controleren of de afstand kleiner is dan 10 centimeter. Als dat het geval is, gaat de robot achteruit. 
Klik op de ``||logic:+||`` om een ``||logic:anders als||`` blok toe te voegen. Plaats daar een ``||variables:afstand||`` ``||logic:< 10||`` blok in als testconditie en laat de :MOVE Motor ``||Kitronik_Move_Motor.achteruit||`` rijden als aan deze voorwaarde wordt voldaan.


#### ~ tutorialhint
```blocks
let afstand = 0
basic.forever(function () {
    afstand = Kitronik_Move_Motor.measure()
    if (afstand > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (afstand < 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 100)
    } else {
        Kitronik_Move_Motor.stop()
    }
})
```

### Stap 4
Je kunt nu je code ``|Download|`` naar de micro:bit en de :MOVE Motor aanzetten.
Probeer het robotje nu voor- en achteruit te laten rijden als je de doos beweegt.

## Vrij rondrijden
### Vrij rondrijden @unplugged
Mooi! De :MOVE Motor kan nu voor- en achteruit gaan, terwijl die dezelfde afstand tot de doos houdt. Maar het robotje wijkt niet van zijn rechte lijn af. Zou het niet veel leuker zijn als die zelfstandig rond kon rijden zonder tegen obstakels aan te botsen...


### Stap 1
Daarvoor zijn nog een paar wijzigingen in de code nodig. Begin met het verplaatsen van het ``||Kitronik_Move_Motor.stop||`` blok naar het ``||logic:anders als||`` gedeelte en plaats het boven het ``||Kitronik_Move_Motor.ga achteruit||`` blok.
Door op de onderste  ``||logic:-||``  te klikken, kun je nu het ``||logic:anders||`` statement verwijderen.


#### ~ tutorialhint
```blocks
let afstand = 0
basic.forever(function () {
    afstand = Kitronik_Move_Motor.measure()
    if (afstand > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (afstand < 10) {
        Kitronik_Move_Motor.stop()
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 100)
    }
})
```

### Stap 2
Voeg vervolgens een 500 ms ``||basic:pauzeer||`` blok toe achter het ``||Kitronik_Move_Motor.stop||`` blok, en plaats een ``||basic:pauzeer||`` 1 seconde achter het ``||Kitronik_Move_Motor.ga achteruit||`` blok. Het is verder handig als de :MOVE Motor wat langzamer rijdt als die obstakels ontwijkt. Pas daarom de ``||Kitronik_Move_Motor.ga achteruit||`` snelheid aan van 100 naar 50.


#### ~ tutorialhint
```blocks
let afstand = 0
basic.forever(function () {
    afstand = Kitronik_Move_Motor.measure()
    if (afstand > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (afstand < 10) {
        Kitronik_Move_Motor.stop()
        basic.pause(500)
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, 50)
        basic.pause(1000)
    }
})
```

### Stap 3
Tot slot moet de :MOVE Motor nog wegdraaien als die een obstakel heeft gedetecteerd.
Voeg daarom een ``||draai links met snelheid 50||`` blok toe aan het ``||logic:anders als||`` gedeelte, gevolgd door een 500 ms ``||basic:pauzeer||`` blok en een ``||Kitronik_Move_Motor.stop||`` blok.


#### ~ tutorialhint
```blocks
let afstand = 0
basic.forever(function () {
    afstand = Kitronik_Move_Motor.measure()
    if (afstand > 10) {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 100)
    } else if (afstand < 10) {
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

### Stap 4
KLAAR! Je kunt nu je code ``|Download|`` naar de micro:bit en de :MOVE Motor aanzetten.
Zet hem op de vloer en kijk hoe de :MOVE Motor rondrijdt en obstakels ontwijkt.
