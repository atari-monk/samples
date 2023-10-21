export interface Note {
  question: string
  answer: string
  dateTime: string
}

export interface Section {
  title: string
  questions: Note[]
}

export interface NotesData {
  sections: Section[]
}
