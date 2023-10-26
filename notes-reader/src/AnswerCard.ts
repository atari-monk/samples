export class AnswerCard {
  private sectionIndex: number
  private questionIndex: number

  constructor(sectionIndex: number, questionIndex: number) {
    this.sectionIndex = sectionIndex
    this.questionIndex = questionIndex
  }

  createCard(question: string, answer: string): HTMLElement {
    const card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML += `<p><strong>Question:</strong> ${question}</p>`
    card.innerHTML += `<p><strong>Answer:</strong></p>`

    const answerElements = this.parseAnswer(answer)
    answerElements.forEach((element) => {
      card.appendChild(element)
    })

    card.id = `section-${this.sectionIndex}-question-${this.questionIndex}`
    return card
  }

  private parseAnswer(answer: string): (HTMLElement | Text)[] {
    const codeRegex = /```(.*?)```/gs
    const parts = answer.split(codeRegex)
    const elements: (HTMLElement | Text)[] = []

    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        // Text outside code block
        const text = parts[i]
        const div = document.createElement('div')
        div.innerText = text
        elements.push(div)
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
}
