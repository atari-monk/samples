import { Quality } from './Quality'
import { Rating } from './Rating'
import { VideoResolution } from './VideoResolution'

export interface IItem {
  name: string
  link: string
  quality: Quality
  rating: Rating
  description: string
  video_resolution: VideoResolution
  videoOut: string
  audioOut: string
}
