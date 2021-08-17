### @activities true
### @explicitHints true

# :MOVE Motor Ontvanger radiosignalen (Robotcode)

## Introductie
### Introductie @unplugged
Graag eerst de introductie in de linker editor lezen. Volg daarna de instructies totdat de linker tutorial aangeeft dat je op deze tutorial moet overstappen. Klik dan op de OK-knop om te beginnen met deze tutorial.

![Left Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/left-arrow.jpg)

## Ontvang signaal om vooruit te rijden

### Stap 1
Nu de zender een bericht kan sturen, is het tijd om code voor de ontvanger te maken. Deze code moet op een tweede micro:bit komen te staan.
Voeg  weer een ``||basic.toon tekens||`` blok  toe aan het ``||basic.bij opstarten||`` blok en type daar de letter 'O' in. Deze letter geeft aan dat dit de ontvanger is. Voeg ook het blok ``||radio:Radio instellen groep||`` toe en voer hetzelfde getal in als bij de micro:bit die we als zender gebruiken (in dit voorbeeld gebruiken we het getal 1).

#### ~ tutorialhint
```blocks
basic.showString("O")
radio.setGroup(1)
```

### Stap 2
De micro:bit is klaar om berichten te ontvangen. Uit de categorie radio hebben we nu dit blok nodig: ``||radio:wanneer de radio ontvangt||``. In dit blok staan twee rode blokjes. Dit zijn blokjes voor de variabelen  'name' en 'value' ('naam' en 'waarde' in het Nederlands). 

#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
	
})
```

### Stap 3
In het ``||radio:wanneer de radio ontvangt||`` blok gaan we controleren of het ontvangen bericht hetzelfde is als het bericht waar we op wachten. Voeg een  ``||logic:als||`` blok toe. Daarmee checken we of de ontvangen variabele 'name' de tekst 'vooruit' bevat, oftewel gelijk is aan 'vooruit'. Plaats een ``||logic:=||`` blok in het  ``||logic:als||`` blok. Let daarbij op dat je het ``||logic:=||`` blok pakt dat tekst vergelijkt (dat kun je zien aan de quotjes die erin staan). Sleep nu een 'name'-blokje uit het ``||radio:wanneer de radio ontvangt||`` blok door erop te klikken en daarna je muis ingedrukt te houden. Plaats dat links in het  ``||logic:=||`` blok. Rechts moet je 'vooruit' typen. Zonder hoofdletter, net als bij de zender, anders werkt het niet.

#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "vooruit") {
    	
    }	
})
```

### Stap 4
Voeg nu in het ``||logic:als||`` blok  een ``||Kitronik_Move_Motor.ga vooruit||`` blok toe. Haal vervolgens een 'value'-blokje uit het ``||radio:wanneer de radio ontvangt||`` blok en plaats dat achter het woord 'snelheid' in het   ``||Kitronik_Move_Motor.ga vooruit||`` blok.

#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "vooruit") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, value)
    }
})
```

### Stap 5
Klik op ``|Download|`` om de code op je tweede micro:bit te zetten. Plaats die in de :MOVE Motor, zet het robotje op de vloer en zet hem aan.

### Eerste deel code van de ontvanger is klaar @unplugged
We hebben nu code op twee micro:bits staan. De code van de ontvanger (de micro:bit in de :MOVE motor) kan nu een bericht van de andere micro:bit (de zender) ontvangen als deze aangesloten is op een stroombron (via batterijen of via de USB-kabel die op de computer is aangesloten).

Druk nu op knop A op de losse micro:bit en kijk wat :MOVE Motor doet. Als je robotje niet begint te rijden, controleer dan of bij beide micro:bits dezelfde radiogroep staat ingesteld en of je 'vooruit' twee keer exact hetzelfde hebt gespeld.

Als het goed werkt, is het tijd om verder te gaan met de tutorial voor de zender. Als die weer naar deze tutorial verwijst, kun je hieronder op OK klikken.

![Left Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/left-arrow.jpg)

## Van richting veranderen

### Van richting veranderen @unplugged
De ontvanger gaat nu nieuwe berichten ontvangen waarmee we het robotje van richting kunnen laten veranderen en laten stoppen. Klik op de OK-knop om code voor het verwerken van die berichten te gaan maken.

### Stap 6
Klik twee keer op de ``||logic:+||`` in het ``||logic:als||`` blok om een  ``||logic:anders als||`` en een ``||logic:anders||`` statement toe te voegen. Maak een kopie van de blokken in het ``||logic:als||`` statement en plak die in de ``||logic:anders als||`` statement eronder.

#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "vooruit") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, value)
    } else if (name == "vooruit") {
    	
    } else {
    	
    }
})
```

### Stap 7
Wijzig nu in het ``||logic:anders als||`` statement het woord "vooruit" in "achter" (Ter info: "achteruit" kunnen we niet gebruiken, zoals ook uitgelegd in de linker tutorial, omdat het te lang is om als naam van een bericht verzonden te worden.)

#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "vooruit") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, value)
    } else if (name == "achter") {
    	
    } else {
    	
    }
})
```

### Stap 8
Tijd om  motor-codeblokken in het ``||logic:anders als||`` en het ``||logic:anders||`` gedeelte te plaatsen. Plaats eerst een ``||Kitronik_Move_Motor.ga vooruit||`` blok in het ``||logic:anders als||`` gedeelte en klik op het witte driehoekje om vooruit in achteruit te veranderen.
Plaats het "value"  blokje uit het ``||radio:wanneer de radio ontvangt||`` blok in het witte vakje achter snelheid.


#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "vooruit") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, value)
    } else if (name == "achter") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, value) 	
    } else {
    	
    }
})
```

