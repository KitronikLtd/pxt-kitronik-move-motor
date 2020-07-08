### @activities true
### @explicitHints true

#:MOVE Motor Lumières and Son

## Introduction
### Introduction @unplugged
Apprenez à utiliser les feux du :MOVE motor pour faire des phares et des clignotants, puis combinez-les avec le buzzer pour créer une voiture de police.

![:MOVE Motor angled view with lights](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/move-motor-lights.jpg)

## Phares et feux arrière
### Étape 1
Pour commencer, faisons des phares et des feux arrière pour :MOVE Motor.  
Tout d'abord, placez les bloc ``||variables:définir moveMotorZIP à||`` ``||Kitronik_Move_Motor.MOVE Motor avec 4 DEL ZIP||`` de la catégorie ``||Kitronik_Move_Motor.Luminères||`` dans ``||Kitronik_Move_Motor.MOVE Motor||`` dans le bloc ``||basic:au démarrage||``.  
Cela permet de mettre les DEL ZIP sur :MOVE Motor prêt à être utilisé.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
```

### Étape 2
Comme nous allons avoir des phares avant et des feux arrière, nous devons également créer deux variables, ``||variables:phares||`` et ``||variables:feux_arrière||``.  
Dans le bloc ``||basic:au démarrage||`` utilisez la variable``||variables:modifier de||`` pour que  ``||variables:phares||`` soit égal à un``||Kitronik_Move_Motor.gamme de 0 avec 2 DEL||`` et ``||variables:feux_arrière||`` égal à un ``||Kitronik_Move_Motor.gamme de 2 avec 2 DEL||``. Les plages séparées signifient que les deux ensembles de feux peuvent être contrôlés individuellement.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let phares = moveMotorZIP.range(0, 2)
let feux_arrière = moveMotorZIP.range(2, 2)
```

### Étape 3
Nous devons maintenant régler les lumières pour qu'elles soient de la bonne couleur : **blanc** pour les phares, **rouge** pour les feux arrière.  
Dans la boucle ``||basic:toujours||`` utilisez le bloc ``||Kitronik_Move_Motor.montrer la couleur ||`` de la section ``||Kitronik_Move_Motor.Lights||`` de la catégorie ``||Kitronik_Move_Motor.MOVE Motor||`` pour afficher les couleurs. Modifiez la liste déroulante pour sélectionner les variables``||variables:phares||`` et ``||variables:feux_arrière||`` dans les différents blocs.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let phares = moveMotorZIP.range(0, 2)
let feux_arrière = moveMotorZIP.range(2, 2)
basic.forever(function () {
    phares.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
    feux_arrière.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
})
```

### Étape 4
Si vous avez un @boardname@ connecté, cliquez sur ``|Télécharger|``  pour transférer votre code. Puis allumez :MOVE Motor et voyez les lumières s'allumer !

### Lumières automatiques @unplugged
Ainsi, :MOVE Motor a maintenant de belles lumières vives, mais sur les vrais véhicules, les lumières ne sont pas allumées tout le temps - elles ne doivent être utilisées que lorsqu'il fait sombre.
Beaucoup de voitures modernes ont des phares qui s'allument automatiquement lorsqu'un certain niveau de lumière est atteint, et nous pouvons faire la même chose avec :MOVE Motor... !

### Étape 5
L'écran LED micro:bit peut également fonctionner comme un capteur de lumière, que nous pouvons ensuite utiliser comme un interrupteur pour allumer et éteindre les lumières du :MOVE motor. 
Faites glisser les blocs ``||Kitronik_Move_Motor.montrer la couleur||`` hors de la boucle  ``||basic:toujours||`` ,en les laissant de côté, et ajoutez un bloc  ``||logic:si||`` de la catégorie ``||logic:Logique||``.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let phares = moveMotorZIP.range(0, 2)
let feux_arrière = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (true) {
    	
    }
})
```

