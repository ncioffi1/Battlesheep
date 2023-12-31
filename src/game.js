

var square = document.getElementById("square");

const Square = require('./square.js');
const Button = require('./button.js');
const Sheep = require('./sheep.js');
const UIObject = require('./uiobject.js')



class Game {
    constructor(layer3, ctx1, ctx2, ctx3, DIM_X, DIM_Y) {
        this.layer3 = layer3;
        this.ctx1 = ctx1;
        this.ctx2 = ctx2;
        this.ctx3 = ctx3;
        this.state = -1;
        this.altState = 0;
        this.DIM_X = DIM_X;
        this.DIM_Y = DIM_Y;
        this.clickX = 0;
        this.clickY = 0;
        this.hoverX = 0;
        this.hoverY = 0;
        this.clicked = false;
        this.clicked2 = false;
        this.play = this.play.bind(this);
        this.draw = this.draw.bind(this);
        this.ships = [];
        this.tempSheep;
        this.tempSheep2;
        this.tempSheep3;
        this.tempSheep4;
        // for testing
        // this.sheepLeftToPlace = [1];
        // this.computerLeftToPlace = [1];
        this.sheepLeftToPlace = [6, 1, 2, 5, 1, 2, 1];
        this.computerLeftToPlace = [6, 1, 2, 5, 1, 2, 1];
        this.sheepRotations = [];

        this.sheepPositions = [];
        this.playerFoundPositions = [];
        
        this.enemySheepPositions = [];
        this.enemyFoundPositions = [];

        this.enemyFiredPositions = [];
        this.playerFiredPositions = [];
       
        
        this.buttons = [];
        this.uiobjects = [];
        this.enemyShips = [];
        this.enemyButtons = [];
        this.playerSheeps = [];
        this.enemySheeps = [];
        this.activeSheep;
        this.activeTextString = "";
        this.activeTextString2 = "";
        this.activeTextString3 = "";
        this.sideButton1 = "Start Game"
        this.sideButton2 = "Randomize"
        this.sideButton3 = "Play Again"
        this.boardSize = 7;   
        this.musicOn = true;
        this.musicActivated = false;
        this.gameActivated = false;
        this.gameOver = false;
        this.soundOn = true;

        this.gameBG = new Square(ctx3, 400, 0, 800, 1200, "gameBG", "gameBG");
        this.githubLogo = new Square(ctx3, 400, 520, 50, 50, "github", "github");
        this.githubButton = new Button(this.githubLogo, 378, 425, 545, 497, "github", "N/A");
        this.creditsButton = new Button("N/A", 617, 747, 546, 417, "credits", "N/A");
        this.backButton = new Button("N/A", 617, 747, 546, 417, "back", "N/A");
        this.creditsSheep = new Square(ctx3, 400, 290, 800, 600, "gameSheep", "gameSheep");
        this.gameLogo = new Square(ctx3, 400, 180, 800 / 1.25, 200 / 1.25, "gameLogo", "gameLogo");
        this.gameSheep = new Square(ctx3, 120, 480, 150, 150, "gameSheep", "gameSheep");
        this.gameSheep2 = new Square(ctx3, 800 - 120, 480, 150, 150, "gameSheep", "gameSheep");
        this.gamePlay = new UIObject(this.ctx3, 400, 320, 400, 400, "gameplay", "unpressed", "play");
        this.gamePlayButton = new Button(this.gamePlay, 245, 555, 382, 270, "play", "N/A");
        this.draw();

        this.bgmusic = new Audio("./assets/sounds/bamacountry.mp3");
        this.cannon1 = new Audio("./assets/sounds/cannon1.mp3");
        this.sheep1 = new Audio("./assets/sounds/sheep1.mp3");
        this.tongue1 = new Audio("./assets/sounds/tongue1.mp3");
    }

