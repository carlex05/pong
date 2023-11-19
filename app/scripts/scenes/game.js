
export default class Game extends Phaser.Scene {

  constructor() {
    super({key: 'Pong'});
  }

  

  create(/* data */) {
    this.border = {};
    this.border.width = 2;
    this.border.color = 0xffffff;
    this.border.margin = 10;
    let width = this.cameras.main.width;
    let height = this.cameras.main.height;
    this.playableField = {
      width: width - this.border.margin * 2,
      height: height - this.border.margin * 2,
    };
    
    
    let graphics = this.add.graphics();
    graphics.fillStyle(this.border.color, 1);
    graphics.fillRect(((width - this.border.width) / 2)+this.border.margin, this.border.margin, this.border.width, this.playableField.height);
    
    graphics.fillRect(this.border.margin, this.border.margin, this.playableField.width, this.border.width);
    graphics.fillRect(this.border.margin, height - this.border.margin, this.playableField.width, this.border.width);

    graphics.fillRect(this.border.margin, this.border.margin, this.border.width, this.playableField.height);
    graphics.fillRect(width - this.border.margin, this.border.margin, this.border.width, this.playableField.height);

  }


  update(/* t, dt */) {
    
  }
}
