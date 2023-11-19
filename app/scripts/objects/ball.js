export default class Ball extends Phaser.GameObjects.Ellipse {
    constructor(scene, x, y, diameter) {
        super(scene, x, y, diameter, diameter, 0xffffff); // El color blanco para la pelota
        scene.add.existing(this);
        scene.physics.add.existing(this); // Esto habilita la física para el objeto

        // Hacer que la pelota sea un cuerpo dinámico que puede moverse y reaccionar con las colisiones
        this.body.setCircle(diameter / 2); // Establecer la forma del cuerpo para colisiones
        this.body.setCollideWorldBounds(false); // Para que la pelota rebote en los bordes
        this.body.setBounce(1, 1); // Establecer el rebote a 1 para que la pelota no pierda energía

        // Establecer la velocidad inicial de la pelota
        this.body.velocity.set(200, 200); // La pelota rebotará con la misma energía con la que colisiona
    }

}