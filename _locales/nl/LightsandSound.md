### @activities true
### @explicitHints true

# :MOVE Motor Licht en geluid

## Introductie
### Introductie @unplugged
Leer hoe je de lichten van de :MOVE Motor gebruikt als koplampen, achterlichten en knipperlichten, en hoe je een politiewagen maakt met zwaailichten en een sirene. 

Heb je een tip nodig? Klik dan op het lampje in het blauwe rondje.

![:MOVE Motor angled view with lights](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-lights.jpg)

## Voor- en achterlichten
### Stap 1
Laten we beginnen met het instellen van de koplampen en de achterlichten voor de  :MOVE Motor.  
Plaats in het blok ``||basic:bij opstarten||`` het blok ``||variables:stel moveMotorZIP in op||`` ``||Kitronik_Move_Motor.MOVE Motor met 4 ZIP LEDs||`` van het onderdeel ``||Kitronik_Move_Motor.Lichten||`` van de ``||Kitronik_Move_Motor.MOVE Motor||`` categorie . Zo maak je de ZIP LEDs op de :MOVE Moter klaar voor gebruik.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
```

### Stap 2
Maak aparte variabelen voor de koplampen en voor de achterlichten, ``||variables:koplampen||`` en ``||variables:achterlichten||``.  Dat kun je doen door op het witte driehoekje te klikken dat naast moveMotorZIP staat. 

Gebruik het  ``||variables:stel variabele in op||`` blok om ``||variables:koplampen||`` gelijk te maken aan ``||Kitronik_Move_Motor.reeks vanaf 0 met 2 leds||`` en ``||variables:achterlichten||`` gelijk te maken aan ``||Kitronik_Move_Motor.reeks vanaf 2 met 2 leds||``. Plaats deze blokken in het ``||basic:bij opstarten||`` blok. De koplampen (lampje 0 en 1 van de reeks) kun je nu apart aansturen. Datzelfde geldt voor de achterlichten (lampje 2 en 3 van de reeks).

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let koplampen = moveMotorZIP.range(0, 2)
let achterlichten = moveMotorZIP.range(2, 2)
```

### Stap 3
Geef nu de lampjes de juiste kleur. Kies wit voor de koplampen en rood voor de achterlichten.  
Plaats twee ``||Kitronik_Move_Motor.toon kleur||`` blokken van het onderdeel ``||Kitronik_Move_Motor.Lichten||`` van de categorie ``||Kitronik_Move_Motor.MOVE Motor||`` in het ``||basic:de hele tijd||`` blok om de gekozen kleur zichtbaar te maken . Door op het witte driehoekje te klikken, kun je de gewenste kleur selecteren. Zet de variabelen ``||variables:koplampen||`` en ``||variables:achterlichten||`` elk in een apart codeblok. De goede variabele kun je ook via het witte driehoekje selecteren.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let koplampen = moveMotorZIP.range(0, 2)
let achterlichten = moveMotorZIP.range(2, 2)
basic.forever(function () {
    koplampen.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
    achterlichten.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
})
```

### Stap 4
Als je een @boardname@ hebt aangesloten, klik dan op ``|Download|`` om je code erop te zetten. Zet vervolgens de :MOVE Motor aan en de lichten gaan branden!

### Automatische lichten @unplugged
:MOVE Motor heeft nu lichten die de hele tijd branden, maar bij echte wagens staan de lichten niet de hele tijd aan. Ze gaan alleen aan als het donker wordt. 
Veel moderne auto's hebben lichten die automatisch aangaan als de hoeveelheid licht beneden een bepaald niveau komt en voor :MOVE motor kunnen we dat ook regelen...

### Stap 5
Het LED-schermpje van de micro:bit (de 25 LED-lampjes voorop) kan ook dienst doen als lichtsensor, die we kunnen gebruiken als een schakelaar om de lichten van de :MOVE motor aan en uit te zetten.

Haal de ``||Kitronik_Move_Motor.toon kleur||`` blokken uit het ``||basic:de hele tijd||`` blok, en laat ze er even naast staan. Plaats vervolgens een ``||logic:als ... dan||`` blok uit de ``||logic:Logisch||`` categorie in het ``||basic:de hele tijd||`` blok.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let koplampen = moveMotorZIP.range(0, 2)
let achterlichten = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (true) {
    	
    }
})
```

