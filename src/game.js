console.log("im the game")

var square = document.getElementById("square");

// const Asteroid = require('./asteroid.js')

class Game {
    constructor(layer3, ctx1, ctx2, ctx3, DIM_X, DIM_Y) {
        this.i = 1;
        // this.ctx = ctx;
        this.layer3 = layer3;
        this.ctx1 = ctx1;
        this.ctx2 = ctx2;
        this.ctx3 = ctx3;
        this.state = 0;
        this.altState = 0;
        this.DIM_X = DIM_X;
        this.DIM_Y = DIM_Y;
        this.clickX = 0;
        this.clickY = 0;
        this.hoverX = 0;
        this.hoverY = 0;
        this.clicked = false;
        this.play = this.play.bind(this);
        this.draw = this.draw.bind(this);
        this.ships = [];
        this.tempSheep;
        this.tempSheep2;
        this.tempSheep3;
        this.tempSheep4;
        // this.sheepLeftToPlace = [1];
        this.sheepLeftToPlace = [1, 2, 3, 4, 5, 6];
        // this.sheepLeftToPlace = [1, 1, 1, 1, 1]
        this.sheepPositions = [];
        this.enemySheepPositions = [[0, 0], [2, 0], [4, 0]];
        this.enemyFoundPositions = [];

        this.firedPositions = [];
        this.buttons = [];
        this.enemyShips = [];
        this.enemyButtons = [];
        this.playerSheeps = [];
        this.enemySheeps = [];
        this.activeSheep;
        this.activeTextString = "";
        this.activeTextString2 = "";
        this.activeTextString3 = "";
        this.boardSize = 7;
        this.draw();
    }

    // note this project uses febucci lerp functions found here:
    // https://www.febucci.com/2018/08/easing-functions/

    getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        this.clickX = x;
        this.clickY = y;
        this.clicked = true;
        console.log("x: " + x + " y: " + y)
    }

    getHoverPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        this.hoverX = x;
        this.hoverY = y;
        // console.log("x: " + x + " y: " + y)
    }
    
    // const canvas = document.querySelector('canvas')
    

    drawImageInCanvas(context, filepath, xPos, yPos, xSize, ySize) {
        var img1 = new Image();
        //drawing of the test image - img1
        img1.onload = () => {
            context.drawImage(img1, (xPos - xSize/2), (yPos - ySize/2), xSize, ySize);
        };
        img1.src = filepath;
    }
    // creating a custom game update loop.
    play() {
        // console.log(this.i);
        if (this.state === 0){
            if (this.altState === 0) {
                this.altState = 1;

                // add listener for clicks.
                let that = this;
                this.layer3.addEventListener('mousedown', function(e) {
                    console.log("CLICK")
                    that.getCursorPosition(layer3, e)
                })

                this.layer3.addEventListener('mousemove', function(e) {
                    // console.log("CLICK")
                    that.getHoverPosition(layer3, e)
                })

                // generate game assets
                console.log("hello world");

                this.ctx1.fillStyle = 'green';
                this.ctx1.fillRect(0, 0, 800, 600)
                
                // this.ctx2.font = ("30px Arial");
                // this.ctx2.fillStyle = "black";
                // this.ctx2.textAlign = "center";
                // this.ctx2.fillText("Place Your Sheeps", 400, 50);
                this.activeTextString = "Place Your Sheeps"
                this.activeTextString2 = "";
                this.activeTextString3 = "";
                
                // generate game board
                this.generateSquares(this.ctx3);
                this.generateEnemySquares(this.ctx3);
                this.spawnEnemySheep();

                this.generateTempSheep(that.sheepLeftToPlace[0]);

                // generate game images

                // generate game ship objects

                // game is in "place your ships" state

                


                console.log(this.altState);
            } else if (this.altState === 1) {
                // tracking clicks.
                if (this.clicked){
                    this.clicked = false;
                    let that = this;

                    this.buttons.forEach(function(button) {
                        if (button.buttonCheck(that.clickX, that.clickY)) {
                            that.activeSheep.placeSheep(button.buttonPos);
                        }
                    })
                }

                // tracking hover.
                let that = this;

                // call this w. activesheep hover function
                this.buttons.forEach(function(button) {
                    if (button.buttonType === "ship") {
                        if (button.buttonCheck(that.hoverX, that.hoverY)) {
                            that.activeSheep.hoverSheep(button.buttonPos);
                        } 
                    }  
                })
            } else if (this.altState === 2) {
                setTimeout(() => { this.altState = 3 }, 1000);
                // this.altState = 3;
                this.activeTextString = "";
                this.activeTextString2 = "";
                this.activeTextString3 = ""
                this.queueMoveShips();
            } else if (this.altState === 3) {
                if (this.moveShips("down")){
                    this.altState = 4;
                }
            } else if (this.altState === 4){
                this.activeTextString = "Fire Your Cannon";
                this.activeTextString2 = "";
                this.activeTextString3 = "";
                
                // fire.
                if (this.clicked){
                    this.clicked = false;
                    let that = this;

                    this.enemyButtons.forEach(function(button) {
                        if (button.buttonCheck(that.clickX, that.clickY)) {
                            if (button.buttonType === "ship") {
                                if (!that.hasBeenFired(button.buttonPos)){
                                    // firing upon square.
                                    that.altState = 5;
                                    button.fire();    // change status of ele to fired
                                    that.firedPositions.push(button.buttonPos);    // add pos to firedpositions
                                    if (that.checkIfFoundSheep(button.buttonPos)) { // if sheep is there add to foundsheep array
                                        // if sheep is complete,
                                        // reveal squares around sheep.
                                        that.revealAroundPosition(button.buttonPos)
                                    }    
                                    if (that.playerWon()) {
                                        that.state = 1;
                                        that.altState = 0;
                                        that.activeTextString = "You Win!";
                                    } else {
                                        that.altState = 5;
                                    }
                                }
                            }
                        }
                    })
                }

                // tracking hover.
                let that = this;
                this.enemyButtons.forEach(function(button) {
                    if (button.buttonType === "ship") {
                        if (button.buttonCheck(that.hoverX, that.hoverY)) {
                            button.hover();
                        } else {
                            button.blank();
                        }   
                    }  
                })
            } else if (this.altState === 5) {
                setTimeout(() => { this.altState = 6 }, 1000);
                // this.altState = 6;
                this.activeTextString = "";
                this.queueMoveShips();
            } else if (this.altState === 6) {
                if (this.moveShips("up")){
                    this.altState = 7;
                }
            } else if (this.altState === 7) {
                // enemy makes move.


                // when done, set altState = 2;
                this.altState = 2;
            }
        } else if (this.state === 1){
            if (this.altState === 0){
                this.altState = 1;
                // game over.
            }
        }
        this.i += 1;
        // run the callback loop.
        requestAnimationFrame(this.play);
    }

    clearTempSheep() {
        if (this.tempSheep !== undefined) {
            delete this.tempSheep;
        }
        if (this.tempSheep2 !== undefined) {
            delete this.tempSheep2;
        }
        if (this.tempSheep3 !== undefined) {
            delete this.tempSheep3;
        }
        if (this.tempSheep4 !== undefined) {
            delete this.tempSheep4;
        }
    }


    playerWon() {
        if (this.enemySheepPositions.length === this.enemyFoundPositions.length) {
            return true;
        }
        return false;
    }

    checkIfHasSheep(pos) {
        if (JSON.stringify(this.enemySheepPositions).includes(pos)) {
            return true;
        }
        return false;
    }

    checkIfFoundSheep(pos) {
        if (JSON.stringify(this.enemySheepPositions).includes(pos)) {
            console.log("FOUND SHEEP!")
            this.enemyFoundPositions.push(pos);
            return true;
        }
        return false;
    }

    revealAroundPosition(pos){
        let x = pos[0];
        let y = pos[1];
        let positions = [];
        for (let i = -1; i < 2; i++){
            for (let j = -1; j < 2; j++){
                let _x = x + i;
                let _y = y + j;
                let newPos = [_x, _y];
                positions.push(newPos);
            }
        }
        let that = this;
        console.log(positions);
        this.enemyButtons.forEach(function(button){
            // console.log(positions);
            if (JSON.stringify(positions).includes(button.buttonPos)){
                console.log("firing.");
                button.fire();
                if (!JSON.stringify(that.firedPositions).includes(button.buttonPos)){
                    that.firedPositions.push(button.buttonPos);
                }
            }
        })
    }

    queueMoveShips(){
        // queueing move for each ship
        this.ships.forEach(function(ship){
            ship.queueMove();
            ship.clearTime();
        })
        // queueing move for each enemy ship
        this.enemyShips.forEach(function(ship){
            ship.queueMove();
            ship.clearTime();
        })
    }

    moveShips(direction) {
        let that = this;
        that.done = true;
        this.ships.forEach(function(ship){
            if (!ship.moveComplete) {
                if (direction === "down"){
                    if (ship.currentTime === 0) {
                        ship.currentTime = Date.now();
                        ship.lastTime = Date.now();
                    } else {
                        ship.moveDown();
                    }
                    that.done = false;
                } else if (direction === "up"){
                    if (ship.currentTime === 0) {
                        ship.currentTime = Date.now();
                        ship.lastTime = Date.now();
                    } else {
                        ship.moveUp();
                    }
                    that.done = false;
                }
            }
        })
        // queueing move for each enemy ship
        this.enemyShips.forEach(function(ship){
            if (!ship.moveComplete) {
                if (direction === "down"){
                    if (ship.currentTime === 0) {
                        ship.currentTime = Date.now();
                        ship.lastTime = Date.now();
                    } else {
                        ship.moveDown();
                    }
                    that.done = false;
                } else if (direction === "up") {
                    if (ship.currentTime === 0) {
                        ship.currentTime = Date.now();
                        ship.lastTime = Date.now();
                    } else {
                        ship.moveUp();
                    }
                    that.done = false;
                }
            }
        })
        return that.done;
    }

    hasSheep(pos) {
        if (this.sheepPositions.includes(pos)){
            return true;
        }
        return false;
    }

    hasBeenFired(pos) {
        if (JSON.stringify(this.firedPositions).includes(pos)){
            return true;
        }
        return false;
    }

    validSpotToPlace(pos) {
        // check if surrounding squares have sheep.
        if (pos[0] < 0 || pos[0] > (this.boardSize - 1)) {
            this.activeTextString2 = "Invalid Position:"  
            this.activeTextString3 = "Position was off board!";
            return false;
        } else if (pos[1] < 0 || pos[1] > (this.boardSize - 1)) {
            this.activeTextString2 = "Invalid Position:"  
            this.activeTextString3 = "Position was off board!";
            return false;
        }
        
        let i = -1;
        let j = -1;
        for (i = -1; i < 2; i++){
            for (j = -1; j < 2; j++) {
                let x = pos[0] + i;
                let y = pos[1] + j;
                let _pos = [x, y];
                // console.log(_pos)
                // console.log(this.sheepPositions)
                // console.log(this.sheepPositions.includes(_pos))
                if (JSON.stringify(this.sheepPositions).includes(_pos)){
                    this.activeTextString2 = "Invalid Position:"  
                    this.activeTextString3 = "Position too close to another sheep!";
                    return false;
                }                
            }
        }
        return true;
    }

    generateSquares(ctx) {
        let size = this.boardSize;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++){
                let xPos = 400 - ((Math.floor(size / 2)) * 50) + (i * 50);
                let yPos = 200 + (j * 50);
                let ship = new Ship(ctx, xPos, yPos, 50, 50, "blank", "empty");
                this.ships.push(ship);
                let x_left = xPos - 20;
                let x_right = xPos + 20;
                let y_top = yPos + 20;
                let y_bot = yPos - 20;
                let button = new Button(ship, x_left, x_right, y_top, y_bot, "ship", [i, j]);
                this.buttons.push(button);
            }
        }
    }

    generateEnemySquares(ctx) {
        let size = this.boardSize;
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++){
                let xPos = 400 - ((Math.floor(size / 2)) * 50) + (i * 50);
                let yPos = 200 - 600 + (j * 50);
                let ship = new Ship(ctx, xPos, yPos, 50, 50, "blank", "empty");
                this.enemyShips.push(ship);
                let x_left = xPos - 20;
                let x_right = xPos + 20;
                let y_top = yPos + 20 + 600;
                let y_bot = yPos - 20 + 600;
                let button = new Button(ship, x_left, x_right, y_top, y_bot, "ship", [i, j]);
                this.enemyButtons.push(button);
            }
        }
    }

    generateTempSheep(id) {
        let xMod = 250;
        let yMod = -25;
        if (id === 1){
            let xPos = 400 + xMod;
            let yPos = 125 + yMod;

            this.tempSheep = new Ship(this.ctx3, xPos, yPos, 50, 50, "head", "sheep");
            this.activeSheep = new Sheep(this, [[0, 0]]);
        } else if (id === 2) {
            let xPos = 375 + xMod;
            let yPos = 125 + yMod;

            this.tempSheep = new Ship(this.ctx3, xPos, yPos, 50, 50, "head", "sheep");
            this.tempSheep2 = new Ship(this.ctx3, xPos + 50, yPos, 50, 50, "body", "sheep");
            this.activeSheep = new Sheep(this, [[0, 0], [1, 0]]);
        } else if (id === 3) {
            let xPos = 350 + xMod;
            let yPos = 125 + yMod;

            this.tempSheep = new Ship(this.ctx3, xPos, yPos, 50, 50, "head", "sheep");
            this.tempSheep2 = new Ship(this.ctx3, xPos + 50, yPos, 50, 50, "body", "sheep");
            this.tempSheep3 = new Ship(this.ctx3, xPos + 100, yPos, 50, 50, "body", "sheep");
            this.activeSheep = new Sheep(this, [[0, 0], [1, 0], [2, 0]]);
        } else if (id === 4) {
            let xPos = 325 + xMod;
            let yPos = 125 + yMod;

            this.tempSheep = new Ship(this.ctx3, xPos, yPos, 50, 50, "head", "sheep");
            this.tempSheep2 = new Ship(this.ctx3, xPos + 50, yPos, 50, 50, "body", "sheep");
            this.tempSheep3 = new Ship(this.ctx3, xPos + 100, yPos, 50, 50, "body", "sheep");
            this.tempSheep4 = new Ship(this.ctx3, xPos + 150, yPos, 50, 50, "body", "sheep");
            this.activeSheep = new Sheep(this, [[0, 0], [1, 0], [2, 0], [3, 0]]);
        } else if (id === 5) {
            let xPos = 375 + xMod;
            let yPos = 100 + yMod;

            this.tempSheep = new Ship(this.ctx3, xPos, yPos, 50, 50, "head", "sheep");
            this.tempSheep2 = new Ship(this.ctx3, xPos + 50, yPos, 50, 50, "body", "sheep");
            this.tempSheep3 = new Ship(this.ctx3, xPos + 50, yPos + 50, 50, 50, "body", "sheep");
            this.activeSheep = new Sheep(this, [[0, 0], [1, 0], [1, 1]]);
        } else if (id === 6) {
            let xPos = 350 + xMod;
            let yPos = 100 + yMod;

            this.tempSheep = new Ship(this.ctx3, xPos, yPos, 50, 50, "head", "sheep");
            this.tempSheep2 = new Ship(this.ctx3, xPos + 50, yPos, 50, 50, "body", "sheep");
            this.tempSheep3 = new Ship(this.ctx3, xPos + 100, yPos, 50, 50, "body", "sheep");
            this.tempSheep4 = new Ship(this.ctx3, xPos + 50, yPos + 50, 50, 50, "body", "sheep");
            this.activeSheep = new Sheep(this, [[0, 0], [1, 0], [2, 0], [1, 1]] );
        }
    }

    spawnEnemySheep() {
        let that = this;
        this.enemyButtons.forEach(function(button) {
            if (that.checkIfHasSheep(button.buttonPos)){
                button.place("sheep_hidden", "head")
            }
        })
    }

    draw() {
        this.ctx3.save();
        this.ctx3.globalCompositeOperation = 'copy';
        this.ctx3.strokeStyle = 'transparent';
        this.ctx3.beginPath();
        this.ctx3.lineTo(0, 0);
        this.ctx3.stroke();
        this.ctx3.restore();

        // draw text.  if errors put on own context.
        this.ctx3.font = ("30px Arial");
        this.ctx3.fillStyle = "black";
        this.ctx3.textAlign = "center";
        this.ctx3.fillText(this.activeTextString, 400, 50);

        this.ctx3.font = ("16px Arial");
        this.ctx3.fillStyle = "black";
        this.ctx3.textAlign = "center";
        this.ctx3.fillText(this.activeTextString2, 400, 80);

        this.ctx3.font = ("16px Arial");
        this.ctx3.fillStyle = "black";
        this.ctx3.textAlign = "center";
        this.ctx3.fillText(this.activeTextString3, 400, 100);

        this.ships.forEach(function(ship) {
            ship.draw();
        });

        this.enemyShips.forEach(function(ship) {
            ship.draw();
        });

        if (this.tempSheep !== undefined){
            this.tempSheep.draw();
        }
        if (this.tempSheep2 !== undefined) {
            this.tempSheep2.draw();
        }
        if (this.tempSheep3 !== undefined) {
            this.tempSheep3.draw();
        }
        if (this.tempSheep4 !== undefined) {
            this.tempSheep4.draw();
        }


        requestAnimationFrame(this.draw);
    }
}

