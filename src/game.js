console.log("im the game")

const Asteroid = require('./asteroid.js')

class Game {
    static DIM_X = 500;
    static DIM_Y = 500;
    static BG_COLOR = "black";
    static NUM_ASTEROIDS = 5;

    constructor(canvasCtx) {
        this.canvasCtx = canvasCtx;
        this.asteroids = [];
        this.addAsteroids();
    }

    addAsteroids() {
        for (let i = 0; i < Game.NUM_ASTEROIDS; i++) {
            let pos = this.randomPosition();
            console.log(pos);
            let rock = new Asteroid(pos);
            this.asteroids.push(rock);
        }
        this.draw(this.canvasCtx);
    }

    randomPosition() {
        let x = this.getRandomInt(0, Game.DIM_X);
        let y = this.getRandomInt(0, Game.DIM_Y);
        let pos = [x, y]
        return pos;
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    draw(ctx) {
        let ctx2 = this.canvasCtx;
        ctx2.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
        ctx2.fillStyle = Game.BG_COLOR;
        ctx2.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);

        // this.allObjects().forEach(function(object) {
        //     object.draw(ctx);
        // })
        // let ctx2 = this.canvasCtx;
        this.asteroids.forEach(function(asteroid) {
            asteroid.draw(ctx2);
        })
    }

    moveObjects(){
        this.asteroids.forEach(function(asteroid) {
            asteroid.move();
        })
    }

    // allObjects() {
    //     return [].concat(this.ships, this.asteroids, this.bullets);
    // };
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