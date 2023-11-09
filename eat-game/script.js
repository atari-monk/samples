import * as creatures from './creatures.js'
import * as boatFile from './boat.js'
import * as ui from './ui.js'

function initialize() {
  creatures.initialize(30)
}

function game() {
  update()
  draw()
  requestAnimationFrame(game)
}

function update() {
  boatFile.update()
  creatures.update()
}

function draw() {
  ui.ctx.clearRect(0, 0, ui.canvas.width, ui.canvas.height)

  boatFile.draw()
  creatures.draw()

  ui.ctx.fillStyle = 'white'
  ui.ctx.font = '24px Arial'
  ui.ctx.fillText(`Lives: ${boatFile.boat.lives}`, 20, 40)
}

initialize()
game()