class Sheep {
    // this object will store each position making up
    // a Sheep.
    constructor(game, sheepShapes) {
        this.sheepPartPositions = []
        this.game = game;
        this.size = this.sheepPartPositions.length;
        this.sheepPartsFound = [];
        this.sheepHeadPos;
        this.sheepShapes = sheepShapes;
    }

    setSheepPartPositions(positions) {
        this.sheepPartPositions = positions;
    }

    // sheepShape starts at 0,0.
    // sheepshape options.
    // [[0, 0]];
    // [[0, 0], [1, 0]]                 |  [[0, 0], [0, 1]]
    // [[0, 0], [1, 0], [2, 0]]         |  [[0, 0], [0, 1], [0, 2]]
    // [[0, 0], [1, 0], [2, 0], [3, 0]] |  [[0, 0], [0, 1], [0, 2], [0, 3]]
    // [[0, 0], [1, 0], [1, 1]]         |  [[1, 0], [1, 1], [0, 1]]         |  [[1, 1], [0, 1], [0, 0]          |  [0, 1], [0, 0], [1, 0]]
    // [[0, 0], [1, 0], [2, 0], [1, 1]] |  [[0, 0], [0, 1], [0, 2], [1, 1]] |  [[1, 0] [0, 1] [1, 1] [2, 1]]    |  [[1, 0] [0, 1] [1, 1] [1, 2]]
    hoverSheep(pos){
        let hoverPositions = [];
        let that = this;
        this.sheepShapes.forEach(function(sheepShape) {
            let _x = pos[0] + sheepShape[0];
            let _y = pos[1] + sheepShape[1];
            let _pos = [_x, _y];
            hoverPositions.push(_pos);
        })

        this.game.buttons.forEach(function(button){
            if (button.buttonType === "ship") {
                if (JSON.stringify(hoverPositions).includes(button.buttonPos)){
                    button.hover();
                } else {
                    button.blank();
                }
            }
        })
    }

