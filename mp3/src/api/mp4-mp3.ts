import ffmpeg from 'fluent-ffmpeg'
import { getCurrentItem } from '../data'

export async function convertMp4ToMp3(): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    const item = getCurrentItem()
    ffmpeg()
      .input(item.videoOut)
      .audioCodec('libmp3lame')
      .toFormat('mp3')
      .on('end', () => {
        console.log(`Converted ${item.name} to ${item.audioOut}`)
        resolve()
      })
      .on('error', (error) => {
        reject(error)
        console.error(`Error converting ${item.name}: ${error}`)
      })
      .save(item.audioOut)
  })
}
