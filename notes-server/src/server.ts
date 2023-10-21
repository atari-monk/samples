import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import fs from 'fs/promises'
import path from 'path'
import { ensureFolderExists } from './utils/file_sys'
import cors from 'cors'
import { prepareData } from './dataPreparation'

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())

// Set the base directory for your JSON files
const baseDirectory = 'C:/atari-monk/docs/chatgpt_db'

// Create an async function to start the server
async function startServer() {
  try {
    // Ensure the base directory exists
    await ensureFolderExists(baseDirectory)

    app.post('/append/:filename', async (req: Request, res: Response) => {
      const { filename } = req.params
      const { question, answer, section } = req.body
      const filePath = path.join(baseDirectory, filename)

      try {
        const notesData = await prepareData(filePath, section, question, answer)

        // Write the updated JSON back to the file
        await fs.writeFile(filePath, JSON.stringify(notesData, null, 2))

        res.sendStatus(200)
      } catch (err) {
        res.status(500).send('Error reading or writing the file.')
      }
    })

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`)
    })
  } catch (error: any) {
    console.error(`Error creating base directory: ${error.message}`)
  }
}

async function main() {
  try {
    await startServer()
    console.log('Server is fully started.')
  } catch (error: any) {
    console.error(`Error starting the server: ${error.message}`)
  }
}

main()