### Étape 6
Ajoutez une condition de test à l'instruction  ``||logic:si||`` pour vérifier si``||input:light level||``  (qui se trouve dans la catégorie ``||input:Input||``) est  ``||logic:< 20||``.  
**Note : Le nombre réel peut devoir être modifié en fonction de vos conditions de luminosité particulières. 20 a bien fonctionné pendant les tests.  
Enfin, faites glisser ces blocs  ``||Kitronik_Move_Motor.montrer la couleur||`` à l'intérieur du bloc ``||logic:si||``.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let phares = moveMotorZIP.range(0, 2)
let feux_arrière = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (input.lightLevel() < 20) {
        phares.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
        feux_arrière.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    }
})
```

### Étape 7
Si vous avez un @boardname@ connecté, cliquez sur ``|Télécharger|``pour transférer votre code.  
Essayez de faire varier la lumière sur l'écran micro:bit et voyez les lumières du :MOVE motor s'allumer toutes seules.

### Étape 8
Les lumières s'allument maintenant quand il fait assez sombre, mais pour le moment, elles restent allumées pour toujours. Nous devons les faire s'éteindre à nouveau lorsque les niveaux de lumière sont suffisamment élevés.
Cliquez sur l'icône ``||logic:+||`` sur le bloc ``||logic:si||``pour ajouter une section ``||logic:sinon||``, puis ajoutez un``||Kitronik_Move_Motor.éteignez||``bloc suivi d'un bloc``||Kitronik_Move_Motor.montrer||`` de la section ``||Kitronik_Move_Motor.Lumières||``de la catégorie ``||Kitronik_Move_Motor.MOVE Motor||``.

#### ~ tutorialhint
```blocks
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let phares = moveMotorZIP.range(0, 2)
let feux_arrière = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (input.lightLevel() < 20) {
        phares.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
        feux_arrière.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    } else {
        moveMotorZIP.clear()
        moveMotorZIP.show()
    }
})
```

### Étape 9
Si vous avez un @boardname@ connecté, cliquez sur ``|Télécharger|``pour transférer votre code.  
Maintenant que vous faites varier les niveaux de lumière, les lumières du :MOVE motor s'allument et s'éteignent.

## Indicateurs
### Introduction @unplugged
Maintenant que les phares et les feux arrière de :MOVE Motor sont en place, passons à l'indication du moment où nous tournons.

### Étape 1
En indiquant, nous allons vouloir tourner soit à gauche, soit à droite. Cela signifie que nous devrons utiliser des LEDs ZIP différentes pour chaque action.
Cependant, comme presque tout le reste est identique, nous pouvons utiliser une ``||functions:fonction||`` pour faciliter les choses.   
Cliquez sur **``Avancé``** pour faire apparaître d'autres catégories de blocs, puis dans la catégorie ``||functions:Fonction||`` ,cliquez sur ``||functions:Créer une fonction...||``.
Ajoutez un paramenter **``Texte``** et appelez-le **``direction``**, , nommez la fonction **``indicate``** et cliquez sur **``Terminé``**. 

#### ~ tutorialhint

![Animation that shows how to create a function](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/fr_create-function.gif)

```ghost
function indicate (direction: string) {
	
}
let moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let phares = moveMotorZIP.range(0, 2)
let feux_arrière = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (input.lightLevel() < 20) {
        phares.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
        feux_arrière.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
    } else {
        moveMotorZIP.clear()
        moveMotorZIP.show()
    }
})
```

### Étape 2
Ajoutez un bloc ``||logic:si||`` à la fonction, puis cliquez deux fois sur l'icône ``||logic:+||`` . Cela ajoutera une section supplémentaire ``||logic:sinon||`` et ``||logic:sinon si||`` , mais nous n'avons pas besoin de la section``||logic:sinon||``, donc cliquez sur l'icône ``||logic:-||`` pour la supprimer. 
Maintenant, nous avons besoin de quelques conditions de test. Dans l'instruction ``||logic:si||`` , vérifiez si ``||variables:direction||`` ``||logic:=||`` **``"gauche"``** (faites glisser ``||variables:direction||`` dans le bloc ``||functions:function||``). Utilisez le même bloc de test dans l'instruction ``||logic:sinon si||``  mais vérifiez plutôt la présence de **``"droite"``**.
**Note:** Veillez à utiliser le bloc de comparaison de texte.

#### ~ tutorialhint
```blocks
function indicate (direction: string) {
    if (direction == "gauche") {
    	
    } else if (direction == "droite") {
    	
    }
}
```

### Étape 3
Ensuite, nous devons mettre en place l'indicateur de gauche. Mettez une boucle ``||loops:répéter 4 fois||`` dans l'instruction ``||logic:si||`` en vérifiant la présence de **``"gauche"``**,puis à l'intérieur, ``||Kitronik_Move_Motor.fixer DEL ZIP||``0 et 3 pour être orange. Faites suivre avec un bloc``||Kitronik_Move_Motor.montrer||``.

#### ~ tutorialhint
```blocks
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
function indicate (direction: string) {
    if (direction == "gauche") {
        for (let index = 0; index < 4; index++) {
            moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.show()
        }
    } else if (direction == "droite") {
    	
    }
}
```

### Étape 4
Si la fonction est appelée, les DEL ZIP sur le côté gauche s'allument alors. Mais les voyants clignotent et s'éteignent, nous devons donc ajouter quelques pauses et éteindre les DEL.
Après le bloc ``||Kitronik_Move_Motor.montrer||`` ajoutez un bloc de 200ms``||basic:pause||``, suivi d'un bloc ``||Kitronik_Move_Motor.éteignez||`` et ``||Kitronik_Move_Motor.montrer||``, et enfin un autre bloc de 200ms ``||basic:pause||``. La boucle  ``||loops:répéter||`` fera s'allumer et s'éteindre les indicateurs 4 fois.

#### ~ tutorialhint
```blocks
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
function indicate (direction: string) {
    if (direction == "gauche") {
        for (let index = 0; index < 4; index++) {
            moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.show()
            basic.pause(200)
            moveMotorZIP.clear()
            moveMotorZIP.show()
            basic.pause(200)
        }
    } else if (direction == "droite") {
    	
    }
}
```

### Étape 5
Le code de l'indicateur de droite est presque identique à celui de gauche, donc cliquez avec le bouton droit et dupliquez la boucle ``||loops:répéter||``et tout ce qu'elle contient, puis mettez le nouveau code dans la section ``||logic:sinon si||`` . Il ne reste plus qu'à changer les LED. Pour utiliser les lumières du côté droit, ``||Kitronik_Move_Motor.fixer DEL ZIP||``1 et 2 pour être orange

#### ~ tutorialhint

![Animation that shows how to duplicate sections of code](https://KitronikLtd.github.io/pxt-kitronik-move-motor/assets/fr_duplicate-blocks.gif)

```ghost
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
function indicate (direction: string) {
    if (direction == "gauche") {
        for (let index = 0; index < 4; index++) {
            moveMotorZIP.setZipLedColor(0, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.setZipLedColor(3, Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Orange))
            moveMotorZIP.show()
            basic.pause(200)
            moveMotorZIP.clear()
            moveMotorZIP.show()
            basic.pause(200)
        }
    } else if (direction == "droite") {
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

### Étape 6
Maintenant que nous avons terminé la fonction, il est temps de l'utiliser. Apportez un bloc ``||input:lorsque le bouton A pressé||`` et utilisez les blocs ``||Kitronik_Move_Motor.MOVE Motor||``  pour faire avancer :MOVE Motor, tourner à gauche et ensuite s'arrêter (vous aurez besoin de ``||basic:pauses||`` après les blocs de mouvement pour donner à :MOVE Motor le temps de se déplacer réellement).  
Immédiatement après le bloc ``||Kitronik_Move_Motor.déplace Left a vitesse||``, ajoutez le bloc ``||functions:appel indicate||`` de la catégorie`||functions:Function||`` category. Tapez **``"gauche"``** dans le bloc appel de fonction. 

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(2000)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, 40)
    indicate("gauche")
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
})
function indicate (direction: string) {}
```

### Étape 7
Dupliquez le bloc ``||input:lorsque le bouton A pressé||``. Ensuite, modifiez la liste déroulante pour qu'elle devienne ``||input:lorsque le bouton B pressé||``, modifiez le ``||Kitronik_Move_Motor.déplace Left a vitesse||`` to ``||Kitronik_Move_Motor.déplace Left a vitesse||``, et l'appel de fonction en **``"droite"``**.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.A, function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(2000)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Left, 40)
    indicate("gauche")
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
})
input.onButtonPressed(Button.B, function () {
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(2000)
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Right, 40)
    indicate("droite")
    Kitronik_Move_Motor.move(Kitronik_Move_Motor.DriveDirections.Forward, 50)
    basic.pause(1000)
    Kitronik_Move_Motor.stop()
})
function indicate (direction: string) {}
```

```ghost
clignotant = true
clignotant = false
```

### Étape 8
Si vous avez un @boardname@ connecté, cliquez sur ``|Télécharger|``pour transférer votre code. 
Appuyez sur le ``||input:lorsque le bouton A pressé||``  ou sur le ``||input:lorsque le bouton B pressé||`` et voyez le message suivant :MOVE Motor se tourner et indiquer. Cependant, il peut y avoir des problèmes avec nos phares automatiques, donc il y a encore quelques choses à faire...


### Étape 9
Pour mettre fin aux interférences des phares, nous devons arrêter temporairement le fonctionnement des phares. Créez une nouvelle variable appelée``||variables:clignotant||``, définissez-la comme suit``||logic:vrai||`` au début de la   ``||functions:indicate||``fonction et ``||logic:faux||`` à la fin. Enfin, mettez tout dans la boucle ``||basic:toujours||``à l'intérieur d'une autre déclaration``||logic:si||`` en vérifiant ``||logic:si non||`` ``||variables:clignotant||``. Cela permet de s'assurer que lorsque :MOVE Motor indique, les phares n'essayent pas de s'allumer en même temps.

#### ~ tutorialhint
```blocks
let clignotant = false
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let phares = moveMotorZIP.range(0, 2)
let feux_arrière = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (!(clignotant)) {
        if (input.lightLevel() < 20) {
            phares.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
            feux_arrière.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
        } else {
            moveMotorZIP.clear()
            moveMotorZIP.show()
        }
    }
})
```

### Étape 10
Si vous avez un @boardname@ connecté, cliquez sur ``|Télécharger|``pour transférer votre code. 
Essayez-le. Maintenant, il ne devrait y avoir aucun problème avec les phares ou les clignotants.


## Voiture de police
### Introduction @unplugged
Nous sommes maintenant en mesure de contrôler les feux de :MOVE Motors pour qu'ils servent de phares, de feux arrière et de clignotants. Dans cette dernière section, nous allons combiner les feux avec le buzzer de :MOVE Motor pour en faire une voiture de police.

### Étape 1
Tout comme pour les clignotants, le "mode" de la voiture de police va être activé en appuyant sur des boutons. Tirez un bloc``||input:lorsque le bouton A+B pressé||`` , puis ajoutez le bloc ``||Kitronik_Move_motor.allumer la sirène||`` de la section ``||Kitronik_Move_Motor.Sons||`` de la catégorie ``||Kitronik_Move_Motor.MOVE Motor||``. Le buzzer émettra ainsi un son de sirène continu jusqu'à ce qu'il soit éteint.

#### ~ tutorialhint
```blocks
input.onButtonPressed(Button.AB, function () {
    Kitronik_Move_Motor.soundSiren(Kitronik_Move_Motor.OnOffSelection.On)
})
```

### Étape 2
Voilà le son trié, maintenant pour quelques lumières de style policier. Aussi dans le bloc ``||input:lorsque le bouton A+B pressé||``, utilisez 4 des blocs ``||Kitronik_Move_Motor.fixer DEL ZIP # à couleur||`` blocs à fixer:
* DEL 0 to ``||variables:rouge||``
* DEL 1 to ``||basic:bleu||``
* DEL 2 to ``||variables:rouge||``
* DEL 3 to ``||basic:bleu||``  
Suivez-les avec un bloc ``||Kitronik_Move_Motor.montrer||`` pour les faire afficher. 

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

### Étape 3
Ensuite, mettez une seconde ``||basic:pause||``, puis démarrez :MOVE Motor avançant à 100% de sa vitesse.
Si vous avez un @boardname@ connecté, cliquez sur ``|Télécharger|``pour transférer votre code. 
Appuyez simultanément sur les boutons ``||input:lorsque le bouton A+B pressé||`` et voyez :MOVE Motor s'éloigner avec la sirène en marche et les feux rouges et bleus.

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

### Feux clignotants @unplugged
C'était bien, mais les feux des voitures de police clignotent généralement, et vous avez peut-être remarqué que :MOVE Motor n'arrête pas d'avancer. Il y a encore quelques petites choses à faire pour que la voiture de police soit parfaite.

### Étape 4
Tirez une autre ``||loops:répéter 4 fois||`` et mettez-la dans le bloc ``||input:lorsque le bouton A+B pressé||`` après le bloc ``||Kitronik_Move_Motor.déplace Avant||``, mais modifiez le nombre de répétitions pour qu'il soit de 30. À l'intérieur de cette boucle, ajoutez un bloc``||Kitronik_Move_Motor.faire pivoter les DEL ZIP de 1||``, suivi d'un bloc ``||Kitronik_Move_Motor.montrer||`` et ensuite un bloc `||basic:pause||``de 100 ms. Lorsque les couleurs tournent autour des 4 LED, cela leur donne l'air de clignoter entre``||variables:rouge||`` et ``||basic:bleu||``.

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

