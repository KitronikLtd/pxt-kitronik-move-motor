### @activities true
### @explicitHints true

# :MOVE Motor afstandsbediening (zender radiobesturing)

## Introductie
### Introductie @unplugged
Leer hoe je de :MOVE Motor via radiografische besturing  kunt laten rondrijden. Hier heb je een extra BBC micro:bit voor nodig die je gebruikt als afstandsbediening. De code die je in de linker editor maakt, is voor de controller, oftewel de zender van het radiosignaal. De code in de rechter editor is voor het robotje. Dat is dus de code voor de ontvanger van het radiosignaal. Met deze tutorial kun je beide programma's stap voor stap maken, afwisselend in de linker en de rechter editor.

Je kunt steeds de aanwijzigingen volgen. Kom je er niet uit? Of wil je de code die je gemaakt hebt controleren? Dan kun je op het blauwe rondje met het lampje erin klikken.

![:MOVE Motor angled view with lights](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-lights.jpg)

## Vooruit rijden
### Stap 1
Het is handig snel te kunnen zien welke code op welke micro:bit staat. Laat de micro:bit daarom een letter tonen op het display zodat je snel kunt uitvinden welke micro:bit de zender (Z) en welke de ontvanger (O) is. Gebruik daarvoor een ``||basic.toon tekens||`` blok met daarin de letter "Z" en plaats dat blok in het  ``||basic.bij opstarten||`` blok. 

#### ~ tutorialhint
```blocks
basic.showString("Z")
```

### Stap 2
De radiofunctie gebruikt groepen om te bepalen welke micro:bits met elkaar kunnen 'praten'. Om te kunnen communiceren moet bij beide micro:bits dezelfde groep ingesteld staan. Het nummer van een groep kan elk getal tussen 1 en 255 zijn. In dit voorbeeld gebruiken we 1. Als er in dezelfde ruimte ook nog andere micro:bits zijn die met elkaar communiceren, dan moeten die een ander groepsnummer gebruiken. 
Pak nu het volgende blok uit de radio-categorie:  ``||radio:Radio instellen groep||``. Plaats dit in het ``||basic.bij opstarten||`` blok en stel de groep in op 1.

#### ~ tutorialhint
```blocks
basic.showString("Z")
radio.setGroup(1)
```

### Stap 3
We gaan nu via de radiofunctie een bericht sturen naar de micro:bit van de :MOVE Motor om dit robotje wat te laten doen als je op een knop drukt, zoals vooruit rijden. Als radiobericht kun je een naam en een waarde (een getal) sturen. De naam is belangrijk voor de ontvanger om te weten te komen om wat voor getal het gaat.
Pak het blok ``||input:wanneer knop A wordt ingedrukt||``. Voeg vervolgens het blok ``||radio:Radio verzend waarde||`` toe.  Als naam ('name') kiezen we de richting en als waarde kiezen we de snelheid. Type op de plek waar 'name' staat het woord 'vooruit' en kies als waarde 50 voor de snelheid.


#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    radio.sendValue("vooruit", 50)
})
```

### Stap 4
We hebben nu een beginnetje van een afstandsbediening. We kunnen de :MOVE Motor een berichtje sturen dat hij vooruit moet gaan rijden. Sluit je BBC micro:bit aan en klik op ``|Download|``.  Controleer daarna of er een 'Z' op het scherm verschijnt.


### Eerste deel code van de afstandsbediening is klaar @unplugged
Nu we een stukje van de zendercode klaarhebben, kunnen we aan de slag met de code van de ontvanger. Klik op de OK-knop bij de rechter editor en begin met het maken van de code voor de ontvanger, oftewel de micro:bit die in de :MOVE Motor komt te zitten. Als je de opdrachten aan de rechterkant hebt gedaan, kun je weer verder met deze tutorial aan de linkerkant van je scherm.

![Right Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/right-arrow.jpg)

## Snelheid op afstand aanpassen

### Snelheid op afstand aanpassen @unplugged
Nu de :MOVE Motor vooruit rijdt, kunnen we de sensoren van de zender gebruiken om op afstand de snelheid van het robotje aan te passen.

### Stap 5
Laten we eerst een variabele maken met de naam 'kantelhoek'. Plaats daarna een ``||variables:stel kantelhoek in op||`` blok in een ``||basic.de hele tijd||`` blok.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = 0
})
```

