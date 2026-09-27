menu_scene = new MiScene();

menu_scene.preload = function () {
    this.loadImage('bg', 'assets/images/menu/bg-menu-180x320.png');
    this.loadImage('btn_play', 'assets/images/menu/bt-play-132x30.png');
    this.loadImage('btn_credits', 'assets/images/menu/bt-credits-132x30.png');
}

menu_scene.create = function () {
    this.add(new MiImage(this.getImage('bg')));

    this.spr_play = new MiSprite(this.getImage('btn_play'), 132, 30);
    this.spr_play.centerX = true;
    this.spr_play.position(GAME_WIDTH_HALF, 144);
    this.add(this.spr_play);

    this.spr_credits = new MiSprite(this.getImage('btn_credits'), 132, 30);
    this.spr_credits.centerX = true;
    this.spr_credits.position(GAME_WIDTH_HALF, 186);
    this.add(this.spr_credits);

}

menu_scene.touchStart = function (x, y) {
    this.choose = -1;
    if (this.spr_play.inBounds(x, y)) {
        this.spr_play.frameIndex = 1;
        this.choose = 0;
        // game.startScene('game');
    }
    if (this.spr_credits.inBounds(x, y)) {
        this.spr_credits.frameIndex = 1;
        this.choose = 1;
        // game.startScene('credits');
    }
}

menu_scene.touchEnd = function (x, y) {
    this.spr_play.frameIndex = 0;
    this.spr_credits.frameIndex = 0;

    switch (this.choose) {
        case 0:
            game.startScene('game');
            break;
        case 1:
            game.startScene('credits');
            break;
    }
}


menu_scene.keyDown = function (event) {
    // console.log(event.key + " " + event.code);
    // switch (event.code) {
    //     case "KeyA":
    //     case "ArrowLeft":
    //         this.turn_left();
    //         break;
    //     case "KeyD":
    //     case "ArrowRight":
    //         this.turn_right();
    //         break;
    //     case "KeyW":
    //     case "ArrowUp":
    //         this.go_up();
    //         break;
    //     case "KeyS":
    //     case "ArrowDown":
    //         this.go_down();
    //         break;
    //     case "Espace":
    //         break;
    //     case "Escape":
    //         this.start();
    //         break
    // }
}
