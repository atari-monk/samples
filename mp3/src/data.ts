import { IItem } from './api/IItem'
import { ILib } from './api/ILib'
import { Quality } from './api/Quality'
import { Rating } from './api/Rating'
import { VideoResolution } from './api/VideoResolution'

const root = 'C:/atari-monk/'
const video = root + 'video/'
const audio = root + 'audio/'
export const lib: ILib = {
  charles_bukowski: {
    factotum: {
      name: 'factotum',
      link: 'otRKSRgAmug',
      quality: Quality.Defective,
      rating: Rating.Master,
      description: 'colored image of a life of interesting man',
      video_resolution: VideoResolution._720p,
      videoOut: video,
      audioOut: audio,
    },
    post_office: {
      name: 'post_office',
      link: '1kpw4HwohoE',
      quality: Quality.Ok,
      rating: Rating.Master,
      description: 'colored image of a life of interesting man',
      video_resolution: VideoResolution._720p,
      videoOut: video,
      audioOut: audio,
    },
  },
  anthony_hopkins: {
    regret: {
      name: 'regret',
      link: '1lpFYv19Kt4',
      quality: Quality.Ok,
      rating: Rating.Master,
      description: 'on regret',
      video_resolution: VideoResolution._720p,
      videoOut: video,
      audioOut: audio,
    },
  },
  ian_mcklellen: {
    acting_shakespeare: {
      name: 'acting_shakespeare',
      link: 'w6eztyfrWo8',
      quality: Quality.Vintage,
      rating: Rating.Master,
      description: 'Master actor acting master artist',
      video_resolution: VideoResolution._360p,
      videoOut: video + 'ian_mcklellen/acting_shakespeare.mp4',
      audioOut: audio + 'ian_mcklellen/acting_shakespeare.mp3',
    },
  },
}

export function getItem(item?: IItem) {
  if (!item) throw new Error('No such item in data!')
  return item
}