### Stap 9
Tot slot moeten de motoren stoppen als we een bericht ontvangen dat niet gelijk is aan "vooruit" of "achter".  Plaats daarom een ``||Kitronik_Move_Motor.stop||`` blok in het ``||logic:anders||`` gedeelte. Dit is de zogenoemde standaard afhandelaar (default handler in computerjargon). Daarmee kunnen we op een veilige manier met onbekende berichten omgaan. 

#### ~ tutorialhint
```blocks
radio.onReceivedValue(function (name, value) {
    if (name == "vooruit") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, value)
    } else if (name == "achter") {
        Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Reverse, value)   	
    } else {
    	Kitronik_Move_Motor.stop()
    }
})
```
### Stap 10
Plaats de BBC micro:bit in de :MOVE Motor en klik op ``|Download|`` om je code op deze  ontvanger-micro:bit te zetten. Tijd om uit te proberen of je nu vooruit en achteruit kunt rijden. 

### Tweede deel van de ontvangercode is klaar @unplugged
Top! De :MOVE Motor kan nu als het goed is naar voren en naar achteren rijden. Het robotje rijdt echter ook als je de afstandsbediening-micro:bit per ongeluk beweegt of neerlegt. Laten we terug gaan naar de zendercode in de linker editor om te kijken wat we daar aan kunnen doen. In de opdrachten in de linker editor staat aangegeven wanneer het weer tijd is om met deze tutorial in de rechter editor verder te gaan.

![Left Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/left-arrow.jpg)

## Naar links en rechts sturen toevoegen

### Code voor ontvangen radiosignalen aanpassen
We hebben nu weer een nieuw radiobericht dat we moeten verwerken. Het gaat om een apart bericht voor elke motor, met als waarde een positief of een negatief getal. We moeten checken of er een min voor het getal staat of niet om te kunnen bepalen welke kant de motoren op moeten draaien.

### Stap 11
Laten we eerst de namen van de berichten aanpassen. Verander "vooruit" in "LMotor" en verander "achter" in "RMotor".

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

### Stap 12
De codeblokken die we tot nu toe gebruikten voor de motoren sturen beide motoren tegelijk aan. Nu we ook naar links en rechts willen kunnen sturen, is het handiger als we beide motoren apart kunnen aansturen. Verwijder daarom eerst de twee ``||Kitronik_Move_Motor.ga||`` blokken.

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

### Stap 13
Als we hebben gechecked voor welke motor het radiobericht is, moeten we ook nog checken of de bijbehorende waarde een positief of een negatief getal is. Voeg daarom een ``||logic:als anders||`` blok toe in het  "als name = LMotor"-gedeelte.

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

### Stap 14
Voeg een vergelijk-blok toe aan het nieuwe ``||logic:als||`` statement om te controleren of "waarde> 0" klopt.  Zo check je of het verstuurde getal groter dan 0 is.

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

### Stap 15
Tussen de :MOVE Motor-blokken vind je onderaan het blok  ``||Kitronik_Move_Motor.zet motor links aan||``, waarbij je links en rechts als optie kunt kiezen. Zo kun je elke motor dus apart aansturen. Voeg zo'n blok toe in het bovenste gedeelte van het nieuw toegevoegde ``||logic:als||`` blok. Kies "links" en haal de variabele value uit het radio-blok en plaats dit in het witte vakje achter het woord snelheid.

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

### Stap 16
We gaan nu coderen wat er moet gebeuren als er een negatief getal gestuurd is. Voeg in het ``||logic:anders||`` gedeelte ook een  ``||Kitronik_Move_Motor.zet motor links aan||`` blok toe.  Selecteer weer de motor links, maar kies als richting nu achteruit.

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

### Stap 17
De ontvangen waarde is een negatief getal voor de snelheid, maar dan achteruit. Het ``||Kitronik_Move_Motor.zet motor links aan||`` blok werkt echter niet met een negatief getal. Daarom hebben we het  ``||math:absolute waarde van||`` blok nodig uit de categorie ``||math:Rekenen||`` om er een positief getal van dezelfde grootte van te maken.  
Plaats dit blok in het  ``||Kitronik_Move_Motor.zet motor links aan||`` blok in het vakje voor de snelheid en plaats vervolgens het value-blokje in het absolute waarde-blok.

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

### Stap 18
De code voor de linker motor is nu klaar. Voor de rechter motor is soortgelijke code nodig. Kun je die zelf maken?

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

### Stap 19
Klik op ``|Download|`` om je code op de micro:bit in de :MOVE Motor te zetten. Zet je robotje aan zodat die klaar is om radioberichten te ontvangen. Vergeet niet om ook je afstandsbediening-micro:bit aan te zetten.


### Code van de ontvanger is klaar  @unplugged
Gefeliciteerd! Je hebt de les over de radiobesturing helemaal gedaan. Veel plezier met het laten rondrijden van je :MOVE Motor.

Wil je hem wat minder scherpe bochten laten maken, kijk dan nog een laatste keer naar de linker tutorial voor een extra opdracht.

En je kunt natuurlijk zelf verder gaan met programmeren. Probeer bijvoorbeeld of je ook de lichten en de toeter op afstand kan besturen via radioberichtjes. Bijvoorbeeld door een radiobericht te versturen als je op knop A van de afstandsbediening-micro:bit drukt.