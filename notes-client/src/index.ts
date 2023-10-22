import { DarkModeToggler } from './DarkModeToggler'
import './css/styles.css'

new DarkModeToggler()
// Add TypeScript to dynamically set the form's action URL
const form = document.getElementById('noteForm') as HTMLFormElement

form.addEventListener('submit', function (event) {
  event.preventDefault()

  const fileTitleInput = document.getElementById(
    'fileTitle'
  ) as HTMLInputElement
  const sectionInput = document.getElementById('section') as HTMLInputElement
  const questionInput = document.getElementById('question') as HTMLInputElement
  const answerInput = document.getElementById('answer') as HTMLTextAreaElement

  const fileTitle = fileTitleInput.value
  const section = sectionInput.value
  const question = questionInput.value
  const answer = answerInput.value

  console.log('Data to be sent:', {
    fileTitle,
    section, // Include section in the data to be sent
    question,
    answer,
  })

  const actionUrl = `http://localhost:3000/append/${fileTitle}.json`

  // Create a note object with section included
  const note = {
    section, // Include section in the note object
    question,
    answer,
    dateTime: new Date().toISOString(),
  }

  console.log('Note object:', note)

  // Now submit the form with JSON data
  fetch(actionUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
    .then((response) => {
      if (response.status === 200) {
        alert('Note submitted successfully!')
        form.reset()
      } else {
        alert('Error submitting note.')
      }
    })
    .catch((error) => {
      alert('Error submitting note: ' + error.message)
    })
})
