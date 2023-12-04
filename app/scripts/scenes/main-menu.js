export default class MainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenu' });
  }

  create() {
    this.add.text(100, 50, 'Welcome to Pong', { fontSize: '32px', fill: '#FFF' });
    let textStyle = { fontSize: '24px', fill: '#FFF' };
    let textStyleHover = { fontSize: '24px', fill: '#FF0' };
    this.isCpuPlayer = true;
    this.vsCpuPlayer = this.add.text(100, 110, 'Player 2: CPU Player', textStyle);
    this.vsCpuPlayer.setInteractive()
      .on('pointerdown', () => {
        this.isCpuPlayer = !this.isCpuPlayer;
        if(this.isCpuPlayer)
          this.vsCpuPlayer.text = 'Player 2: CPU Player';
        else
          this.vsCpuPlayer.text = 'Player 2: Human Player';
      })
      .on('pointerover', () => this.vsCpuPlayer.setStyle(textStyleHover))
      .on('pointerout', () => this.vsCpuPlayer.setStyle(textStyle));
        
    this.scoreToWin = 5;
    this.scoreToWinOption = this.add.text(100, 160, 'Score to win: ' + this.scoreToWin, textStyle);
    this.scoreToWinOption.setInteractive()
      .on('pointerdown', () => {
        this.scoreToWin++;
        if(this.scoreToWin>15)
          this.scoreToWin = 5;
        this.scoreToWinOption.text = 'Score to win: ' + this.scoreToWin;
      })
      .on('pointerover', () => this.scoreToWinOption.setStyle(textStyleHover))
      .on('pointerout', () => this.scoreToWinOption.setStyle(textStyle));
    this.difficulty = 'Normal';
    this.difficultyOption = this.add.text(100, 210, 'Difficulty: ' + this.difficulty, textStyle);
    this.difficultyOption.setInteractive()
      .on('pointerdown', () => {
        if(this.difficulty === 'Normal')
          this.difficulty = 'Advanced';
        else
          this.difficulty = 'Normal';
        this.difficultyOption.text = 'Difficulty: ' + this.difficulty;
      })
      .on('pointerover', () => this.difficultyOption.setStyle(textStyleHover))
      .on('pointerout', () => this.difficultyOption.setStyle(textStyle));
    this.player1 = { 
      upKey: 'W',
      downKey: 'S',
    };
    this.player2 = { 
      upKey: 'O',
      downKey: 'L',
    };
    this.player1UpKeyOption = this.add.text(100, 260, 'Player 1 Up Key: ' + this.player1.upKey, textStyle);
    this.player1UpKeyOption.setInteractive()
      .on('pointerdown', () => {
        this.waitForInput('player1Up');
      })
      .on('pointerover', () => this.player1UpKeyOption.setStyle(textStyleHover))
      .on('pointerout', () => this.player1UpKeyOption.setStyle(textStyle));
    this.player1DownKeyOption = this.add.text(450, 260, 'Player 1 Down Key: ' + this.player1.downKey, textStyle);
    this.player1DownKeyOption.setInteractive()
      .on('pointerdown', () => {
        this.waitForInput('player1Down');
      })
      .on('pointerover', () => this.player1DownKeyOption.setStyle(textStyleHover))
      .on('pointerout', () => this.player1DownKeyOption.setStyle(textStyle));
    this.player2UpKeyOption = this.add.text(100, 310, 'Player 2 Up Key: ' + this.player2.upKey, textStyle);
    this.player2UpKeyOption.setInteractive()
      .on('pointerdown', () => {
        this.waitForInput('player2Up');
      })
      .on('pointerover', () => this.player2UpKeyOption.setStyle(textStyleHover))
      .on('pointerout', () => this.player2UpKeyOption.setStyle(textStyle));
    this.player2DownKeyOption = this.add.text(450, 310, 'Player 2 Down Key: ' + this.player2.downKey, textStyle);
    this.player2DownKeyOption.setInteractive()
      .on('pointerdown', () => {
        this.waitForInput('player2Down');
      })
      .on('pointerover', () => this.player2DownKeyOption.setStyle(textStyleHover))
      .on('pointerout', () => this.player2DownKeyOption.setStyle(textStyle));
    this.playButton = this.add.text(100, 400, 'Start Game', { fontSize: '24px', fill: '#FFF', fontStyle: 'bold' })
      .setInteractive()
      .on('pointerdown', () => this.startGame())
      .on('pointerover', () => this.playButton.setStyle(textStyleHover))
      .on('pointerout', () => this.playButton.setStyle(textStyle));
  }

  waitForInput(source){
    this.input.keyboard.once('keydown', (event)=>{
      if(event.key < 'a' || event.keyCode > 'z'){
        return;
      }
      switch(source){
      case 'player1Up':
        this.player1.upKey = event.key.toUpperCase();
        this.player1UpKeyOption.text = 'Player 1 Up Key: ' + this.player1.upKey;
        break;
      case 'player1Down':
        this.player1.downKey = event.key.toUpperCase();
        this.player1DownKeyOption.text = 'Player 1 Down Key: ' + this.player1.downKey;
        break;
      case 'player2Up':
        this.player2.upKey = event.key.toUpperCase();
        this.player2UpKeyOption.text = 'Player 2 Up Key: ' + this.player2.upKey;
        break;
      case 'player2Down':
        this.player2.downKey = event.key.toUpperCase();
        this.player2DownKeyOption.text = 'Player 2 Down Key: ' + this.player2.downKey;
        break;
      }
    });
  }

  startGame() {
    this.scene.start('Pong', {
      player1: this.player1, 
      player2: this.player2, 
      isCpuPlayer: this.isCpuPlayer, 
      scoreToWin: this.scoreToWin,
      difficulty: this.difficulty,
    });
  }
}
