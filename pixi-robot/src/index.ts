import 'reflect-metadata'
import * as PIXI from 'pixi.js'
import {
  AppHelper,
  BallGame,
  Collider,
  GameObjectManager,
  appHelperParams,
  getCanvasForPixi,
  getPixiAppParams,
} from 'atari-monk-ball-game-lib'
import { Robot } from './Robot'
import { RobotBody } from './RobotBody'

const appHelper = new AppHelper(appHelperParams)
const pixiApp = new PIXI.Application(
  getPixiAppParams(getCanvasForPixi('pixiApp'))
)
const gameObjectManager = new GameObjectManager()
const robotBody = new RobotBody()
const robot = new Robot(pixiApp, robotBody)

gameObjectManager.addGameObject(robot)

appHelper.initializeApp(pixiApp)
const game = new BallGame(pixiApp, gameObjectManager, new Collider())
game.setBallGameObjects()
appHelper.startAnimationLoop(game)
