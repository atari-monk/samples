import * as fs from 'fs'
import ytdl from 'ytdl-core'
import { getCurrentItem } from '../data'

async function fetchVideoInfo(url: string) {
  try {
    const videoInfo = await ytdl.getInfo(url)
    LogVideoInfo(videoInfo)
    return videoInfo
  } catch (error: any) {
    console.error(`Error fetching video info for ${url}: ${error.message}`)
    return null
  }
}

function LogVideoInfo(videoInfo: ytdl.videoInfo) {
  console.log('VideoInfo Properties:', Object.keys(videoInfo).join(', '))

  console.log('Video Title:', videoInfo.videoDetails.title)
  console.log('Video Author:', videoInfo.videoDetails.author.name)
  console.log(
    'Video Duration:',
    videoInfo.videoDetails.lengthSeconds + ' seconds'
  )
  console.log(
    'Video Formats:',
    videoInfo.formats.map((format) => format.qualityLabel).join(', ')
  )
}

export async function downloadMp4(): Promise<void> {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const item = getCurrentItem()
      const url = `https://www.youtube.com/watch?v=${item.link}`
      const videoInfo = await fetchVideoInfo(url)

      if (!videoInfo) {
        reject(new Error('No vid info'))
        return
      }

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
