// Add JavaScript to dynamically set the form's action URL
const form = document.getElementById('noteForm')

form.addEventListener('submit', function (event) {
  event.preventDefault()

  const fileTitle = document.getElementById('fileTitle').value
  const section = document.getElementById('section').value // Capture section here
  const question = document.getElementById('question').value
  const answer = document.getElementById('answer').value

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
