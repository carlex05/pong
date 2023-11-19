import Player from '../objects/player';
import Ball from '../objects/ball';

export default class Game extends Phaser.Scene {

  constructor() {
    super({key: 'Pong'});
  }

  create(/* data */) {
    this.border = this.getMarginConfig();
    
    this.playableField = this.getPlayableFieldConfig();
    
    let graphics = this.add.graphics();
    graphics.fillStyle(this.border.color, 1);
    this.drawBorders();
    this.drawMiddleLine(graphics);
    this.addPlayers();
    
    this.setupKeyboard();
    
    this.ball = new Ball(this, this.cameras.main.width / 2, this.cameras.main.height / 2, 10);
    this.ball.velocity = new Phaser.Math.Vector2(150, 150);
    this.createPhysicsBorders();
  }

  createPhysicsBorders() {
  
    // Crea un grupo para los bordes físicos
    this.borders = this.physics.add.staticGroup();
  
    // Crea los bordes físicos en las posiciones de los bordes gráficos
    // Asegúrate de tener una imagen 1x1 pixel transparente cargada con la clave 'border'
    this.borders.add(this.leftBorder); // Borde izquierdo
    this.borders.add(this.rightBorder); // Borde derecho
    this.borders.add(this.upperBorder); // Borde superior
    this.borders.add(this.bottomBorder); // Borde inferior
    
  
    // Añade la colisión entre la pelota y los bordes físicos
    this.physics.add.collider(this.ball, this.borders);

    this.physics.add.collider(this.ball, this.player1);
    this.physics.add.collider(this.ball, this.player2);
  }  

  addPlayers(){
    let width = this.cameras.main.width;
    this.player1 = new Player(this, this.border.margin * 1.7, this.cameras.main.height / 2, 10, 100);
    this.player2 = new Player(this, width - this.border.margin * 1.7, this.cameras.main.height / 2, 10, 100);
    
    this.player1.velocity = 5;
    this.player2.velocity = 5;
  }

  setupKeyboard(){
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
  }

  drawBorders(){
    this.upperBorder = this.drawUpperBorder();
    this.add.existing(this.upperBorder);
    this.bottomBorder = this.drawBottomBorder();
    this.add.existing(this.bottomBorder);
    this.leftBorder = this.drawLeftBorder();
    this.add.existing(this.leftBorder);
    this.rightBorder = this.drawRightBorder();
    this.add.existing(this.rightBorder);
  }

  drawMiddleLine(graphics){
    let width = this.cameras.main.width;
    graphics.fillRect(((width - this.border.width) / 2)+this.border.margin, this.border.margin, this.border.width, this.playableField.height);
  }

  drawUpperBorder() {
    return new Phaser.GameObjects.Rectangle(this, this.border.margin, this.border.margin - this.border.width, this.playableField.width, this.border.width, this.border.color)
      .setOrigin(0,0);
  }

  drawBottomBorder() {
    return new Phaser.GameObjects.Rectangle(this, this.border.margin, this.cameras.main.height - this.border.margin - this.border.width, this.playableField.width, this.border.width, this.border.color)
      .setOrigin(0,0);
  }

  drawRightBorder() {
    return new Phaser.GameObjects.Rectangle(this, this.cameras.main.width - this.border.margin, this.border.margin - this.border.width, this.border.width, this.playableField.height + this.border.width, this.border.color)
      .setOrigin(0, 0);
  }

  drawLeftBorder() {
    return new Phaser.GameObjects.Rectangle(this, this.border.margin - this.border.width, this.border.margin - this.border.width, this.border.width, this.playableField.height + this.border.width, this.border.color)
      .setOrigin(0, 0);
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