### Stap 6
Laat de lichten nu alleen aangaan als de waarde die de lichtsensor doorgeeft kleiner is dan 20. Voeg daarvoor het  blok  ``||input:lichtniveau||`` (zie categorie ``||input:Input||``) in een ``||logic:...< 20||`` blok. En plaats dat blok in het ``||logic:als||`` blok, dat op deze manier checkt of de waarde onder de 20 is of niet.  Plaats nu de ``||Kitronik_Move_Motor.toon kleur||`` blokken terug en zet ze in het ``||logic:als||`` blok.

**Let op: ** het kan zijn dat je een hoger of lager getal dan 20 moet kiezen. Dat hangt af van het lichtniveau in je omgeving. Tijdens het testen werkte 20 goed.



#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let koplampen = moveMotorZIP.range(0, 2)
let achterlichten = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (input.lightLevel() < 20) {
        koplampen.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
        achterlichten.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    }
})
```

### Stap 7
Als je een @boardname@ hebt aangesloten, klik dan op ``|Download|`` om je code erop te zetten.   
Probeer er nu voor te zorgen dat er minder licht op het micro:bit-schermpje valt en kijk of de lichten van :MOVE Motor vanzelf aangaan.

### Stap 8
De lichten gaan nu aan als het donker genoeg is, maar vanaf dat moment blijven ze de hele tijd aan, ook als het weer lichter wordt. We moeten de code daarom zo aanpassen dat de lichten weer uit gaan als het lichtniveau hoog genoeg is.

Klik op het ``||logic:+||`` icoontje onderaan op het  ``||logic:als||`` blok om een ``||logic:anders||`` gedeelte toe te voegen. Plaats daar vervolgens een ``||Kitronik_Move_Motor.wissen||`` blok in en daaronder een ``||Kitronik_Move_Motor.tonen||`` blok uit het ``||Kitronik_Move_Motor.Lichten||`` onderdeel van de ``||Kitronik_Move_Motor.MOVE Motor||`` categorie.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let koplampen = moveMotorZIP.range(0, 2)
let achterlichten = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (input.lightLevel() < 20) {
        koplampen.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
        achterlichten.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    } else {
        moveMotorZIP.clear()
        moveMotorZIP.show()
    }
})
```

### Stap 9
Als je een @boardname@ hebt aangesloten, klik dan op ``|Download|`` om je code erop te zetten en deze uit te testen door het lichtniveau te vari&euml;ren. Je zult de lichten van de :MOVE motor nu aan en uit zien gaan.



## Knipperlichten

### Introduction @unplugged
Nu we hebben geregeld dat de :MOVE motor koplampen en achterlichten heeft, is het tijd om knipperlichten toe te voegen voor als het robotje naar links of rechts gaat.

### Stap 1
De code voor het linker knipperlicht moet anders zijn dan voor het rechter knipperlicht. Maar het verschil is niet zo groot. Daarom is het handig om een zogenoemde  ``||functions:functie||`` te gebruiken.  
Klik op **Geavanceerd** om extra blok-categorie&euml;n zichtbaar te maken. Kies de categorie ``||functions:Functies||`` en klik op ``||functions:Maak een functie...||``.
Voeg een **Tekst**-parameter toe door op het woord Tekst te klikken en type **richting** in het rechter tekstvak. Type in het linker tekstvak **knipperen** als de naam van de functie. Klik daarna op **Klaar**. 

#### ~ tutorialhint

![Animation that shows how to create a function](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/nl_create-function.gif)

```ghost
function knipperen (richting: string) {
	
}
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let koplampen = moveMotorZIP.range(0, 2)
let achterlichten = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (input.lightLevel() < 20) {
        koplampen.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
        achterlichten.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    } else {
        moveMotorZIP.clear()
        moveMotorZIP.show()
    }
})
```

