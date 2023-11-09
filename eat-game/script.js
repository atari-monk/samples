import * as creatures from './creatures.js'
import * as boat from './boat.js'
import * as ui from './ui.js'

function initialize() {
  creatures.initialize(50)
}

function game() {
  update()
  draw()
  requestAnimationFrame(game)
}

function update() {
  boat.update()
  creatures.update()
}

function draw() {
  ui.ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height)

  boat.draw()
  creatures.draw()

  boat.drawText()
}

initialize()
game()
