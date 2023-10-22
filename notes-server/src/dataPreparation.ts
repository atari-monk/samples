import { promises as fs } from 'fs'
import { NotesData, Note, Section } from './Model'

export async function prepareData(
  filePath: string,
  section: string,
  question: string,
  answer: string
): Promise<NotesData> {
  try {
    const existingData = await readData(filePath)

    const newNote: Note = {
      question,
      answer,
      dateTime: new Date().toISOString(),
    }

    const updatedData = updateData(existingData, section, newNote)

    await writeData(filePath, updatedData)

    return updatedData
  } catch (err) {
    throw err
  }
}

async function readData(filePath: string): Promise<NotesData> {
  try {
    const data = await fs.readFile(filePath, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    // If the file doesn't exist, return default values
    return {
      sections: [
        // {
        //   title: 'Default Section',
        //   questions: [],
        // },
      ],
    }
  }
}

function updateData(
  existingData: NotesData,
  section: string,
  newNote: Note
): NotesData {
  const sectionIndex = existingData.sections.findIndex(
    (s) => s.title === section
  )

  if (sectionIndex !== -1) {
    existingData.sections[sectionIndex].questions.push(newNote)
  } else {
    const newSection: Section = {
      title: section,
      questions: [newNote],
    }
    existingData.sections.push(newSection)
  }

  return existingData
}

async function writeData(filePath: string, data: NotesData): Promise<void> {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
}
