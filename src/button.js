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

    clear() {
        this.element.setType("blank");
        this.element.setColor("empty");
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

module.exports = Button;