### Stap 2
Plaats een ``||logic:als||`` blok in het functie-blok, en klik twee keer op het ``||logic:+||`` icoon. Zo voeg je een ``||logic:anders als||`` en een ``||logic:anders||`` gedeelte toe. Het ``||logic:anders||`` gedeelte hebben we echter niet nodig. Klik daarom op het onderste ``||logic:-||`` icoon om deze weg te halen. 
Met het ``||logic:als||`` gedeelte gaan we checken of de bewering variabele `` ||variables:richting||`` ``||logic:=||`` **links** klopt (haal `` ||variables:richting||`` uit het ``||functions:function||`` blok door erop te klikken en dit blok daarna te slepen). Doe hetzelfde voor het ``||logic:anders als||`` gedeelte, maar vul dan **rechts** in.
**Let op:** Gebruik het blok met het ``||logic:=||`` teken dat tekst vergelijkt, niet het blok dat getallen vergelijkt.

#### ~ tutorialhint
```blocks
function knipperen (richting: string) {
    if (richting == "links") {
    	
    } else if (richting == "rechts") {
    	
    }
}
```

### Stap 3
Tijd om het linkerlicht te laten knipperen. Plaats een ``||loops:4 keer herhalen||`` blok in het ``||logic:als||`` statement dat kijkt of de waarde **links** is, en plaats daarin een blok ``||Kitronik_Move_Motor.zet ZIP LED ||`` 0 en 3 op oranje. Zet daaronder een ``||Kitronik_Move_Motor.tonen||`` blok.

#### ~ tutorialhint
```blocks
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
function knipperen (richting: string) {
    if (richting == "links") {
        for (let index = 0; index < 4; index++) {
            moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.show()
        }
    } else if (richting == "rechts") {
    	
    }
}
```

### Stap 4
Als de functie wordt aangeroepen, gaan de ZIP LEDs aan de linkerkant aan. Maar knipperlichten horen aan en uit te gaan. Dus we moeten nog pauzes toevoegen en tussendoor de LEDs ook uitzetten.
Voeg na het ``||Kitronik_Move_Motor.tonen||`` blok een ``||basic:pauzeer||`` van 200 ms toe, gevolgd door een ``||Kitronik_Move_Motor.wissen||`` blok en een ``||Kitronik_Move_Motor.tonen||`` blok. Voeg tot slot nog een  200 ms ``||basic:pauzeer||`` blok toe. De knipperlichten moeten nu vier keer aan en uit gaan.

#### ~ tutorialhint
```blocks
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
function knipperen (richting: string) {
   if (richting == "links") {
        for (let index = 0; index < 4; index++) {
            moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.show()
            basic.pause(200)
            moveMotorZIP.clear()
            moveMotorZIP.show()
            basic.pause(200)
        }
    } else if (richting == "rechts") {
    	
    }
}
```

### Stap 5
De code voor het rechter knipperlicht is bijna hetzelfde. Klik daarom met de rechtermuisknop op het ``||loops:herhalen||`` blok  om het te kopi&euml;ren, samen met alle blokken die erin staan.  Plaats de gekopieerde code in het ``||logic:anders als||`` gedeelte. Je hoeft nu alleen de nummers van de LEDs aan te passen. Om de rechter knipperlichten aan te sturen gebruik je de getallen 1 en 2 in het ``||Kitronik_Move_Motor.zet ZIP LED op||`` blok. 

#### ~ tutorialhint

![Animation that shows how to duplicate sections of code](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/nl_duplicate-blocks.gif)

```ghost
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
function knipperen (richting: string) {
    if (richting == "links") {
        for (let index = 0; index < 4; index++) {
            moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.show()
            basic.pause(200)
            moveMotorZIP.clear()
            moveMotorZIP.show()
            basic.pause(200)
        }
    } else if (richting == "rechts") {
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

### Stap 6
Nu is het tijd om de functie te gebruiken. Pak een ``||input:wanneer knop A wordt ingedrukt||`` blok en gebruik de ``||Kitronik_Move_Motor.MOVE Motor||`` blokken om de  :MOVE Motor vooruit te laten rijden, linksaf te laten slaan en dan te laten stoppen (daarbij heb je ook het ``||basic:pauzeer||`` blok nodig na elk ``||Kitronik_Move_Motor.ga||`` blok om :MOVE Motor tijd te geven om daadwerkelijk te bewegen).  
Voeg net voor het blok ``||Kitronik_Move_Motor.ga links||`` het blok   ``||functions:aanroep knipperen||`` toe dat je vindt bij de ``||functions:Functies||`` categorie. Type **links** in het tekstvlak van dit blok (waar abc staat). 

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(1000)
    knipperen("links")
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, 20)
    basic.pause(1000)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
})
function knipperen (richting: string) {}
```

