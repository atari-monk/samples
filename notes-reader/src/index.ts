import { AnswerCard } from './AnswerCard'
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

      jsonData.sections.forEach((section, sectionIndex) => {
        // Create an entry in the index for each section
        const sectionLink = document.createElement('a')
        sectionLink.textContent = section.title
        sectionLink.href = `#section-${sectionIndex}`
        const sectionEntry = document.createElement('div')
        sectionEntry.appendChild(sectionLink)
        index.appendChild(sectionEntry)

        // Create cards for each question and answer in the section
        const sectionDiv = document.createElement('div')
        sectionDiv.id = `section-${sectionIndex}`
        sectionDiv.innerHTML = `<h3>${section.title}</h3>`

        section.questions.forEach((item, questionIndex) => {
          const answerCard = new AnswerCard(sectionIndex, questionIndex)
          const card = answerCard.createCard(item.question, item.answer)

          // Add a link to the question in the index
          const questionLink = document.createElement('a')
          questionLink.textContent = item.question
          questionLink.href = `#section-${sectionIndex}-question-${questionIndex}`
          sectionEntry.appendChild(questionLink)

          sectionDiv.appendChild(card)
        })

        jsonContainer.appendChild(sectionDiv)
      })
    }
    reader.readAsText(file)
  } else {
    jsonContainer.textContent = 'No file selected.'
  }
})
