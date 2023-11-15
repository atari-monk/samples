import ffmpeg from 'fluent-ffmpeg'
import { getCurrentItem } from '../data'

export async function convertMp4ToMp3(): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const item = getCurrentItem()

      if (!item.audioOut) {
        throw new Error(`Item ${item.name} doesn't have an audio path.`)
      }

      // Perform the MP4 to MP3 conversion
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
    } catch (error) {
      reject(error)
    }
  })
}
