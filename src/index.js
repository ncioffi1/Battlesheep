console.log("webpack confirmed working");

const Game = require('./game.js');

document.addEventListener('DOMContentLoaded', () => {

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
    
    const game = new Game(layer3, ctx1, ctx2, ctx3, layer1.width, layer1.height);

    game.play();
})

