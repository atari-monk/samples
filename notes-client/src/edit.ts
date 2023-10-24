import { getById } from 'dom-lib'
import { DarkModeToggler } from './DarkModeToggler'
import { INoteData } from './INoteData'
import './css/styles.css'

new DarkModeToggler()

const load = getById('loadButton')

async function handleLoad(event: Event) {
  event.preventDefault()
  const fileTitleInput = getById('fileTitle') as HTMLInputElement
  const sectionNumber = getById('sectionNumber')
  const questionNumber = getById('questionNumber')
}

load.addEventListener('click', handleLoad)