### Stap 7
Maak een kopie van het ``||input:knop A||`` blok en selecteer ``||input:knop B||``. Klik daarvoor op het witte driehoekje.  Verander ``||Kitronik_Move_Motor.ga links||`` in ``||Kitronik_Move_Motor.ga rechts||``, en type in het functieblok nu het woord **links** in plaats van **rechts**.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(1000)
    knipperen("links")
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, 20)
    basic.pause(1000)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
})
input.onButtonPressed(Button.B, function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(1000)
    knipperen("rechts")
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, 20)
    basic.pause(1000)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
})
function knipperen (richting: string) {}
```

```ghost
knipperen = true
knipperen = false
```

### Stap 8
Als je een @boardname@ hebt aangesloten, klik dan op ``|Download|`` om je code erop te zetten en deze uit te testen door op ``||input:knop A||`` of  ``||input:knop B||`` te drukken. Als het goed is gaan de knipperlichten aan voordat de :MOVE Motor links- of rechtsaf gaat. Als er weinig licht is, levert de code voor de automatische koplampen en achterlichten misschien problemen. Maar daar kunnen we wat aan doen.

### Stap 9
We kunnen de koplampen en achterlichten tijdelijk uitzetten als de knipperlichten van de :MOVE motor aangaan. Maak daarvoor een nieuwe variabele met de naam ``||variables:AanHetKnipperen||``. Stel deze in op ``||logic:waar||`` aan het begin van de functie ``||functions:Knipperen||`` en op ``||logic:onwaar||`` aan het eind. 

Tot slot is er nog een aanpassing nodig in het ``||basic:de hele tijd||`` blok. Plaats in dit blok nog een ``||logic:anders ... dan||`` blok dat de code alleen moet uitvoeren ``||logic:als niet||`` ``||variables:AanHetKnipperen||``.  **Let op:** je moet hiervoor een apart blok met de tekst **niet** erop gebruiken waar je het ``||variables:AanHetKnipperen||`` blok inplakt.

#### ~ tutorialhint
```blocks
let AanHetKnipperen = false
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let koplampen = moveMotorZIP.range(0, 2)
let achterlichten = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (!(AanHetKnipperen)) {
        if (input.lightLevel() < 20) {
            koplampen.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
            achterlichten.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
        } else {
            moveMotorZIP.clear()
            moveMotorZIP.show()
        }
    }
})
```

### Stap 10
Als je een @boardname@ hebt aangesloten, klik dan op ``|Download|`` om je code erop te zetten en deze uit te testen. De koplampen en achterlichten moeten nu niet meer aangaan als de lampjes knipperen.

## Politiewagen
### Introductie @unplugged
De lichten van de :MOVE Motor zijn nu te gebruiken als koplampen, achterlichten en knipperlichten. In het laatste deel van deze tutorial combineren we de lampjes met de zoemer van :MOVE Motor om een politiewagen te maken.

### Stap 1
Door tegelijk op de knoppen A en B te drukken, gaan we de politie-modus activeren. Kies het ``||input:wanneer knop A+B wordt ingedrukt||`` blok en plaats daar het ``||Kitronik_Move_motor.zet sirene aan||`` blok in dat is te vinden bij ``||Kitronik_Move_Motor.Geluiden||`` in de ``||Kitronik_Move_Motor.MOVE Motor||`` categorie. Dit codeblok zorgt ervoor dat de zoemer continu een sirene-geluid maakt totdat de sirene wordt uitgezet.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.AB, function () {
    Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.On)
})
```

