console.log('im the asteroid')

const MovingObject = require('./moving-object.js')
const Util = require('./utils.js');
// import * as Util from "./utils.js";

class Asteroid extends MovingObject {
    // debugger;
    static RADIUS = 20;
    static COLOR = 'red';

    constructor(pos) {

        // debugger;
        super(pos, Util.randomVec(1), Asteroid.RADIUS, Asteroid.COLOR);
    }
    
    
    // debugger;

}

// function Asteroid(size) {
//     // this.num = num;
//     this.size = size;
//     this.moving_object = new MovingObject(1);
// }

module.exports = Asteroid;

// // rules for questions.
// // 1. what is the error msg?  what file does it lead you to?
// // 2. have you placed a debugger? what did it show you?
// // 3. have you googled?