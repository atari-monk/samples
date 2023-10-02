import { ILib } from './api/ILib'
import { Quality } from './api/Quality'
import { Rating } from './api/Rating'
import { VideoResolution } from './api/VideoResolution'

const root = 'C:/atari-monk/'
const video = root + 'video/'
const audio = root + 'audio/'
const lib: ILib = {
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
  robert_kiyosaki: {
    rich_dad_poor_dad: {
      name: 'rich_dad_poor_dad',
      link: 'wF293QPbmvo',
      quality: Quality.Bad,
      rating: Rating.DontKnow,
      description: 'financial topic book',
      video_resolution: VideoResolution._360p,
      videoOut: video + 'robert_kiyosaki/rich_dad_poor_dad.mp4',
      audioOut: audio + 'robert_kiyosaki/rich_dad_poor_dad.mp3',
    },
  },
  blender_art: {
    low_poly_character1: {
      name: 'low_poly_character1',
      link: 'Z3vdQj06DGo',
      quality: Quality.Ok,
      rating: Rating.Master,
      description: 'nice modeling',
      video_resolution: VideoResolution._720p,
      videoOut: video + 'blender_art/low_poly_character_part1.mp4',
    },
    low_poly_character2: {
      name: 'low_poly_character2',
      link: 'TmG--ekuThc',
      quality: Quality.Ok,
      rating: Rating.Master,
      description: 'nice modeling',
      video_resolution: VideoResolution._720p,
      videoOut: video + 'blender_art/low_poly_character_part2.mp4',
    },
    low_poly_character3: {
      name: 'low_poly_character3',
      link: 'zJzZYo59Kgg',
      quality: Quality.Ok,
      rating: Rating.Master,
      description: 'nice modeling',
      video_resolution: VideoResolution._720p,
      videoOut: video + 'blender_art/low_poly_character_part3.mp4',
    },
  },
  shakespeare: {
    king_lear: {
      name: 'king_lear',
      link: 'Pdn07wgUrno',
      quality: Quality.Vintage,
      rating: Rating.Master,
      description: 'fancy theather play',
      video_resolution: VideoResolution._720p,
      videoOut: video + 'shakespeare/king_lear.mp4',
      audioOut: audio + 'shakespeare/king_lear.mp3',
    },
  },
}

export function getCurrentItem() {
  const item = lib.shakespeare.king_lear
  if (!item) throw new Error('No such item in data!')
  return item
}
