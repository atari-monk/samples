// TypeScript class for toggling dark mode
class DarkModeToggler {
  private darkModeToggle: HTMLButtonElement
  private body: HTMLBodyElement
  private isDarkMode: boolean = false

  constructor() {
    this.darkModeToggle = document.getElementById(
      'darkModeToggle'
    ) as HTMLButtonElement
    this.body = document.body as HTMLBodyElement

    this.darkModeToggle.addEventListener(
      'click',
      this.toggleDarkMode.bind(this)
    )
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode
    this.body.classList.toggle('dark-mode', this.isDarkMode)
  }
}
