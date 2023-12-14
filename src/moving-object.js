console.log("im the moving object") 

class MovingObject {
    constructor(pos, vel, radius, color) {
        this.pos = pos;
        this.color = color;
        this.radius = radius;
        this.vel = vel;
    }

    draw(ctx) {
        console.log("called draw")
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);

        ctx.fill();

    }

    move() {
        this.pos[0] += this.vel[0];
        this.pos[1] += this.vel[1];
    }

    // const ctx = canvasEle.getContext('2d');
    // ctx.fillStyle = 'black';
    // ctx.fillRect(0, 0, canvasEle.width, canvasEle.height)

    // ctx.beginPath();
    // ctx.arc(250, 250, 50, 0, 2 * Math.PI / 2);
    // ctx.strokeStyle = 'white';
    // ctx.lineWidth = 20;
    
    // ctx.fillStyle = 'blue';
    // ctx.fill();
    // ctx.stroke();
}

module.exports = MovingObject;