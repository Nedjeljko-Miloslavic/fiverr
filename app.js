var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
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
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.image('black', 'assets/black.png');
    this.load.image('start', 'assets/start.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });

    this.load.audio("coin", 'assets/coin.wav')
    this.load.audio("hit", 'assets/hit.wav')
    this.load.audio("lose", 'assets/lose.mp3')
}

let player
let sky
let platforms
let star
let bomb
let playerHit = false

let cursors
let black
let start
let startMessage
let pressClick
let keySpace
let gameStarted = false
let score = 0
let scoreText
let lives = 3
let livesText
let help
let inHelp = false
let newGame
let newGameOpen = false

let coinSound
let hitSound

let keyPressed = false

function create (){
   this.physics.pause()
    //sounds
    coinSound = this.sound.add("coin")
    hitSound = this.sound.add("hit")
    loseSound = this.sound.add("lose")
    

    sky = this.add.image(600,350,"sky").setScale(2)

    //player and platforms
    player = this.physics.add.sprite(600,300, "dude").setScale(1)
    platforms = this.physics.add.staticGroup()
    platforms.create(0,210,"ground")
    platforms.create(150,450,"ground")
    platforms.create(1200,420,"ground")
    platforms.create(700,250,"ground").setScale(0.3,1).refreshBody()
    platforms.create(600,700,"ground").setScale(3).refreshBody()
    
    this.physics.add.collider(platforms,player)
    player.setCollideWorldBounds(true);
    player.setBounce(0.2)

    //star
    star = this.physics.add.sprite(100,100,"star")
    this.physics.add.collider(star,platforms)
    star.setBounce(0.8)
    this.physics.add.overlap(player, star, collectStar, null, this);

    //bomb
    bomb = this.physics.add.sprite(1000,100,"bomb").setScale(3)
    this.physics.add.collider(bomb,platforms)
    bomb.setBounce(1,0.8)
    bomb.setVelocityX(200)
    bomb.setCollideWorldBounds(true)
    this.physics.add.overlap(player, bomb, hitBomb, null, this);

    //score
    scoreText = this.add.text(1000,40,"Score: "+score,{fontSize:"20px"})
    livesText = this.add.text(1000,70,"Lives: " + lives, {fontSize:"20px"})
    help = this.add.text(1000,100,"Press H for help", {fontSize:"20px"})
    newGame = this.add.text(1000,130,"Press M for New game", {fontSize:"15px"})
    //anims
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });


    

    //keys
    cursors = this.input.keyboard.createCursorKeys()
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    nKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    hKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
    yKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);

    black = this.add.image(600,350, "black").setScale(3)
    
    startMessage = this.add.text(16, 16, startGameText, { fontSize: '32px', fill: '#ffffff' });
    pressClick = this.add.text(350,500,"PRESS CLICK TO PLAY", {fontSize:"40px", fill:"#ffffff"})
    
    
    this.input.once('pointerdown',()=> {
        initFunction()
    });

}

function update ()
{
    
    if(nKey.isDown && !gameStarted){
        initFunction()
        gameStarted = true
    }

    
    
    if(mKey.isDown && gameStarted && !newGameOpen && !inHelp){
        newGameOpen = true
        black = this.add.image(600,350,"black")
        startMessage = this.add.text(510,200,"Are you sure",{fontSize:"25px"})
        pressClick = this.add.text(570,300,"Y/N", {fontSize:"20px"})
    }else if(nKey.isDown && newGameOpen){
        newGameOpen = false
        black.destroy()
        startMessage.destroy()
        pressClick.destroy()
    }

    if(yKey.isDown && newGameOpen){
        newGameOpen = false
        initFunction()
    }

    
    

    if(cursors.right.isDown && !playerHit){
        player.setVelocityX(200)
        player.anims.play("right", true)
    }
    else if(cursors.left.isDown && !playerHit){
        player.setVelocityX(-200)
        player.anims.play("left", true)
    }else if(!playerHit){
        player.anims.play("turn", true)
        player.setVelocityX(0)
    }
    if(cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-560)
    }

    if(bomb.body.touching.down){
        if(Math.random()>0.97){
            bomb.setVelocityY(-900)
        }
    }

    if(gameStarted && !inHelp){
        this.physics.resume()
        
    }

    if(inHelp){
        this.input.keyboard.on("keydown", function() {
            startMessage.destroy()
            pressClick.destroy()
            black.destroy()
            inHelp = false
            
        })
    }

    if(!inHelp && hKey.isDown && !newGameOpen){
        inHelp = true
        black = this.add.image(600,350,"black")
        startMessage = this.add.text(510,200,"Controls",{fontSize:"30px"})
        pressClick = this.add.text(420,300,"Right - right keyboard arrow\n\nLeft - left keyboard arrow\n\nJump - up keyboard arrow\n\n\n\n  Press any key to continue", {fontSize:"20px"})
        this.physics.pause()
    }
    

    livesText.setText("Lives: " + lives)
    scoreText.setText("Score: " + score)
}






function initFunction (){
    newGameOpen = false
    inHelp = false
    lives = 3
    score = 0
    gameStarted = true
    black.destroy();
    pressClick.destroy()
    startMessage.destroy()
    player.x = 600
    player.y = 300
    bomb.x = 1000
    bomb.y = 0
}

function collectStar(player,star){
    coinSound.play()
    score+=10
    
    star.disableBody(true,true)
    setTimeout(()=>{
        if(player.x>600){
            star.enableBody(true, Math.random()*600, 0, true, true)
        }
        else{
            star.enableBody(true, Math.random()*600+600, 0, true, true)
        }
    },2000)
    
}

function hitBomb(player,bomb){

    if(lives===1){
        loseSound.play()
        gameStarted = false
        this.physics.pause()
        black = this.add.image(600,350,"black").setScale(2.2)
        startMessage = this.add.text(510,300, "GAME OVER", {fontSize:"33px"})
        pressClick = this.add.text(490,450, "Press N for new game", {fontSize:"20px"})
    }
    
   
    hitSound.play()
    playerHit = true
    setTimeout(()=>{
        playerHit = false
    },1000)
    if(player.x>bomb.x){
        player.setVelocityX(300)
    }else{
        player.setVelocityX(-300)
    }
    lives--
    
    bomb.disableBody(true,true)
    setTimeout(()=>{
        if(player.x>600){
            bomb.enableBody(true, Math.random()*600, 0, true, true)
            bomb.setVelocityX(200)
        }
        else{
            bomb.enableBody(true, Math.random()*600+600, 0, true, true)
            bomb.setVelocityX(-200)
        }
    },2000)
    
}