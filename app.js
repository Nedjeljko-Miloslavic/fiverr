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

class Grass{
    constructor(x,y,size){
        this.startX = x
        this.startY = y
        this.size = size
        this.endX = this.startX
        this.endY = this.startY-Math.random()*this.size*10 -5
        
    }

    draw(){
        c.lineWidth = this.size*0.9
        c.strokeStyle = "rgba(40,180,50,0.4)"
        c.lineCap = "round"
        
        for(let i=1; i<6; i++){
            c.beginPath()
            c.moveTo(this.startX,this.startY)
            c.lineTo(this.endX+Math.random()*20-10,this.endY+Math.random()*9)
            c.stroke()
        }
        
    }
}

class TreeElement{
    constructor(startX,startY,endX,endY,width,color){
        this.startX = startX
        this.startY = startY
        this.endX = endX
        this.endY = endY
        this.width = width
        this.color = color
    }

    draw(){
        c.beginPath()
        c.lineWidth = this.width
        c.strokeStyle = this.color
        c.lineCap = "round"
        c.moveTo(this.startX,this.startY)
        c.lineTo(this.endX,this.endY)
        c.stroke()
    }
}


//recursive function for drawing trees
function drawTree(x,y,depth,currentDepth=0,angle=Math.PI/2,length=70,width=15){
    if(currentDepth===depth){
        return
    }
    if(currentDepth===0){
        const endY = y - Math.sin(angle) * length
        const endX = x + Math.cos(angle)*length
        const tree = new TreeElement(x,y,endX,endY,width,"rgb(60,30,30)")
        treeArray.push(tree)
        currentDepth++
        length *= 0.5
        width *= 0.5
        drawTree(endX,endY,depth,currentDepth,angle,length,width)
    }else{
        length*=0.9
        width*=0.6

        let newAngle1 = angle+Math.random()*1.2-0.6
        let endY1 = y - Math.sin(newAngle1) * length
        let endX1 = x + Math.cos(newAngle1)*length
        let tree1 = new TreeElement(x,y,endX1,endY1,width,"green")
        treeArray.push(tree1)

        let newAngle2 = angle+Math.random()*1.2-0.6
        let endY2 = y - Math.sin(newAngle2) * length
        let endX2 = x + Math.cos(newAngle2)*length
        let tree2 = new TreeElement(x,y,endX2,endY2,width,"green")
        treeArray.push(tree2)

        let newAngle3 = angle+Math.random()*1.2-0.6
        let endY3 = y - Math.sin(newAngle3) * length
        let endX3 = x + Math.cos(newAngle3)*length
        let tree3 = new TreeElement(x,y,endX3,endY3,width,"green")
        treeArray.push(tree3)
        currentDepth++
        drawTree(endX1,endY1,depth,currentDepth,newAngle1,length,width)
        drawTree(endX2,endY2,depth,currentDepth,newAngle2,length,width)
        drawTree(endX3,endY3,depth,currentDepth,newAngle3,length,width)
    }
}

//function for drawing house
function drawHouse(){
    c.fillStyle = "yellow"
    c.strokeStyle = "rgb(190,105,40)"
    c.lineWidth = 3
    c.fillRect(800,300,200,150)
    c.beginPath()
    c.moveTo(800,300)
    c.lineTo(900,220)
    c.lineTo(1000,300)
    c.lineTo(800,300)
    c.stroke()
    c.fillStyle = "rgb(190,105,40)"
    c.fill()
    c.fillStyle = "rgb(80,25,10)"
    c.fillRect(880,400,40,50)
    c.fillStyle = "aqua"
    c.fillRect(829,330,38,40)
    c.fillRect(929,330,38,40)
    c.beginPath()
    c.strokeStyle = "silver"
    c.moveTo(850,330)
    c.lineTo(850,370)
    c.stroke()
    c.beginPath()
    c.strokeStyle = "silver"
    c.moveTo(950,330)
    c.lineTo(950,370)
    c.stroke()
    //c.font = "25px Arial"
    c.fillText("House", 1000,300)
}

//function for drawing fence
function drawFence(startX,startY){
    for(let i=0; i<20; i++){
        const x= startX + i*20
        c.strokeStyle = "rgb(200,100,100)"
        c.beginPath()
        c.moveTo(x,startY)
        c.lineTo(x,startY-40)
        c.lineTo(x+20,startY-40)
        c.lineTo(x+20,startY)
        c.stroke()
    }
    c.fillText("Fence", 1000,500)
}

//function for drawing hills
function drawHills(){
    c.beginPath()
    c.arc(300,450,200,0,Math.PI*2)
    c.arc(400,450,220,0,Math.PI*2)
    c.fillStyle = "silver"
    c.fill()
    c.beginPath()
    c.fillStyle = "rgb(180,180,180)"
    c.arc(600,450,190,0,Math.PI*2)
    c.fill()
    c.closePath()
}

function drawCloud(){
    c.beginPath()
    c.fillStyle = "rgb(150,150,170)"
    c.arc(700,100,50,0,Math.PI*2)
    c.arc(640,100,40,0,Math.PI*2)
    c.arc(760,100,35,0,Math.PI*2)
    c.fill()

    c.beginPath()
    c.arc(900,200,50,0,Math.PI*2)
    c.arc(840,200,40,0,Math.PI*2)
    c.arc(960,200,35,0,Math.PI*2)
    c.fill()
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

const sunBg = c.createRadialGradient(100,100,30,100,100,50)
sunBg.addColorStop(0, "white")
sunBg.addColorStop(1, "rgba(250,250,0,0)")


const sky = new Background({x:0,y:0},{x:canvas.width,y:300},skyBg)
const ground = new Background({x:0,y:300},{x:canvas.width,y:300},groundBg)
const grassArray = []
const treeArray = []

for(let i=0; i<400; i++){
    let y = Math.random()*canvas.height/2 +300
    let x = Math.random()*canvas.width
    let size = (y-300)*0.01 +1
    const grass = new Grass(x,y,size)
    grassArray.push(grass)
}

//drawing trees
drawTree(390,410,10,0,Math.PI/2,40,5)
drawTree(140,450,10,0,Math.PI/2,50,8)
drawTree(240,450,10,0,Math.PI/2,50,8)
drawTree(440,450,10,0,Math.PI/2,50,8)
drawTree(100,500,10)

//drawing sky
sky.draw()
drawCloud()

//drawing mountain
drawHills()

//drawing ground
ground.draw()
grassArray.forEach(grass=>grass.draw())
treeArray.forEach(tree=>tree.draw())

//drawing sun
c.fillStyle = sunBg
c.arc(100,100,50,0,Math.PI*2)
c.fill()
c.fillStyle = "yellow"
c.fillText("Sun", 150,90)

//drawing house
drawHouse()

drawFence(700,470)