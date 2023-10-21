import { promises as fs } from 'fs'
import { NotesData, Note, Section } from './Model'

export async function prepareData(
  filePath: string,
  section: string,
  question: string,
  answer: string
): Promise<NotesData> {
  try {
    let notesData: NotesData = {
      sections: [
        {
          title: 'Default Section',
          questions: [],
        },
      ],
    }

    try {
      const data = await fs.readFile(filePath, 'utf8')
      notesData = JSON.parse(data)
    } catch (err) {
      // If the file doesn't exist, notesData remains with default values
    }

    // Create a new note object with the specified fields
    const newNote: Note = {
      question,
      answer,
      dateTime: new Date().toISOString(),
    }

    // Check if the section provided in the form exists in notesData
    const sectionIndex = notesData.sections.findIndex(
      (s) => s.title === section
    )

    if (sectionIndex !== -1) {
      // Append the new note to the existing section data
      notesData.sections[sectionIndex].questions.push(newNote)
    } else {
      // If the section doesn't exist, create a new section
      const newSection: Section = {
        title: section,
        questions: [newNote],
      }
      notesData.sections.push(newSection)
    }

    return notesData
  } catch (err) {
    throw err
  }
}
