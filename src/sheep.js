
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
        this.size = this.sheepPartPositions.length;
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

    getPlacePositionsOnly(pos) {
        let placePositions = [];
        let that = this;
        this.sheepShapes.forEach(function(sheepShape) {
            let _x = pos[0] + sheepShape[0];
            let _y = pos[1] + sheepShape[1];
            let _pos = [_x, _y];
            placePositions.push(_pos);
        })
        return placePositions;
    }

    placeSheep(playerType, pos) {
        let placePositions = [];
        let that = this;
        this.sheepShapes.forEach(function(sheepShape) {
            let _x = pos[0] + sheepShape[0];
            let _y = pos[1] + sheepShape[1];
            let _pos = [_x, _y];
            placePositions.push(_pos);
        })

        if (playerType === "enemy") {
            this.game.enemyButtons.forEach(function(button) {
                if (button.buttonType === "ship") {
                    if (JSON.stringify(placePositions).includes(button.buttonPos)) {
                        if (button.buttonPos.toString() === placePositions[0].toString()) {
                            button.place("sheep_hidden", "head")
                        } else {
                            button.place("sheep_hidden", "body")
                        }
                        that.game.enemySheepPositions.push(button.buttonPos);
                    }
                }
            })
        } else if (playerType === "player") {
            this.game.buttons.forEach(function(button) {
                if (button.buttonType === "ship") {
                    if (JSON.stringify(placePositions).includes(button.buttonPos)) {
                        if (button.buttonPos.toString() === placePositions[0].toString()) {
                            button.place("sheep", "head")
                        } else {
                            button.place("sheep", "body")
                        }
                        that.game.sheepPositions.push(button.buttonPos);
                    }
                }
            })
        }

        this.setSheepPartPositions(placePositions);

        // fin
    }

    isSheepFound() {
        if (this.sheepPartsFound.length === this.size) {
            return true;
        }
        return false;
    }

    checkIfFoundPart(pos){
        let foundPart = false;
        if (JSON.stringify(this.sheepPartPositions).includes(pos)){
            foundPart = true;

            if (!JSON.stringify(this.sheepPartsFound).includes(pos)){
                this.sheepPartsFound.push(pos);  
            }
        }
        return foundPart;
    }
}

module.exports = Sheep;