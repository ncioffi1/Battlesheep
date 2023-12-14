console.log("webpack confirmed working")

const Game = require('./game.js');
const GameView = require('./game-view.js');
const Asteroid = require('./asteroid.js');
const MovingObject = require('./moving-object.js');

// let game = new Game() 
document.addEventListener('DOMContentLoaded', () => {
    // grab canvas
    const canvas = document.getElementById("canvas");
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    const game = new Game(ctx);
    const obj = new MovingObject([100, 100], [5,5], 20, "blue");
    const gameview = new GameView(game, ctx);
    gameview.start();
    obj.draw(ctx);

    // add code to test on window
    window.Game = Game;
    window.Asteroid = Asteroid;
    window.MovingObject = MovingObject;
})