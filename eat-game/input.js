// input.js
export let leftKey = false
export let rightKey = false
export let upKey = false
export let downKey = false

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
