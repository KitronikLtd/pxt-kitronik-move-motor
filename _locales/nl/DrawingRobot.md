### @activities true
### @explicitHints true

# :MOVE Motor Tekenrobot

## Introductie
### Introductie @unplugged
Leer hoe je de :MOVE Motor kunt gebruiken om vormen te tekenen met een pen of stift in de penhouder.

Heb je een tip nodig? Klik dan op het lampje in het blauwe rondje.


![:MOVE Motor front view](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-front.jpg)

### Stap 1
De :MOVE Motor heeft een penhouder. Die vind je tussen de beide wielen. Zoek een pen of viltstift die mooi in die penhouder past, zodat de punt op een stuk papier onder de robot kan tekenen. Zo kun je met dit robotje allerlei vormen tekenen.

## Cirkels
### Stap 1
Tijd om te programmeren. We gaan meerdere ``||functions:functies||``  gebruiken in deze les. Daarmee maken we het tekenen van verschillende vormen makkelijker.  

De eerste vorm is een grote cirkel (hierna doen we een kleine cirkel). Klik op **Geavanceerd** om meer blokcategorieC+n zichtbaar te maken, selecteer de ``||functions:Functies||`` categorie en klik op ``||functions:Maak een Functie...||``.  Noem de functie **groteCirkel** en klik op **Klaar**. 

#### ~ tutorialhint

![Create bigCircle function image](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/create-bigcircle-function.png)

### Stap 2


Voeg nu aan ons nieuwe blok  ``||functions:functie groteCirkel||`` een blok ``||Kitronik_Move_Motor.zet draaicirkel op smal||`` toe uit het ``||Kitronik_Move_Motor.Motoren||`` gedeelte van de speciale ``||Kitronik_Move_Motor.MOVE Motor||`` blokken. Vervang de tekst **smal** vervolgens door **standaard** door eerst op het witte driehoekje te klikken. Via deze waarde kunnen we de grootte van onze cirkel aanpassen.

#### ~ tutorialhint
```blocks
function groteCirkel () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
}
```

### Stap 3
Voeg nu een blok ``||Kitronik_Move_Motor.ga rechts met snelheid 75||`` toe, gevolgd door een ``||basic:pauzeer||`` blok met daarin 4000 ms en daaronder het blok ``||Kitronik_Move_Motor.stop||``.  De getallen voor de snelheid en pauze-tijd werkten voor ons, maar je moet ze misschien iets aanpassen om ervoor te zorgen dat ze ook voor jouw :MOVE Motor goed werken.

#### ~ tutorialhint
```blocks
function groteCirkel () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(4000)
    Kitronik_Move_Motor.stop()
}
```

### Stap 4
Nu kunnen we de functie gebruiken door hem aan te roepen en kunnen we een cirkel tekenen. Pak een  ``||input:wanneer knop A wordt ingedrukt||`` blok en voeg daar het blok ``||functions:aanroep groteCirkel||`` uit de categorie``||functions:Functies||`` aan toe. Als je een @boardname@ hebt aangesloten, klik dan op ``|Download|`` om je code erop te zetten en zet de :MOVE Motor aan.  

Zorg dat je robotje op een groot genoeg stuk papier staat en de stift erin zit. Druk op ``||input:knop A||`` om een cirkel te tekenen.

#### ~ tutorialhint
```blocks
function groteCirkel () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(4000)
    Kitronik_Move_Motor.stop()
}
input.onButtonPressed(Button.A, function () {
    groteCirkel()
})
```

### Stap 5
Hopelijk tekende je robot een mooie cirkel - nu gaan we code maken om :MOVE Motor een kleine cirkel te laten tekenen.

Maak een nieuwe ``||functions:functie||`` en noem die dit keer **kleineCirkel **. Kopieer alle code van het blok``||functions:functie groteCirkel||`` en plaats dat in het ``||functions:functie kleineCirkel||`` blok. (Klik met je **rechtermuisknop** op de code die je wilt kopiC+ren en klik daarna op **Dupliceren**).

#### ~ tutorialhint
```blocks
function kleineCirkel () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Standard)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(4000)
    Kitronik_Move_Motor.stop()
}
```

### Stap 6
Nu zijn er een paar aanpassingen nodig. Verander ``||Kitronik_Move_Motor.zet draaicirkel op||`` via het witte driehoekje in  ``||Kitronik_Move_Motor.smal||``, en verander de tijd in het ``||basic:pauzeer||`` blok in 3000 ms.

#### ~ tutorialhint
```blocks
function kleineCirkel () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(3000)
    Kitronik_Move_Motor.stop()
}
```

