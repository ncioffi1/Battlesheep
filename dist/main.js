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

eval("console.log(\"im the game\")\n\nvar square = document.getElementById(\"square\");\n\n// const Asteroid = require('./asteroid.js')\n\nclass Game {\n    constructor(layer3, ctx1, ctx2, ctx3, DIM_X, DIM_Y) {\n        this.i = 1;\n        // this.ctx = ctx;\n        this.layer3 = layer3;\n        this.ctx1 = ctx1;\n        this.ctx2 = ctx2;\n        this.ctx3 = ctx3;\n        this.state = 0;\n        this.altState = 0;\n        this.DIM_X = DIM_X;\n        this.DIM_Y = DIM_Y;\n        this.clickX = 0;\n        this.clickY = 0;\n        this.hoverX = 0;\n        this.hoverY = 0;\n        this.clicked = false;\n        this.play = this.play.bind(this);\n        this.draw = this.draw.bind(this);\n        this.ships = [];\n        this.tempSheep;\n        this.tempSheep2;\n        this.tempSheep3;\n        this.tempSheep4;\n        // this.sheepLeftToPlace = [1];\n        this.sheepLeftToPlace = [1, 2, 3, 4, 5, 6];\n        // this.sheepLeftToPlace = [1, 1, 1, 1, 1]\n        this.sheepPositions = [];\n        this.enemySheepPositions = [[0, 0], [2, 0], [4, 0]];\n        this.enemyFoundPositions = [];\n\n        this.firedPositions = [];\n        this.buttons = [];\n        this.enemyShips = [];\n        this.enemyButtons = [];\n        this.playerSheeps = [];\n        this.enemySheeps = [];\n        this.activeSheep;\n        this.activeTextString = \"\";\n        this.activeTextString2 = \"\";\n        this.activeTextString3 = \"\";\n        this.boardSize = 7;\n        this.draw();\n    }\n\n    // note this project uses febucci lerp functions found here:\n    // https://www.febucci.com/2018/08/easing-functions/\n\n    getCursorPosition(canvas, event) {\n        const rect = canvas.getBoundingClientRect()\n        const x = event.clientX - rect.left\n        const y = event.clientY - rect.top\n        this.clickX = x;\n        this.clickY = y;\n        this.clicked = true;\n        console.log(\"x: \" + x + \" y: \" + y)\n    }\n\n    getHoverPosition(canvas, event) {\n        const rect = canvas.getBoundingClientRect()\n        const x = event.clientX - rect.left\n        const y = event.clientY - rect.top\n        this.hoverX = x;\n        this.hoverY = y;\n        // console.log(\"x: \" + x + \" y: \" + y)\n    }\n    \n    // const canvas = document.querySelector('canvas')\n    \n\n    drawImageInCanvas(context, filepath, xPos, yPos, xSize, ySize) {\n        var img1 = new Image();\n        //drawing of the test image - img1\n        img1.onload = () => {\n            context.drawImage(img1, (xPos - xSize/2), (yPos - ySize/2), xSize, ySize);\n        };\n        img1.src = filepath;\n    }\n    // creating a custom game update loop.\n    play() {\n        // console.log(this.i);\n        if (this.state === 0){\n            if (this.altState === 0) {\n                this.altState = 1;\n\n                // add listener for clicks.\n                let that = this;\n                this.layer3.addEventListener('mousedown', function(e) {\n                    console.log(\"CLICK\")\n                    that.getCursorPosition(layer3, e)\n                })\n\n                this.layer3.addEventListener('mousemove', function(e) {\n                    // console.log(\"CLICK\")\n                    that.getHoverPosition(layer3, e)\n                })\n\n                // generate game assets\n                console.log(\"hello world\");\n\n                this.ctx1.fillStyle = 'green';\n                this.ctx1.fillRect(0, 0, 800, 600)\n                \n                // this.ctx2.font = (\"30px Arial\");\n                // this.ctx2.fillStyle = \"black\";\n                // this.ctx2.textAlign = \"center\";\n                // this.ctx2.fillText(\"Place Your Sheeps\", 400, 50);\n                this.activeTextString = \"Place Your Sheeps\"\n                this.activeTextString2 = \"\";\n                this.activeTextString3 = \"\";\n                \n                // generate game board\n                this.generateSquares(this.ctx3);\n                this.generateEnemySquares(this.ctx3);\n                this.spawnEnemySheep();\n\n                this.generateTempSheep(that.sheepLeftToPlace[0]);\n\n                // generate game images\n\n                // generate game ship objects\n\n                // game is in \"place your ships\" state\n\n                \n\n\n                console.log(this.altState);\n            } else if (this.altState === 1) {\n                // tracking clicks.\n                if (this.clicked){\n                    this.clicked = false;\n                    let that = this;\n\n                    this.buttons.forEach(function(button) {\n                        if (button.buttonCheck(that.clickX, that.clickY)) {\n                            that.activeSheep.placeSheep(button.buttonPos);\n                        }\n                    })\n                }\n\n                // tracking hover.\n                let that = this;\n\n                // call this w. activesheep hover function\n                this.buttons.forEach(function(button) {\n                    if (button.buttonType === \"ship\") {\n                        if (button.buttonCheck(that.hoverX, that.hoverY)) {\n                            that.activeSheep.hoverSheep(button.buttonPos);\n                        } \n                    }  \n                })\n            } else if (this.altState === 2) {\n                setTimeout(() => { this.altState = 3 }, 1000);\n                // this.altState = 3;\n                this.activeTextString = \"\";\n                this.activeTextString2 = \"\";\n                this.activeTextString3 = \"\"\n                this.queueMoveShips();\n            } else if (this.altState === 3) {\n                if (this.moveShips(\"down\")){\n                    this.altState = 4;\n                }\n            } else if (this.altState === 4){\n                this.activeTextString = \"Fire Your Cannon\";\n                this.activeTextString2 = \"\";\n                this.activeTextString3 = \"\";\n                \n                // fire.\n                if (this.clicked){\n                    this.clicked = false;\n                    let that = this;\n\n                    this.enemyButtons.forEach(function(button) {\n                        if (button.buttonCheck(that.clickX, that.clickY)) {\n                            if (button.buttonType === \"ship\") {\n                                if (!that.hasBeenFired(button.buttonPos)){\n                                    // firing upon square.\n                                    that.altState = 5;\n                                    button.fire();    // change status of ele to fired\n                                    that.firedPositions.push(button.buttonPos);    // add pos to firedpositions\n                                    if (that.checkIfFoundSheep(button.buttonPos)) { // if sheep is there add to foundsheep array\n                                        // if sheep is complete,\n                                        // reveal squares around sheep.\n                                        that.revealAroundPosition(button.buttonPos)\n                                    }    \n                                    if (that.playerWon()) {\n                                        that.state = 1;\n                                        that.altState = 0;\n                                        that.activeTextString = \"You Win!\";\n                                    } else {\n                                        that.altState = 5;\n                                    }\n                                }\n                            }\n                        }\n                    })\n                }\n\n                // tracking hover.\n                let that = this;\n                this.enemyButtons.forEach(function(button) {\n                    if (button.buttonType === \"ship\") {\n                        if (button.buttonCheck(that.hoverX, that.hoverY)) {\n                            button.hover();\n                        } else {\n                            button.blank();\n                        }   \n                    }  \n                })\n            } else if (this.altState === 5) {\n                setTimeout(() => { this.altState = 6 }, 1000);\n                // this.altState = 6;\n                this.activeTextString = \"\";\n                this.queueMoveShips();\n            } else if (this.altState === 6) {\n                if (this.moveShips(\"up\")){\n                    this.altState = 7;\n                }\n            } else if (this.altState === 7) {\n                // enemy makes move.\n\n\n                // when done, set altState = 2;\n                this.altState = 2;\n            }\n        } else if (this.state === 1){\n            if (this.altState === 0){\n                this.altState = 1;\n                // game over.\n            }\n        }\n        this.i += 1;\n        // run the callback loop.\n        requestAnimationFrame(this.play);\n    }\n\n    clearTempSheep() {\n        if (this.tempSheep !== undefined) {\n            delete this.tempSheep;\n        }\n        if (this.tempSheep2 !== undefined) {\n            delete this.tempSheep2;\n        }\n        if (this.tempSheep3 !== undefined) {\n            delete this.tempSheep3;\n        }\n        if (this.tempSheep4 !== undefined) {\n            delete this.tempSheep4;\n        }\n    }\n\n\n    playerWon() {\n        if (this.enemySheepPositions.length === this.enemyFoundPositions.length) {\n            return true;\n        }\n        return false;\n    }\n\n    checkIfHasSheep(pos) {\n        if (JSON.stringify(this.enemySheepPositions).includes(pos)) {\n            return true;\n        }\n        return false;\n    }\n\n    checkIfFoundSheep(pos) {\n        if (JSON.stringify(this.enemySheepPositions).includes(pos)) {\n            console.log(\"FOUND SHEEP!\")\n            this.enemyFoundPositions.push(pos);\n            return true;\n        }\n        return false;\n    }\n\n    revealAroundPosition(pos){\n        let x = pos[0];\n        let y = pos[1];\n        let positions = [];\n        for (let i = -1; i < 2; i++){\n            for (let j = -1; j < 2; j++){\n                let _x = x + i;\n                let _y = y + j;\n                let newPos = [_x, _y];\n                positions.push(newPos);\n            }\n        }\n        let that = this;\n        console.log(positions);\n        this.enemyButtons.forEach(function(button){\n            // console.log(positions);\n            if (JSON.stringify(positions).includes(button.buttonPos)){\n                console.log(\"firing.\");\n                button.fire();\n                if (!JSON.stringify(that.firedPositions).includes(button.buttonPos)){\n                    that.firedPositions.push(button.buttonPos);\n                }\n            }\n        })\n    }\n\n    queueMoveShips(){\n        // queueing move for each ship\n        this.ships.forEach(function(ship){\n            ship.queueMove();\n            ship.clearTime();\n        })\n        // queueing move for each enemy ship\n        this.enemyShips.forEach(function(ship){\n            ship.queueMove();\n            ship.clearTime();\n        })\n    }\n\n    moveShips(direction) {\n        let that = this;\n        that.done = true;\n        this.ships.forEach(function(ship){\n            if (!ship.moveComplete) {\n                if (direction === \"down\"){\n                    if (ship.currentTime === 0) {\n                        ship.currentTime = Date.now();\n                        ship.lastTime = Date.now();\n                    } else {\n                        ship.moveDown();\n                    }\n                    that.done = false;\n                } else if (direction === \"up\"){\n                    if (ship.currentTime === 0) {\n                        ship.currentTime = Date.now();\n                        ship.lastTime = Date.now();\n                    } else {\n                        ship.moveUp();\n                    }\n                    that.done = false;\n                }\n            }\n        })\n        // queueing move for each enemy ship\n        this.enemyShips.forEach(function(ship){\n            if (!ship.moveComplete) {\n                if (direction === \"down\"){\n                    if (ship.currentTime === 0) {\n                        ship.currentTime = Date.now();\n                        ship.lastTime = Date.now();\n                    } else {\n                        ship.moveDown();\n                    }\n                    that.done = false;\n                } else if (direction === \"up\") {\n                    if (ship.currentTime === 0) {\n                        ship.currentTime = Date.now();\n                        ship.lastTime = Date.now();\n                    } else {\n                        ship.moveUp();\n                    }\n                    that.done = false;\n                }\n            }\n        })\n        return that.done;\n    }\n\n    hasSheep(pos) {\n        if (this.sheepPositions.includes(pos)){\n            return true;\n        }\n        return false;\n    }\n\n    hasBeenFired(pos) {\n        if (JSON.stringify(this.firedPositions).includes(pos)){\n            return true;\n        }\n        return false;\n    }\n\n    validSpotToPlace(pos) {\n        // check if surrounding squares have sheep.\n        if (pos[0] < 0 || pos[0] > (this.boardSize - 1)) {\n            this.activeTextString2 = \"Invalid Position:\"  \n            this.activeTextString3 = \"Position was off board!\";\n            return false;\n        } else if (pos[1] < 0 || pos[1] > (this.boardSize - 1)) {\n            this.activeTextString2 = \"Invalid Position:\"  \n            this.activeTextString3 = \"Position was off board!\";\n            return false;\n        }\n        \n        let i = -1;\n        let j = -1;\n        for (i = -1; i < 2; i++){\n            for (j = -1; j < 2; j++) {\n                let x = pos[0] + i;\n                let y = pos[1] + j;\n                let _pos = [x, y];\n                // console.log(_pos)\n                // console.log(this.sheepPositions)\n                // console.log(this.sheepPositions.includes(_pos))\n                if (JSON.stringify(this.sheepPositions).includes(_pos)){\n                    this.activeTextString2 = \"Invalid Position:\"  \n                    this.activeTextString3 = \"Position too close to another sheep!\";\n                    return false;\n                }                \n            }\n        }\n        return true;\n    }\n\n    generateSquares(ctx) {\n        let size = this.boardSize;\n        for (let i = 0; i < size; i++) {\n            for (let j = 0; j < size; j++){\n                let xPos = 400 - ((Math.floor(size / 2)) * 50) + (i * 50);\n                let yPos = 200 + (j * 50);\n                let ship = new Ship(ctx, xPos, yPos, 50, 50, \"blank\", \"empty\");\n                this.ships.push(ship);\n                let x_left = xPos - 20;\n                let x_right = xPos + 20;\n                let y_top = yPos + 20;\n                let y_bot = yPos - 20;\n                let button = new Button(ship, x_left, x_right, y_top, y_bot, \"ship\", [i, j]);\n                this.buttons.push(button);\n            }\n        }\n    }\n\n    generateEnemySquares(ctx) {\n        let size = this.boardSize;\n        for (let i = 0; i < size; i++) {\n            for (let j = 0; j < size; j++){\n                let xPos = 400 - ((Math.floor(size / 2)) * 50) + (i * 50);\n                let yPos = 200 - 600 + (j * 50);\n                let ship = new Ship(ctx, xPos, yPos, 50, 50, \"blank\", \"empty\");\n                this.enemyShips.push(ship);\n                let x_left = xPos - 20;\n                let x_right = xPos + 20;\n                let y_top = yPos + 20 + 600;\n                let y_bot = yPos - 20 + 600;\n                let button = new Button(ship, x_left, x_right, y_top, y_bot, \"ship\", [i, j]);\n                this.enemyButtons.push(button);\n            }\n        }\n    }\n\n    generateTempSheep(id) {\n        let xMod = 250;\n        let yMod = -25;\n        if (id === 1){\n            let xPos = 400 + xMod;\n            let yPos = 125 + yMod;\n\n            this.tempSheep = new Ship(this.ctx3, xPos, yPos, 50, 50, \"head\", \"sheep\");\n            this.activeSheep = new Sheep(this, [[0, 0]]);\n        } else if (id === 2) {\n            let xPos = 375 + xMod;\n            let yPos = 125 + yMod;\n\n            this.tempSheep = new Ship(this.ctx3, xPos, yPos, 50, 50, \"head\", \"sheep\");\n            this.tempSheep2 = new Ship(this.ctx3, xPos + 50, yPos, 50, 50, \"body\", \"sheep\");\n            this.activeSheep = new Sheep(this, [[0, 0], [1, 0]]);\n        } else if (id === 3) {\n            let xPos = 350 + xMod;\n            let yPos = 125 + yMod;\n\n            this.tempSheep = new Ship(this.ctx3, xPos, yPos, 50, 50, \"head\", \"sheep\");\n            this.tempSheep2 = new Ship(this.ctx3, xPos + 50, yPos, 50, 50, \"body\", \"sheep\");\n            this.tempSheep3 = new Ship(this.ctx3, xPos + 100, yPos, 50, 50, \"body\", \"sheep\");\n            this.activeSheep = new Sheep(this, [[0, 0], [1, 0], [2, 0]]);\n        } else if (id === 4) {\n            let xPos = 325 + xMod;\n            let yPos = 125 + yMod;\n\n            this.tempSheep = new Ship(this.ctx3, xPos, yPos, 50, 50, \"head\", \"sheep\");\n            this.tempSheep2 = new Ship(this.ctx3, xPos + 50, yPos, 50, 50, \"body\", \"sheep\");\n            this.tempSheep3 = new Ship(this.ctx3, xPos + 100, yPos, 50, 50, \"body\", \"sheep\");\n            this.tempSheep4 = new Ship(this.ctx3, xPos + 150, yPos, 50, 50, \"body\", \"sheep\");\n            this.activeSheep = new Sheep(this, [[0, 0], [1, 0], [2, 0], [3, 0]]);\n        } else if (id === 5) {\n            let xPos = 375 + xMod;\n            let yPos = 100 + yMod;\n\n            this.tempSheep = new Ship(this.ctx3, xPos, yPos, 50, 50, \"head\", \"sheep\");\n            this.tempSheep2 = new Ship(this.ctx3, xPos + 50, yPos, 50, 50, \"body\", \"sheep\");\n            this.tempSheep3 = new Ship(this.ctx3, xPos + 50, yPos + 50, 50, 50, \"body\", \"sheep\");\n            this.activeSheep = new Sheep(this, [[0, 0], [1, 0], [1, 1]]);\n        } else if (id === 6) {\n            let xPos = 350 + xMod;\n            let yPos = 100 + yMod;\n\n            this.tempSheep = new Ship(this.ctx3, xPos, yPos, 50, 50, \"head\", \"sheep\");\n            this.tempSheep2 = new Ship(this.ctx3, xPos + 50, yPos, 50, 50, \"body\", \"sheep\");\n            this.tempSheep3 = new Ship(this.ctx3, xPos + 100, yPos, 50, 50, \"body\", \"sheep\");\n            this.tempSheep4 = new Ship(this.ctx3, xPos + 50, yPos + 50, 50, 50, \"body\", \"sheep\");\n            this.activeSheep = new Sheep(this, [[0, 0], [1, 0], [2, 0], [1, 1]] );\n        }\n    }\n\n    spawnEnemySheep() {\n        let that = this;\n        this.enemyButtons.forEach(function(button) {\n            if (that.checkIfHasSheep(button.buttonPos)){\n                button.place(\"sheep_hidden\", \"head\")\n            }\n        })\n    }\n\n    draw() {\n        this.ctx3.save();\n        this.ctx3.globalCompositeOperation = 'copy';\n        this.ctx3.strokeStyle = 'transparent';\n        this.ctx3.beginPath();\n        this.ctx3.lineTo(0, 0);\n        this.ctx3.stroke();\n        this.ctx3.restore();\n\n        // draw text.  if errors put on own context.\n        this.ctx3.font = (\"30px Arial\");\n        this.ctx3.fillStyle = \"black\";\n        this.ctx3.textAlign = \"center\";\n        this.ctx3.fillText(this.activeTextString, 400, 50);\n\n        this.ctx3.font = (\"16px Arial\");\n        this.ctx3.fillStyle = \"black\";\n        this.ctx3.textAlign = \"center\";\n        this.ctx3.fillText(this.activeTextString2, 400, 80);\n\n        this.ctx3.font = (\"16px Arial\");\n        this.ctx3.fillStyle = \"black\";\n        this.ctx3.textAlign = \"center\";\n        this.ctx3.fillText(this.activeTextString3, 400, 100);\n\n        this.ships.forEach(function(ship) {\n            ship.draw();\n        });\n\n        this.enemyShips.forEach(function(ship) {\n            ship.draw();\n        });\n\n        if (this.tempSheep !== undefined){\n            this.tempSheep.draw();\n        }\n        if (this.tempSheep2 !== undefined) {\n            this.tempSheep2.draw();\n        }\n        if (this.tempSheep3 !== undefined) {\n            this.tempSheep3.draw();\n        }\n        if (this.tempSheep4 !== undefined) {\n            this.tempSheep4.draw();\n        }\n\n\n        requestAnimationFrame(this.draw);\n    }\n}\n\nclass Sheep {\n    // this object will store each position making up\n    // a Sheep.\n    constructor(game, sheepShapes) {\n        this.sheepPartPositions = []\n        this.game = game;\n        this.size = this.sheepPartPositions.length;\n        this.sheepPartsFound = [];\n        this.sheepHeadPos;\n        this.sheepShapes = sheepShapes;\n    }\n\n    setSheepPartPositions(positions) {\n        this.sheepPartPositions = positions;\n    }\n\n    // sheepShape starts at 0,0.\n    // sheepshape options.\n    // [[0, 0]];\n    // [[0, 0], [1, 0]]                 |  [[0, 0], [0, 1]]\n    // [[0, 0], [1, 0], [2, 0]]         |  [[0, 0], [0, 1], [0, 2]]\n    // [[0, 0], [1, 0], [2, 0], [3, 0]] |  [[0, 0], [0, 1], [0, 2], [0, 3]]\n    // [[0, 0], [1, 0], [1, 1]]         |  [[1, 0], [1, 1], [0, 1]]         |  [[1, 1], [0, 1], [0, 0]          |  [0, 1], [0, 0], [1, 0]]\n    // [[0, 0], [1, 0], [2, 0], [1, 1]] |  [[0, 0], [0, 1], [0, 2], [1, 1]] |  [[1, 0] [0, 1] [1, 1] [2, 1]]    |  [[1, 0] [0, 1] [1, 1] [1, 2]]\n    hoverSheep(pos){\n        let hoverPositions = [];\n        let that = this;\n        this.sheepShapes.forEach(function(sheepShape) {\n            let _x = pos[0] + sheepShape[0];\n            let _y = pos[1] + sheepShape[1];\n            let _pos = [_x, _y];\n            hoverPositions.push(_pos);\n        })\n\n        this.game.buttons.forEach(function(button){\n            if (button.buttonType === \"ship\") {\n                if (JSON.stringify(hoverPositions).includes(button.buttonPos)){\n                    button.hover();\n                } else {\n                    button.blank();\n                }\n            }\n        })\n    }\n\n    placeSheep(pos){\n        let placePositions = [];\n        let that = this;\n        this.sheepShapes.forEach(function(sheepShape) {\n            let _x = pos[0] + sheepShape[0];\n            let _y = pos[1] + sheepShape[1];\n            let _pos = [_x, _y];\n            placePositions.push(_pos);\n        })\n\n        let checkValid = true;\n\n        placePositions.forEach(function(placePosition) {\n            if (!that.game.validSpotToPlace(placePosition)) {\n                checkValid = false;\n            }\n        })\n\n        if (checkValid){\n            this.game.buttons.forEach(function(button) {\n                if (button.buttonType === \"ship\") {\n                    if (JSON.stringify(placePositions).includes(button.buttonPos)) {\n                        if (button.buttonPos.toString() === placePositions[0].toString()) {\n                            button.placeSheepHead();\n                        } else {\n                            button.placeSheepBody();\n                        }\n                        that.game.sheepPositions.push(button.buttonPos);\n                    }\n                }\n            })\n\n            that.game.sheepLeftToPlace.shift();\n            that.game.clearTempSheep();\n            that.game.activeTextString2 = \"\";\n            that.game.activeTextString3 = \"\";\n\n            if (that.game.sheepLeftToPlace.length > 0) {\n                that.game.generateTempSheep(that.game.sheepLeftToPlace[0]);\n            } else {\n                that.game.altState = 2;\n            }\n        } else {\n            // that.game.activeTextString2 = \"invalid position\\nposition was off board\";\n            console.log(\"invalid position...\");\n        }\n    }\n\n\n    isSheepFound() {\n        if (this.sheepPartsFound.length === this.size) {\n            return true;\n        }\n        return false;\n    }\n\n    foundPart(pos){\n        // is this pos part of sheep?\n        if (JSON.stringify(this.sheepPartPositions).includes(pos)){\n            // did you find this part already?\n            if (!JSON.stringify(this.sheepPartsFound).includes(pos)){\n                // add part to sheepPartsFound\n                this.sheepPartsFound.push(pos);\n            }\n        }\n    }\n}\n\nclass Ship {\n    constructor(context, xPos, yPos, xSize, ySize, color, type) {\n        this.context = context;\n        this.xPos = xPos;\n        this.yPos = yPos;\n        this.xPosI = xPos;\n        this.yPosI = yPos;\n        // this.moveSpeed = 5;\n        // this.moveSpeed = 0.01;\n        this.timeSpeed = 0.01;\n        this.timeElapsed = 0;\n        this.currentTime;\n        this.lastTime;\n        this.lerpDuration = 3;\n        this.xSize = xSize;\n        this.ySize = ySize;\n        this.color = color;\n        this.type = type;\n        this.hoverState = \"blank\";\n        this.queueClear = false;\n        this.filepath = \"\";\n        this.draw = this.draw.bind(this)\n        this.draw();\n        this.moveComplete = true;\n        this.doNotHoverTypes = [\"sheep\", \"fired\"]\n    }\n\n    // type choices:\n    //* \"empty\"\n    //* \"sheep\"\n    //* \"sheep_hidden\"\n    //* \"fired\"\n\n    // color choices:\n    //* \"head\"\n    //* \"body\"\n    //* \"empty\"\n\n    //* hoverState choices:\n    //* \"blank\"\n    //* \"hover\"\n\n    queueMove() {\n        this.moveComplete = false;\n    }\n\n    lerp(start_value, end_value, pct) {\n        return (start_value + (end_value - start_value) * pct);\n    }\n\n    easeIn(t) {\n        return t * t;\n    }\n\n    easeOut(t) {\n        return this.flip(this.square(this.flip(t)));\n    }\n\n    easeInOut(t) {\n        return this.lerp(this.easeIn(t), this.easeOut(t), t);\n    }\n\n    flip(t) {\n        return 1 - t;\n    }\n\n    square(t) {\n        return t * t;\n    }\n\n    current_pct(start_value, end_value, current_value) {\n        // with each of these, what's the current % complete?\n        // answer:  (z - x) / (y - x)\n        // answerv2:  (cur - start) / (end - start);\n        return (current_value - start_value) / (end_value - start_value);\n    }\n\n    clearTime() {\n        this.timeElapsed = 0;\n        this.currentTime = 0;\n        this.lastTime = 0;\n    }\n\n    moveDown() {\n        // note that draw methods atm are based on xPOS.\n        let start_value = this.yPosI;\n        let end_value = this.yPosI + 600;\n        let current_value = this.yPos;\n\n        this.currentTime = Date.now();\n        this.timeElapsed += ((this.currentTime - this.lastTime) / 1000);\n        this.lastTime = Date.now();\n\n        let newY = this.lerp(start_value, end_value, this.easeInOut(this.timeElapsed / this.lerpDuration));\n\n        if (this.timeElapsed < this.lerpDuration) {\n            this.yPos = newY;\n            this.moveComplete = false;\n        } else {\n            this.yPos = end_value;\n            this.moveComplete = true;\n        }\n        \n    }\n\n    moveUp() {\n        let start_value = this.yPosI + 600;\n        let end_value = this.yPosI;\n        let current_value = this.yPos;\n        // let current_percent = this.current_pct(start_value, end_value, current_value);\n\n        // let percent = current_percent + this.moveSpeed;\n\n        this.currentTime = Date.now();\n        this.timeElapsed += ((this.currentTime - this.lastTime) / 1000);\n        this.lastTime = Date.now();\n\n        let newY = this.lerp(start_value, end_value, this.easeInOut(this.timeElapsed / this.lerpDuration));\n\n        if (this.timeElapsed < this.lerpDuration) {\n            this.yPos = newY;\n            this.moveComplete = false;\n        } else {\n            this.yPos = end_value;\n            this.moveComplete = true;\n        }\n    }\n\n    setColor(newColor) {\n        this.color = newColor;\n    }\n\n    setType(newType){\n        this.type = newType;\n    }\n\n    setHoverState(newHoverState){\n        this.hoverState = newHoverState;\n    }\n\n    draw() {\n        let filepath = \"\"\n        if (this.type === \"sheep\"){\n            if (this.color === \"head\") {\n                filepath = 'assets/sheep_head.png'\n            } else if (this.color === \"body\") {\n                filepath = 'assets/sheep_body.png'\n            }\n        } else if (this.type === \"fired\") {\n            if (this.color === \"head\") {\n                filepath = 'assets/sheep_found_head.png'\n            } else if (this.color === \"body\") {\n                filepath = 'assets/sheep_found_body.png'\n            } else {\n                filepath = 'assets/square_empty.png'\n            }\n        } else {\n            if (this.hoverState === \"blank\") {\n                filepath = 'assets/square_outline.png'\n            } else if (this.hoverState === \"hover\") {\n                filepath = 'assets/square_outline_transparent.png'\n            }\n\n            // if (this.color === \"blank\"){\n            //     filepath = 'assets/square_outline.png'\n            // } else if (this.color === \"hover\"){\n            //     filepath = 'assets/square_outline_transparent.png'\n            // }\n        }\n\n        if (this.filepath !== filepath){\n            this.setImageInCanvas(this.context, filepath, this.xPos, this.yPos, this.xSize, this.ySize)\n        }\n        this.context.drawImage(this.image, (this.xPos - this.xSize/2), (this.yPos - this.ySize/2), this.xSize, this.ySize)\n\n    }\n\n    setImageInCanvas(context, filepath, xPos, yPos, xSize, ySize) {\n        var img1 = new Image();\n        //drawing of the test image - img1\n        // img1.onload = () => {\n        //     context.drawImage(img1, (xPos - xSize/2), (yPos - ySize/2), xSize, ySize);\n        // };\n        img1.src = filepath;\n        this.image = img1;\n    }\n}\n\nclass Button {\n    constructor(element, xLeft, xRight, yTop, yBot, buttonType, buttonPos) {\n        this.element = element;\n        this.xLeft = xLeft;\n        this.xRight = xRight;\n        this.yTop = yTop;\n        this.yBot = yBot;\n        this.buttonType = buttonType;\n        this.buttonPos = buttonPos;\n    }\n\n    // checks if you pressed the button.\n    buttonCheck(x_value, y_value) {\n        if (x_value > this.xLeft && x_value < this.xRight) {\n            if (y_value > this.yBot && y_value < this.yTop) {\n                return true\n            }\n        }\n\n        return false\n    }\n\n    place(type, color) {\n        this.element.setType(type);\n        this.element.setColor(color);\n    }\n\n    placeSheepHead() {\n        this.element.setType(\"sheep\");\n        this.element.setColor(\"head\");\n    }\n\n    placeSheepBody() {\n        this.element.setType(\"sheep\");\n        this.element.setColor(\"body\");\n    }\n\n    fire(){\n        this.element.setType(\"fired\");\n        // if (this.element.type === \"sheep\" || this.element.type === \"sheep_hidden\"){\n\n        // }\n    }\n\n    hover() {\n        // if (!this.element.doNotHoverTypes.includes(this.element.type)) {\n        //     this.element.setColor(\"hover\");\n        // }\n\n        if (!this.element.doNotHoverTypes.includes(this.element.type)) {\n            this.element.setHoverState(\"hover\");\n        }\n        \n    }\n\n    blank() {\n        if (!this.element.doNotHoverTypes.includes(this.element.type)){\n            this.element.setHoverState(\"blank\");\n        }\n    }\n}\n\n\nmodule.exports = Game;\n\n//# sourceURL=webpack://battlesheep/./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("console.log(\"webpack confirmed working\")\n\nconst Game = __webpack_require__(/*! ./game.js */ \"./src/game.js\");\n// const GameView = require('./game-view.js');\n// const Asteroid = require('./asteroid.js');\n// const MovingObject = require('./moving-object.js');\n\n// let game = new Game() \ndocument.addEventListener('DOMContentLoaded', () => {\n    // grab canvas\n\n    // gonna try to do this with layers...\n    const layer1 = document.getElementById(\"layer1\");\n    const layer2 = document.getElementById(\"layer2\");\n    const layer3 = document.getElementById(\"layer3\");\n    layer1.width = 800;\n    layer1.height = 600;\n    layer2.width = 800;\n    layer2.height = 600;\n    layer3.width = 800;\n    layer3.height = 600;\n    \n    const ctx1 = layer1.getContext('2d');\n    const ctx2 = layer2.getContext('2d');\n    const ctx3 = layer3.getContext('2d');\n    // ctx.fillStyle = 'green';\n    // ctx.fillRect(0, 0, canvas.width, canvas.height)\n    const game = new Game(layer3, ctx1, ctx2, ctx3, layer1.width, layer1.height);\n    game.play();\n    // const obj = new MovingObject([100, 100], [5,5], 20, \"blue\");\n    // const gameview = new GameView(game, ctx);\n    // gameview.start();\n    // obj.draw(ctx);\n\n    // add code to test on window\n    // window.Game = Game;\n    // window.Asteroid = Asteroid;\n    // window.MovingObject = MovingObject;\n})\n\nconsole.log(\"boop\");\n\n//# sourceURL=webpack://battlesheep/./src/index.js?");

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