### Stap 6
We gaan de variabele 'kantelhoek' de waardes van de kantelsensor meegeven. Die waardes veranderen als je de micro:bit naar voren of naar achteren kantelt. Klik bij de categorie ``||input:Invoer||`` op het ``||input:...meer||`` gedeelte en plaats het ``||input:rotatie||`` blok in het blok ``||variables:stel kantelhoek in op||``. Check of de optie 'kantelen' in geselecteerd. 

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = input.rotation(Rotation.Pitch)
})
```

### Stap 7
Het ``||input:rotatie||`` blok geeft een getal tussen de -90 en +90 door. Om het robotje vooruit te laten rijden, gebruiken we de getallen tussen 0 en 90, oftewel de positieve getallen. Onder het rode blok dat de variabele instelt, voeg je een ``||logic:als||`` blok toe om te controleren of de variabele kantelhoek groter dan 0 is.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = input.rotation(Rotation.Pitch)
    if (kantelhoek > 0) {
    	
    }
})
```

### Stap 8
De maximale snelheid van de motor is echter niet 90, zoals de maximale waarde die de kantelsensor doorgeeft, maar 100. Daarom gebruiken we een zogenoemd vertaal-blok. Met dit blok kun je een reeks getallen omzetten naar een kleinere of grotere schaal. 1, 2, 3 en 4 'vertalen' naar een schaal van 100 levert bijvoorbeeld de getallen 25, 50, 75 en 100 op.
Maak nu een nieuwe variabele met als naam 'snelheid'. Plaats een ``||variables:stel snelheid in op||``  blok in het ``||logic:als||`` blok. Haal nu uit de categorie ``||math:Rekenen||`` het blok ``||math:vertaal||`` en plaats dit in het ``||variables:stel snelheid in op||`` blok.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = input.rotation(Rotation.Pitch)
    if (kantelhoek > 0) {
        snelheid = Math.map(0, 0, 1023, 0, 4)
    }
})
```

### Stap 9
Nu is het tijd om getallen in te vullen in het ``||math:vertaal||`` blok. Plaats eerst een ``||variables:kantelhoek||`` blokje in het meest linkse witte vakje. Als volgende twee getallen vul je 0 en 90 in. Die vormen het laagst mogelijke en het hoogst mogelijke getal van deze variabele. De laatste twee getallen bepalen de nieuwe schaal, van 0 tot 100, omdat die de laagste en hoogste waarde van de motorsnelheid vormen.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = input.rotation(Rotation.Pitch)
    if (kantelhoek > 0) {
        snelheid = Math.map(kantelhoek, 0, 90, 0, 100)
    }
})
```

### Stap 10
Haal het ``||radio:Radio verzend waarde||`` blok uit het ``||input:knop A||``  blok en plaats het onder het blok dat de snelheid instelt. Vervang vervolgens in dit radio-blok het getal 50 door een ``||variables:snelheid||`` blok. 

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = input.rotation(Rotation.Pitch)
    if (kantelhoek > 0) {
        snelheid = Math.map(kantelhoek, 0, 90, 0, 100)
        radio.sendValue("vooruit", snelheid)
    }
})
```

### Stap 11
Download je code naar de micro:bit die je als afstandsbediening gebruikt. Tijd om uit te proberen of je nu met de afstandsbediening de snelheid groter en kleiner kan maken. Dat doe je door de micro:bit meer of minder naar achteren te kantelen.

### Stap 12
En... reed de :MOVE Motor alleen maar als je de afstandsbediening-micro:bit naar achteren kantelde?
We gaan dit een beetje aanpassen. We gaan :MOVE Motor vooruit laten rijden als de micro:bit naar voren wordt gekanteld. Om dat voor elkaar te krijgen, moeten we eerst checken of ``||variables:snelheid||`` een negatieve waarde heeft (een getal onder 0). Pas nu de ``||logic:als||`` voorwaarde door het groter-dan-teken ``||logic:>||`` te vervangen door het kleiner-dan-teken ``||logic:<||``.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = input.rotation(Rotation.Pitch)
    if (kantelhoek < 0) {
        snelheid = Math.map(kantelhoek, 0, 90, 0, 100)
        radio.sendValue("vooruit", snelheid)
    }
})
```

