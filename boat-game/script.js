// Inside your JavaScript file (script.js)

const canvas = document.getElementById('gameCanvas')
const fullscreenButton = document.getElementById('fullscreenButton')
const ctx = canvas.getContext('2d')

// Set canvas dimensions to match the screen size
canvas.width = window.innerWidth
canvas.height = window.innerHeight

// Boat properties
const boat = {
  x: canvas.width / 2, // Initial X position
  y: canvas.height / 2, // Initial Y position
  width: 40,
  height: 40,
  speed: 5, // Speed of the boat
  angle: 0, // Initial angle in radians
}

// Function to draw a simplified medieval warship with an ellipse hull
function drawWarship() {
  // Save the current transformation state
  ctx.save()

  // Translate to the ship's position
  ctx.translate(boat.x, boat.y)

  // Apply the ship's rotation angle
  ctx.rotate(boat.angle)

  // Hull (body of the ship)
  ctx.fillStyle = 'brown' // You can choose the ship color
  ctx.beginPath()
  ctx.ellipse(0, 0, boat.width / 2, boat.height / 4, 0, 0, Math.PI * 2)
  ctx.closePath()
  ctx.fill()

  // Restore the original transformation state
  ctx.restore()
}

// Function to draw the boat
function drawBoat() {
  drawWarship()
}

// Function to update the game
function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw the boat
  drawBoat()

  // Handle user input for rotation (left and right arrow keys)
  if (leftKey) {
    boat.angle -= 0.03 // Adjust the rotation speed as needed
  }
  if (rightKey) {
    boat.angle += 0.03 // Adjust the rotation speed as needed
  }

  // Handle user input for movement (up and down arrow keys)
  if (upKey) {
    boat.x += Math.cos(boat.angle) * boat.speed
    boat.y += Math.sin(boat.angle) * boat.speed
  }
  if (downKey) {
    boat.x -= Math.cos(boat.angle) * boat.speed
    boat.y -= Math.sin(boat.angle) * boat.speed
  }

  // Ensure the boat stays within the canvas
  boat.x = Math.max(0, Math.min(boat.x, canvas.width))
  boat.y = Math.max(0, Math.min(boat.y, canvas.height))

  // Request animation frame to continuously update the game
  requestAnimationFrame(update)
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

// Keyboard input handling
let leftKey = false
let rightKey = false
let upKey = false
let downKey = false

document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') {
    leftKey = true
  } else if (event.key === 'ArrowRight') {
    rightKey = true
  } else if (event.key === 'ArrowUp') {
    upKey = true
  } else if (event.key === 'ArrowDown') {
    downKey = true
  }
})

document.addEventListener('keyup', (event) => {
  if (event.key === 'ArrowLeft') {
    leftKey = false
  } else if (event.key === 'ArrowRight') {
    rightKey = false
  } else if (event.key === 'ArrowUp') {
    upKey = false
  } else if (event.key === 'ArrowDown') {
    downKey = false
  }
})

// Start the game loop
update()
