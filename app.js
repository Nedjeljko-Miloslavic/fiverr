const canvas = document.querySelector("canvas")
canvas.width = 1200
canvas.height = 600

const c = canvas.getContext("2d")
c.font = "25px Arial"

//----CLASSES-----
//this is generic background class (for sky and ground)

class Background{
    constructor(position,size,color){
        this.position = position
        this.size = size
        this.color = color
    }

    draw(){
        c.beginPath()
        c.fillStyle = this.color
        c.fillRect(this.position.x, this.position.y, this.size.x, this.size.y)
        
    }
}





//colors
const skyBg = c.createLinearGradient(0,0,0,canvas.height)
skyBg.addColorStop(0, "rgb(0,0,100)")
skyBg.addColorStop(0.5, "rgb(100,100,200)")
skyBg.addColorStop(1, "white")

const groundBg = c.createLinearGradient(0,300,0,canvas.height)
groundBg.addColorStop(0, "rgb(110,45,10)")
groundBg.addColorStop(0.5, "rgb(150,50,20)")
groundBg.addColorStop(1, "rgb(190,105,40)")

const sunBg = c.createRadialGradient(100,70,30,100,70,50)
sunBg.addColorStop(0, "white")
sunBg.addColorStop(1, "rgba(250,250,0,0)")

//drawing sky and ground, we are using gradient colors defined above
const sky = new Background({x:0,y:0},{x:canvas.width,y:300},skyBg)
const ground = new Background({x:0,y:300},{x:canvas.width,y:300},groundBg)





//animations
let counter = 0

class Pikachu{
    constructor(){
        this.x = 100
        this.y = 400
        this.sizeX = 150
        this.sizeY = 100
        this.images = {
            pikachuRunning: createImage("./images/pikachu-running.png"),
            angryPikachu: createImage("./images/angry-pikachu.png"),
            deadPikachu: createImage("./images/dead-pikachu.png")
        }
        this.currentImage = this.images.deadPikachu
        this.currentFrame = 0
    }

    draw(){

    
        if(this.currentImage === this.images.pikachuRunning){
            this.x+=2
            c.drawImage(this.currentImage,Math.floor(this.currentFrame)*450,0,450,321,this.x,this.y,this.sizeX,this.sizeY)
            if(this.currentFrame<3){
                this.currentFrame+=0.1
            }else{
                this.currentFrame = 0
            }
        }

        if(this.currentImage === this.images.angryPikachu){
            c.save()
            c.scale(-1,1)
            c.drawImage(this.currentImage,Math.floor(this.currentFrame)*1750,0,1750,1183,-this.x,this.y-10,-this.sizeX-60,this.sizeY+30)
            if(this.currentFrame<6){
                this.currentFrame+=0.07
            }else{
                this.currentFrame = 0
            }
            c.restore()
        }

        if(this.currentImage === this.images.deadPikachu){
            c.drawImage(this.currentImage,Math.floor(this.currentFrame)*200,0,200,157,this.x+20,this.y+40,this.sizeX-40,this.sizeY-40)
            if(this.currentFrame<8){
                this.currentFrame+=0.07
            }
            
        }
    }
}

class Raichu{
    constructor(){
        this.x = 700
        this.y = 390
        this.sizeX = 190
        this.sizeY = 120
        this.images = {
            raichuIdle: createImage("./images/raichu-idle.png"),
            raichuAngry: createImage("./images/raichu-idle.png"),
            raichuDead: createImage("./images/raichu-dead.png")
        }
        this.currentImage = this.images.raichuIdle
        this.currentFrame = 0
    }

    draw(){
        if(this.currentImage === this.images.raichuIdle){
            c.drawImage(this.currentImage,Math.floor(this.currentFrame)*500,0,500,506,this.x,this.y,this.sizeX,this.sizeY)
            if(this.currentFrame<14){
                this.currentFrame+=0.07
            }else{
                this.currentFrame = 0
            }
        }

        if(this.currentImage === this.images.raichuAngry){
            this.currentFrame = 0
            c.drawImage(this.currentImage,Math.floor(this.currentFrame)*500,0,500,506,this.x,this.y,this.sizeX,this.sizeY)
        }

        if(this.currentImage === this.images.raichuDead){
            c.drawImage(this.currentImage,Math.floor(this.currentFrame)*200,0,200,175,this.x,this.y,this.sizeX-10,this.sizeY-20)
            if(this.currentFrame<18){
                this.currentFrame+=0.1
            }else{
                this.currentFrame = 0
            }
        }
    }
}

class Lightning{
    constructor(){
        this.x = 580
        this.y = 180
        this.sizeX = 250
        this.sizeY = 300
        this.currentFrame = 0
        this.image = createImage("./images/lightning.png")
    }

    draw(){
        c.drawImage(this.image,Math.floor(this.currentFrame)*200,0,200,200,this.x,this.y,this.sizeX,this.sizeY)
        if(this.currentFrame<4){
            this.currentFrame += 0.1
        }else{
            this.currentFrame = 0
        }
        
    }
}

class Text{
    constructor(x,y,sizeX,sizeY,url,text){
        this.x = x
        this.y = y
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.image = createImage(url)
        this.text = text
    }
    draw(){
        let pos = 0
        c.drawImage(this.image,0,0,958,958,this.x,this.y,this.sizeX,this.sizeY)
        c.fillStyle = "black"
        c.font = "15px Arial"
        this.text.forEach(line=>{
            pos += 20
            c.fillText(line,this.x+15,this.y+pos+8)
        })
        
    }
}

const textPika = new Text(530,320,100,120,"./images/bubble.png",["I am the", "stronger", "pokemon!!"])
const textRaichu = new Text(750,320,140,120,"./images/vertical-bubble.png",["NO, I am the", "stronger", "pokemon!!"])
const textPikaDead = new Text(500,320,100,120,"./images/bubble.png",["I shouldnt", "have done", "this..."])

const pikachu = new Pikachu()
const raichu = new Raichu()
const lightning = new Lightning()




function animate(){
    c.clearRect(0,0,canvas.width,canvas.height)
    //drawing sky
    sky.draw()
    

    //drawing sun
    c.fillStyle = sunBg
    c.arc(100,70,50,0,Math.PI*2)
    c.fill()

    //drawing ground trees
    ground.draw()
   // treeArray.forEach(tree=>tree.draw())
   

    requestAnimationFrame(animate)

    pikachu.draw()
    raichu.draw()
    
    
    counter++

    //lightning
    if(counter<600 && counter>550){
        lightning.draw()
    }

    //conversation
    if(counter>200 && counter<350){
        textPika.draw()
    }
    if(counter>350 && counter<500){
        textRaichu.draw()
    }
    if(counter>750 && counter<900){
        textPikaDead.draw()
    }

    if(counter<200){
        pikachu.currentImage = pikachu.images.pikachuRunning
        raichu.currentImage = raichu.images.raichuIdle
    }else if(counter<650){
        pikachu.currentImage = pikachu.images.angryPikachu
        raichu.currentImage = raichu.images.raichuAngry
    }else if(counter <1000){
        pikachu.currentImage = pikachu.images.deadPikachu
        raichu.currentImage = raichu.images.raichuDead
    }else{
        counter = 0
        pikachu.x = 100
    }
}

animate()


function createImage(src){
    const image = new Image()
    image.src = src
    return image
}