### Stap 13
Tot nu toe verzonden we positieve getallen. Dat moeten we veranderen om de motoren zowel vooruit als achteruit te kunnen laten draaien. Dat kun je doen door de getallen in het ``||math:vertaal||`` blok aan te passen. Verander het getal 90 in -90.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = input.rotation(Rotation.Pitch)
    if (kantelhoek < 0) {
        snelheid = Math.map(kantelhoek, 0, -90, 0, 100)
        radio.sendValue("vooruit", snelheid)
    }
})
```

### Stap 14
Klik op ``|Download|`` om je code op de afstandbediening-micro:bit te zetten en kijk of het nu omgekeerd werkt. Als dat het geval is, is het tijd om naar het volgende onderdeel te gaan.

### Voor- en achterrijden @unplugged
Met de afstandsbediening kun je nu bepalen hoe snel het robotje vooruit rijdt. We gaan ook achteruit programmeren.

### Stap 15
De code die je tot nu toe gemaakt hebt, kijkt of de waarde van de  'kantelhoek' kleiner is dan '0' en laat het robotje dan vooruit rijden. Voor het achteruit rijden, kijken we of de waarde groter dan '0' is. Om dat te kunnen checken, gebruiken we een ``||logic:anders als||`` gedeelte. Klik daarvoor twee keer op de ``||logic:+||``. Klik daarna op de ``||logic:-||`` naast de ``||logic:anders||`` om de anders-voorwaarde te verwijderen. Gebruik de ``||logic:anders als||`` om te controleren of de kantelhoek groter is dan '0'.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = input.rotation(Rotation.Pitch)
    if (kantelhoek < 0) {
        snelheid = Math.map(kantelhoek, 0, -90, 0, 100)
        radio.sendValue("vooruit", snelheid)
    } else if (kantelhoek > 0) {
    	
    } 
})
```

### Stap 16
Dupliceer het ``||variables:stel snelheid in op||`` blok and plaats het in het gedeelte eronder. Dupliceer ook het ``||radio:Radio verzend waarde||`` blok en plaats dat onder het gekopieerde ``||variables:stel snelheid in op||`` blok.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = input.rotation(Rotation.Pitch)
    if (kantelhoek < 0) {
        snelheid = Math.map(kantelhoek, 0, -90, 0, 100)
        radio.sendValue("vooruit", snelheid)
    } else if (kantelhoek > 0) {
    	snelheid = Math.map(kantelhoek, 0, -90, 0, 100)
        radio.sendValue("vooruit", snelheid)
    }
})
```

### Stap 17
De waarden in de gekopieerde blokken kloppen nog niet helemaal. Laten we ze aanpassen voor achteruit rijden. Verander eerst de tekst in het ``||radio:Radio verzend waarde||`` van 'vooruit' naar 'achter'. We kunnen helaas niet 'achteruit' typen, want dat is negen letters lang en de 'name' van een radiobericht mag maximaal acht letters lang zijn. Verder varieert de kantelhoek nu niet van 0 naar -90, maar van 0 naar 90. Daarom moet je in het ``||math:vertaal||`` blok -90 in 90 veranderen.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = input.rotation(Rotation.Pitch)
    if (kantelhoek < 0) {
        snelheid = Math.map(kantelhoek, 0, -90, 0, 100)
        radio.sendValue("vooruit", snelheid)
    } else if (kantelhoek > 0) {
    	snelheid = Math.map(kantelhoek, 0, 90, 0, 100)
        radio.sendValue("achter", snelheid)
    } 
})
```

