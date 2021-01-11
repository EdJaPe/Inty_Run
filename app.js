let canvas = document.getElementById("intCanvas");
let statusDisplay = document.getElementById('status');
let enemies = []
let gameOver = true
let startBtn = document.getElementById("start");
let restartBtn = document.getElementById("restartBtn")



// canvas.addEventListener("click", (e) => {
//     console.log("I'm working")
//     if (e.offsetX >0 && e.offsetX < canvas.width) {
//         startGame ()
//         // menu.show() === false
//     }
//     // use if to check the location of x.y positions
//     // invoke start game
//     // set menu.show to false
// })



//create Story line
// document.addEventListener('DOMContentLoaded', function() {
    
// })

const ctx = canvas.getContext('2d');
canvas.setAttribute('height', 600); 
canvas.setAttribute('width', 900);
// let background = new Image();
// background.src = "./images/andes.jpg";
// background.onload = function (){
//     ctx.drawImage(background, 0, 0);
// }
const chasqui = new Image()
chasqui.src = "./images/chasqui.png";
const soldier = new Image()
soldier.src = "./images/soldier.jpg";
const kingPic = new Image()
kingPic.src = "./images/king.png";

// function storyBox(x, y, width, height, color) {
    
// }
function Menu (x, y, width, height, color, text) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.show = true
    this.text = text
    this.update = function() {
        if (this.x > -60 && this.x <= canvas.width + 60){
            // this.x = canvas.width    
            this.x -= 10
            }
    }
    this.draw = function() {
        ctx.fillStyle = this.color
        ctx.font = "60px helvetica"
        ctx.fillText("Game Intro", this.x, this.y)
        ctx.font = "25px helvetica"
        ctx.fillText("In a future  far away, you have been given the chance to rewrite history.", this.x-275, this.y+25)
        ctx.fillText("You will back to the 1500's as  Inty. Inty is a Chasqui an Incan messenger. ", this.x-275, this.y+50)
        ctx.fillText("Your Goal, if you choose to accept it, is to reach the king. Deliver the", this.x-275, this.y+75)
        ctx.fillText("message that warns him about the spanish ships. ", this.x-220, this.y+100)
        ctx.fillText("Click START when you are ready. Hurry! Spanish soldiers will try to stop you!", this.x-300, this.y+125)
    }
}


function Runner(x, y, width, height, color, img) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.img = img
    this.alive = true
    this.render = function() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)

        
    }
    this.update = function() {
        if (this.x > -60 && this.x <= canvas.width + 60){
            // this.x = canvas.width    
            this.x -= 10
            }
    }
    this.draw = function() {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
    }
}


let menu = new Menu(canvas.width/2-120, canvas.height/2-100, null, null, 'green', null)


let inty = new Runner(10, 200, 30, 30, 'red', chasqui)
let king = new Runner(canvas.width-60 , canvas.height/2, 60, 60, 'green', kingPic)

let makeBabyEnemies = () => {
    enemies.push(new Runner(canvas.width + 60, Math.random()*canvas.height, 60, 60, 'blue', soldier))
}
//------
let renderEnemies = () => {
    if (enemies.length != 0){
            enemies.forEach(enemy => {
            enemy.draw()
            enemy.update()
            if (enemy.x < 0 - enemy.width){
                enemies.shift()
            }
        })
    } 
}


let movement = 10

let gameLoop = () => {
   ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (gameOver === true) {
        menu.draw()
    }
   
    if (gameOver === false) {
        

        inty.draw()
        king.draw()
        // if (enemies.length < 10) {
        //     makeBabyEnemies()
        // }
        renderEnemies()
        detectHit()
        win ()
    }

}

let restart = (event) => {
    clearInterval(gameInterval)
    clearInterval(enemyAppear)
}


let startGame = (event) => {
    gameOver = false
    gameLoop()
    // renderEnemies()
    event.preventDefault()
    console.log("Game started")
}



let detectHit = () => {
    enemies.forEach(function(enemy){
        if (
            enemy.x + enemy.width >= inty.x &&
            enemy.x <=  inty.x + inty.width &&
            enemy.y <=  inty.y + inty.height &&
            enemy.y + enemy.height >= inty.y 
          ) {
              endGame()
          }
    })
    
}
// create function that states a win
//
// let spnshGone =() => {
//     if (enemy.x === 0){

//     }
// }
let win = () => {
    if (
            king.x + king.width >= inty.x &&
            king.x <=  inty.x + inty.width &&
            king.y <=  inty.y + inty.height &&
            king.y + king.height >= inty.y
        ) {
        
        statusDisplay.innerText = 'you reached the king, you win!'
        clearInterval(gameInterval)
    }
    //check if Inty crosses point in canvas
    //check Inty's x axis position is greater than game.width-30
    //if win then display win statement in 
}


let endGame = () => {
    console.log("End game")
    inty.alive = false
    statusDisplay.innerText = 'The Spanish soldiers killed you'
        clearInterval(gameInterval)
}


let intysBtns = (e) => {
    switch(e.key) {
      case 'w':
        inty.y -= movement
        break
      case 'a':
        inty.x -= movement
        break      
      case 's':
        inty.y += movement
        break
        case 'd':
        inty.x += movement    
    }
}
startBtn.addEventListener("click", (event) => {
    startGame (event)
})

restartBtn.addEventListener("click", (e) => {
    restart(e)
})

document.addEventListener('keydown', intysBtns)

let gameInterval = setInterval(gameLoop, 100)

if (gameOver === true){
    let enemyAppear = setInterval(makeBabyEnemies, 1000)
    
}

// document.querySelector('#btm-left').addEventListener('click', () => {
//   clearInterval(gameInterval)  
// })



// move enemies

// move spanish to the right
// give inty an image and soldier
// render "you lose" banner after look into button type submit*
// render  a reset button


//use random function to randomly choose new enemy positions
//extend canvas 
//make soldiers that reached other side disappear