    placeSheep(pos){
        let placePositions = [];
        let that = this;
        this.sheepShapes.forEach(function(sheepShape) {
            let _x = pos[0] + sheepShape[0];
            let _y = pos[1] + sheepShape[1];
            let _pos = [_x, _y];
            placePositions.push(_pos);
        })

        let checkValid = true;

        placePositions.forEach(function(placePosition) {
            if (!that.game.validSpotToPlace(placePosition)) {
                checkValid = false;
            }
        })

        if (checkValid){
            this.game.buttons.forEach(function(button) {
                if (button.buttonType === "ship") {
                    if (JSON.stringify(placePositions).includes(button.buttonPos)) {
                        if (button.buttonPos.toString() === placePositions[0].toString()) {
                            button.placeSheepHead();
                        } else {
                            button.placeSheepBody();
                        }
                        that.game.sheepPositions.push(button.buttonPos);
                    }
                }
            })

            that.game.sheepLeftToPlace.shift();
            that.game.clearTempSheep();
            that.game.activeTextString2 = "";
            that.game.activeTextString3 = "";

            if (that.game.sheepLeftToPlace.length > 0) {
                that.game.generateTempSheep(that.game.sheepLeftToPlace[0]);
            } else {
                that.game.altState = 2;
            }
        } else {
            // that.game.activeTextString2 = "invalid position\nposition was off board";
            console.log("invalid position...");
        }
    }


