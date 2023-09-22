import { Character } from './Character'
import { IItemMap } from './IItemMap'

export type ILib = {
  [K in Character]: IItemMap
}
