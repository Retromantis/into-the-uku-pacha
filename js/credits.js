
credits_scene = new MiScene();

credits_scene.preload = function () {
    this.loadImage('bg', 'assets/images/credits/bg.png');
    this.loadImage('btn_quit', 'assets/images/credits/bt-quit-132x30.png');
}

credits_scene.create = function () {
    this.add(new MiImage(this.getImage('bg')));

    this.spr_quit = new MiSprite(this.getImage('btn_quit'), 132, 30);
    this.spr_quit.centerX = true;
    this.spr_quit.position(GAME_WIDTH_HALF, 186);
    this.add(this.spr_quit);
}

credits_scene.touchStart = function (x, y) {
    if (this.spr_quit.inBounds(x, y)) {
        this.spr_quit.frameIndex = 1;
    }
}

credits_scene.touchEnd = function (x, y) {
    this.spr_quit.frameIndex = 0;
    game.startScene('menu');
}