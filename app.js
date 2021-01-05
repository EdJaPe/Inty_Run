let canvas = document.getElementById("intCanvas");
let statusDisplay = document.getElementById('status');
let enemies = []

const ctx = canvas.getContext('2d');
canvas.setAttribute('height', 600); 
canvas.setAttribute('width', 1400);
// let background = new Image();
// background.src = "./images/andes.jpg";
// background.onload = function (){
//     ctx.drawImage(background, 0, 0);
// }

function Runner(x, y, width, height, color) {
    this.x = x
    this.y = y
    this.color = color
    this.width = width
    this.height = height
    this.alive = true
    this.render = function() {
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
        
    }
    this.update = function() {
    if (this.x > 0 && this.x < 1400){
        // this.x = canvas.width    
        this.x += 2
        }
    }
    // this.newPosition = function() {
    //     this.x += x;
    //     this.y += y;
    // }
}

let inty = new Runner(300, 200, 30, 30, 'red')
let spanish = new Runner(50, 150, 60, 100, '#bada55')

let makeBabyEnemies = () => {
    enemies.push(new Runner(50, 150, 60, 100, 'blue'))
    console.log(enemies)
}
let renderEnemies = () => {
    if (enemies.length != 0){
        enemies.forEach(enemy => {
            enemy.render()
            enemy.update()
        })
    }

}


let movement = 10

let gameLoop = () => {
    
   ctx.clearRect(0, 0, canvas.width, canvas.height)
    // newPosition()
    inty.render()
    renderEnemies()
    // spanish.render()
    // spanish.update()
    detectHit()
}
let detectHit = () => {
    if (
      spanish.x + spanish.width >= inty.x &&
      spanish.x <=  inty.x + inty.width &&
      spanish.y <=  inty.y + inty.height &&
      spanish.y + spanish.height >= inty.y 
    ) {
        endGame()
    }
}

let endGame = () => {
    console.log("End game")
    inty.alive = false
    statusDisplay.innerText = 'The Spanish soldiers killed you'
    //setTime( () => {
        clearInterval(gameInterval)
    //}, 200)
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
        break
        case 'j':
        makeBabyEnemies()    
    }
}

document.addEventListener('keydown', intysBtns)

let gameInterval = setInterval(gameLoop, 100)

// document.querySelector('#btm-left').addEventListener('click', () => {
//   clearInterval(gameInterval)  
// })



// move enemies

// move spanish to the right
// give inty an image and soldier
// render "you lose" banner after look into button type submit*
// render  a reset button