### Stap 18
Klik op ``|Download|`` om je code op de afstandsbediening-micro:bit te zetten.

### Pauze voor de zendercode @unplugged
We hebben nu code voor de afstandsbediening-micro:bit om het robotje vooruit en achteruit te laten rijden. Tijd om de code van de ontvanger-micro:bit aan te passen zodat de :MOVE Motor weet wat die moet doen met de nieuwe berichten die als radio-signaal worden verstuurd. 

Klik op de OK-knop van de rechter tutorial om de ontvanger-code aan te passen. Als dat klaar is, kom dan terug naar deze tutorial en klik op OK om verder te gaan met de volgende stap.

![Right Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/right-arrow.jpg)


## Een veiligheidsknop toevoegen

### Een veiligheidsknop toevoegen @unplugged
De :MOVE Motor beweegt nu zodra de afstandsbediening-micro:bit beweegt. Dat kan onhandig zijn als je de micro:bit per ongeluk beweegt. Dit kunnen we voorkomen door een zogenoemde dodemansknop toe te voegen. Zo'n schakelaar zorgt ervoor dat het voertuig dat je bedient stopt als je deze knop niet meer indrukt. Treinen werken vaak met zo'n dodemansknop, waardoor de trein stopt als de machinist onwel is geworden.

### Stap 19

We kunnen het "als kantelhoek < 0" statement en de code die daar nu instaat in zijn geheel in een nieuw  "als" blok plaatsen.  Zo kunnen we controleren of de dodemansknop geactiveerd is en :MOVE Motor dus mag rijden.
Voeg een ``||logic:als||`` gedeelte onder ``||variables:stel kantelhoek in  op||``, en plaats het ``||logic:als, anders als||`` gedeelte dat je al had in het nieuwe ``||logic:als||`` blok.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = input.rotation(Rotation.Pitch)
    if (true) {
      if (kantelhoek < 0) {
        snelheid = Math.map(kantelhoek, 0, -90, 0, 100)
        radio.sendValue("vooruit", snelheid)
      } else if (kantelhoek > 0) {
        snelheid = Math.map(kantelhoek, 0, 90, 0, 100)
        radio.sendValue("achter", snelheid)
    } 
})
```

### Stap 20
Voeg nu een ``||input:knop A wordt ingedrukt||`` blok toe bovenaan het nieuwe "als" blok. Knop A wordt onze dodemansknop: we sturen alleen berichten naar de :MOVE Motor om die te laten rijden als knop A ingedrukt wordt.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = input.rotation(Rotation.Pitch)
    if (input.buttonIsPressed(Button.A)) {
      if (kantelhoek < 0) {
        snelheid = Math.map(kantelhoek, 0, -90, 0, 100)
        radio.sendValue("vooruit", snelheid)
      } else if (kantelhoek > 0) {
        snelheid = Math.map(kantelhoek, 0, 90, 0, 100)
        radio.sendValue("achter", snelheid)
    } 
})
```

