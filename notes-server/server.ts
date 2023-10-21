import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import fs from 'fs/promises'
import path from 'path'

const app = express()
const port = 3000

//app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Set the base directory for your JSON files
const baseDirectory = 'C:/atari-monk/docs/chatgpt_db'

app.post('/append/:filename', async (req: Request, res: Response) => {
  const { filename } = req.params

  // Validate the filename format
  if (!/^[a-z0-9]+\.json$/.test(filename)) {
    return res.status(400).send('Invalid filename format.')
  }

  const { question, answer } = req.body
  const filePath = path.join(baseDirectory, filename)

  try {
    let jsonData = []

    try {
      const data = await fs.readFile(filePath, 'utf8')
      jsonData = JSON.parse(data)
    } catch (err) {
      // If the file doesn't exist, jsonData remains an empty array
    }

    // Create a new note object with the specified fields
    const newNote = {
      question,
      answer,
      dateTime: new Date().toISOString(), // Current date and time
    }

    // Append the new note to the existing data
    jsonData.push(newNote)

    // Write the updated JSON back to the file
    await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2))

    res.sendStatus(200)
  } catch (err) {
    res.status(500).send('Error reading or writing the file.')
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
