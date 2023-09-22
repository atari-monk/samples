import { Art } from './Art'
import { IItem } from './IItem'

export type IItemMap = {
  [K in Art]?: IItem
}
