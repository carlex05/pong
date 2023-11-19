export default class Player extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height) {
        super(scene, x, y, width, height, 0xffffff); // 0xffffff es el color blanco
        scene.add.existing(this); // Añade esta paleta al canvas de la escena
        this.scene.physics.add.existing(this);
        this.body.setImmovable(true);
        this.minY = scene.border.margin;
        this.maxY = scene.playableField.height + this.minY;
        // Propiedades personalizadas
        this.velocity = 0; // Velocidad inicial de la paleta
        stop();
    }

    update() {
        // Si se está moviendo hacia arriba y no está en el límite superior
        if (this.isMovingUp && this.y - this.height / 2 > this.minY) {
            this.y -= this.velocity;
        }

        // Si se está moviendo hacia abajo y no está en el límite inferior
        if (this.isMovingDown && this.y + this.height / 2 < this.maxY) {
            this.y += this.velocity;
        }
    }

    moveUp() {
        this.isMovingUp = true;
        this.isMovingDown = false;
    }

    moveDown() {
        this.isMovingDown = true;
        this.isMovingUp = false;
    }

    stop() {
        this.isMovingUp = false;
        this.isMovingDown = false;
    }
}