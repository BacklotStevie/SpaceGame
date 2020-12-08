const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = 1800;
canvas.height = 800;

const skyImg = new Image()
skyImg.src = './images/sky.jpg'

const shipImg = new Image()
shipImg.src = './images/enterprise1.png'


let sky = {
    x: 0,
    y: 0,
    w: canvas.width,
    h: canvas.height,
}

class Ship {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.bullets = []
    }
    shootBullet = () => {
        console.log('shoot')
        let bullet = {
            x: this.x + (this.w / 2),
            y: this.y, w: 10, h: 20
        }
        this.bullets.push(bullet)
    }
}

let ship = new Ship(canvas.width / 2, canvas.height * .90, shipImg.width / 10, shipImg.height / 10)

skyImg.onload = function () {
    ctx.drawImage(skyImg, sky.x, sky.y, sky.w, sky.h)
}

shipImg.onload = function () {
    ctx.drawImage(shipImg, ship.x, ship.y, ship.w, ship.h)
}

// function shootBullets() {
//     for (let bullet of ship.bullets) {
//         bullet.y -= 10
//         ctx.fillStyle = 'silver'
//         ctx.fillRect(bullet.x, bullet.y, bullet.w, bullet.h)
//     }
// }

function drawBullets() {
    for (let bullet of ship.bullets) {
        bullet.y -= 10
        ctx.fillStyle = 'white'
        ctx.fillRect(bullet.x, bullet.y, bullet.w, bullet.h)
    }
}

const allObstacles = []

class Obstacle {
    constructor(x, y, w, h, color) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = color
    }
    shapeShift = () => {
        setInterval(() => {
            this.color = "#" + ((1 << 24) * Math.random() | 0).toString(16)
            this.w += 10
        }, 777)
    }
}

function drawObstacle() {
    for (let obs of allObstacles) {
        ctx.fillStyle = obs.color
        console.log(speed)
        obs.y += speed
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h)
        detectCollision(obs)

        detectCollision(obs)
        detectCollisionBullet(obs)
        if (obs.y > canvas.height) {
            score += 1000
        }
    }
}

window.onkeydown = function (event) {
    switch (event.key) {
        case 'ArrowLeft':
            ship.x -= 20
            break;
        case 'ArrowRight':
            ship.x += 20
            break;
        case 'ArrowUp':
            ship.y -= 20
            break;
        case 'ArrowDown':
            ship.y += 20
            break;
        case ' ':
            ship.shootBullet()
            break;
    }
}

let animationId = null
function animate() {
    animationId = requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(skyImg, sky.x, sky.y, sky.w, sky.h)
    ctx.drawImage(shipImg, ship.x, ship.y, ship.w, ship.h)
    drawBullets()
    drawObstacle()
}

animate()