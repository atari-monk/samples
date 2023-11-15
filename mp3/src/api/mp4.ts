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
  //console.log('VideoInfo Properties:', Object.keys(videoInfo).join(', '))

  console.log('Video Title:', videoInfo.videoDetails.title)
  console.log('Video Author:', videoInfo.videoDetails.author.name)
  console.log(
    'Video Duration:',
    videoInfo.videoDetails.lengthSeconds + ' seconds'
  )
  const uniqueFormats = new Set<string>()
  uniqueFormats.add('[qualityLabel, quality, audioQuality, hasAudio]')
  videoInfo.formats.forEach((format) => {
    uniqueFormats.add(
      `[${format.qualityLabel}, ${format.quality}, ${format.audioQuality}, ${format.hasAudio}]`
    )
  })
  console.log('Video Formats:', [...uniqueFormats].join('\n'))
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

      const resolutions = [
        //'1080p', 
        '720p', 
        'large',
        'medium',
        'small',
        'tiny',
      ]
      const format = videoInfo.formats.find((f) =>
        resolutions.includes(f.qualityLabel)
      )

      if (!format) {
        reject('No valid format found for the video.')
        return
      }

      console.log('Format:', format.quality)

      const videoStream = ytdl(url, { format })

      const writableStream = fs.createWriteStream(item.videoOut)

      // Initialize variables to track progress
      let downloadedSize = 0
      let totalSize = 0
      let percent = totalSize !== 0 ? (downloadedSize / totalSize) * 100 : 0
      console.log(`Download progress: ${percent.toFixed(2)}%`)

      // Log progress every minute
      const progressInterval = setInterval(() => {
        percent = totalSize !== 0 ? (downloadedSize / totalSize) * 100 : 0
        console.log(`Download progress: ${percent.toFixed(2)}%`)
      }, 60 * 1000) // Report every minute

      // Listen to the 'progress' event
      videoStream.on('progress', (chunkLength, downloaded, total) => {
        // Update downloadedSize and totalSize
        downloadedSize = downloaded
        totalSize = total
      })

      videoStream.pipe(writableStream)

      writableStream.on('finish', () => {
        clearInterval(progressInterval) // Clear interval on finish
        resolve()
        console.log(`Downloaded ${item.name} to ${item.videoOut}`)
      })

      videoStream.on('error', (error) => {
        clearInterval(progressInterval) // Clear interval on error
        reject(error)
        console.error(`Error downloading ${item.name}: ${error}`)
      })
    } catch (error) {
      reject(error)
    }
  })
}