### Étape 5
Une fois que les lumières ont terminé leurs 30 clignotements, il faut ``||Kitronik_Move_Motor.arrêtez||`` :MOVE Motor et ``||Kitronik_Move_Motor.turn siren off||``.

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

### Étape 6
Lorsque vous avez testé les phares et la sirène de la voiture de police plus tôt, vous avez peut-être remarqué que les phares et les feux arrière causaient à nouveau des problèmes, nous devons donc arrêter temporairement le fonctionnement des phares. 
Créez une nouvelle variable appelée ``||variables:police||``, définissez-la comme ``||logic:vrai||`` au début du bloc ``||input:lorsque le bouton A+B pressé||``, et ``||logic:faux||``à la fin. Enfin, dans la boucle  ``||basic:toujours||`` première déclaration``||logic:si||``, changez le contrôle pour être``||logic:si not||`` ``||variables:indicating||`` ``||logic:and not||`` ``||variables:police||``. Cela permettra de s'assurer que lorsque :MOVE Motor indique ou est en mode voiture de police, les phares ne tenteront pas de s'allumer en même temps.

#### ~ tutorialhint
```blocks
let indicating = false
let police = false
let moveMotorZIP: Kitronik_Move_Motor.MoveMotorZIP = null
moveMotorZIP = Kitronik_Move_Motor.createMoveMotorZIPLED(4)
let phares = moveMotorZIP.range(0, 2)
let feux_arrière = moveMotorZIP.range(2, 2)
basic.forever(function () {
    if (!(indicating) && !(police)) {
        if (input.lightLevel() < 20) {
            phares.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.White))
            feux_arrière.showColor(Kitronik_Move_Motor.colors(Kitronik_Move_Motor.ZipLedColors.Red))
        } else {
            moveMotorZIP.clear()
            moveMotorZIP.show()
        }
    }
})
```

### Étape 7
CODAGE COMPLET ! Si vous avez un @boardname@ connecté, cliquez sur ``|Télécharger|``pour transférer votre code. 
Essayez d'appuyer sur les ``||input:lorsque le bouton A+B pressé||`` maintenant. Regardez la sirène s'allumer, les lumières clignoter et :MOVE Motor drive forward, le tout sans interférence des phares.