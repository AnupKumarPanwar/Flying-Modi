var game = new Phaser.Game(window.innerWidth, 750, Phaser.AUTO, 'gameDiv');
var bgtile;
var isStarted=0;

var mainState = {

    preload: function() {
        game.stage.backgroundColor = '#71c5cf';

        game.load.image('bird', 'assets/bird.png');
        game.load.spritesheet('pipe', 'assets/pipe1.png', 50, 50);
        // game.load.image('pipe1', 'assets/pipe2.png');

        game.load.image('bgtile', 'assets/back.png');

        // Load the jump sound
        game.load.audio('jump', 'assets/jump.wav');

        game.load.image('jumpbutton', 'assets/jump.png');
    },

    create: function() {

       
        isStarted=0;
        game.physics.startSystem(Phaser.Physics.ARCADE);

        bgtile = game.add.tileSprite(0, 0, game.stage.bounds.width, game.cache.getImage('bgtile').height, 'bgtile');
        this.pipes = game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(20, 'pipe', 0, false);
        // this.pipes.createMultiple(20, 'pipe1');
        this.timer = this.game.time.events.loop(1800, this.addRowOfPipes, this);

        this.bird = this.game.add.sprite(100, 245, 'bird');
        game.physics.arcade.enable(this.bird);
        // this.bird.body.gravity.y = 1000;
        this.bird.body.gravity.y = 0;

        // New anchor position
        this.bird.anchor.setTo(-0.2, 0.5);

        // var jumpbutton = game.add.button(game.world.centerX - 40, 420, 'jumpbutton', this.jump, this, 2, 1, 0);
        var jumpbutton = game.add.button(0, 0, 'jumpbutton', this.jump, this, 2, 1, 0);

        this.score = 0;
            // window.localStorage.setItem( 'highScore', 'null' );

        var storedHighScore=JSON.parse(window.localStorage.getItem('highScore'));
        if (storedHighScore==null || storedHighScore=='null') {
            storedHighScore=0;
        }
        else
        {
            // storedHighScore=Number(storedHighScore);
        }
        console.log(storedHighScore);
        this.highScore=storedHighScore;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });
        this.labelHighScoreText = this.game.add.text((window.innerWidth)-80, 10, "High Score", { font: "15px Arial", fill: "#ffffff" });
        this.labelHighScore = this.game.add.text((window.innerWidth)-55, 30, this.highScore, { font: "20px Arial", fill: "#ffffff" });

        // Add the jump sound
        this.jumpSound = this.game.add.audio('jump');
    },

    update: function() {
        if (this.bird.inWorld == false)
        {
            if (this.score>this.highScore) {
                window.localStorage.setItem( 'highScore', JSON.stringify(this.score) );
                this.labelHighScore.text = this.highScore;
            }
            this.restartGame();
        }

        if (isStarted==1) 
        {
             game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);

             // Slowly rotate the bird downward, up to a certain point.
             if (this.bird.angle < 20)
                 this.bird.angle += 1;

             bgtile.tilePosition.x -= 1;
        }
    },

    jump: function() {
        // If the bird is dead, he can't jump
        if (this.bird.alive == false)
            return;

        isStarted=1;
        this.bird.body.gravity.y = 1000;

        this.bird.body.velocity.y = -350;

        // Jump animation
        game.add.tween(this.bird).to({angle: -20}, 100).start();

        // Play sound
        this.jumpSound.play();
    },

    hitPipe: function() {
        // If the bird has already hit a pipe, we have nothing to do
        if (this.bird.alive == false)
            return;

        isStarted=0;
        // Set the alive property of the bird to false
        this.bird.alive = false;

        // Prevent new pipes from appearing
        this.game.time.events.remove(this.timer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    restartGame: function() {
        isStarted=0;
        game.state.start('main');
    },

    addOnePipe: function(x, y, z) {
        var pipe = this.pipes.getFirstDead();
        pipe.frame=z;
        pipe.reset(x, y);
        pipe.body.velocity.x = -200;
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {

        // var pipeNo=Math.floor((Math.random() * 6) + 1);
        // game.load.image('pipe', 'assets/pipe'+pipeNo+'.png');
        if(isStarted==1)
        {
        var item = this.pipes.getFirstDead();
        item.frame = game.rnd.integerInRange(0, 71);


        var hole = Math.floor(Math.random()*5)+1;

        for (var i = 0; i < 11; i++)
            if (i != hole && i != hole +1 && i != hole +2)
                this.addOnePipe(400, i*60+10, item.frame);

        this.score += 1;
        
        this.labelScore.text = this.score;
        }
    },
};

game.state.add('main', mainState);
game.state.start('main');
