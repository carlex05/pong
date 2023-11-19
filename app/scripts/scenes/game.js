import Player from '../objects/player';
import Ball from '../objects/ball';

export default class Game extends Phaser.Scene {

  constructor() {
    super({key: 'Pong'});
  }

  create(/* data */) {
    this.border = this.getMarginConfig();
    this.frameCount = 0;
    this.playableField = this.getPlayableFieldConfig();
    this.ia = {
      errorY: 0,
    };
    
    let graphics = this.add.graphics();
    graphics.fillStyle(this.border.color, 1);
    this.drawBorders();
    this.drawMiddleLine(graphics);
    this.addPlayers();
    
    this.setupKeyboard();
    
    let ballY = Phaser.Math.Between(this.border.margin, this.border.margin + this.playableField.height);

    this.ball = new Ball(this, this.cameras.main.width / 2, ballY, 10);
    this.ball.velocity = new Phaser.Math.Vector2(150, 150);
    this.physics.add.collider(this.ball, this.player1);
    this.physics.add.collider(this.ball, this.player2);
    this.createPhysicsBorders();

    this.player1ScoreText = this.add.text(100, 50, 'Player 1: 0', { fontSize: '28px', fill: '#FFF' });
    this.player2ScoreText = this.add.text(this.cameras.main.width - 300, 50, 'Player 2: 0', { fontSize: '28px', fill: '#FFF' });
  }

  updateScoreDisplay() {
    // Actualizar el texto de los puntajes
    this.player1ScoreText.setText('Player 1: ' + this.player1.score);
    this.player2ScoreText.setText('Player 2: ' + this.player2.score);
  }

  createPhysicsBorders() {
  
    // Crea un grupo para los bordes físicos
    this.borders = this.physics.add.staticGroup();
  
    this.borders.add(this.upperBorder); 
    this.borders.add(this.bottomBorder); 
    this.physics.add.collider(this.ball, this.borders);
    
  }  

  addPlayers(){
    let width = this.cameras.main.width;
    this.player1 = new Player(this, this.border.margin * 1.7, this.cameras.main.height / 2, 10, 70);
    this.player2 = new Player(this, width - this.border.margin * 1.7, this.cameras.main.height / 2, 10, 70);
    
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
    graphics.fillRect(width / 2 - this.border.width, this.border.margin, this.border.width, this.playableField.height);
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
    this.frameCount++;
    this.moveComputerPaddle();

    // Actualizar jugadores
    this.player1.update();
    this.player2.update();

    if (this.ball.x < this.border.margin) {
      // La pelota pasó el borde izquierdo, el jugador de la derecha anota
      this.player2.score += 1;
      this.resetBallAndScores();
    } else if (this.ball.x > this.cameras.main.width - this.border.margin) {
      // La pelota pasó el borde derecho, el jugador de la izquierda anota
      this.player1.score += 1;
      this.resetBallAndScores();
    }

  }

  moveComputerPaddle() {   
    if (this.frameCount % 30 === 0){
      this.ia.errorY = this.ball.y + Phaser.Math.Between(-this.player2.height/2, this.player2.height/2);
    }
    if (this.frameCount % 1 === 0) {
      if (this.ia.errorY < this.player2.y && this.player2.y > this.border.margin) {
        this.player2.y -= this.player2.velocity;
      } else if (this.ia.errorY > this.player2.y && this.player2.y < this.cameras.main.height - this.border.margin) {
        this.player2.y += this.player2.velocity;
      }
    }
  }

  resetBallAndScores() {
    this.ball.resetBall();
    this.updateScoreDisplay();
  }
}