### Stap 2
Het geluid is nu geregeld. Tijd voor de politielichten. Plaats daarvoor vier ``||Kitronik_Move_Motor.zet ZIP LED # op kleur||`` blokken in het ``||input:knop A+B||`` blok en kies de volgende kleuren:
* LED 0 op ``||variables:rood||``
* LED 1 op ``||basic:blauw||``
* LED 2 op ``||variables:rood||``
* LED 3 op ``||basic:blauw||``  
Voeg daarna een ``||Kitronik_Move_Motor.tonen||`` blok toe om de kleuren zichtbaar te maken. 

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

### Stap 3
Voeg vervolgens een  ``||basic:pauzeer||`` 1 seconde-blok toe en laat de :MOVE Motor vooruit gaan met zijn maximale snelheid.
Als je een @boardname@ hebt aangesloten, klik dan op ``|Download|`` om je code erop te zetten. Druk op ``||input:knop A+B||`` tegelijk en de :MOVE Motor rijdt weg met de sirene en rode en blauwe lichten aan. Let wel op dat de :MOVE Motor ruimte heeft om te rijden, want met deze code stopt hij niet vanzelf.

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

### Zwaailichten @unplugged
We moeten nog een paar aanpassingen doen om er echt een politiewagen van te maken met zwaailichten. Verder is het handig als de :MOVE motor na een tijdje rijden weer stopt.



### Stap 4
Kies weer een ``||loops: 4 keer herhalen||`` blok  en plaats die in het  ``||input:wanneer knop A+B wordt ingedrukt||`` blok onder het ``||Kitronik_Move_Motor.ga vooruit||`` blok. Vervang het getal 4 door 30 om ervoor de zorgen dat de code in het blok 30 keer wordt herhaald. Voeg het ``||Kitronik_Move_Motor.verplaats kleur ZIP LEDs met 1||`` blok toe, gevolgd door een ``||Kitronik_Move_Motor.tonen||`` blok en een ``||basic:pauzeer||`` 100 ms blok. Doordat de kleuren steeds een LED opschuiven, lijkt het op een zwaailicht.

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

### Stap 5
``||Kitronik_Move_Motor.stop||`` de :MOVE motor en ``||Kitronik_Move_Motor.zet sirene uit||`` nadat de lampjes 30 keer van kleur veranderd zijn .

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

### Stap 6
Als je de politielichten en sirene hebt uitgetest, heb je misschien gemerkt dat de voor- en achterlichten weer voor problemen zorgen. We moeten die weer tijdelijk uitschakelen.  
Maak een nieuwe variabele met de naam ``||variables:politie||``, en stel die in als ``||logic:waar||`` aan het begin van de code van het ``||input:wanneer knop A+B wordt ingedrukt||`` blok, en als ``||logic:onwaar||`` aan het einde. Tot slot gaan we terug naar het  ``||basic:de hele tijd||`` blok met het ``||logic:als||`` statement. Plaats daar een extra blok in zodat er staat: ``||logic:als niet||`` ``||variables:AanHetKnipperen||`` ``||logic:en niet||`` ``||variables:politie||``.  Deze aanpassing zorgt ervoor dat de voor- en achterlichten niet proberen aan te gaan als de :MOVE motor de knipperlichten moet gebruiken of in de politiestand staat.

#### ~ tutorialhint
```blocks
let AanHetKnipperen = false
let politie = false
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let koplampen = moveMotorZIP.range(0, 2)
let achterlichten = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (!(AanHetKnipperen) && !(politie)) {
        if (input.lightLevel() < 20) {
            koplampen.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
            achterlichten.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
        } else {
            moveMotorZIP.clear()
            moveMotorZIP.show()
        }
    }
})
```

### Stap 7
KLAAR! Als je een @boardname@ hebt aangesloten, klik dan op ``|Download|`` om je code erop te zetten en deze uit te testen. 

Druk tegelijk op ``||input:knop A+B||``. Als het goed is, hoor je nu de sirene aangaan en zie je de zwaailichten in actie terwijl de :MOVE motor vooruit rijdt zonder dat de code voor de voor- en achterlichten voor problemen zorgt.
