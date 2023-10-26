import { IndexComponent } from './components/IndexComponent'
import { AnswerCard } from './components/AnswerCard'
import './css/styles.css'

const fileInput = document.getElementById('fileInput') as HTMLInputElement
const jsonContainer = document.getElementById('jsonContainer') as HTMLElement
const index = document.getElementById('index') as HTMLElement

fileInput.addEventListener('change', function (event) {
  jsonContainer.innerHTML = '' // Clear previous cards
  index.innerHTML = '' // Clear previous index

  const file = fileInput.files?.[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = function (event) {
      const jsonData: {
        sections: {
          title: string
          questions: { question: string; answer: string }[]
        }[]
      } = JSON.parse(event.target?.result as string)

      const indexComponent = new IndexComponent(index)

      jsonData.sections.forEach((section, sectionIndex) => {
        const sectionDiv = document.createElement('div')
        sectionDiv.id = `section-${sectionIndex}`
        sectionDiv.innerHTML = `<h3>${section.title}</h3>`

        section.questions.forEach((item, questionIndex) => {
          const answerCard = new AnswerCard(sectionIndex, questionIndex)
          const card = answerCard.createCard(item.question, item.answer)

          sectionDiv.appendChild(card)
        })

        indexComponent.addSectionEntry(
          sectionIndex,
          section.title,
          section.questions
        )
        jsonContainer.appendChild(sectionDiv)
      })
    }
    reader.readAsText(file)
  } else {
    jsonContainer.textContent = 'No file selected.'
  }
})
