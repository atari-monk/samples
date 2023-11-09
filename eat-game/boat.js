export function drawBoat(ctx, boat) {
  // Draw the boat (warship)
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
