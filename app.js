var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);


let startGameText = "name: \n\nThis game is about collecting stars \nand avoiding the 'bomb' that is jumping \naround the screen. You have 3 lives \nand every time you get hit by bomb \nyou lose one life. When losing all, game is over!"
function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image("city", "assets/city.webp")
    this.load.image("grass", "assets/grass.webp")
    this.load.atlas("car", "assets/car.png", "assets/sprites.json")
    this.load.spritesheet("helicopter", "assets/helicopter.png", {frameWidth:400,frameHeight:150})
    this.load.spritesheet("person", "assets/person.png", {frameWidth:83,frameHeight:144})
    
}

let car
let helicopter
let person
let helicopterMove = {
    move:false,
    moveRight:false,
    moveLeft:false
}

let carMove = {
    move:false,
    forward:false,
    backwards:false,
    turnLeft:false,
    turnRight:false,

}

function create (){
    this.add.image(500,300,"sky").setScale(2)
    this.add.image(500,600,"grass").setScale(3,1)
    this.add.image(500,300,"city")

    car = this.physics.add.sprite(100,100,"car").setScale(1.5)
    helicopter = this.physics.add.sprite(100,170,"helicopter").setScale(0.3)
    person = this.add.sprite(100,250,"person").setScale(0.6)

    //person anims
    this.anims.create({
        key:"person",
        frames:this.anims.generateFrameNumbers("person", {start:0,end:10}),
        repeat:-1,
        frameRate:3
    })
   


    //car anims
    this.anims.create({
        key:"forward",
        frames:this.anims.generateFrameNames("car", {prefix:"sprite",start:3,end:7, zeroPad:1}),
        repeat:1,
        frameRate:3
    })

    this.anims.create({
        key:"sideways",
        frames:this.anims.generateFrameNames("car", {prefix:"sprite",start:7,end:7, zeroPad:1}),
    })

    //helicopter anims
    this.anims.create({
        key:"helicopter",
        frames: this.anims.generateFrameNumbers("helicopter", {start:0,end:2}),
        repeat:-1,
        frameRate:15
    })
    car.anims.play("sideways")
    

    //controlling the dragging process
    person.setInteractive()
    this.input.setDraggable(person)
    person.on("pointerover", ()=>{
        person.setTint(0x44ff44)
    })
    person.on("pointerout", ()=>{
        person.clearTint()
    })

    helicopter.setInteractive()
    this.input.setDraggable(helicopter)
    helicopter.on("pointerover", ()=>{
        helicopter.setTint(0x44ff44)
    })
    helicopter.on("pointerout", ()=>{
        helicopter.clearTint()
    })

    car.setInteractive()
    this.input.setDraggable(car)
    car.on("pointerover", ()=>{
        car.setTint(0x44ff44)
    })
    car.on("pointerout", ()=>{
        car.clearTint()
    })


    this.input.on("drag", (pointer,gameObject,dragX,dragY)=>{
        gameObject.x = dragX
        gameObject.y = dragY
    })
    this.input.on("dragend", (pointer,gameObject,target)=>{
        if(gameObject===car) placeCar()
        if(gameObject===helicopter) placeHelicopter()
        if(gameObject===person) placePerson()
    })
}


function update ()
{
    if(helicopterMove.move){
        
        if(helicopterMove.moveLeft){
            helicopter.setScale(-0.5,0.5)
            helicopter.setVelocityX(-100)
        }else if(helicopterMove.moveRight){
            helicopter.setScale(0.5,0.5)
            helicopter.setVelocityX(100)
        }
        
        if(helicopter.x>800){
            helicopterMove.moveRight = false
            helicopterMove.moveLeft = true
        }
        if(helicopter.x<200){
            helicopterMove.moveRight = true
            helicopterMove.moveLeft = false
        }
        
        helicopter.anims.play("helicopter",true)
        
    }

    if(carMove.move){
        if(car.y>450){
            car.setScale(3)
        }else if(car.y>430){
            car.setScale(2.5)
        }else if(car.y>400){
            car.setScale(2)
        }else if(car.y>370){
            car.setScale(1.6)
        }else if(car.y>320){
            car.setScale(-1.3,1.3)
        }
        
        if(carMove.forward){
            car.anims.play("forward")
            if(car.y>370){
                car.setVelocityY(-20)
                car.setVelocityX(-3)
            }else if(car.y>330){
                car.setVelocityY(-6)
                car.setVelocityX(-5)
            }else if(car.y<325){
                carMove.forward = false
                carMove.turnLeft = true
            }
        }

        if(carMove.turnLeft){
            car.setVelocityY(0)
            car.setVelocityX(-30)
            car.anims.play("forward",true)
            if(car.x<500){
                car.setVelocityY(0)
                car.setVelocityX(0)
                carMove.turnLeft = false
                carMove.backwards = true
            }
        }

        if(carMove.backwards){
            car.anims.play("forward")
            if(car.y<330){
                car.setVelocityY(6)
                car.setVelocityX(-20)
            }else if(car.y<370){
                car.setVelocityY(14)
                car.setVelocityX(-10)
            }else if(car.y<440){
                car.setVelocityY(20)
                car.setVelocityX(-10)
            }
            else if(car.y<480){
                car.setVelocityY(0)
                car.setVelocityX(0)
                carMove.backwards = false
                carMove.forward = true
                car.x = 600
                car.y = 500
            }
        }
    }
    
}




function placeCar(){
    if(car.x>200 && car.x<780 && car.y>70 && car.y<520){
        car.x = 600
        car.y = 500
        car.disableInteractive()
        carMove.move = true
        carMove.forward = true
    }else{
        car.x = 100
        car.y = 100
    }
}

function placeHelicopter(){
    if(helicopter.x>200 && helicopter.x<780 && helicopter.y>70 && helicopter.y<520){
        helicopter.x = 600
        helicopter.y = 200
        helicopter.disableInteractive()
        helicopterMove.move = true
        helicopterMove.moveRight = true
    }else{
        helicopter.x = 100
        helicopter.y = 170
    }
}

function placePerson(){
    if(person.x>200 && person.x<780 && person.y>70 && person.y<520){
        person.disableInteractive()
        person.anims.play("person")
        if(person.x>500){
            person.x = 700
            person.setScale(-0.5,0.5)
        }else{
            person.x = 300
            person.setScale(0.5)
        }
        
        person.y = 350
    }else{
        person.x = 100
        person.y = 250
    }
}