### Stap 21
Als knop A niet ingedrukt wordt, willen we dat :MOVE Motor stopt met bewegen. Klik daarom op de ``||logic:+||`` om een "anders"-gedeelte toe te voegen. Plaats in dit gedeelte ook een ``||radio:Radio verzend waarde||`` blok en laat dat blok als bericht het woord "stop" en als getal '0' versturen.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = input.rotation(Rotation.Pitch)
    if (input.buttonIsPressed(Button.A)) {
      if (kantelhoek < 0) {
        mappedDrive = Math.map(kantelhoek, 0, -90, 0, 100)
        radio.sendValue("vooruit", snelheid)
      } else if (kantelhoek > 0) {
        mappedDrive = Math.map(kantelhoek, 0, 90, 0, 100)
        radio.sendValue("achter", snelheid)
      }
    } 
    else {
       radio.sendValue("stop", 0)
    }  	
})
```

### Stap 22
Klik op ``|Download|`` om de code op de afstandsbediening-micro:bit te zetten. Probeer het uit. Kun je de :MOVE Motor nu alleen besturen als je knop A hebt ingedrukt? Als het goed is wel. Daarvoor hoeften we de code van de ontvanger-micro:bit niet aan te passen. We hadden daar namelijk al een "anders" staan in de code die binnenkomende berichtjes afhandelt. De code in dit "anders" gedeelte wordt uitgevoerd als er onbekende berichten binnenkomen. Daarom stopt :MOVE Motor als we het bericht "stop" versturen.  

### Tweede deel code van de afstandsbediening is klaar @unplugged

Laten we eens op een rijtje zetten wat we tot nu toe geleerd hebben.
+ Hoe je radioberichtjes verzendt en ontvangt. 
+ Dat een ontvangen bericht wordt afgehandeld in een speciaal stukje code en dat we daarbinnen een zogenoemde standaard afhandelaar ('default handler' in computerjargon) kunnen plaatsen voor onbekende berichten.
+ Hoe je de kantelsensor kunt uitlezen en gebruiken voor besturing op afstand
+ Dat je berichten kunt versturen om de motoren op afstand te bedienen
+ Hoe je een dodemansknop programmeert

We kunnen de :MOVE Motor echter alleen nog voor- en achteruit laten rijden. Tijd om te kijken hoe we het robotje ook naar links of rechts kunnen sturen.


## Naar links en rechts sturen toevoegen

### Besturen van het robotje @unplugged
Goed bezig met de code tot nu toe. We gaan nog even verder, want om de :MOVE Motor beter te kunnen besturen moeten we de twee motoren op een verschillende snelheid kunnen laten draaien. Als het ene wiel harder draait dan het andere gaat het robotje namelijk naar links of naar rechts, afhankelijk van welke van de twee wielen harder draait.

Om de :MOVE Motor soepel te laten rondrijden, combineren we de informatie over hoe hard die voor- of achteruit moet rijden, met de informatie over hoe sterk die naar links of rechts moet afbuigen cq moet afslaan. Computerprogrammeurs noemen dit combineren  'blending'. Als je dit op de juiste manier doet, wordt de :MOVE Motor goed bestuurbaar via bewegingen van de afstandsbediening-micro:bit; dan kan je het robotje elke gewenste kant op laten rijden.

In de volgende opdrachten voegen we informatie van een tweede sensor toe om :MOVE Motor beter te kunnen besturen.


### Stap 23

Haal eerst alle codeblokken uit het ``||logic:als||`` blok dat in het ``||input:knop A wordt ingedrukt||`` blok staat. De dodemansknop willen behouden, maar de code die de berichtjes verstuurt gaan we flink aanpassen. Klik op het blauwe rondje met het lampje als je even wil checken hoe de code eruit moet zien nadat je bovenstaande gedaan hebt.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek =  input.rotation(Rotation.Pitch)
    if (input.buttonIsPressed(Button.A)) {
   
    } 
    else {
       radio.sendValue("stop", 0)
    }  	
})
```

### Stap 24
We gebruikten tot nu toe alleen de informatie over de kantelhoek. De sensoren op de BBC micro:bit bieden ook informatie over hoe ver de micro:bit naar links of rechts "gedraaid" is. Dat noemen we de draaihoek. Maak een variable met die naam en plaats een ``||variables:stel draaihoek in op||``  blok meteen onder het  ``||variables:stel kantelhoek in op||`` blok.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = input.rotation(Rotation.Pitch)
    draaihoek = 0
    if (input.buttonIsPressed(Button.A)) {
      
    } 
    else {
       radio.sendValue("stop", 0)
    }  	
})
```

### Stap 25
Klik nu bij de categorie Invoer op  ``||input:...meer||`` en plaats het blok ``||input:rotatie||`` in het ``||variables:stel draaihoek in op||`` blok.
Selecteer via het witte driehoekje de optie "draaien".

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = input.rotation(Rotation.Pitch)
    draaihoek = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
      
    } 
    else {
       radio.sendValue("stop", 0)
    }  	
})
```

