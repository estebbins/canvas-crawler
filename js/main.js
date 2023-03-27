// Requirements & goals
// make a simple crawler game using canvas that we manipulate with js

//  we need two entitites, a hero and an ogre
//  the hero should move with the wasd or arrow keys
// The ogre, for now, will be stationary
// the hero and the ogre should be able to collide to make something happen
//  when the her collides with the ogre, ogre is removed from the screen, the game stops, and sends a message to the user that they have won

//////////////////////Set Up///////////////////////////

// First, we grab our HTML elements for easy reference later
const game = document.getElementById('canvas')
// display hero cords
const movement = document.getElementById('movement')

const status = document.getElementById('status')

// Ifw e want to test if we got the right elements, can use these:
// status.innerText = "what's up, how are you?"
// movement.innerText = "Yo"

// Set the game's context to 2d (can also be 3d)
// Have to save the context to a variable for reference later
// How to tell the code to work within the context of the canvas

const ctx = game.getContext('2d')

// We need to get the computed size of the canvas, and save that attribute to our canvas, then we can refer to it later. 

// When we have the exact size of the canvas, we can use those dimensions to simulate movement in interesting ways .
// These two lines will set the width and height attributes according to the way they look in your browser at the time the code runs
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

// console.log('this is game after setting width and height')
// console.log(game)

game.height = 400

// const hero = {
//     x: 10, 
//     y: 10, 
//     color: 'hotpink', 
//     width: 20,
//     height: 20, 
//     alive: true, 
//     render: function () {
//         // We can use built in canvas methods for drawing basic shapes
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }

// const ogre = {
//     x: 200, 
//     y: 100, 
//     color: '#bada55', 
//     width: 60, 
//     height: 120, 
//     alive: true, 
//     render: function () {
//         ctx.fillStyle = this.color
//         // x coord, y coord, width in px, height in px 
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }


// hero.render()
// ogre.render()

// Because those objects are basically the same, we can create a class to keep our code dry. 
//////////////////////Crawler Class///////////////////////////
class Ogre {
    constructor (x, y, width, height, color) {
        this.x = x 
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

class Hero {
    constructor (x, y, width, height, color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.alive = true 
        this.speed = 15
        this.direction = {
            up: false, 
            down: false, 
            left: false, 
            right: false
        }
        // Two other methods tied to key events
        // One sets the direction, which sends our hero flying in that direction
        this.setDirection = function (key) {
            console.log('this is the key in setDirection', key)
            if (key.toLowerCase() == 'w') { this.direction.up = true }
            if (key.toLowerCase() == 'a') { this.direction.left = true }
            if (key.toLowerCase() == 's') { this.direction.down = true }
            if (key.toLowerCase() == 'd') { this.direction.right = true }
        }
                // The other unsets the direction, which stops our hero from moving in that direction
        this.unsetDirection = function (key) {
            console.log('this is the key in unsetDirection', key)
            if (key.toLowerCase() == 'w') { this.direction.up = false }
            if (key.toLowerCase() == 'a') { this.direction.left = false }
            if (key.toLowerCase() == 's') { this.direction.down = false }
            if (key.toLowerCase() == 'd') { this.direction.right = false }
        }
        this.movePlayer = function () {
            // send the player flying in whatever direction is true
            if (this.direction.up) {
                this.y -= this.speed
                if (this.y <= 0) {
                    this.y = 0
                }
            }
            if (this.direction.left) {
                this.x -= this.speed
                if (this.x <= 0) {
                    this.x = 0
                }
            }
            if (this.direction.down) {
                this.y += this.speed
                if (this.y + this.height >= game.height) {
                    this.y = game.height - this.height
                }
            }
            if (this.direction.right) {
                this.x += this.speed
                if (this.x + this.width >= game.width) {
                    this.x = game.width - this.width
                }
            }
        }

        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}


const player = new Hero(10, 10, 16, 16, 'lightsteelblue')
const ogre = new Ogre(200, 50, 32, 48, '#bada55')

// player.render()
// ogre.render()

//////////////////////Movement Handler///////////////////////////
// NOW HANDLED IN CLASS
// const movementHandler = (e) => {
//     // here the e is standing for 'event' => specidically will be a keydown
//     // We're going to use keyCodes to tell it to do different movements for diff keys
//     // here are somebasic key codes
//     // w = 87, a = 65, s = 83, d = 68
//     // up = 38, left = 37, down = 40, right = 39
//     console.log('this is e', e.keyCode)
//     // Conditional statements - if keycode === something, do something if === something else
//     // Switch case or giant if statement
//     // Switch is the condition, and it opens up for a multitude of cases
//     switch (e.keyCode) {
//         // move up
//         case (87):
//         case (38):
//             // this moves player up 10px every press
//             player.y -= 10
//             // Need a break so can move to another case if necessary
//             break
//         // Move left
//         case (65):
//         case (37):
//             player.x -= 10
//             break
//         // move down
//         case (83):
//         case (40):
//             player.y += 10
//             break
//         // move right
//         case (68): 
//         case (39):
//             player.x += 10
//             break
//     }
// }

//////////////////Collision Detection//////////////////////
// Detect hit between entities
// account for the entire space that one entity takes up
// use player and ogre x, y, height and width

const detectHit = () => {
    if (player.x < ogre.x + ogre.width
        && player.x + player.width > ogre.x
        && player.y < ogre.y + ogre.height
        && player.y + player.height > ogre.y) {
            ogre.alive = false
            console.log('Hit!!')
            console.log('player x', player.x)
            console.log('player y', player.y)
            console.log('player width', player.width)
            console.log('player height', player.height)
            console.log('ogre x', ogre.x)
            console.log('ogre y', ogre.y)
            console.log('ogre width', ogre.width)
            console.log('ogre height', ogre.height)
            status.textContent = "Hit!!"
    }
}

//////////////////////Game Loop///////////////////////////

// set up a gameloop function
// this will be attached to an interval 
// this function will run every intercal (amount of ms)
// this is how we will animate our game

const gameLoop = () => {
    // To resemble movement, we should clear the old canvas every loop
    if (ogre.alive) {
        detectHit()
    }
    ctx.clearRect(0, 0, game.width, game.height)

    player.render()
    player.movePlayer()
    movement.textContent = `${player.x}, ${player.y}`

    if (ogre.alive) {
        ogre.render()
    }

}

//////////////////////Event Listeners///////////////////////////
// One key event for a keydown, which sets player direction
document.addEventListener('keydown', (e) => {
    player.setDirection(e.key)
})
// Another for keyup, which removes player direction
document.addEventListener('keyup', (e) => {
    if(['w', 'a', 's', 'd'].includes(e.key))
        player.unsetDirection(e.key)
})

// Event listener with the DOMContent loads, run the game on an interval 
// Eventually this event will have more in it

document.addEventListener('DOMContentLoaded', function () {
    // Link movement handler event

    // Game loop interval
    setInterval(gameLoop, 60)
})
