import * as ui from './ui.js'
import * as creatures from './creatures.js'
import * as input from './input.js'

export const boat = {
  x: ui.canvas.width / 2, // Initial X position
  y: ui.canvas.height / 2, // Initial Y position
  width: 40,
  height: 40,
  angle: 0, // Initial angle in radians
  speed: 5,
  lives: 3, // Initialize with 3 lives
}

export function drawBoat(ctx, boat) {
  ctx.save()
  ctx.translate(boat.x, boat.y)
  ctx.rotate(boat.angle)
  ctx.fillStyle = 'brown'
  ctx.beginPath()
  ctx.ellipse(0, 0, boat.width / 2, boat.height / 4, 0, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export function moveBoat(boat, input, canvas) {
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
}

export function handleBoatInteractions(boat, creatures) {
  // Check interactions with creatures
  for (let i = creatures.getCreatures().length - 1; i >= 0; i--) {
    const creature = creatures.getCreatures()[i]
    const distance = Math.sqrt(
      (boat.x - creature.x) ** 2 + (boat.y - creature.y) ** 2
    )

    // If the ship is bigger and collides with the creature, eat it
    if (distance < boat.width / 2 && boat.width / 2 > creature.size) {
      console.log('gain')
      console.log('creature.size:', creature.size)
      console.log('boat.width:', boat.width)
      creatures.getCreatures().splice(i, 1)
      boat.width += creature.size / 2
      boat.height += creature.size / 4
    } else {
      // If the creature is bigger and collides with the ship, the ship gets eaten
      if (distance < creature.size && boat.width / 2 < creature.size) {
        console.log('pain')
        console.log('creature.size:', creature.size)
        console.log('boat.width:', boat.width)
        boat.lives-- // Decrease the ship's lives
        if (boat.lives <= 0) {
          boat.lives = 0 // Ensure lives don't go negative
        }
        boat.width = 40
        boat.height = 40
      }
    }
  }
}

function boatLives() {
  // Check if the ship has run out of lives
  if (boat.lives <= 0) {
    // Game over logic can be added here
    // For now, we'll simply reset the ship and its lives
    boat.lives = 3
    boat.width = 40
    boat.height = 40
  }
}

export function update() {
  moveBoat(boat, input, ui.canvas)
  handleBoatInteractions(boat, creatures)
  boatLives()
}

export function draw() {
  drawBoat(ui.ctx, boat)
}
