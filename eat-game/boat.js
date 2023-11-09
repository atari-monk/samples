import * as ui from './ui.js'
import * as creatures from './creatures.js'
import * as input from './input.js'

let collisionDetectionActive = true
export let lost = false
export let won = false

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
  if (!collisionDetectionActive) {
    // Collision detection is inactive, skip interaction
    return
  }

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
  if (!collisionDetectionActive) {
    // Collision detection is inactive, skip interaction
    return
  }

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
      winCondition()
    } else {
      // If the creature is bigger and collides with the ship, the ship gets eaten
      if (distance < creature.size && boat.width / 2 < creature.size) {
        console.log('pain')
        console.log('creature.size:', creature.size)
        console.log('boat.width:', boat.width)

        // Deactivate collision detection when a life is lost
        collisionDetectionActive = false

        boat.lives-- // Decrease the ship's lives
        if (boat.lives <= 0) {
          boat.lives = 0 // Ensure lives don't go negative
        }
        boat.width = 40
        boat.height = 40

        setTimeout(() => {
          boat.x = ui.canvas.width / 2
          boat.y = ui.canvas.height / 2
          if (boat.lives > 0) {
            collisionDetectionActive = true
          }
          if (boat.lives === 0) {
            lost = true
          }
        }, 2000)
      }
    }
  }
}

export function update() {
  moveBoat(boat, input, ui.canvas)
  handleBoatInteractions(boat, creatures)
}

export function draw() {
  drawBoat(ui.ctx, boat)
}

export function drawBoatLives() {
  if (boat.lives === 3) ui.ctx.fillStyle = 'green'
  if (boat.lives === 2) ui.ctx.fillStyle = 'yellow'
  if (boat.lives === 1) ui.ctx.fillStyle = 'red'
  if (boat.lives === 0) ui.ctx.fillStyle = 'purple'
  ui.ctx.font = '24px Arial'
  ui.ctx.fillText(`Lives: ${boat.lives}`, 20, 40)
}

export function drawYouLostMessage() {
  ui.ctx.fillStyle = 'black'
  ui.ctx.font = '36px Arial'

  // Calculate the position to center the text
  const textWidth = ui.ctx.measureText('You Lost').width
  const x = (ui.canvas.width - textWidth) / 2
  const y = ui.canvas.height / 2

  ui.ctx.fillText('You Lost', x, y)
}

export function winCondition() {
  if (creatures.getCreaturesCount() !== 0) return
  collisionDetectionActive = false
  won = true
}

export function drawYouWonMessage() {
  ui.ctx.fillStyle = 'gold'
  ui.ctx.font = '36px Arial'

  // Calculate the position to center the text
  const textWidth = ui.ctx.measureText('You Won').width
  const x = (ui.canvas.width - textWidth) / 2
  const y = ui.canvas.height / 2

  ui.ctx.fillText('You Won', x, y)
}

export function drawText() {
  drawBoatLives()
  if (lost) {
    drawYouLostMessage()
  }
  if (won) {
    drawYouWonMessage()
  }
}
