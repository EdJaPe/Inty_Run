let canvas = document.getElementById("intCanvas");
let statusDisplay = document.getElementById('status');
let enemies = []
let gameOver = true
let startBtn = document.getElementById("start");


const ctx = canvas.getContext('2d');
canvas.setAttribute('height', 600); 
canvas.setAttribute('width', 900);
// let background = new Image();
// background.src = "./images/andes.jpg";
// background.onload = function (){
//     ctx.drawImage(background, 0, 0);
// }
const chasqui = new Image()
chasqui.src = "./images/chasqui.png"
const soldier = new Image()
soldier.src = "./images/soldier.jpg"
const kingPic = new Image()
kingPic.src = "./images/king.png"
console.log(soldier)


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

let inty = new Runner(10, 200, 30, 30, 'red', chasqui)
let king = new Runner(canvas.width-30 , canvas.height/2, 30, 30, 'green', kingPic)
console.log(inty)
console.log(king)
let makeBabyEnemies = () => {
    enemies.push(new Runner(canvas.width + 60, Math.random()*canvas.height, 60, 100, 'blue', soldier))
}
let renderEnemies = () => {

    if (enemies.length != 0){
        //
        enemies.forEach(enemy => {
            enemy.draw()
            enemy.update()
            if (enemy.x < 0 - enemy.width){
                enemies.shift()
            }
        })
    }
    // if (enemies.length && enemies[0].x < 0){
    // //     enemies.shift()
    // }  
}


let movement = 10

let gameLoop = () => {
    
   ctx.clearRect(0, 0, canvas.width, canvas.height)
    if (gameOver === false) {
        inty.draw()
        king.render()
        renderEnemies()
        
        detectHit()
        win ()

    }
    //call win function
}
let startGame = (event) => {
    event.preventDefault()
    gameOver = false
    console.log("Game started")
}



let detectHit = () => {
    enemies.forEach(function(enemy){
        if (
            enemy.x + enemy.width > inty.x &&
            enemy.x <  inty.x + inty.width &&
            enemy.y <  inty.y + inty.height &&
            enemy.y + enemy.height > inty.y 
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
            king.x + king.width > inty.x &&
            king.x <  inty.x + inty.width &&
            king.y <  inty.y + inty.height &&
            king.y + king.height > inty.y
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
        
        // case 'j':
        // makeBabyEnemies()    
    }
}
startBtn.addEventListener("click", (event) => {
    startGame (event)
})
document.addEventListener('keydown', intysBtns)

let gameInterval = setInterval(gameLoop, 100)
let enemyAppear = setInterval(makeBabyEnemies, 2000)

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
