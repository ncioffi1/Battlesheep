const Square = require('./square.js');

class UIObject {
    constructor(context, xPos, yPos, xSize, ySize, type, color, status) {
        this.context = context;
        this.xPos = xPos;
        this.yPos = yPos;
        this.xSize = xSize;
        this.ySize = ySize;
        this.type = type;
        this.color = color;
        this.status = status;
        this.image;
        this.loadAllImages();
    }

    press() {
        console.log("PRESSED");
        this.color = "pressed";
        setTimeout(() => { 
            this.color = "unpressed";
            if (this.status === "on"){
                this.status = "off";
            } else if (this.status === "off") {
                this.status = "on";
            }
        }, 100);
    }

    draw() {
        let filepath = ""
        if (this.type === "gameplay") {
            if (this.color === "unpressed"){
                this.image = this.img1;
            } else if (this.color === "pressed") {
                this.image = this.img2;
            }
        } else if (this.type === "music") {
            if (this.color === "unpressed"){
                if (this.status === "on"){
                    this.image = this.img3;
                } else if (this.status === "off"){
                    this.image = this.img4;
                }
            } else if (this.color === "pressed"){
                if (this.status === "on"){
                    this.image = this.img5;
                } else if (this.status === "off"){
                    this.image = this.img6;
                }
            }
        } else if (this.type === "sound"){
            if (this.color === "unpressed"){
                if (this.status === "on"){
                    this.image = this.img7;
                } else if (this.status === "off"){
                    this.image = this.img8;
                }
            } else if (this.color === "pressed"){
                if (this.status === "on"){
                    this.image = this.img9;
                } else if (this.status === "off"){
                    this.image = this.img10;
                }
            }
        }

        if (this.image !== undefined){
            this.context.drawImage(this.image, (this.xPos - this.xSize/2), (this.yPos - this.ySize/2), this.xSize, this.ySize)
        }

    }

    loadAllImages() {
        // this.images = [this.img1, this.img2, this.img3, this.img4, this.img5, this.img6, this.img7, this.img8, this.img9, this.img10];
        this.filepaths = [
            'assets/UI/button_rect.png',
            'assets/UI/button_rect_pressed.png',
            'assets/UI/music_on_base.png',
            'assets/UI/music_off_base.png',
            'assets/UI/music_on_pressed.png',
            'assets/UI/music_off_pressed.png',
            'assets/UI/sound_on_base.png',
            'assets/UI/sound_off_base.png',
            'assets/UI/sound_on_pressed.png',
            'assets/UI/sound_off_pressed.png'
        ]
        this.img1 = this.setImage(this.context, this.filepaths[0], this.xPos, this.yPos, this.xSize, this.ySize);
        this.img2 = this.setImage(this.context, this.filepaths[1], this.xPos, this.yPos, this.xSize, this.ySize);
        this.img3 = this.setImage(this.context, this.filepaths[2], this.xPos, this.yPos, this.xSize, this.ySize);
        this.img4 = this.setImage(this.context, this.filepaths[3], this.xPos, this.yPos, this.xSize, this.ySize);
        this.img5 = this.setImage(this.context, this.filepaths[4], this.xPos, this.yPos, this.xSize, this.ySize);
        this.img6 = this.setImage(this.context, this.filepaths[5], this.xPos, this.yPos, this.xSize, this.ySize);
        this.img7 = this.setImage(this.context, this.filepaths[6], this.xPos, this.yPos, this.xSize, this.ySize);
        this.img8 = this.setImage(this.context, this.filepaths[7], this.xPos, this.yPos, this.xSize, this.ySize);
        this.img9 = this.setImage(this.context, this.filepaths[8], this.xPos, this.yPos, this.xSize, this.ySize);
        this.img10 = this.setImage(this.context, this.filepaths[9], this.xPos, this.yPos, this.xSize, this.ySize);
        
        // console.log("load complete");

    }

    setImage(context, filepath, xPos, yPos, xSize, ySize) {
        let _img = new Image();
        _img.src = filepath;
        // console.log(filepath);
        // console.log(_img);
        return _img;
    }

    setImageInCanvas(context, filepath, xPos, yPos, xSize, ySize) {
        var img1 = new Image();
        img1.src = filepath;
        this.image = img1;
    }
}

module.exports = UIObject;