### Combineren van input van twee sensoren @unplugged
We gebruiken nu input van twee sensoren van de afstandsbediening-micro:bit oftewel de controller. We mixen deze twee om elke motor zijn eigen snelheid te geven. Voor elke motor sturen we nu een eigen berichtje. Dat doen we  in plaats van de eenvoudigere berichtjes met "vooruit" en "achter".


### Stap 26
In de eerste versie van onze code, zetten  we in het vertaal-blok een negatief getal voor de kantelhoek om in een positief getal. Nu gaan we dat eerder doen, voordat we de input van de twee sensoren gaan mixen. Voeg een ``||Math:0-0||`` blok toe uit de sectie ``||Math:Rekenen||`` en trek de waarde van de kantelhoek van 0 af.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = 0 - input.rotation(Rotation.Pitch)
    draaihoek = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
    } else {
        radio.sendValue("stop", 0)
    }
})
```

### Stap 27 @unplugged
Om de waarden van de kantelhoek en de draaihoek goed te kunnen mixen, moeten we eerst bekijken hoe die de snelheid van de motoren be&iuml;vloeden. 

Als de afstandsbediening-micro:bit een beetje naar links draait (waarbij de linkerkant naar beneden gaat en de rechterkant naarboven), willen we dat :MOVE Motor naar links rijdt. Bij het naar links draaien geeft de kantelsensor de negatieve waarden van de draaihoek, oftewel van -90 tot 0. 


### Stap 28
Als het robotje een bocht naar links maakt, zit de linker motor aan de binnenkant van de bocht. De linker motor legt dus minder afstand af en moet dus langzamer draaien dan de rechter motor die de buitenbocht maakt. En dat gebeurt als we de waarde van de draaihoek aan de motorwaarde (van de kantelhoek) toevoegen. De rechter motor moet juist sneller draaien, dus daar trekken we de waarde van de draaihoek af (als je een negatief getal van een getal aftrekt, is dat hetzelfde als het erbij optellen).
Maak twee variabelen en noem deze "links" en "rechts". Die gebruiken we voor de gecombineerde waarden waarmee we elke motor afzonderlijk aansturen. Gebruik daarvoor het ``||math:+||`` en het ``||math:-||`` blok.

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = 0 - input.rotation(Rotation.Pitch)
    draaihoek = input.rotation(Rotation.roll)
    if (input.buttonIsPressed(Button.A)) {
        links = kantelhoek + draaihoek
        rechts = kantelhoek - draaihoek

    } else {
        radio.sendValue("stop", 0)
    }
})
```

### Stap 29 
Nu hebben we beide sensorwaarden gecombineerd en kunnen we de gecombineerde waarde vertalen naar het bereik van de motor. Onze input loopt van -90 tot +90 en het bereik van de motor loopt van -100 tot +100.
Maak twee variabelen voor de motorsnelheid, noem deze "snelheidLinkermotor" en "snelheidRechtermotor", en gebruik het ``||math:vertaal||`` blok om deze variabelen goed in te stellen.


