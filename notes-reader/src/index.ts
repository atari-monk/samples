import { IndexComponent } from './components/IndexComponent'
import './css/styles.css'
import { JsonData } from './JsonData'
import { SectionComponent } from './components/SectionComponent'

const fileInput = document.getElementById('fileInput') as HTMLInputElement
const jsonContainer = document.getElementById('jsonContainer') as HTMLElement
const index = document.getElementById('index') as HTMLElement

fileInput.addEventListener('change', function (event) {
  jsonContainer.innerHTML = ''
  index.innerHTML = ''

  const file = fileInput.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = function (event) {
      const jsonData: JsonData = JSON.parse(event.target?.result as string)

      const indexComponent = new IndexComponent(index)

      jsonData.sections.forEach((section, sectionIndex) => {
        const sectionComponent = new SectionComponent(
          sectionIndex,
          jsonContainer,
          indexComponent
        )
        sectionComponent.createSectionElement(section.title, section.questions)
      })
    }
    reader.readAsText(file)
  } else {
    jsonContainer.textContent = 'No file selected.'
  }
})
