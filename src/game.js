console.log("im the game")

var square = document.getElementById("square");

const Square = require('./square.js');
const Button = require('./button.js');
const Sheep = require('./sheep.js');

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
        this.sheepLeftToPlace = [6, 1, 2, 5, 1, 2];
        this.computerLeftToPlace = [6, 1, 2, 5, 1, 2];

        this.sheepPositions = [];
        this.playerFoundPositions = [];
        
        this.enemySheepPositions = [];
        this.enemyFoundPositions = [];

        this.enemyFiredPositions = [];
        this.playerFiredPositions = [];
       
        
        this.buttons = [];
        this.enemyShips = [];
        this.enemyButtons = [];
        this.playerSheeps = [];
        this.enemySheeps = [];
        this.activeSheep;
        this.activeTextString = "";
        this.activeTextString2 = "";
        this.activeTextString3 = "";
        this.sideButton2 = "randomize"
        this.sideButton1 = "start game"
        this.boardSize = 7;   // 7 works.

        this.gameBG = new Square(ctx1, 400, 0, 800, 1200, "gameBG", "gameBG");

        this.draw();

        this.bgmusic = new Audio("./assets/sounds/bamacountry.mp3");
        this.cannon1 = new Audio("./assets/sounds/cannon1.mp3");
        this.sheep1 = new Audio("./assets/sounds/sheep1.mp3");
        this.tongue1 = new Audio("./assets/sounds/tongue1.mp3");

        this.drawCall = 0;
        this.playCall = 0;
        console.log(this.bgmusic);
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
                    that.getHoverPosition(layer3, e)
                })

                // generate game assets
                console.log("boop beep");
                // this.playCall += 1;
                // console.log("PLAY CALL:  " + playCall.toString());

                // this.ctx1.fillStyle = 'green';
                // this.ctx1.fillRect(0, 0, 800, 600);

                // new Square(ctx, xPos, yPos, 50, 50, "blank", "empty");
                
                
                this.activeTextString = "Place Your Sheeps"
                this.activeTextString2 = "";
                this.activeTextString3 = "";
                
                // generate game board
                this.generateSquares(this.ctx3);
                this.generateEnemySquares(this.ctx3);
                this.generateMenuButtons(this.ctx3);

                this.spawnSheep("enemy");
                this.spawnSheep("player");
                console.log("spawned sheeps");
                
            } else if (this.altState === 1) {
                // tracking clicks.
                if (this.clicked){
                    this.clicked = false;
                    let that = this;

                    this.buttons.forEach(function(button) {
                        if (button.buttonCheck(that.clickX, that.clickY)) {
                            if (button.buttonType === "randomize") {
                                that.clearSheep("player");
                                that.spawnSheep("player");
                                // createjs.Sound.stop();
                                that.sheep1.pause;
                                that.sheep1.currentTime = 0;
                                // that.sheep1.play();
                            } else if (button.buttonType === "start") {
                                that.altState = 2;
                                // that.bgmusic.play();
                                // that.bgmusic.loop = true;
                            }
                        }
                    })
                }

                // tracking hover.
                let that = this;

                // call this w. activesheep hover function
                this.buttons.forEach(function(button) {
                    if (button.buttonType === "ship") {
                        if (button.buttonCheck(that.hoverX, that.hoverY)) {
                            //that.activeSheep.hoverSheep(button.buttonPos);
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
                    this.clicked = false;
                }
            } else if (this.altState === 4){
                this.activeTextString = "Fire Your Cannon";
                this.activeTextString2 = "";
                this.activeTextString3 = "";
                
                // fire.
                if (this.clicked){
                    this.clicked = false;
                    let that = this;
                    let goAgain = false;
                    let firedOnASquare = false;

                    // player:  PLAYER
                    this.enemyButtons.forEach(function(button) {
                        if (button.buttonCheck(that.clickX, that.clickY)) {
                            if (button.buttonType === "ship") {
                                if (!that.hasBeenFired("player", button.buttonPos)){
                                    // firing upon square.
                                    firedOnASquare = true;
                                    button.fire();    // change status of ele to fired
                                    // player is firing.
                                    that.playerFiredPositions.push(button.buttonPos);   
                                    if (that.checkIfFoundSheep("player", button.buttonPos)) {
                                        goAgain = true;
                                    }

                                    if (goAgain) {
                                        that.cannon1.pause;
                                        that.cannon1.currentTime = 0;
                                        // that.cannon1.play();

                                        setTimeout(() => { 
                                            that.tongue1.pause;
                                            that.tongue1.currentTime = 0;
                                            // that.tongue1.play();
                                        }, 500);
                                    } else {
                                        that.cannon1.pause;
                                        that.cannon1.currentTime = 0;
                                        // that.cannon1.play();
                                    }
                                }
                            }
                        }
                    })

                    if (that.playerWon()) {
                        that.state = 1;
                        that.altState = 0;
                        that.activeTextString = "You Win!";
                    } else if (!goAgain) { // if you got a hit, go again.  otherwise switch turns.
                        if (firedOnASquare) {
                            that.altState = 5;
                        }
                    }
                    console.log("goAgain is " + goAgain.toString());

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
                this.altState = 99;

                // enemy makes move.
                let options = this.generatePositionsForComputerFiring();
                let goAgain = false;

                let that = this;

                if (options.length === 0) {
                    // computer wins!
                    that.state = 1;
                    that.altState = 0;
                    that.activeTextString = "Computer Wins!";
                } else {
                    let random = Math.floor(Math.random() * options.length);  // pick a random one.
                    let random_pos = options[random];

                    // player:  ENEMY
                    this.buttons.forEach(function(button) {
                        if (button.buttonPos[0] === random_pos[0] && button.buttonPos[1] === random_pos[1]) {
                            if (button.buttonType === "ship") {
                                if (!that.hasBeenFired("enemy", button.buttonPos)){
                                    button.fire();    // change status of ele to fired
                                    // enemy is firing.
                                    that.enemyFiredPositions.push(button.buttonPos);   
                                    if (that.checkIfFoundSheep("enemy", button.buttonPos)) {
                                        goAgain = true;
                                    }

                                    if (goAgain) {
                                        that.cannon1.pause;
                                        that.cannon1.currentTime = 0;
                                        // that.cannon1.play();

                                        setTimeout(() => { 
                                            that.tongue1.pause;
                                            that.tongue1.currentTime = 0;
                                            // that.tongue1.play();
                                        }, 500);
                                    } else {
                                        that.cannon1.pause;
                                        that.cannon1.currentTime = 0;
                                        // that.cannon1.play();
                                    }
                                }
                            }
                        }
                    })

                    if (that.computerWon()) {
                        that.state = 1;
                        that.altState = 0;
                        that.activeTextString = "Computer Wins!";
                    } else if (!goAgain) { // if you got a hit, go again.  otherwise switch turns.
                        setTimeout(() => { this.altState = 2 }, 1000);
                        // that.altState = 2;
                    } else {
                        setTimeout(() => { this.altState = 7 }, 1000);
                    }
                    console.log("goAgain is " + goAgain.toString());
                }
            }
        } else if (this.state === 1){
            if (this.altState === 0){
                this.altState = 1;
                // game over.
            }
        }
        this.i += 1;

        this.playCall += 1;
        if (this.playCall % 60 === 0) {
            console.log("PLAY CALL:  " + this.playCall.toString());
        }
        // run the callback loop.
        requestAnimationFrame(this.play);
    }

    generateMenuButtons() {
        let start_button = new Button("N/A", 651, 751, 518, 477, "start", "N/A")
        let randomize_button = new Button("N/A", 651, 751, 443, 401, "randomize", "N/A")

        this.buttons.push(start_button);
        this.buttons.push(randomize_button);
    }

    // enemy is firing.
    generatePositionsForComputerFiring() {
        let positions = [];

        for (let i = 0; i < this.boardSize; i++){
            for (let j = 0; j < this.boardSize; j++){
                if (!JSON.stringify(this.enemyFiredPositions).includes([i, j])) {
                    // if the PLAYER hasn't already fired on this position, add it.
                    positions.push([i, j]);
                }
            }
        }
        return positions;
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

    computerWon() {
        if (this.sheepPositions.length === this.playerFoundPositions.length) {
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

    checkIfFoundSheep(playerType, pos) {
        if (playerType === "player") {
            if (JSON.stringify(this.enemySheepPositions).includes(pos)) {
                this.enemyFoundPositions.push(pos);
    
                // sheep logic.
                let that = this;
                let foundPart = false;
                this.enemySheeps.forEach(function(enemySheep) {
                    if (enemySheep.checkIfFoundPart(pos)) {
                        foundPart = true;
                    }
    
                    if (enemySheep.isSheepFound()) {
                        enemySheep.sheepPartPositions.forEach(function(_pos) {
                            that.revealAroundPosition("player", _pos);
                        })
                    }
                })
    
                return foundPart;
            }
        } else if (playerType === "enemy") {
            if (JSON.stringify(this.sheepPositions).includes(pos)) {
                this.playerFoundPositions.push(pos);
    
                // sheep logic.
                let that = this;
                let foundPart = false;
                this.playerSheeps.forEach(function(playerSheep) {
                    if (playerSheep.checkIfFoundPart(pos)) {
                        foundPart = true;
                    }
    
                    if (playerSheep.isSheepFound()) {
                        playerSheep.sheepPartPositions.forEach(function(_pos) {
                            that.revealAroundPosition("enemy", _pos);
                        })
                    }
                })
    
                return foundPart;
            }
        }
    }

    revealAroundPosition(playerType, pos){
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
        if (playerType === "player") {
            this.enemyButtons.forEach(function(button){
                if (JSON.stringify(positions).includes(button.buttonPos)){
                    button.fire();
                    // check positions player has fired on.
                    if (!JSON.stringify(that.playerFiredPositions).includes(button.buttonPos)){
                        that.playerFiredPositions.push(button.buttonPos);
                    }
                }
            })
        } else if (playerType === "enemy") {
            this.buttons.forEach(function(button){
                if (JSON.stringify(positions).includes(button.buttonPos)){
                    button.fire();
                    // check positions enemy has fired on.
                    if (!JSON.stringify(that.enemyFiredPositions).includes(button.buttonPos)){
                        that.enemyFiredPositions.push(button.buttonPos);
                    }
                }
            })
        }
        
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

        this.gameBG.queueMove();
        this.gameBG.clearTime();
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

        if (!this.gameBG.moveComplete) {
            if (direction === "down"){
                if (this.gameBG.currentTime === 0) {
                    this.gameBG.currentTime = Date.now();
                    this.gameBG.lastTime = Date.now();
                } else {
                    this.gameBG.moveDown();
                }
                that.done = false;
            } else if (direction === "up") {
                if (this.gameBG.currentTime === 0) {
                    this.gameBG.currentTime = Date.now();
                    this.gameBG.lastTime = Date.now();
                } else {
                    this.gameBG.moveUp();
                }
                that.done = false;
            }
        }

        return that.done;
    }

    hasSheep(pos) {
        if (this.sheepPositions.includes(pos)){
            return true;
        }
        return false;
    }


    hasBeenFired(playerType, pos) {
        if (playerType === "enemy") {
            if (JSON.stringify(this.enemyFiredPositions).includes(pos)){
                return true;
            }
        } else if (playerType === "player") {
            if (JSON.stringify(this.playerFiredPositions).includes(pos)){
                return true;
            }
        }
        return false;
    }

    validSpotToPlace(playerType, pos, myInvalidPositions, logForPlayer) {
        if (myInvalidPositions === undefined){
            if (playerType === "player"){
                myInvalidPositions = this.sheepPositions;
            } else if (playerType === "enemy"){
                myInvalidPositions = this.enemySheepPositions;
            }
        }
        if (logForPlayer === undefined) {
            logForPlayer = false;
        }
        // check if surrounding squares have sheep.
        if (pos[0] < 0 || pos[0] > (this.boardSize - 1)) {
            if (playerType === "player") {
                if (logForPlayer) {
                    this.activeTextString2 = "Invalid Position:"  
                    this.activeTextString3 = "Position was off board!";
                }
            }
            return false;
        } else if (pos[1] < 0 || pos[1] > (this.boardSize - 1)) {
            if (playerType === "player") {
                if (logForPlayer){
                    this.activeTextString2 = "Invalid Position:"  
                    this.activeTextString3 = "Position was off board!";
                }
            }
            return false;
        }
        
        let i = -1;
        let j = -1;
        for (i = -1; i < 2; i++){
            for (j = -1; j < 2; j++) {
                let x = pos[0] + i;
                let y = pos[1] + j;
                let _pos = [x, y];

                if (playerType === "player"){
                    if (JSON.stringify(myInvalidPositions).includes(_pos)){
                        if (logForPlayer){
                            this.activeTextString2 = "Invalid Position:"  
                            this.activeTextString3 = "Position too close to another sheep!";
                        }
                        return false;
                    }  
                } else if (playerType === "enemy") {
                    if (JSON.stringify(myInvalidPositions).includes(_pos)){
                        // this.activeTextString2 = "Invalid Position:"  
                        // this.activeTextString3 = "Position too close to another sheep!";
                        return false;
                    }  
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
                let ship = new Square(ctx, xPos, yPos, 50, 50, "blank", "empty");
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
                let ship = new Square(ctx, xPos, yPos, 50, 50, "blank", "empty");
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

            this.tempSheep = new Square(this.ctx3, xPos, yPos, 50, 50, "head", "sheep");
            
        } else if (id === 2) {
            let xPos = 375 + xMod;
            let yPos = 125 + yMod;

            this.tempSheep = new Square(this.ctx3, xPos, yPos, 50, 50, "head", "sheep");
            this.tempSheep2 = new Square(this.ctx3, xPos + 50, yPos, 50, 50, "body", "sheep");
            
        } else if (id === 3) {
            let xPos = 350 + xMod;
            let yPos = 125 + yMod;

            this.tempSheep = new Square(this.ctx3, xPos, yPos, 50, 50, "head", "sheep");
            this.tempSheep2 = new Square(this.ctx3, xPos + 50, yPos, 50, 50, "body", "sheep");
            this.tempSheep3 = new Square(this.ctx3, xPos + 100, yPos, 50, 50, "body", "sheep");
           
        } else if (id === 4) {
            let xPos = 325 + xMod;
            let yPos = 125 + yMod;

            this.tempSheep = new Square(this.ctx3, xPos, yPos, 50, 50, "head", "sheep");
            this.tempSheep2 = new Square(this.ctx3, xPos + 50, yPos, 50, 50, "body", "sheep");
            this.tempSheep3 = new Square(this.ctx3, xPos + 100, yPos, 50, 50, "body", "sheep");
            this.tempSheep4 = new Square(this.ctx3, xPos + 150, yPos, 50, 50, "body", "sheep");
            
        } else if (id === 5) {
            let xPos = 375 + xMod;
            let yPos = 100 + yMod;

            this.tempSheep = new Square(this.ctx3, xPos, yPos, 50, 50, "head", "sheep");
            this.tempSheep2 = new Square(this.ctx3, xPos + 50, yPos, 50, 50, "body", "sheep");
            this.tempSheep3 = new Square(this.ctx3, xPos + 50, yPos + 50, 50, 50, "body", "sheep");
            
        } else if (id === 6) {
            let xPos = 350 + xMod;
            let yPos = 100 + yMod;

            this.tempSheep = new Square(this.ctx3, xPos, yPos, 50, 50, "head", "sheep");
            this.tempSheep2 = new Square(this.ctx3, xPos + 50, yPos, 50, 50, "body", "sheep");
            this.tempSheep3 = new Square(this.ctx3, xPos + 100, yPos, 50, 50, "body", "sheep");
            this.tempSheep4 = new Square(this.ctx3, xPos + 50, yPos + 50, 50, 50, "body", "sheep");

            
        }
        this.activeSheep = this.generateActiveSheep(id);
    }

    generateActiveSheep(id) {
        if (id === 1){
            return new Sheep(this, [[0, 0]]);
        } else if (id === 2) {
            return new Sheep(this, [[0, 0], [1, 0]]);
        } else if (id === 3) {
            return new Sheep(this, [[0, 0], [1, 0], [2, 0]]);
        } else if (id === 4) {
            return new Sheep(this, [[0, 0], [1, 0], [2, 0], [3, 0]]);
        } else if (id === 5) {
            return new Sheep(this, [[0, 0], [1, 0], [1, 1]]);
        } else if (id === 6) {
            return new Sheep(this, [[0, 0], [1, 0], [2, 0], [1, 1]] );
        }
    }

    clearSheep(playerType) {
        if (playerType === "player"){
            this.playerSheeps = [];
            this.sheepPositions = [];
            this.buttons.forEach(function(button) {
                if (button.buttonType === "ship") {
                    button.clear();
                }
            })
        } else if (playerType === "enemy") {
            this.enemySheeps = [];
            this.enemySheepPositions = [];
            this.enemyButtons.forEach(function(button) {
                if (button.buttonType === "ship") {
                    button.clear();
                }
            })
        }
    }

    spawnSheep(playerType){
        let that = this;
        let l = 0;
        let myLeftToPlace = [];
        if (playerType === "player"){
            l = this.sheepLeftToPlace.length;
            myLeftToPlace = JSON.parse(JSON.stringify(this.sheepLeftToPlace));
        } else if (playerType === "enemy") {
            l = this.computerLeftToPlace.length;
            myLeftToPlace = JSON.parse(JSON.stringify(this.computerLeftToPlace));
        }
        let placingComplete = false;
        let iterations = 0;
        let q = 0;

        while (!placingComplete) {
            placingComplete = true;

            if (q < l) {
                this.activeSheep = this.generateActiveSheep(myLeftToPlace[q]);
                
                let positions = this.generatePossiblePositionArray(playerType);
                if (positions.length === 0) {  // if theres no possible positions,
                    iterations += 1;
                    q = 0;
                    this.clearSheep(playerType);
                } else {
                    let random = Math.floor(Math.random() * positions.length);  // pick a random one.
                    let random_pos = positions[random];
                    if (playerType === "player"){
                        this.playerSheeps.push(this.activeSheep);
                        this.activeSheep.placeSheep("player", random_pos);
                    } else if (playerType === "enemy"){
                        this.enemySheeps.push(this.activeSheep);   // add the sheep to the enemy sheeps list.
                        this.activeSheep.placeSheep("enemy", random_pos);  // add the positions of the sheep to enemySheepPositions.
                    }
                    q += 1;
                }
                placingComplete = false;
            } else {
                placingComplete = true;
            }
        }

        if (playerType === "player"){
            console.log("              ")
            console.log("--------------")
            console.log("- debug tool -")
            console.log("--------------")
            console.log("Completed Placing Player Sheep!");
            console.log("Total Iteration Cycles:  " + iterations.toString());
            console.log("--------------")
            console.log("Player left to place:  " + this.sheepLeftToPlace.length.toString());
            console.log("Sheep Positions Length:  " + this.sheepPositions.length.toString());
            console.log("Sheep Positions:  ");
            console.log(this.sheepPositions);
            console.log("Player Sheeps:  " + this.playerSheeps.toString());
            console.log("sheep placed");
        } else if (playerType === "enemy"){
            console.log("              ")
            console.log("--------------")
            console.log("- debug tool -")
            console.log("--------------")
            console.log("Completed Placing Enemy Sheep!");
            console.log("Total Iteration Cycles:  " + iterations.toString());
            console.log("--------------")
            console.log("Computer left to place:  " + this.computerLeftToPlace.length.toString());
            console.log("Enemy Sheep Positions Length:  " + this.enemySheepPositions.length.toString());
            console.log("Enemy Sheep Positions:  ");
            console.log(this.enemySheepPositions);
            console.log("Enemy Sheeps:  " + this.enemySheeps.toString());
            console.log("sheep placed");
        }
    }


    generatePossiblePositionArray(playerType, mySheep, myInvalidPositions) {
        let positions = []
        let that = this;
        if (myInvalidPositions === undefined){
            if (playerType === "player") {
                myInvalidPositions = this.sheepPositions;
            } else {
                myInvalidPositions = this.enemySheepPositions;
            }
        }
        if (mySheep === undefined){
            mySheep = this.activeSheep;
        }

        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                let valid = true;
                mySheep.sheepShapes.forEach(function(shape) {
                    let _x = i + shape[0];
                    let _y = j + shape[1];
                    let _pos = [_x, _y];
                    if (!that.validSpotToPlace(playerType, _pos, myInvalidPositions)) {
                        valid = false;
                    }
                   
                })
                if (valid){
                    positions.push([i, j]);
                }
            }
        }
        return positions;
    }

    draw() {
        this.ctx1.clearRect(0, 0, 800, 600);
        this.gameBG.draw();

        this.ctx3.clearRect(0, 0, 800, 600);
        // this.ctx3.save();
        // this.ctx3.globalCompositeOperation = 'copy';
        // this.ctx3.strokeStyle = 'transparent';
        // this.ctx3.beginPath();
        // this.ctx3.lineTo(0, 0);
        // this.ctx3.stroke();
        // this.ctx3.restore();

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

        this.ctx3.fillStyle = 'gray';
        this.ctx3.fillRect(650, 475, 100, 40);

        this.ctx3.fillStyle = 'gray';
        this.ctx3.fillRect(650, 400, 100, 40);

        this.ctx3.font = ("16px Arial");
        this.ctx3.fillStyle = "black";
        this.ctx3.textAlign = "center";
        this.ctx3.fillText(this.sideButton1, 700, 500);

        this.ctx3.font = ("16px Arial");
        this.ctx3.fillStyle = "black";
        this.ctx3.textAlign = "center";
        this.ctx3.fillText(this.sideButton2, 700, 425);

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


        this.drawCall += 1;
        if (this.drawCall % 60 === 0) {
            console.log("DRAW CALL:  " + this.drawCall.toString());
        }
        

        requestAnimationFrame(this.draw);
    }
}

module.exports = Game;