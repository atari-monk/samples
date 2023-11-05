import { Category } from './Category'
import { IItemMap } from './IItemMap'

export type ILib = {
  [K in Category]: IItemMap
}
