export const canvas = document.getElementById('gameCanvas')
const fullscreenButton = document.getElementById('fullscreenButton')
export const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

fullscreenButton.addEventListener('click', toggleFullscreen)