#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = 0 - input.rotation(Rotation.Pitch)
    draaihoek = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        links = kantelhoek + draaihoek
        rechts = kantelhoek - draaihoek
        snelheidLinkermotor = Math.map(links, -90, 90, -100, 100)
        snelheidRechtermotor = Math.map(rechts, -90, 90, -100, 100)

    } else {
        radio.sendValue("stop", 0)
    }
})
```

### Stap 30
De twee motorsnelheden kunnen via de radioverbinding verzonden worden. Voeg nu twee  ``||radio:Radio verzend waarde||``  blokken toe. Plaats die na het blok  ``||variables:stel snelheidRechtermotor in op||``.  
 ``||variables:snelheidRechtermotor||`` en  ``||variables:snelheidLinkermotor||`` zijn handige namen voor variabelen, maar we kunnen deze woorden niet gebruiken als berichtnamen, omdat die maximaal 8 letters lang mogen zijn. Daarom kiezen we voor "LMotor" en "RMotor". Voeg deze namen toe aan de radioblokken die je net aan je code hebt toegevoegd.


#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = 0 - input.rotation(Rotation.Pitch)
    draaihoek = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        links = kantelhoek + draaihoek
        rechts = kantelhoek - draaihoek
        snelheidLinkermotor = Math.map(links, -90, 90, -100, 100)
        snelheidRechtermotor = Math.map(rechts, -90, 90, -100, 100)
        radio.sendValue("LMotor", 0)
        radio.sendValue("RMotor",0)
    } else {
        radio.sendValue("stop", 0)
    }
})
```

### Stap 31
De waarden (values) die we gaan verzenden zijn de waarden van de variabelen "snelheidLinkermotor" en "snelheidRechtermotor". Kijk of je die variabele-blokken in de juiste radioblokken kunt plaatsen. 

#### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = 0 - input.rotation(Rotation.Pitch)
    draaihoek = input.rotation(Rotation.Roll)
    if (input.buttonIsPressed(Button.A)) {
        links = kantelhoek + draaihoek
        rechts = kantelhoek - draaihoek
        snelheidLinkermotor = Math.map(links, -90, 90, -100, 100)
        snelheidRechtermotor = Math.map(rechts, -90, 90, -100, 100)
        radio.sendValue("LMotor", snelheidLinkermotor)
        radio.sendValue("RMotor", snelheidRechtermotor)
    } else {
        radio.sendValue("stop", 0)
    }
})
```

### Stap 32
Klik nu op ``|Download|`` om de code op de controller-micro:bit te zetten.

### Code van de afstandsbediening is bijna klaar @unplugged
We hebben nu de radioberichten van de zender flink veranderd. Tijd om de code van de ontvanger, oftewel de micro:bit in de :MOVE Motor, daarop aan te passen. Klik daarvoor op de tutorial hiernaast.

Als je de code van de micro:bit in de :MOVE Motor hebt aangepast en uitgetest, kun je nog 1 keer terugkomen naar deze tutorial. Hier vind je als laatste nog een tip om de code van de zender nog iets aan te passen als je vindt dat :MOVE Motor te scherp draait.

![Right Arrow](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/right-arrow.jpg)


### Stap 33

Als je de micro:bit die je als afstandsbediening gebruikt flink naar links of rechts draait, gaat de :MOVE Motor mogelijk spinnen (snel op zijn plek ronddraaien). Als je het robotje minder scherpe bochten wilt laten maken, kun je ervoor kiezen om de draaihoek minder zwaar mee te tellen als je de kantelhoek en de draaihoek mixt. Dat kun je doen door de draaihoek bijvoorbeeld door 3 of 4 te delen voordat je deze bij de kantelhoek optelt of aftrekt. Daarvoor kun je het ``||math:0 : 0||`` blok gebruiken met links het blok ``||input:rotatie||`` met als keuze "draaien" en rechts 3 of 4. Test maar uit welk getal jij prettig vindt.

 #### ~ tutorialhint
```blocks
basic.forever(function () {
    kantelhoek = 0 - input.rotation(Rotation.Pitch)
    draaihoek = input.rotation(Rotation.Roll) / 4
    if (input.buttonIsPressed(Button.A)) {
        links = kantelhoek + draaihoek
        rechts = kantelhoek - draaihoek
        snelheidLinkermotor = Math.map(links, -90, 90, -100, 100)
        snelheidRechtermotor = Math.map(rechts, -90, 90, -100, 100)
        radio.sendValue("LMotor", snelheidLinkermotor)
        radio.sendValue("RMotor", snelheidRechtermotor)
    } else {
        radio.sendValue("stop", 0)
    }
})
```
