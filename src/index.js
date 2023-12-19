console.log("webpack confirmed working")

const Game = require('./game.js');
// const GameView = require('./game-view.js');
// const Asteroid = require('./asteroid.js');
// const MovingObject = require('./moving-object.js');

// let game = new Game() 
document.addEventListener('DOMContentLoaded', () => {
    // grab canvas

    // var myFont = new FontFace("Afacad", 'url(https://fonts.googleapis.com/css?family=Afacad)')

    // myFont.load().then(function(font) {
    //     document.fonts.add(font);
    //     console.log('Font loaded');
    // })

    // gonna try to do this with layers...
    const layer1 = document.getElementById("layer1");
    const layer2 = document.getElementById("layer2");
    const layer3 = document.getElementById("layer3");
    layer1.width = 800;
    layer1.height = 600;
    layer2.width = 800;
    layer2.height = 600;
    layer3.width = 800;
    layer3.height = 600;
    
    const ctx1 = layer1.getContext('2d');
    const ctx2 = layer2.getContext('2d');
    const ctx3 = layer3.getContext('2d');
    // ctx.fillStyle = 'green';
    // ctx.fillRect(0, 0, canvas.width, canvas.height)
    const game = new Game(layer3, ctx1, ctx2, ctx3, layer1.width, layer1.height);

    game.play();
    // const obj = new MovingObject([100, 100], [5,5], 20, "blue");
    // const gameview = new GameView(game, ctx);
    // gameview.start();
    // obj.draw(ctx);

    // add code to test on window
    // window.Game = Game;
    // window.Asteroid = Asteroid;
    // window.MovingObject = MovingObject;
})

console.log("boop");