
class GameView {
    constructor(game, context) {
        this.game = game;
        this.context = context;
        // this.start();
    }

    start() {
        let that = this;
        setInterval(function() {that.game.moveObjects()}, 20);
        setInterval(function() {that.game.draw(this.context)}, 20);
    }
}

module.exports = GameView;