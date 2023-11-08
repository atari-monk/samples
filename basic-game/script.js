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
}

// Function to draw the boat
function drawBoat() {
  ctx.fillStyle = 'red'
  ctx.fillRect(boat.x, boat.y, boat.width, boat.height)
}

// Function to update the game
function update() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Draw the boat
  drawBoat()

  // Handle user input for all directions
  if (leftKey) {
    boat.x -= boat.speed
  }
  if (rightKey) {
    boat.x += boat.speed
  }
  if (upKey) {
    boat.y -= boat.speed
  }
  if (downKey) {
    boat.y += boat.speed
  }

  // Ensure the boat stays within the canvas
  boat.x = Math.max(0, Math.min(boat.x, canvas.width - boat.width))
  boat.y = Math.max(0, Math.min(boat.y, canvas.height - boat.height))

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
