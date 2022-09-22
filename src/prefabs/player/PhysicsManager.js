import CONFIG from '../../config/game';

/**
 * Player physics manager
 * @class PhysicsManager
 */
class PhysicsManager {
  static CONFIG = CONFIG.PREFABS.PLAYER;

  /**
   * Creates an instance of PhysicsManager
   * @param {Player} player - The Player to which this PhysicsManager belongs
   */
  constructor(player) {
    this.player = player;
    this.scene = player.scene;

    // Init physics
    this.scene.physics.world.enable(player);
    player.setSize(13, 18);
    player.setOffset(6, 6);
    player.setCollideWorldBounds(true);
    player.setGravityY(PhysicsManager.CONFIG.GRAVITY.Y * 2);
    player.setAccelerationY(PhysicsManager.CONFIG.JUMP.ACCELERATION);
    // player.setAccelerationY(5000);
    player.setMaxVelocity(0, PhysicsManager.CONFIG.JUMP.VELOCITY.MAX);

  }

  /**
   * Check if player is on floor
   * @readonly
   * @returns {boolean}
   */
  get isOnFloor() {
    return this.player.body.onFloor();
  }

  /**
   * Handle player jump
   */
  jump() {
    // Handle jumping while on floor
    if (this.isOnFloor) {
      // this.player.setVelocityY(PhysicsManager.CONFIG.JUMP.VELOCITY.MAX * -1);
      this.player.setVelocityY(PhysicsManager.CONFIG.JUMP.VELOCITY.START);
      return;
    }

    // Handle jumping while mid-air
    const { INCREASE_THRESHOLD, INCREASE_INCREMENT } = PhysicsManager.CONFIG.JUMP.VELOCITY;
    const velocityY = this.player.body.velocity.y;
    if (velocityY < INCREASE_THRESHOLD) {
      this.player.setVelocityY(velocityY + INCREASE_INCREMENT);
    }
  }

  /**
   * Handle speed fall
   */
  speedFall() {
    this.player.setVelocityY(PhysicsManager.CONFIG.JUMP.VELOCITY.SPEED_FALL);
  }

  /**
   * Reset physicsManager
   */
  reset() {
    this.player.setVelocityY(0);
  }

  /**
   * Resize body to match frame dimensions
   * @param {Phaser.Textures.Frame} frame - Current Player texture frame
   */
  resizeBodyToMatchFrame(frame) {
    const { name, width, height } = frame;


    // const headZone = 18;
    // const tailZone = 19;
    // const topZone = 6;
    // this.player.setBodySize(width - headZone - tailZone, height - topZone);
    // this.player.body.setOffset(tailZone, topZone);

  }
}

export default PhysicsManager;
