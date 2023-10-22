const fileInput = document.getElementById('fileInput')
const jsonContainer = document.getElementById('jsonContainer')

function parseAnswer(answer) {
  const codeRegex = /```(.*?)```/gs
  const parts = answer.split(codeRegex)
  const elements = []

  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      // Text outside code block
      const text = parts[i]
      elements.push(document.createTextNode(text))
    } else {
      // Code block
      const codeBlock = document.createElement('pre')
      codeBlock.classList.add('code-block')
      codeBlock.textContent = parts[i]
      elements.push(codeBlock)
    }
  }

  return elements
}

fileInput.addEventListener('change', function () {
  jsonContainer.innerHTML = '' // Clear previous cards
  index.innerHTML = '' // Clear previous index

  const file = fileInput.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = function (event) {
      const jsonData = JSON.parse(event.target.result)

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
          const card = document.createElement('div')
          card.classList.add('card')
          card.innerHTML = `<h3>Object ${questionIndex + 1}</h3>`
          card.innerHTML += `<p><strong>Question:</strong> ${item.question}</p>`
          card.innerHTML += `<p><strong>Answer:</strong></p>`

          const answerElements = parseAnswer(item.answer)
          answerElements.forEach((element) => {
            card.appendChild(element)
          })

          sectionDiv.appendChild(card)

          // Add a link to the question in the index
          const questionLink = document.createElement('a')
          questionLink.textContent = item.question
          questionLink.href = `#section-${sectionIndex}-question-${questionIndex}`
          sectionEntry.appendChild(questionLink)

          // Add an ID to the question div
          card.id = `section-${sectionIndex}-question-${questionIndex}`
        })

        jsonContainer.appendChild(sectionDiv)
      })
    }
    reader.readAsText(file)
  } else {
    jsonContainer.textContent = 'No file selected.'
  }
})
