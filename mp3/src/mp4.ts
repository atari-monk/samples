import * as fs from 'fs'
import ytdl from 'ytdl-core'

async function downloadYouTubeVideo(
  url: string,
  destination: string
): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const formatCode = '22' // Change this to the desired format code (e.g., '22' for 720p video with audio).

      const videoInfo = await ytdl.getInfo(url)
      const format = ytdl.chooseFormat(videoInfo.formats, {
        quality: formatCode,
      })

      if (!format) {
        reject('No valid format found for the video.')
        return
      }

      const videoStream = ytdl(url, { format })

      const writableStream = fs.createWriteStream(destination)

      videoStream.pipe(writableStream)

      writableStream.on('finish', () => {
        resolve()
      })

      videoStream.on('error', (err) => {
        reject(err)
      })
    } catch (error) {
      reject(error)
    }
  })
}

const factotum = 'otRKSRgAmug&list=WL&index=19'
const regret = '1lpFYv19Kt4&list=SS&index=2'
const url = `https://www.youtube.com/watch?v=${factotum}`
const destination = 'vid.mp4' // Replace with your desired destination file

downloadYouTubeVideo(url, destination)
  .then(() => {
    console.log(`Downloaded ${url} to ${destination}`)
  })
  .catch((error) => {
    console.error(`Error downloading ${url}: ${error}`)
  })
