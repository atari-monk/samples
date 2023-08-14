import { GameObject } from 'atari-monk-ball-game-lib';

export class Robot extends GameObject {
  #pixiApp;
  #body;
  #robotX;
  #robotDirection;

  constructor(pixiApp: any, body: any) {
    super();
    this.#pixiApp = pixiApp;
    this.#body = body;
    this.#robotX = 0;
    this.#robotDirection = 1;
  }

  draw(stage: any) {
    this.#body.draw(stage);
  }

  update(_deltaTime: any) {
    this.#updateRobotPosition();
    this.#rotateArmsAndLegs();
    this.#checkBoundaries();
  }

  #updateRobotPosition() {
    this.#robotX += 1 * this.#robotDirection;
    this.#body.container.position.x = this.#robotX;
  }

  #rotateArmsAndLegs() {
    const time = this.#pixiApp.ticker.lastTime;
    const armRotation = Math.sin(time / 100) * 0.05;
    const legRotation = -Math.sin(time / 100) * 0.1;
    this.#body.leftArmJoint.rotation = armRotation;
    this.#body.rightArmJoint.rotation = -armRotation;
    this.#body.leftLegJoint.rotation = legRotation;
    this.#body.rightLegJoint.rotation = -legRotation;
  }

  #checkBoundaries() {
    if (
      this.#robotX >=
        this.#pixiApp.renderer.width - this.#body.container.width ||
      this.#robotX <= 0
    ) {
      this.#robotDirection *= -1;
    }
  }
}