    isSheepFound() {
        if (this.sheepPartsFound.length === this.size) {
            return true;
        }
        return false;
    }

    foundPart(pos){
        // is this pos part of sheep?
        if (JSON.stringify(this.sheepPartPositions).includes(pos)){
            // did you find this part already?
            if (!JSON.stringify(this.sheepPartsFound).includes(pos)){
                // add part to sheepPartsFound
                this.sheepPartsFound.push(pos);
            }
        }
    }
}

class Ship {
    constructor(context, xPos, yPos, xSize, ySize, color, type) {
        this.context = context;
        this.xPos = xPos;
        this.yPos = yPos;
        this.xPosI = xPos;
        this.yPosI = yPos;
        // this.moveSpeed = 5;
        // this.moveSpeed = 0.01;
        this.timeSpeed = 0.01;
        this.timeElapsed = 0;
        this.currentTime;
        this.lastTime;
        this.lerpDuration = 3;
        this.xSize = xSize;
        this.ySize = ySize;
        this.color = color;
        this.type = type;
        this.hoverState = "blank";
        this.queueClear = false;
        this.filepath = "";
        this.draw = this.draw.bind(this)
        this.draw();
        this.moveComplete = true;
        this.doNotHoverTypes = ["sheep", "fired"]
    }

    // type choices:
    //* "empty"
    //* "sheep"
    //* "sheep_hidden"
    //* "fired"