### Stap 7
Pak een  ``||input:wanneer knop B wordt ingedrukt||`` blok en plaats daar het blok ``||functions:aanroep kleineCirkel||`` uit de categorie ``||functions:Functies||`` in.  
Als je een @boardname@ hebt aangesloten, klik dan op ``|Download|`` om je code erop te zetten en zet de :MOVE Motor aan.   Druk op knop B om de robot een kleine cirkel te laten tekenen.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.B, function () {
    kleineCirkel()
})
function kleineCirkel () {
    Kitronik_Move_Motor.turnRadius(Kitronik_Move_Motor.TurnRadii.Tight)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 75)
    basic.pause(3000)
    Kitronik_Move_Motor.stop()
}
```

## Vierkanten
### Introductie @unplugged
Zo, we zijn klaar met de cirkels. We gaan verder met een nieuwe vorm: een vierkant.

### Stap 1
Tijd om weer een nieuwe ``||functions:functie||``  te maken. Geef deze de naam **vierkant**.  
Zet de volgende codeblokken in het ``||functions:functie vierkant||`` blok: ``||Kitronik_Move_Motor.ga vooruit met snelheid 75||``, ``||basic:pauzeer||``  500 ms en ``||Kitronik_Move_Motor.stop||``. Hiermee programmeren we de eerste zijde van het vierkant.

#### ~ tutorialhint
```blocks
function vierkant () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
    basic.pause(500)
    Kitronik_Move_Motor.stop()
}
```

### Stap 2
Voeg een ``||Kitronik_Move_Motor.draai links met snelheid 45||`` blok toe en plaats die achter ``||Kitronik_Move_Motor.stop||``. Voeg daarna nog een 500 ms ``||basic:pauzeer||`` blok toe  en dan nog een ``||Kitronik_Move_Motor.stop||`` blok. Dit wordt de eerste hoek. 
Haal nu het ``||functions:aanroep groteCirkel||`` blok uit het ``||input:wanneer knop A wordt ingedrukt||`` blok en vervang dat door ``||functions:aanroep vierkant||`` uit de categorie ``||functions:Functies||``.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    vierkant()
})
function vierkant () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 75)
    basic.pause(500)
    Kitronik_Move_Motor.stop()
    Kitronik_Move_Motor.spin(Kitronik_Move_Motor.SpinDirections.Left, 45)
    basic.pause(500)
    Kitronik_Move_Motor.stop()
}
```

### Stap 3
Als je een @boardname@ hebt aangesloten, klik dan op ``|Download|`` om je code erop te zetten en zet de :MOVE Motor aan. Gebruik de robot nu **zonder**  stift of pen en druk op ``||input:knop A||`` om de :MOVE Motor vooruit te laten rijden en dan naar links te laten draaien.  
We moeten nu checken of de :MOVE Motor een kwartslag, oftewel 90 graden, draait. Als dat niet het geval is, pas dan de snelheid aan in het  ``||Kitronik_Move_Motor.draai links||`` blok. Verhoog de snelheid als de robot minder dan 90 graden draaide en verlaag de snelheid als hij juist meer dan 90 graden draaide. Eventueel kun je ook de pauze-tijd langer of korter maken. Blijf downloaden en testen tot je tevreden bent met de draaihoek.

### Stap 4
Nu hoeven we de code alleen nog maar vier keer te herhalen en dan tekent de :MOVE Motor als het goed is een vierkant.

Voeg een blok ``||loops:4 keer herhalen||`` toe uit de catogerie ``||loops:Lussen||`` aan het ``||functions:functie vierkant||`` blok, en plaats alles wat in dat ``||functions:functie||`` blok stond nu in het herhaalblok. 

#### ~ tutorialhint
```blocks
function vierkant () {
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

### Stap 5
Als je een @boardname@ hebt aangesloten, klik dan op ``|Download|`` om je code erop te zetten en zet de :MOVE Motor aan. Zet de :MOVE Motor op een stuk papier, plaats de pen of stift er weer in en druk op knop A om de robot een vierkant te laten tekenen. 

## Driehoeken
### Introduction @unplugged
En nu... driehoeken!

### Stap 1
Een driehoek tekenen lijkt wel een beetje op het tekenen van een vierkant. Er is alleen een zijde minder en de hoeken zijn net wat anders. Maak daarom een nieuwe  ``||functions:functie||``, noem die  **driehoek** en kopieer alle code die in het ``||functions:functie vierkant||`` blok staat. Plaats die code in het blok ``||functions:functie driehoek||``.

#### ~ tutorialhint
```blocks
function driehoek () {
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

### Stap 2
Om de :MOVE Motor een zijde minder te laten tekenen, verander je het getal in het ``||loops:herhalen||`` blok naar  ``||loops:3 keer herhalen||``. De hoeken moeten nu scherper worden, namelijk 60 graden in plaats van 90 graden. Verander daarom de snelheid in het  ``||Kitronik_Move_Motor.draai links||`` blok naar 60. Als je het getal 45 had moeten aanpassen voor het tekenen van een vierkant, kun je nu je eigen getal met 1,35 vermenigvuldigen en dat gebruiken in plaats van 60.

#### ~ tutorialhint
```blocks
function driehoek () {
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

### Stap 3
Haal tot slot het ``||functions:aanroep kleineCirkel||`` blok uit het ``||input:wanneer knop B wordt ingedrukt||`` blok en plaats het ``||functions:aanroep driehoek||`` blok  erin. 

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.B, function () {
    driehoek()
})
function driehoek () {
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

### Stap 4
KLAAR! Als je een @boardname@ hebt aangesloten, klik dan op ``|Download|`` om je code erop te zetten en zet de :MOVE Motor aan. Zet de :MOVE Motor op een stuk papier, plaats de pen of stift er weer in, en druk op knop B om de robot een driehoek te laten tekenen. 

Als het robotje niet eindigt op het startpunt en dus geen gesloten driehoek maakt, pas dan de snelheid aan in het ``||Kitronik_Move_Motor.draai links||`` blok om de draaihoek aan te passen. Verhoog de snelheid als de bocht minder scherper moet worden en verlaag de snelheid als de bocht juist scherper moet zijn. Blijf downloaden en testen tot je tevreden bent met de draaihoek.

