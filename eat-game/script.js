// script.js
import * as input from './input.js'
import * as creatures from './creatures.js'
import * as boatFile from './boat.js'

const canvas = document.getElementById('gameCanvas')
const fullscreenButton = document.getElementById('fullscreenButton')
const ctx = canvas.getContext('2d')

// Set canvas dimensions to match the screen size
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Initialize ship properties
const boat = {
  x: canvas.width / 2, // Initial X position
  y: canvas.height / 2, // Initial Y position
  width: 40,
  height: 40,
  angle: 0, // Initial angle in radians
  speed: 5,
  lives: 3, // Initialize with 3 lives
}

// Function to toggle full-screen mode
function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

// Full-screen button click event
fullscreenButton.addEventListener('click', toggleFullscreen)

// Include input handling (input.js)
// Include creature management (creatures.js)

// Function to update the game
function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Handle user input for rotation (left and right arrow keys)
  if (input.leftKey) {
    boat.angle -= 0.03 // Adjust the rotation speed as needed
  }
  if (input.rightKey) {
    boat.angle += 0.03 // Adjust the rotation speed as needed
  }

  // Handle user input for movement (up and down arrow keys)
  if (input.upKey) {
    boat.x += Math.cos(boat.angle) * boat.speed
    boat.y += Math.sin(boat.angle) * boat.speed
  }
  if (input.downKey) {
    boat.x -= Math.cos(boat.angle) * boat.speed
    boat.y -= Math.sin(boat.angle) * boat.speed
  }

  // Ensure the boat stays within the canvas
  boat.x = Math.max(0, Math.min(boat.x, canvas.width))
  boat.y = Math.max(0, Math.min(boat.y, canvas.height))

  // Generate creatures
  if (creatures.getCreatures().length < 100) {
    creatures.generateCreature(canvas)
  }

  // Check interactions with creatures
  for (let i = creatures.getCreatures().length - 1; i >= 0; i--) {
    const creature = creatures.getCreatures()[i]
    const distance = Math.sqrt(
      (boat.x - creature.x) ** 2 + (boat.y - creature.y) ** 2
    )

    // If the ship is bigger and collides with the creature, eat it
    if (distance < boat.width / 2 && boat.width > creature.size) {
      creatures.getCreatures().splice(i, 1)
      boat.width += creature.size / 2
      boat.height += creature.size / 4
    } else {
      // If the creature is bigger and collides with the ship, the ship gets eaten
      if (distance < creature.size && boat.width < creature.size) {
        boat.lives-- // Decrease the ship's lives
        if (boat.lives <= 0) {
          boat.lives = 0 // Ensure lives don't go negative
        }
        boat.width = 40
        boat.height = 40
      }
    }
  }

  // Check if the ship has run out of lives
  if (boat.lives <= 0) {
    // Game over logic can be added here
    // For now, we'll simply reset the ship and its lives
    boat.lives = 3
    boat.width = 40
    boat.height = 40
  }

  // Draw the boat and creatures
  boatFile.drawBoat(ctx, boat)
  creatures.drawCreatures(ctx)

  // Draw lives on the canvas
  ctx.fillStyle = 'white'
  ctx.font = '24px Arial'
  ctx.fillText(`Lives: ${boat.lives}`, 20, 40)

  // Request animation frame to continuously update the game
  requestAnimationFrame(update)
}

// Start the game loop
update()
