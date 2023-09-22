import * as fs from 'fs'
import ytdl from 'ytdl-core'
import { getCurrentItem } from '../data'

export async function downloadMp4(): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const item = getCurrentItem()
      const url = `https://www.youtube.com/watch?v=${item.link}`
      const videoInfo = await ytdl.getInfo(url)
      const format = ytdl.chooseFormat(videoInfo.formats, {
        quality: item.video_resolution,
      })

      if (!format) {
        reject('No valid format found for the video.')
        return
      }

      const videoStream = ytdl(url, { format })

      const writableStream = fs.createWriteStream(item.videoOut)

      videoStream.pipe(writableStream)

      writableStream.on('finish', () => {
        resolve()
        console.log(`Downloaded ${item.name} to ${item.videoOut}`)
      })

      videoStream.on('error', (error) => {
        reject(error)
        console.error(`Error downloading ${item.name}: ${error}`)
      })
    } catch (error) {
      reject(error)
    }
  })
}
