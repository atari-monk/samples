import ffmpeg from 'fluent-ffmpeg'
import { IItem } from './api/IItem'
import { getItem, lib } from './data'

function convertVideoToMp3(item: IItem): Promise<void> {
  return new Promise<void>((resolve, reject) => {
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

const item = getItem(lib.ian_mcklellen.acting_shakespeare)
convertVideoToMp3(item)
