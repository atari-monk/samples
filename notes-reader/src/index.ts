import { IndexComponent } from './components/IndexComponent'
import './css/styles.css'
import { JsonData } from './JsonData'
import { SectionComponent } from './components/SectionComponent'

const fileInput = document.getElementById('fileInput') as HTMLInputElement
const jsonContainer = document.getElementById('jsonContainer') as HTMLElement
const index = document.getElementById('index') as HTMLElement

function handleFileLoad(data: JsonData) {
  jsonContainer.innerHTML = ''
  index.innerHTML = ''

  const indexComponent = new IndexComponent(index)

  data.sections.forEach((section, sectionIndex) => {
    const sectionComponent = new SectionComponent(
      sectionIndex,
      jsonContainer,
      indexComponent
    )
    sectionComponent.createSectionElement(section.title, section.questions)
  })
}

fileInput.addEventListener('change', function (event) {
  const file = fileInput.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = function (event) {
      const jsonData: JsonData = JSON.parse(event.target?.result as string)
      handleFileLoad(jsonData)
    }
    reader.readAsText(file)
  } else {
    jsonContainer.textContent = 'No file selected.'
  }
})
