import * as ui from './ui.js'

const creatures = [] // Create an array to store creatures

export function getCreatures() {
  return creatures // Return the array of creatures
}

// Function to generate random creatures
export function generateCreature(canvas) {
  const creature = {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 20 + 10,
    color: getRandomColor(),
  }
  creatures.push(creature)
}

export function initialize(n) {
  const maxCreatures = 100

  for (let i = 0; i < n && getCreatures().length < maxCreatures; i++) {
    generateCreature(ui.canvas)
  }
}

// Function to get a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

export function drawCreatures(ctx) {
  for (const creature of creatures) {
    ctx.fillStyle = creature.color
    ctx.beginPath()
    ctx.arc(creature.x, creature.y, creature.size, 0, Math.PI * 2)
    ctx.closePath()
    ctx.fill()
  }
}

export function update() {}

export function draw() {
  drawCreatures(ui.ctx)
}
