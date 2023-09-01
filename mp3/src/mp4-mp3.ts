import ffmpeg from 'fluent-ffmpeg'

function convertVideoToMp3(
  inputFilePath: string,
  outputFilePath: string
): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const mp3Stream = ffmpeg()
      .input(inputFilePath)
      .audioCodec('libmp3lame')
      .toFormat('mp3')
      .on('end', () => {
        console.log(`Conversion finished. MP3 file saved as ${outputFilePath}`)
        resolve()
      })
      .on('error', (err) => {
        console.error(`Error converting video to MP3: ${err.message}`)
        reject(err)
      })
      .save(outputFilePath)
  })
}

const inputVideoPath = './vid.mp4' // Replace with the path to your input video
const outputMp3Path = './audio.mp3' // Replace with the desired output MP3 file path

convertVideoToMp3(inputVideoPath, outputMp3Path)
  .then(() => {
    console.log('Conversion completed successfully.')
  })
  .catch((error) => {
    console.error(`Error: ${error}`)
  })
