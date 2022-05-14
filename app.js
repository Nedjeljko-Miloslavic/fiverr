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
}

let car

function create (){
    this.add.image(500,300,"sky").setScale(2)
    this.add.image(500,600,"grass").setScale(3,1)
    this.add.image(500,300,"city")

    car = this.physics.add.sprite(100,100,"car").setScale(1.5)

    this.anims.create({
        key:"forward",
        frames:this.anims.generateFrameNames("car", {prefix:"sprite",start:3,end:7, zeroPad:1}),
        repeat:-1,
        frameRate:4
    })

    this.anims.create({
        key:"sideways",
        frames:this.anims.generateFrameNames("car", {prefix:"sprite",start:7,end:7, zeroPad:1}),
    })

    car.anims.play("sideways")
    
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
    })
}


function update ()
{
    
    
}




function placeCar(){
    console.log(car.y)
    if(car.x>200 && car.x<780 && car.y>70 && car.y<520){
        car.x = 600
        car.y = 400
    }
}
