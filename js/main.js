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
class Crawler {
    constructor (x, y, width, height, color) {
        this.x = x, 
        this.y = y, 
        this.width = width, 
        this.height = height, 
        this.color = color,
        this.alive = true, 
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

const player = new Crawler(10, 10, 16, 16, 'lightsteelblue')
const ogre = new Crawler(200, 50, 32, 48, '#bada55')

// player.render()
// ogre.render()

//////////////////////Movement Handler///////////////////////////
const movementHandler = (e) => {
    // here the e is standing for 'event' => specidically will be a keydown
    // We're going to use keyCodes to tell it to do different movements for diff keys
    // here are somebasic key codes
    // w = 87, a = 65, s = 83, d = 68
    // up = 38, left = 37, down = 40, right = 39
}


//////////////////////Game Loop///////////////////////////

// set up a gameloop function
// this will be attached to an interval 
// this function will run every intercal (amount of ms)
// this is how we will animate our game

const gameLoop = () => {
    player.render()
    movement.textContent = `${player.x}, ${player.y}`

    if (ogre.alive) {
        ogre.render()
    }
}
// Event listener with the DOMContent loads, run the game on an interval 
// Eventually this event will have more in it

document.addEventListener('DOMContentLoaded', function () {
    setInterval(gameLoop, 60000)
})
