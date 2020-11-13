### @explicitHints true

# :MOVE Motor Corrigeren motorafwijking

### Introductie @unplugged
De gele motortjes zijn prima motortjes. Maar ze draaien niet altijd allebei precies op dezelfde snelheid als ze dat wel zouden moeten doen. 
In deze les leer je hoe je er voor kan zorgen dat beide motoren even hard draaien als je het ``||Kitronik_Move_Motor.ga vooruit||`` blok gebruikt, zodat de :MOVE Motor netjes in een rechte lijn kan rijden.

![:MOVE Motor front view](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-front.jpg)

### Stap 1
Voordat we aanpassingen doen, moeten we eerst uitzoeken naar welke kant de :MOVE Motor afbuigt als die recht vooruit zou moeten rijden.
Zet daarom eerst een ``||Kitronik_Move_Motor.ga vooruit met snelheid 75||`` blok in het ``||basic:de hele tijd||`` blok.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
})
```

### Stap 2 @unplugged
Als je een @boardname@ hebt aangesloten, klik dan op ``|Download|``om je code erop te zetten. Zet nu het robotje aan. Zorg wel dat de :MOVE Motor de ruimte heeft om te rijden. Kijk goed of je de :MOVE Motor naar links of naar rechts ziet neigen. 

Misschien rijdt je robotje meteen perfect rechtdoor en dan zijn er geen aanpassingen nodig. Weet  echter wel dat de motorsnelheid beïnvloed wordt door hoe vol je batterijen nog zijn. Dus je robotje blijft misschien niet de hele tijd keurig rechtdoor rijden.

### Stap 3
Om de draaisnelheid van de motoren aan te passen, heb je het volgende codeblok nodig: ``||Kitronik_Move_Motor.afwijking naar links||``. Plaats dat in het ``||basic:de hele tijd||`` blok, boven het blok ``||Kitronik_Move_Motor.ga vooruit||``. 
Als :MOVE Motor tijdens het testen naar links neigde, kies dan via het witte driehoekje voor ``||Kitronik_Move_Motor.rechts||``. Laat bij een afwijking naar rechts het woord ``||Kitronik_Move_Motor.links||`` in het bovenste blok staan.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    Kitronik_Move_Motor.motorBalance(Kitronik_Move_Motor.SpinDirections.Left, 0)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
})
```

### Stap 4
Om niet steeds weer nieuwe code te hoeven downloaden naar de @boardname@ iedere keer als we de waarde van het ``||Kitronik_Move_Motor.afwijking naar||`` blok  willen veranderen, gaan we de knoppen A en B  en een variabele gebruiken. 
Maak een variabele met de naam ``||variables:waardeAfwijking||``. Plaats nu een  ``||variables:stel waardeAfwijking in op 0||`` in het ``||basic:bij opstarten||`` blok. Pak een ``||input:wanneer knop A wordt ingedrukt||`` blok en plaats daar een ``||variables:verander waardeAfwijking met -1||`` blok in. Voeg tot slot een ``||variables:waardeAfwijking||`` blokje in het ``||Kitronik_Move_Motor.afwijking naar links/rechts||`` blok. 

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    waardeAfwijking += -1
})
let waardeAfwijking = 0
basic.forever(function () {
    Kitronik_Move_Motor.motorBalance(Kitronik_Move_Motor.SpinDirections.Left, waardeAfwijking)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
})
```

### Stap 5
Pak nu ook een  ``||input:wanneer knop B wordt ingedrukt||`` blok en plaats daarin het blok: ``||variables:verander waardeAfwijking met 1||``.  
Als je een @boardname@ hebt aangesloten, klik dan op ``|Download|`` om je code erop te zetten.
Laat :MOVE Motor nu weer rijden en probeer verschillende waarden voor de afwijking uit door op ``||input:knop A||`` of ``||input:knop B||`` te drukken. (Ter info: de waarde van de variabele kan variëren tussen 0 tot 10).

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    waardeAfwijking += -1
})
input.onButtonPressed(Button.B, function () {
    waardeAfwijking += 1
})
let waardeAfwijking = 0
basic.forever(function () {
    Kitronik_Move_Motor.motorBalance(Kitronik_Move_Motor.SpinDirections.Left, waardeAfwijking)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
})

```

### Stap 6
Hopelijk rijdt :MOVE Motor in een rechte lijn als je de goede waarde voor de variabele  ``||variables:waardeAfwijking||`` hebt gevonden. We doen nog een paar kleine aanpassingen. Zo is het bijvoorbeeld handig om te weten welk getal er bij de huidige  ``||variables:waardeAfwijking||`` hoort. Pak daarvoor een ``||input:wanneer knop A+B wordt ingedrukt||`` blok, en plaats daarin het volgende: ``||basic:toon nummer||`` ``||variables:waardeAfwijking||``. 

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.AB, function () {
    basic.showNumber(waardeAfwijking)
})
```

### Stap 7
Tot slot kunnen we er nog voor zorgen dat  ``||variables:waardeAfwijking||`` tussen de 0 en de 10 blijft. Ga naar het ``||input:knop A||`` blok, en voeg een ``||logic:als anders||`` statement toe, waarbij je het blok  ``||variables:verander waardeAfwijking met -1||`` in het ``||logic:als||`` gedeelte plaatst. De blokken moeten nu controleren of dit waar is: ``||logic:als||`` ``||variables:waardeAfwijking||`` ``||logic:> 0||``.  In het ``||logic:anders||`` gedeelte moet komen te staan: ``||variables:stel waardeAfwijking in op 0||``.  


#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    if (waardeAfwijking > 0) {
        waardeAfwijking += -1
    } else {
        waardeAfwijking = 0
    }
})
```

### Stap 8
Doe hetzelfde als in de vorige stap voor de code in het ``||input:knop B||`` blok. Nu moet de code echter controleren of dit klopt: ``||logic:als||`` ``||variables:waardeAfwijking||`` ``||logic:< 10||``. Zet tot slot ``||variables:stel waardeAfwijking in op 10||`` in het ``||logic:anders||`` gedeelte.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    if (waardeAfwijking > 0) {
        waardeAfwijking += -1
    } else {
        waardeAfwijking = 0
    }
})
input.onButtonPressed(Button.B, function () {
    if (waardeAfwijking < 10) {
        waardeAfwijking += 1
    } else {
        waardeAfwijking = 10
    }
})
```

### Stap 9
KLAAR! Als je een @boardname@ hebt aangesloten, klik dan op ``|Download|`` om je code erop te zetten. Je kunt nu de afwijking van een van de motoren corrigeren zonder dat je een te grote of te kleine waarde krijgt. Verder kun je zien welke waarde je hebt gekozen door te drukken op ``||input:knop A+B||``. Die waarde kun je nu ook gebruiken voor het instellen van de  ``||Kitronik_Move_Motor.afwijking||`` als je aan andere projecten werkt.