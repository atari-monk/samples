import { downloadMp4 } from './api/mp4'
import { convertMp4ToMp3 } from './api/mp4-mp3'

downloadMp4().then(() => {
  convertMp4ToMp3()
})
