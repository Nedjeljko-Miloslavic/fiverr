const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width = 600
canvas.height = 400


const image = new Image()
image.src = "./images/svg.svg"


let waving = true

class Monster{
    constructor(x,y,sizeX,sizeY){
        this.x = x
        this.y = y 
        this.sizeX = sizeX
        this.sizeY = sizeY
        this.angle = 0
        this.rotation = 0.1
        this.waving = true
        this.counter = 0
        this.gravity = 0.15
        this.velocityY = 0
        this.eyesPosition = 0
        this.eyesMove = 1
    }

    drawBody(){
        c.drawImage(image,40,0,90,130,this.x,this.y,this.sizeX,this.sizeY)
    }
    drawArms(){
        if(this.waving){
            this.angle += this.rotation
            if(this.angle>1.3){
                this.rotation*=-1
            }
            if(this.angle<-0.2){
                this.rotation*=-1
                this.counter ++
            }
        }

        if(this.counter>2){
            this.waving = false
            this.angle = 0
        }
        
        c.save()
        c.translate(this.x+110,this.y+70)
        c.rotate(this.angle)
        c.drawImage(image,220,50,50,50,0,-100,this.sizeX/1.5,this.sizeY/1.5)
        c.restore()
        c.drawImage(image,150,50,50,50,this.x-30,this.y-20,this.sizeX/1.5,this.sizeY/1.5)
    }

    drawEyes(){
        c.drawImage(image,330,60,30,30,this.x+30,this.y+40,this.sizeX*0.22,this.sizeY*0.18)
        c.drawImage(image,330,60,30,30,this.x+80,this.y+40,this.sizeX*0.22,this.sizeY*0.18)

        c.drawImage(image,380,60,30,30,this.x+30+this.eyesPosition,this.y+40,this.sizeX*0.20,this.sizeY*0.17)
        c.drawImage(image,380,60,30,30,this.x+80+this.eyesPosition,this.y+40,this.sizeX*0.20,this.sizeY*0.17)
    }

    drawMouth(){
        c.drawImage(image,430,70,100,50,this.x+40,this.y+80,this.sizeX*0.8,this.sizeY*0.4)
    }

    update(){
        this.y+=this.velocityY
        if(this.y <200){
            this.velocityY+=this.gravity
        }else{
            this.velocityY = 0
        }

        if(this.eyesPosition<6+this.eyesMove && this.eyesMove>0){
            this.eyesPosition += this.eyesMove
        }else if(this.eyesPosition>-2+this.eyesMove && this.eyesMove<0){
            this.eyesPosition += this.eyesMove
        }
    }
}



const monster = new Monster(200,150,150,200)

setInterval(()=>{
    monster.waving = true
    monster.counter = 0
},6000)

setInterval(()=>{
    monster.velocityY = -4
},10000)

setInterval(()=>{
    monster.eyesMove *=-1
},5000)

function animate(){
    c.clearRect(0,0,canvas.width,canvas.height)
    requestAnimationFrame(animate)
    monster.drawArms()
    monster.drawBody()
    monster.drawEyes()
    monster.drawMouth()
    monster.update()

}

animate()

