import * as input from './input.js'
import * as creatures from './creatures.js'
import * as boatFile from './boat.js'
import * as ui from './ui.js'

function update() {
  // Clear the canvas
  ui.ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height)

  // Move the boat based on user input
  boatFile.moveBoat(boatFile.boat, input, ui.canvas)

  // Handle interactions with creatures
  boatFile.handleBoatInteractions(boatFile.boat, creatures)

  // Generate creatures
  if (creatures.getCreatures().length < 100) {
    creatures.generateCreature(ui.canvas)
  }

  // Check if the ship has run out of lives
  if (boatFile.boat.lives <= 0) {
    // Game over logic can be added here
    // For now, we'll simply reset the ship and its lives
    boatFile.boat.lives = 3
    boatFile.boat.width = 40
    boatFile.boat.height = 40
  }

  // Draw the boat and creatures
  boatFile.drawBoat(ui.ctx, boatFile.boat)
  creatures.drawCreatures(ui.ctx)

  // Draw lives on the canvas
  ui.ctx.fillStyle = 'white'
  ui.ctx.font = '24px Arial'
  ui.ctx.fillText(`Lives: ${boatFile.boat.lives}`, 20, 40)

  // Request animation frame to continuously update the game
  requestAnimationFrame(update)
}

// Start the game loop
update()