    // generate array the length of sheepsLeftToPlace w rot values (4 possible)
    generateRotations() {
        this.sheepRotations = [];
        for (let i = 0; i < this.sheepLeftToPlace.length; i++) {
            let rot = Math.floor(Math.random() * 4);  // 0, 1, 2, 3;
            this.sheepRotations.push(rot);
        }
    }

    getCursorPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        this.clickX = x;
        this.clickY = y;
        this.clicked = true;
        this.clicked2 = true;
        // console.log("x: " + x + " y: " + y)
    }

    getHoverPosition(canvas, event) {
        const rect = canvas.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top
        this.hoverX = x;
        this.hoverY = y;
        // console.log("x: " + x + " y: " + y)
    }
    

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
        if (this.state === -1){
            if (this.altState === 0){
                this.altState = 1;

                let that = this;
                this.layer3.addEventListener('mousedown', function(e) {
                    
                    that.getCursorPosition(layer3, e)
                })

                this.layer3.addEventListener('mousemove', function(e) {
                    that.getHoverPosition(layer3, e)
                })
            } else if (this.altState === 1) {
                if (this.clicked){
                    this.clicked = false;
                    let that = this;

                    if (this.gamePlayButton.buttonCheck(that.clickX, that.clickY)) {
                        if (this.gamePlayButton.buttonType === "play"){
                            this.gamePlayButton.press();
                            that.altState = 99;

                            setTimeout(() => {
                                this.state = 0;
                                this.altState = 0;
                            }, 300)
                        }
                    } else if (this.creditsButton.buttonCheck(that.clickX, that.clickY)) {
                        this.state = -2;
                        this.altState = 0;
                    } else if (this.githubButton.buttonCheck(that.clickX, that.clickY)) {
                        this.redirectToGithub();
                    }
                }
            }
        } else if (this.state === -2) {
            if (this.clicked){
                this.clicked = false;
                let that = this;

                if (this.backButton.buttonCheck(that.clickX, that.clickY)) {
                    that.state = -1;
                    that.altState = 1;
                }
            }
        } else if (this.state === 0){
            if (this.altState === 0) {
                this.altState = 1;
                
                this.activeTextString = "Move Your Sheeps"
                this.activeTextString2 = "Click 'Randomize' To Move Them";
                this.activeTextString3 = "When You're Ready, Click 'Start Game'";
                
                // generate game board
                this.generateSquares(this.ctx3);
                this.generateEnemySquares(this.ctx3);
                this.generateMenuButtons(this.ctx3);

                this.spawnSheep("enemy");
                this.spawnSheep("player");
                
                
            } else if (this.altState === 1) {
                if (this.clicked){
                    this.clicked = false;
                    let that = this;

                    this.buttons.forEach(function(button) {
                        if (button.buttonCheck(that.clickX, that.clickY)) {
                            if (button.buttonType === "randomize") {
                                button.press();
                                
                                that.clearSheep("player");
                                that.spawnSheep("player");
                                
                                if (that.soundOn){
                                    that.sheep1.pause;
                                    that.sheep1.currentTime = 0;
                                    that.sheep1.play();
                                }
                            } else if (button.buttonType === "start") {
                                that.activeTextString = "";
                                that.activeTextString2 = "";
                                that.activeTextString3 = "";
                                button.press();
                                that.altState = 99;
                                setTimeout(() => {
                                    that.altState = 2;
                                    that.gameActivated = true;
                                    that.musicActivated = true;
                                    if (that.musicOn){
                                        that.bgmusic.play();
                                        that.bgmusic.loop = true;
                                    }

                                }, 300)
                            } else if (button.buttonType === "size7x7") {
                                button.press();
                                that.altState = 99;

                                if (that.soundOn){
                                    that.sheep1.pause;
                                    that.sheep1.currentTime = 0;
                                    that.sheep1.play();
                                }

                                setTimeout(() => {
                                    that.boardSize = 7;
                                    that.sheepLeftToPlace = [6, 1, 2, 5, 1, 2, 1];
                                    that.computerLeftToPlace = [6, 1, 2, 5, 1, 2, 1];
                                    that.resetGame();
                                }, 300)
                            } else if (button.buttonType === "size9x9") {
                                button.press();
                                that.altState = 99;

                                if (that.soundOn){
                                    that.sheep1.pause;
                                    that.sheep1.currentTime = 0;
                                    that.sheep1.play();
                                }

                                setTimeout(() => {
                                    that.boardSize = 9;
                                    that.sheepLeftToPlace = [7, 6, 1, 2, 5, 4, 3, 2, 1, 1];
                                    that.computerLeftToPlace = [7, 6, 1, 2, 5, 4, 3, 2, 1, 1];                                    
                                    that.resetGame();
                                }, 300)
                            }
                        }
                    })
                }

            } else if (this.altState === 2) {
                setTimeout(() => { this.altState = 3 }, 1000);

                this.queueMoveShips();
            } else if (this.altState === 3) {
                this.activeTextString = "";
                this.activeTextString2 = "";
                this.activeTextString3 = "";

                if (this.moveShips("down")){
                    this.altState = 4;
                    this.clicked = false;
                }
            } else if (this.altState === 4){
                if (this.activeTextString === ""){
                    this.activeTextString = "Fire Your Cannon";
                    this.activeTextString2 = "";
                    this.activeTextString3 = "";
                }
                
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
                                        if (that.soundOn){
                                            that.cannon1.pause;
                                            that.cannon1.currentTime = 0;
                                            that.cannon1.play();

                                            setTimeout(() => { 
                                                that.tongue1.pause;
                                                that.tongue1.currentTime = 0;
                                                that.tongue1.play();
                                            }, 500);
                                        }
                                    } else {
                                        if (that.soundOn){
                                            that.cannon1.pause;
                                            that.cannon1.currentTime = 0;
                                            that.cannon1.play();
                                        }
                                    }
                                }
                            }
                        }
                    })

                    if (that.playerWon()) {
                        that.state = 1;
                        that.altState = 0;
                        that.activeTextString = "You Win!";
                        that.activeTextString2 = "";
                    } else if (!goAgain) { // if you got a hit, go again.  otherwise switch turns.
                        if (firedOnASquare) {
                            that.altState = 5;
                            that.activeTextString = "You Missed!";
                        }
                    } else {
                        if (firedOnASquare) {
                            that.activeTextString = "You Hit!  You Go Again.";
                        }
                    }
                    

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

                this.queueMoveShips();
            } else if (this.altState === 6) {
                this.activeTextString = "";
                this.activeTextString2 = "";
                this.activeTextString3 = "";

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
                    let random = Math.floor(Math.random() * options.length);  // pick a random int from 0 to options.length (exclusive for options.length).
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
                                        if (that.soundOn){
                                            that.cannon1.pause;
                                            that.cannon1.currentTime = 0;
                                            that.cannon1.play();

                                            setTimeout(() => { 
                                                that.tongue1.pause;
                                                that.tongue1.currentTime = 0;
                                                that.tongue1.play();
                                            }, 500);
                                        }
                                    } else {
                                        if (that.soundOn){
                                            that.cannon1.pause;
                                            that.cannon1.currentTime = 0;
                                            that.cannon1.play();
                                        }
                                    }
                                }
                            }
                        }
                    })

                    if (that.computerWon()) {
                        that.state = 1;
                        that.altState = 0;
                        that.activeTextString = "Computer Wins!";
                        that.activeTextString2 = "";
                    } else if (!goAgain) { // if you got a hit, go again.  otherwise switch turns.
                        that.activeTextString = "Computer Missed!";
                        setTimeout(() => { this.altState = 2 }, 200);
                  
                    } else {
                        that.activeTextString = "Computer Hit!  Computer Goes Again.";
                        setTimeout(() => { this.altState = 7 }, 1000);
                    }
                    
                }
            }
        } else if (this.state === 1){
            if (this.altState === 0){
                // game over.
                this.gameOver = true;
                if (this.clicked){
                    this.clicked = false;

                    let that = this;

                    this.buttons.forEach(function(button) {
                        if (button.buttonCheck(that.clickX, that.clickY)) {
                            if (button.buttonType === "replay") {
                                button.press();
                                
                                that.altState = 99;
                                
                                setTimeout(() => {
                                    that.resetGame();
                                }, 300)
                            }
                        }
                    })
                }
            }
        }

        // run the callback loop.

        // at any point, you can turn the sound / music on or off.
        // this would break our existing click checks - so lets add a second
        // one for the purpose of checking clicks outside the loop.
        if (this.clicked2){
            this.clicked2 = false;
            let that = this;

            this.buttons.forEach(function(button) {
                if (button.buttonCheck(that.clickX, that.clickY)) {
                    if (button.buttonType === "music") {
                        button.press();
                        if (that.musicOn){
                            that.bgmusic.pause();

                            that.musicOn = false;
                        } else {
                            if (that.musicActivated){
                                that.bgmusic.play();
                                that.bgmusic.loop = true;
                            }
                            that.musicOn = true;
                        }
                    } else if (button.buttonType === "sound") {
                        button.press();
                        if (that.soundOn){
                            that.soundOn = false;
                        } else {
                            that.soundOn = true;
                        }
                    }
                }
            })
        }

        requestAnimationFrame(this.play);
    }

    resetGame() {
        this.gameActivated = false;
        this.musicActivated = false;
        this.gameOver = false;
        this.ships = [];
        this.buttons = [];
        this.enemyShips = [];
        this.enemyButtons = [];
        this.enemySheeps = [];
        this.playerSheeps = [];
        this.sheepPositions = [];
        this.enemySheepPositions = [];
        this.enemyFoundPositions = [];
        this.playerFoundPositions = [];
        this.playerFiredPositions = [];
        this.enemyFiredPositions = [];
        this.sheepRotations = [];

        this.clearSheep("player");
        this.clearSheep("enemy");

        this.bgmusic.pause();
        this.bgmusic.currentTime = 0;

        this.gameBG = new Square(this.ctx3, 400, 0, 800, 1200, "gameBG", "gameBG");

        this.state = 0;
        this.altState = 0;
    }

    generateMenuButtons() {
        // added functionality:  different board sizes
        let seven_rect = new UIObject(this.ctx3, 700, 270, 150, 150, "gameplay", "unpressed", "7x7");
        let nine_rect = new UIObject(this.ctx3, 700, 345, 150, 150, "gameplay", "unpressed", "9x9");
        this.uiobjects.push(seven_rect);
        this.uiobjects.push(nine_rect);
        let seven_button = new Button(seven_rect, 644, 760, 294, 252, "size7x7", "N/A");
        let nine_button = new Button(nine_rect, 644, 760, 371, 328, "size9x9", "N/A");
        this.buttons.push(seven_button);
        this.buttons.push(nine_button);

        // core:  pregame menu items
        let start_rect = new UIObject(this.ctx3, 700, 495, 150, 150, "gameplay", "unpressed", "start");
        let random_rect = new UIObject(this.ctx3, 700, 420, 150, 150, "gameplay", "unpressed", "random");
        let replay_rect = new UIObject(this.ctx3, 700, 495, 150, 150, "gameplay", "unpressed", "replay");

        this.uiobjects.push(start_rect);
        this.uiobjects.push(random_rect);
        this.uiobjects.push(replay_rect);

        let start_button = new Button(start_rect, 644, 760, 518, 477, "start", "N/A");
        let randomize_button = new Button(random_rect, 644, 760, 443, 401, "randomize", "N/A");
        let replay_button = new Button(replay_rect, 644, 760, 518, 477, "replay", "N/A");
        this.buttons.push(start_button);
        this.buttons.push(randomize_button);
        this.buttons.push(replay_button);

        let musicStatus = ""
        if (this.musicOn) {
            musicStatus = "on"
        } else {
            musicStatus = "off"
        }

        let soundStatus = ""
        if (this.soundOn) {
            soundStatus = "on"
        } else {
            soundStatus = "off"
        }

        let music_UI = new UIObject(this.ctx3, 680, 50, 200, 200, "music", "unpressed", musicStatus)
        let sound_UI = new UIObject(this.ctx3, 740, 50, 200, 200, "sound", "unpressed", soundStatus)
        this.uiobjects.push(music_UI);
        this.uiobjects.push(sound_UI);

        let music_button = new Button(music_UI, 655, 705, 81, 25, "music", "N/A")
        let sound_button = new Button(sound_UI, 716, 766, 81, 25, "sound", "N/A")
        this.buttons.push(music_button);
        this.buttons.push(sound_button);
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


    redirectToGithub(){
        window.location = "https://github.com/ncioffi1"
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
                        
                        return false;
                    }  
                }          
            }
        }
        return true;
    }

    generateSquares(ctx) {
        let size = this.boardSize;

        if (size === 7) {
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
        } else if (size === 9) {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++){
                    let xPos = 400 - ((Math.floor(size / 2)) * 40) + (i * 40);
                    let yPos = 200 + (j * 40) - 5
                    
                    let ship = new Square(ctx, xPos, yPos, 42, 42, "blank", "empty");
                    this.ships.push(ship);
                    let x_left = xPos - 17;
                    let x_right = xPos + 17;
                    let y_top = yPos + 17;
                    let y_bot = yPos - 17;
                    let button = new Button(ship, x_left, x_right, y_top, y_bot, "ship", [i, j]);
                    this.buttons.push(button);
                }
            }
        }
    }

    generateEnemySquares(ctx) {
        let size = this.boardSize;
        if (size === 7) {
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
        } else if (size === 9) {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++){
                    let xPos = 400 - ((Math.floor(size / 2)) * 40) + (i * 40);
                    let yPos = 200 - 600 + (j * 40) - 5;
                    let ship = new Square(ctx, xPos, yPos, 42, 42, "blank", "empty");
                    this.enemyShips.push(ship);
                    let x_left = xPos - 17;
                    let x_right = xPos + 17;
                    let y_top = yPos + 17 + 600;
                    let y_bot = yPos - 17 + 600;
                    let button = new Button(ship, x_left, x_right, y_top, y_bot, "ship", [i, j]);
                    this.enemyButtons.push(button);
                }
            }
        }
        
    }

    generateActiveSheep(id, rotation) {
        if (rotation === undefined) {
            rotation = 0;
        }

        if (id === 1){
            return new Sheep(this, [[0, 0]]);
        } else if (id === 2) {
            if (rotation === 0 || rotation === 1) {
                return new Sheep(this, [[0, 0], [1, 0]]);
            } else {
                return new Sheep(this, [[0, 0], [0, 1]]);
            }
        } else if (id === 3) {
            if (rotation === 0 || rotation === 1) {
                return new Sheep(this, [[0, 0], [1, 0], [2, 0]]);
            } else {
                return new Sheep(this, [[0, 0], [0, 1], [0, 2]]);
            }
        } else if (id === 4) {
            if (rotation === 0 || rotation === 1) {
                return new Sheep(this, [[0, 0], [1, 0], [2, 0], [3, 0]]);
            } else {
                return new Sheep(this, [[0, 0], [0, 1], [0, 2], [0, 3]]);
            }
        } else if (id === 5) {
            if (rotation === 0) {
                return new Sheep(this, [[0, 0], [1, 0], [1, 1]]);
            } else if (rotation === 1) {
                return new Sheep(this, [[1, 0], [1, 1], [0, 1]]);
            } else if (rotation === 2) {
                return new Sheep(this, [[1, 1], [0, 1], [0, 0]]);
            } else if (rotation === 3) {
                return new Sheep(this, [[0, 1], [0, 0], [1, 0]]);
            }
        } else if (id === 6) {
            if (rotation === 0) {
                return new Sheep(this, [[0, 0], [1, 0], [2, 0], [1, 1]] );
            } else if (rotation === 1) {
                return new Sheep(this, [[0, 0], [0, 1], [0, 2], [1, 1]] );
            } else if (rotation === 2) {
                return new Sheep(this, [[0, 1], [1, 1], [2, 1], [1, 0]] );
            } else if (rotation === 3) {
                return new Sheep(this, [[1, 0], [1, 1], [1, 2], [0, 1]] );
            }
        } else if (id === 7) {
            if (rotation === 0 || rotation === 1) {
                return new Sheep(this, [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0]]);
            } else {
                return new Sheep(this, [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4]]);
            }
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

        this.generateRotations();

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
                this.activeSheep = this.generateActiveSheep(myLeftToPlace[q], this.sheepRotations[q]);
                
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

        // leaving this in but commenting it out:
        // this is a really effective series of logs for
        // debugging sheep placement issues & game functionality.  :)
        if (playerType === "player"){
            // console.log("--------------")
            // console.log("Completed Placing Player Sheep!");
            // console.log("Total Iteration Cycles:  " + iterations.toString());
            // console.log("--------------")
            // console.log("Player left to place:  " + this.sheepLeftToPlace.length.toString());
            // console.log("Sheep Positions Length:  " + this.sheepPositions.length.toString());
            // console.log("Sheep Positions:  ");
            // console.log(this.sheepPositions);
            // console.log("Player Sheeps:  " + this.playerSheeps.toString());
            // console.log("sheep placed");
        } else if (playerType === "enemy"){
            // console.log("--------------")
            // console.log("Completed Placing Enemy Sheep!");
            // console.log("Total Iteration Cycles:  " + iterations.toString());
            // console.log("--------------")
            // console.log("Computer left to place:  " + this.computerLeftToPlace.length.toString());
            // console.log("Enemy Sheep Positions Length:  " + this.enemySheepPositions.length.toString());
            // console.log("Enemy Sheep Positions:  ");
            // console.log(this.enemySheepPositions);
            // console.log("Enemy Sheeps:  " + this.enemySheeps.toString());
            // console.log("sheep placed");
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
        this.ctx3.clearRect(0, 0, 800, 600);

        if (this.state === -1) {
            this.ctx1.fillStyle = `rgb(108, 232, 45)`;
            this.ctx1.fillRect(0, 0, 800, 600);

            this.githubLogo.draw();
            this.gameLogo.draw();
            this.gameSheep.draw();
            this.gameSheep2.draw();
            this.gamePlay.draw();
            this.ctx3.font = ("60px Afacad");
            this.ctx3.fillStyle = "black";
            this.ctx3.textAlign = "center";
            if (this.gamePlay.color === "unpressed"){
                this.ctx3.fillText("Play", 400, 336);
            } else if (this.gamePlay.color === "pressed"){
                this.ctx3.fillText("Play", 400, 338);
            }
            this.ctx3.font = ("30px Afacad");
            this.ctx3.fillStyle = "gray";
            this.ctx3.fillText("Credits", 680, 510);

        } else if (this.state === -2) {

            this.ctx1.fillStyle = `rgb(108, 232, 45)`;
            this.ctx1.fillRect(0, 0, 800, 600);
            this.creditsSheep.draw();
            this.gameSheep2.draw();
            this.ctx3.font = ("30px Afacad");
            this.ctx3.fillStyle = "gray";
            this.ctx3.textAlign = "center";

            this.ctx3.fillText("Back", 680, 510);

            this.ctx3.textAlign = "start";
            let y = -20;
            this.ctx3.fillText("Credits", 150, 295 + y);
            this.ctx3.font = ("14px Afacad");
            this.ctx3.fillText("'Bama Country' Kevin MacLeod (incompetech.com)", 150, 320 + y);
            this.ctx3.fillText("Licensed under Creative Commons: By Attribution 4.0 License", 150, 335 + y);
            this.ctx3.fillText("http://creativecommons.org/licenses/by/4.0/", 150, 350 + y);

            this.ctx3.fillText("The following sounds are Licensed under Creative Commons: Attribution 4.0:", 150, 380 + y);
            this.ctx3.fillText("'uncompressed cannon.aif' by baefild of Freesound.org", 150, 395 + y);
            this.ctx3.fillText("'Sigh out tongue 02.wav' by Hawkeye_Sprout of Freesound.org", 150, 410 + y);
            
            this.ctx3.fillText("The following sounds are Licensed under Creative Commons: 0:", 150, 440 + y);
            this.ctx3.fillText("'bah bala oveja/baa bleat sheep.WAV' by SergioJbs of Freesound.org", 150, 455 + y);

            this.ctx3.fillText("Made by Nick Cioffi for App Academy 2023.", 150, 485 + y);
            this.ctx3.fillText("All Sheeps Reserved.", 150, 500 + y);
            

        } else {
            this.drawGame();
        }

        requestAnimationFrame(this.draw);
    }

    drawGame() {
        this.gameBG.draw(); 

        if (this.activeTextString !== "") {
            this.ctx3.font = ("30px Afacad");
            this.ctx3.fillStyle = "black";
            this.ctx3.textAlign = "center";
            this.ctx3.fillText(this.activeTextString, 400, 50);
        }
        
        if (this.activeTextString2 !== "") {
            this.ctx3.font = ("16px Afacad");
            this.ctx3.fillStyle = "black";
            this.ctx3.textAlign = "center";
            this.ctx3.fillText(this.activeTextString2, 400, 80);
        }

        if (this.activeTextString3 !== "") {
            this.ctx3.font = ("16px Afacad");
            this.ctx3.fillStyle = "black";
            this.ctx3.textAlign = "center";
            this.ctx3.fillText(this.activeTextString3, 400, 100);
        }

        let that = this;
        this.ctx3.font = ("16px Afacad");
        this.ctx3.fillStyle = "black";
        this.ctx3.textAlign = "center";

        this.uiobjects.forEach(function(uiobject) {
            if (uiobject.type === "gameplay") {
                if (uiobject.status === "replay"){
                    if (that.gameOver){
                        uiobject.draw();

                        if (uiobject.color === "unpressed"){
                            that.ctx3.fillText(that.sideButton3, 700, 500);
                        } else if (uiobject.color === "pressed"){
                            that.ctx3.fillText(that.sideButton3, 700, 502);
                        }
                    }
                } else {
                    if (!that.gameActivated){
                        uiobject.draw();
    
                        if (uiobject.status === "7x7"){
                            if (uiobject.color === "unpressed"){
                                that.ctx3.fillText("7x7 Game", 700, 275);
                            } else if (uiobject.color === "pressed"){
                                that.ctx3.fillText("7x7 Game", 700, 277);
                            }
                        } else if (uiobject.status === "9x9") {
                            if (uiobject.color === "unpressed"){
                                that.ctx3.fillText("9x9 Game", 700, 350);
                            } else if (uiobject.color === "pressed"){
                                that.ctx3.fillText("9x9 Game", 700, 352);
                            }
                        } else if (uiobject.status === "start"){
                            if (uiobject.color === "unpressed"){
                                that.ctx3.fillText(that.sideButton1, 700, 500);
                            } else if (uiobject.color === "pressed"){
                                that.ctx3.fillText(that.sideButton1, 700, 502);
                            }
                        } else if (uiobject.status === "random"){
                            if (uiobject.color === "unpressed"){
                                that.ctx3.fillText(that.sideButton2, 700, 425);
                            } else if (uiobject.color === "pressed"){
                                that.ctx3.fillText(that.sideButton2, 700, 427);
                            }
                        }
                    }
                }
            } else {
                uiobject.draw();
            }
        });

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
    }




}

module.exports = Game;