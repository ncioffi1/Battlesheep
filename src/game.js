console.log("im the game")

var square = document.getElementById("square");

// const Asteroid = require('./asteroid.js')

class Game {
    constructor(ctx1, ctx2, ctx3, DIM_X, DIM_Y) {
        this.i = 1;
        // this.ctx = ctx;
        this.ctx1 = ctx1;
        this.ctx2 = ctx2;
        this.ctx3 = ctx3;
        this.state = 0;
        this.altState = 0;
        this.DIM_X = DIM_X;
        this.DIM_Y = DIM_Y;
        this.play = this.play.bind(this);
    }

    // allObjects() {
    //     return [].concat(this.ships, this.asteroids, this.bullets);
    // };

    drawImageInCanvas(context, filepath, xPos, yPos, xSize, ySize) {
        var img1 = new Image();
        //drawing of the test image - img1
        img1.onload = () => {
            //draw background image
            // console.log(img1.width);
            // console.log(img1.height);

            // this puts image in a spot with a centered anchorpoint.  
            // if you don't want a centered anchorpoint, do this without subtracting x/ysize /2.
            context.drawImage(img1, (xPos - xSize/2), (yPos - ySize/2), xSize, ySize);
        };
        img1.src = filepath;
    }
    // creating a custom game update loop.
    // note that this will 
    play() {
        // console.log(this.i);
        if (this.state === 0){
            if (this.altState === 0) {
                this.altState = 1;
                // generate game assets
                console.log("hello world");

                this.ctx1.fillStyle = 'green';
                this.ctx1.fillRect(0, 0, 800, 600)
                
                this.generateSquares(this.ctx3);
                
                this.ctx2.font = ("30px Arial");
                this.ctx2.fillStyle = "black";
                this.ctx2.textAlign = "center";
                this.ctx2.fillText("Place Your Ships", 400, 50);
                
                // generate game board


                // generate game images

                // generate game ship objects

                // game is in "place your ships" state

                


                console.log(this.altState);
            } else if (this.altState === 1) {

            }
        }
        this.i += 1;
        // console.log(this.i);


        // run the callback loop.
        requestAnimationFrame(this.play);
    }

    generateSquares(ctx) {
        // let square = ctx.add.sprite((0 + (1 * 100)), (0 + (1 * 100)), 'square');
        // this.drawImageInCanvas(ctx, 'assets/square_outline.png', 400, 300, 50, 50);
        let size = 7;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < 7; j++){
                let xPos = 400 - ((Math.floor(size / 2)) * 50) + (i * 50);
                let yPos = 200 + (j * 50);
                let ship = new Ship(ctx, xPos, yPos, 50, 50, "blank");
                // this.drawImageInCanvas(ctx, 'assets/square_outline.png', xPos, yPos, 50, 50);
                
                // let x_left = 278 + (i * 50);
                // let x_right = 324 + (i * 50);
                // let y_top = 176 + (j * 50);
                // let y_bot = 223 + (j * 50);
                // let button = new Button(x_left, x_right, y_top, y_bot, "board", [i, j])
                // buttons.push(button);
                // your_squares.push(square);
            }
        }
    }

    // clear(ctx) {

    // }
}

class Ship {
    constructor(context, xPos, yPos, xSize, ySize, color) {
        this.context = context;
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSize = xSize;
        this.ySize = ySize;
        this.color = color;
        this.draw = this.draw.bind(this)
        this.draw();
    }

    changeColor(newColor) {
        this.color = newColor;
    }

    draw() {
        // this.context.clearRect(0, 0, 800, 600);
        let filepath = ""
        if (this.color === "blank"){
            filepath = 'assets/square_outline.png'
        } else if (this.color === "hover"){
            filepath = 'assets/square_outline_transparent.png'
        } else if (this.color === "white") {
            filepath = 'assets/square_outline_white.png'
        }

        this.drawImageInCanvas(this.context, filepath, this.xPos, this.yPos, this.xSize, this.ySize)
        // console.log("hello")

        requestAnimationFrame(this.draw);
    }

    drawImageInCanvas(context, filepath, xPos, yPos, xSize, ySize) {
        var img1 = new Image();
        //drawing of the test image - img1
        img1.onload = () => {
            context.drawImage(img1, (xPos - xSize/2), (yPos - ySize/2), xSize, ySize);
        };
        img1.src = filepath;
    }


}

// Game.prototype.randomPosition = function () {

// }
// function Game(canvasCtx) {
//     // this.num = num;
//     // this.asteroid = new Asteroid();
//     this.canvasCtx = canvasCtx;
//     console.log('started new game');
// }

module.exports = Game;