/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((module) => {

eval("console.log(\"im the game\")\n\nvar square = document.getElementById(\"square\");\n\n// const Asteroid = require('./asteroid.js')\n\nclass Game {\n    constructor(ctx1, ctx2, ctx3, DIM_X, DIM_Y) {\n        this.i = 1;\n        // this.ctx = ctx;\n        this.ctx1 = ctx1;\n        this.ctx2 = ctx2;\n        this.ctx3 = ctx3;\n        this.state = 0;\n        this.altState = 0;\n        this.DIM_X = DIM_X;\n        this.DIM_Y = DIM_Y;\n        this.play = this.play.bind(this);\n    }\n\n    // allObjects() {\n    //     return [].concat(this.ships, this.asteroids, this.bullets);\n    // };\n\n    drawImageInCanvas(context, filepath, xPos, yPos, xSize, ySize) {\n        var img1 = new Image();\n        //drawing of the test image - img1\n        img1.onload = () => {\n            //draw background image\n            // console.log(img1.width);\n            // console.log(img1.height);\n\n            // this puts image in a spot with a centered anchorpoint.  \n            // if you don't want a centered anchorpoint, do this without subtracting x/ysize /2.\n            context.drawImage(img1, (xPos - xSize/2), (yPos - ySize/2), xSize, ySize);\n        };\n        img1.src = filepath;\n    }\n    // creating a custom game update loop.\n    // note that this will \n    play() {\n        // console.log(this.i);\n        if (this.state === 0){\n            if (this.altState === 0) {\n                this.altState = 1;\n                // generate game assets\n                console.log(\"hello world\");\n\n                this.ctx1.fillStyle = 'green';\n                this.ctx1.fillRect(0, 0, 800, 600)\n                \n                this.generateSquares(this.ctx3);\n                \n                this.ctx2.font = (\"30px Arial\");\n                this.ctx2.fillStyle = \"black\";\n                this.ctx2.textAlign = \"center\";\n                this.ctx2.fillText(\"Place Your Ships\", 400, 50);\n                \n                // generate game board\n\n\n                // generate game images\n\n                // generate game ship objects\n\n                // game is in \"place your ships\" state\n\n                \n\n\n                console.log(this.altState);\n            } else if (this.altState === 1) {\n\n            }\n        }\n        this.i += 1;\n        // console.log(this.i);\n\n\n        // run the callback loop.\n        requestAnimationFrame(this.play);\n    }\n\n    generateSquares(ctx) {\n        // let square = ctx.add.sprite((0 + (1 * 100)), (0 + (1 * 100)), 'square');\n        // this.drawImageInCanvas(ctx, 'assets/square_outline.png', 400, 300, 50, 50);\n        let size = 7;\n        for (let i = 0; i < size; i++) {\n            for (let j = 0; j < 7; j++){\n                let xPos = 400 - ((Math.floor(size / 2)) * 50) + (i * 50);\n                let yPos = 200 + (j * 50);\n                let ship = new Ship(ctx, xPos, yPos, 50, 50, \"blank\");\n                // this.drawImageInCanvas(ctx, 'assets/square_outline.png', xPos, yPos, 50, 50);\n                \n                // let x_left = 278 + (i * 50);\n                // let x_right = 324 + (i * 50);\n                // let y_top = 176 + (j * 50);\n                // let y_bot = 223 + (j * 50);\n                // let button = new Button(x_left, x_right, y_top, y_bot, \"board\", [i, j])\n                // buttons.push(button);\n                // your_squares.push(square);\n            }\n        }\n    }\n\n    // draw(ctx) {\n    //     ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);\n    //     ctx.fillStyle = Game.BG_COLOR;\n    //     ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);\n\n    //     // this.allObjects().forEach(function(object) {\n    //     //     object.draw(ctx);\n    //     // })\n    //     // let ctx2 = this.canvasCtx;\n    //     this.ships.forEach(function(ship) {\n    //         asteroid.draw(ctx2);\n    //     })\n    // }\n\n    // clear(ctx) {\n\n    // }\n}\n\nclass Ship {\n    constructor(context, xPos, yPos, xSize, ySize, color) {\n        this.context = context;\n        this.xPos = xPos;\n        this.yPos = yPos;\n        this.yPosI = yPos;\n        this.xPosI = xPos;\n        this.xSize = xSize;\n        this.ySize = ySize;\n        this.color = color;\n        this.draw = this.draw.bind(this)\n        this.draw();\n    }\n\n    changeColor(newColor) {\n        this.color = newColor;\n    }\n\n    draw() {\n        // this.context.clearRect(0, 0, 800, 600);\n        let filepath = \"\"\n        if (this.color === \"blank\"){\n            filepath = 'assets/square_outline.png'\n        } else if (this.color === \"hover\"){\n            filepath = 'assets/square_outline_transparent.png'\n        } else if (this.color === \"white\") {\n            filepath = 'assets/square_outline_white.png'\n        }\n\n        this.drawImageInCanvas(this.context, filepath, this.xPos, this.yPos, this.xSize, this.ySize)\n        this.yPos += 0.1;\n        this.xPos += 0.1;\n        // if (this.yPos > this.yPosI)\n        // console.log(\"hello\")\n\n        requestAnimationFrame(this.draw);\n    }\n\n    drawImageInCanvas(context, filepath, xPos, yPos, xSize, ySize) {\n        var img1 = new Image();\n        //drawing of the test image - img1\n        img1.onload = () => {\n            context.drawImage(img1, (xPos - xSize/2), (yPos - ySize/2), xSize, ySize);\n        };\n        img1.src = filepath;\n    }\n\n\n}\n\n// Game.prototype.randomPosition = function () {\n\n// }\n// function Game(canvasCtx) {\n//     // this.num = num;\n//     // this.asteroid = new Asteroid();\n//     this.canvasCtx = canvasCtx;\n//     console.log('started new game');\n// }\n\nmodule.exports = Game;\n\n//# sourceURL=webpack://battlesheep/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("console.log(\"webpack confirmed working\")\n\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n// const GameView = require('./game-view.js');\n// const Asteroid = require('./asteroid.js');\n// const MovingObject = require('./moving-object.js');\n\n// let game = new Game() \ndocument.addEventListener('DOMContentLoaded', () => {\n    // grab canvas\n\n    // gonna try to do this with layers...\n    const layer1 = document.getElementById(\"layer1\");\n    const layer2 = document.getElementById(\"layer2\");\n    layer1.width = 800;\n    layer1.height = 600;\n    layer2.width = 800;\n    layer2.height = 600;\n    \n    const ctx1 = layer1.getContext('2d');\n    const ctx2 = layer2.getContext('2d');\n    const ctx3 = layer3.getContext('2d');\n    // ctx.fillStyle = 'green';\n    // ctx.fillRect(0, 0, canvas.width, canvas.height)\n    const game = new Game(ctx1, ctx2, ctx3, layer1.width, layer1.height);\n    game.play();\n    // const obj = new MovingObject([100, 100], [5,5], 20, \"blue\");\n    // const gameview = new GameView(game, ctx);\n    // gameview.start();\n    // obj.draw(ctx);\n\n    // add code to test on window\n    // window.Game = Game;\n    // window.Asteroid = Asteroid;\n    // window.MovingObject = MovingObject;\n})\n\nconsole.log(\"boop\");\n\n//# sourceURL=webpack://battlesheep/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;