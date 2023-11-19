import Player from '../objects/player';
export default class Game extends Phaser.Scene {

  constructor() {
    super({key: 'Pong'});
  }

  create(/* data */) {
    this.border = this.getMarginConfig();
    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    this.playableField = this.getPlayableFieldConfig();
    
    
    let graphics = this.add.graphics();
    graphics.fillStyle(this.border.color, 1);
    graphics.fillRect(((width - this.border.width) / 2)+this.border.margin, this.border.margin, this.border.width, this.playableField.height);

    graphics.fillRect(this.border.margin, this.border.margin - this.border.width, this.playableField.width, this.border.width);
    graphics.fillRect(this.border.margin, height - this.border.margin - this.border.width, this.playableField.width, this.border.width);

    graphics.fillRect(this.border.margin - this.border.width, this.border.margin - this.border.width, this.border.width, this.playableField.height + this.border.width);
    graphics.fillRect(width - this.border.margin, this.border.margin - this.border.width, this.border.width, this.playableField.height + this.border.width);

    this.player1 = new Player(this, this.border.margin * 1.7, this.cameras.main.height / 2, 10, 100);
    this.player2 = new Player(this, width - this.border.margin * 1.7, this.cameras.main.height / 2, 10, 100);
    
    this.player1.velocity = 5;
    this.player2.velocity = 5;

    // Definir las teclas de entrada para el movimiento de las paletas
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

  }

  getMarginConfig(){
    return {
      width: 2,
      color: 0xffffff,
      margin: 10,
    };
  }

  getPlayableFieldConfig(){
    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    return {
      width: width - this.border.margin * 2,
      height: height - this.border.margin * 2,
    };
  }


  update() {
    if (this.keyW.isDown) {
      this.player1.moveUp();
    } else if (this.keyS.isDown) {
      this.player1.moveDown();
    } else {
      this.player1.stop();
    }

    if (this.cursors.up.isDown) {
      this.player2.moveUp();
    } else if (this.cursors.down.isDown) {
      this.player2.moveDown();
    } else {
      this.player2.stop();
    }

    // Actualizar jugadores
    this.player1.update();
    this.player2.update();
  }
}
