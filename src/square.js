
class Square {
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

module.exports = Square;