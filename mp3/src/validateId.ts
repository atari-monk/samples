function isValidYouTubeVideoId(input: string) {
  const regex = /^[a-zA-Z0-9-_]{11}$/
  return regex.test(input)
}

// Example usage:
const videoId = '-MJi7T4lX80'
if (isValidYouTubeVideoId(videoId)) {
  console.log(`"${videoId}" is a valid YouTube video ID.`)
} else {
  console.log(`"${videoId}" is not a valid YouTube video ID.`)
}
