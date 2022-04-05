function updateScore(){
    const scor = document.querySelector(".score")
    scor.textContent = `Score: ${score}`
}


const canvas = document.querySelector(".canv")
const ctx = canvas.getContext("2d")

const blockSize = 10;
const width = canvas.width;
const height = canvas.height;
const widthBlocks = canvas.width/blockSize;
const heightBlocks = canvas.height/blockSize;
let score = 0;


function Block(col,row){
    this.col = col;
    this.row = row;
    this.drawRect = function (){
        let x = this.col * blockSize;
        let y = this.row * blockSize;
        ctx.fillRect(x,y,blockSize, blockSize)
    }
    this.drawCircle = function(){
        let x = this.col * blockSize + blockSize/2;
        let y = this.row * blockSize + blockSize/2;
        ctx.beginPath();
        ctx.arc(x,y,blockSize/2,0,Math.PI*2)
        ctx.fill()
    }
    this.equal = function(b2){
        return this.col == b2.col && this.row == b2.row;
    }
}

function Snake(){
    this.segments =[
        new Block(7,5),
        new Block(6,5),
        new Block(6,5)
    ]
    this.direction = "right"
    this.nextDirection = "right"

}

Snake.prototype.setDirection = function(dir){
    if(this.direction == "up" && dir == "down"){
        return;
    }else if(this.direction == "right" && dir == "left"){
        return;
    }else if(this.direction == "down" && dir == "up"){
        return;
    }else if(this.direction == "left" && dir == "right"){
        return;
    }
    this.nextDirection = dir;
}

Snake.prototype.draw = function(){
    ctx.clearRect(0,0,width,height)
    for(let i=0; i<this.segments.length; i++){
        this.segments[i].drawRect();
    }
}

Snake.prototype.checkCollision = function(head){
    
    let leftCol = head.col < 0;
    let rightCol = head.col == widthBlocks;
    let upCol = head.row < 0;
    let downCol = head.row == heightBlocks;

    let wellCol = leftCol || rightCol || upCol || downCol;

    let selfCol = false
    for(let i=0; i< this.segments.length; i++){
        if(head.equal(this.segments[i])){
            selfCol = true;
        }
    }
    return wellCol || selfCol
}

Snake.prototype.move = function(){
    let head = this.segments[0];
    let newHead;
    this.direction = this.nextDirection;

    if(this.direction=="right"){
        newHead = new Block(head.col+1, head.row);
    } else if(this.direction=="down"){
        newHead = new Block(head.col, head.row+1);
    }else if(this.direction=="left"){
        newHead = new Block(head.col-1, head.row);
    }else if(this.direction=="up"){
        newHead = new Block(head.col, head.row-1);
    }

    if(this.checkCollision(newHead)){
        clearInterval(gameLoop);
    }

    this.segments.unshift(newHead);
    if(newHead.equal(apple.position)){
        apple.move()
        score++;
        updateScore();
    }else{
        this.segments.pop();
    }
}

function checkDir(code){
    switch(code){
        case 38:
            return "up";
        case 40:
            return "down";
        case 37:
            return "left";
        case 39:
            return "right";
    }
}

function Apple(){
    this.position = new Block(10,10)
}

Apple.prototype.draw = function(){
    this.position.drawCircle();
}

Apple.prototype.move = function(){
    let posX = Math.floor(Math.random() * widthBlocks)
    let posY = Math.floor(Math.random() * heightBlocks)
    this.position = new Block(posX, posY)
}



let snake = new Snake();
let apple = new Apple();
let gameLoop

function game(){
    gameLoop = setInterval(()=>{
        snake.draw();
        snake.move();
        apple.draw();
    },100)    
}
snake.draw();
apple.draw();

window.addEventListener("keydown", e=>{
    if(e.code == "Space"){
        snake = new Snake();
        apple = new Apple();
        gameloop = "0"
        score = 0;
        updateScore();
        game();
    }
    let dir = checkDir(e.keyCode);
    if(dir){
        console.log(dir)
        snake.setDirection(dir)
    }
})
