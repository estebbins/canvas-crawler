// Requirements & goals
// make a simple crawler game using canvas that we manipulate with js

//  we need two entitites, a hero and an ogre
//  the hero should move with the wasd or arrow keys
// The ogre, for now, will be stationary
// the hero and the ogre should be able to collide to make something happen
//  when the her collides with the ogre, ogre is removed from the screen, the game stops, and sends a message to the user that they have won


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