    // color choices:
    //* "head"
    //* "body"
    //* "empty"

    //* hoverState choices:
    //* "blank"
    //* "hover"

    queueMove() {
        this.moveComplete = false;
    }

    lerp(start_value, end_value, pct) {
        return (start_value + (end_value - start_value) * pct);
    }

    easeIn(t) {
        return t * t;
    }

    easeOut(t) {
        return this.flip(this.square(this.flip(t)));
    }

    easeInOut(t) {
        return this.lerp(this.easeIn(t), this.easeOut(t), t);
    }

    flip(t) {
        return 1 - t;
    }

    square(t) {
        return t * t;
    }

    current_pct(start_value, end_value, current_value) {
        // with each of these, what's the current % complete?
        // answer:  (z - x) / (y - x)
        // answerv2:  (cur - start) / (end - start);
        return (current_value - start_value) / (end_value - start_value);
    }

    clearTime() {
        this.timeElapsed = 0;
        this.currentTime = 0;
        this.lastTime = 0;
    }

    moveDown() {
        // note that draw methods atm are based on xPOS.
        let start_value = this.yPosI;
        let end_value = this.yPosI + 600;
        let current_value = this.yPos;

        this.currentTime = Date.now();
        this.timeElapsed += ((this.currentTime - this.lastTime) / 1000);
        this.lastTime = Date.now();

        let newY = this.lerp(start_value, end_value, this.easeInOut(this.timeElapsed / this.lerpDuration));

        if (this.timeElapsed < this.lerpDuration) {
            this.yPos = newY;
            this.moveComplete = false;
        } else {
            this.yPos = end_value;
            this.moveComplete = true;
        }
        
    }

