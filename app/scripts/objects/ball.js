export default class Ball extends Phaser.GameObjects.Ellipse {
  constructor(scene, x, y, diameter) {
    super(scene, x, y, diameter, diameter, 0xffffff); // El color blanco para la pelota
    scene.add.existing(this);
    scene.physics.add.existing(this); // Esto habilita la física para el objeto

    // Hacer que la pelota sea un cuerpo dinámico que puede moverse y reaccionar con las colisiones
    this.body.setCircle(diameter / 2); // Establecer la forma del cuerpo para colisiones
    this.body.setCollideWorldBounds(false); // Para que la pelota rebote en los bordes
    this.body.setBounce(1, 1); // Establecer el rebote a 1 para que la pelota no pierda energía

    this.resetBall();
  }

  resetBall() {
    // Velocidad base en el eje Y
    let baseSpeedY = 200; // Ajusta este valor según sea necesario
        
    baseSpeedY *= this.calculateRandomDirection();

    // Velocidad aleatoria en el eje X
    let speedX = 200;
    speedX *= this.calculateRandomDirection();
    // Asignar la velocidad a la pelota
    this.velocity = new Phaser.Math.Vector2(speedX, baseSpeedY);

    // Restablece la posición de la pelota al centro
    let ballY = Phaser.Math.Between(this.scene.border.margin, this.scene.border.margin + this.scene.playableField.height);
    this.x = this.scene.cameras.main.width / 2;
    this.y = ballY;

    if (this.body) {
      this.body.velocity.set(speedX, baseSpeedY);
    }
  }

  calculateRandomDirection(){
    let direction = Phaser.Math.Between(-1, 1);
    while(direction === 0){
      direction = Phaser.Math.Between(-1, 1);
    }
    return direction;
  }


}