    moveUp() {
        let start_value = this.yPosI + 600;
        let end_value = this.yPosI;
        let current_value = this.yPos;
        // let current_percent = this.current_pct(start_value, end_value, current_value);

        // let percent = current_percent + this.moveSpeed;

        this.currentTime = Date.now();
        this.timeElapsed += ((this.currentTime - this.lastTime) / 1000);
        this.lastTime = Date.now();

        let newY = this.lerp(start_value, end_value, this.easeInOut(this.timeElapsed / this.lerpDuration));

        if (this.timeElapsed < this.lerpDuration) {
            this.yPos = newY;
            this.moveComplete = false;
        } else {
            this.yPos = end_value;
            this.moveComplete = true;
        }
    }

    setColor(newColor) {
        this.color = newColor;
    }

    setType(newType){
        this.type = newType;
    }

    setHoverState(newHoverState){
        this.hoverState = newHoverState;
    }

    draw() {
        let filepath = ""
        if (this.type === "sheep"){
            if (this.color === "head") {
                filepath = 'assets/sheep_head.png'
            } else if (this.color === "body") {
                filepath = 'assets/sheep_body.png'
            }
        } else if (this.type === "fired") {
            if (this.color === "head") {
                filepath = 'assets/sheep_found_head.png'
            } else if (this.color === "body") {
                filepath = 'assets/sheep_found_body.png'
            } else {
                filepath = 'assets/square_empty.png'
            }
        } else {
            if (this.hoverState === "blank") {
                filepath = 'assets/square_outline.png'
            } else if (this.hoverState === "hover") {
                filepath = 'assets/square_outline_transparent.png'
            }

            // if (this.color === "blank"){
            //     filepath = 'assets/square_outline.png'
            // } else if (this.color === "hover"){
            //     filepath = 'assets/square_outline_transparent.png'
            // }
        }

        if (this.filepath !== filepath){
            this.setImageInCanvas(this.context, filepath, this.xPos, this.yPos, this.xSize, this.ySize)
        }
        this.context.drawImage(this.image, (this.xPos - this.xSize/2), (this.yPos - this.ySize/2), this.xSize, this.ySize)

    }

    setImageInCanvas(context, filepath, xPos, yPos, xSize, ySize) {
        var img1 = new Image();
        //drawing of the test image - img1
        // img1.onload = () => {
        //     context.drawImage(img1, (xPos - xSize/2), (yPos - ySize/2), xSize, ySize);
        // };
        img1.src = filepath;
        this.image = img1;
    }
}

class Button {
    constructor(element, xLeft, xRight, yTop, yBot, buttonType, buttonPos) {
        this.element = element;
        this.xLeft = xLeft;
        this.xRight = xRight;
        this.yTop = yTop;
        this.yBot = yBot;
        this.buttonType = buttonType;
        this.buttonPos = buttonPos;
    }

    // checks if you pressed the button.
    buttonCheck(x_value, y_value) {
        if (x_value > this.xLeft && x_value < this.xRight) {
            if (y_value > this.yBot && y_value < this.yTop) {
                return true
            }
        }

        return false
    }

    place(type, color) {
        this.element.setType(type);
        this.element.setColor(color);
    }

    placeSheepHead() {
        this.element.setType("sheep");
        this.element.setColor("head");
    }

    placeSheepBody() {
        this.element.setType("sheep");
        this.element.setColor("body");
    }

    fire(){
        this.element.setType("fired");
        // if (this.element.type === "sheep" || this.element.type === "sheep_hidden"){

        // }
    }

    hover() {
        // if (!this.element.doNotHoverTypes.includes(this.element.type)) {
        //     this.element.setColor("hover");
        // }

        if (!this.element.doNotHoverTypes.includes(this.element.type)) {
            this.element.setHoverState("hover");
        }
        
    }

    blank() {
        if (!this.element.doNotHoverTypes.includes(this.element.type)){
            this.element.setHoverState("blank");
        }
    }
}


module.exports = Game;