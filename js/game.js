/**
 * @author Victor Zegarra
 * @date 21/09/2026
 */

game_scene = new MiScene();

game_scene.preload = function () {
    this.loadImage('bg', 'assets/images/game/bg.png');
    this.loadImage('player', 'assets/images/game/player.png');
    // this.loadImage('platform', 'assets/images/game/platform.png');
    // this.loadImage('moving', 'assets/images/game/moving.png');
    // this.loadImage('snail', 'assets/images/game/snail.png');
    // this.loadImage('spikes', 'assets/images/game/spikes.png');
    // this.loadImage('gem', 'assets/images/game/gem.png');
    this.loadImage('burst', 'assets/images/game/burst.png');
    this.loadImage('zone_cleared', 'assets/images/game/zone_cleared.png');

    this.loadImage('head', 'assets/images/game/red-bull-sheet.png');

}

game_scene.create = function () {
    console.log("Creating game scene...");
    this.screen = 0;
    this.img_bg = new MiImage(this.getImage('bg'));
    this.add(this.img_bg);

    this.head = new MiSprite(this.getImage('head'), 40, 28);
    this.head.setAnimation({ frames: [0, 1], delay: 2, loop: true });
    this.head.update = function () {
        this.animate();
    }
    console.log("Head animation:");
    this.head.position(GAME_WIDTH - this.head.width - 10, 104);
    this.add(this.head);

    // console.log("Player animations:", this.player.anims);

    this.PLAYER_WDT = 40;
    this.PLAYER_HGT = 40;
    this.player = new MiSprite(this.getImage('player'), this.PLAYER_WDT, this.PLAYER_HGT);
    this.player.GRAVITY = 2;
    this.player.JUMP_FORCE = -16;
    this.player.DOUBLE_JUMP_FORCE = -12;
    this.player.SPEED_X = 2.5;
    this.player.setCollider(6, 2, 12, 22);
    this.player.update = this.player_update;
    this.player.bounds = { x1: 0, x2: GAME_WIDTH - this.player.width, y1: 0, y2: GAME_HEIGHT + this.player.height };

    this.player.anims = {};
    this.player.anims[STATE_IDLE | DIR_LEFT] = { frames: [0, 1], delay: 8, loop: true };
    this.player.anims[STATE_IDLE | DIR_RIGHT] = { frames: [2, 3], delay: 8, loop: true };
    this.player.anims[STATE_RUNNING | DIR_LEFT] = { frames: [4, 5], delay: 1, loop: true };
    this.player.anims[STATE_RUNNING | DIR_RIGHT] = { frames: [6, 7], delay: 1, loop: true };
    this.player.anims[STATE_JUMPING | DIR_LEFT] = { frames: [4], delay: 0, loop: false };
    this.player.anims[STATE_JUMPING | DIR_RIGHT] = { frames: [6], delay: 0, loop: false };

    this.player.setAnim = function (id) {
        this.setAnimation(this.anims[id]);
    }

    // this.SNAIL_WDT = 34;
    // this.SNAIL_HGT = 22;
    // this.SNAIL_SPEED_X = 1;
    // this.SNAIL_ANIM_LEFT = { frames: [0, 1], delay: 2, loop: true };
    // this.SNAIL_ANIM_RIGHT = { frames: [2, 3], delay: 2, loop: true };

    // this.SPIKES_WDT = 32;
    // this.SPIKES_HGT = 10;
    // this.SPIKES_ANIM = { frames: [0, 1], delay: 8, loop: true };
    // this.spikes = new MiSprite(this.getImage('spikes'), this.SPIKES_WDT, this.SPIKES_HGT);
    // this.spikes.setAnimation(this.SPIKES_ANIM);
    // this.spikes.update = function () {
    //     this.animate();
    // }
    // // this.add(this.spikes);
    // this.spikes.position(100, GAME_HEIGHT - this.SPIKES_HGT - 12);

    // this.GEM_WDT = 8;
    // this.GEM_HGT = 10;
    // this.GEM_ANIM = { frames: [0, 1, 1, 2, 2, 2, 1, 1, 0, 0], delay: 0, loop: true };
    // this.GEM_ANIM = { frames: [0, 1, 2, 3], delay: 4, loop: true };

    this.BURST_WDT = 64;
    this.BURST_HGT = 64;
    this.BURST_ANIM_RESPAWN = { frames: [3, 2, 1, 0], delay: 0, loop: false };
    this.BURST_ANIM_DESPAWN = { frames: [0, 1, 2, 3], delay: 0, loop: false };

    this.burst = new MiSprite(this.getImage('burst'), this.BURST_WDT, this.BURST_HGT);
    this.burst.update = function () {
        this.animate();
    }
    this.burst.onEndAnimation = function (anim) {
        if (anim === game_scene.BURST_ANIM_DESPAWN) {
            this.isVisible = false;
            game_scene.start();
        } else if (anim === game_scene.BURST_ANIM_RESPAWN) {
            this.isVisible = false;
            game_scene.state = GAME_PLAYING;
            game_scene.player.isVisible = true;
            game_scene.turn_right();
        }
    }

    // this.enemies = [];
    // this.items = [];
    // this.platforms = [];

    this.level = {
        //     enemies: [
        //         { x: 200, y: 367, dir: DIR_LEFT, x1: 0, x2: GAME_WIDTH - this.SNAIL_WDT },
        //         { x: 128, y: 319, dir: DIR_RIGHT, x1: 80, x2: GAME_WIDTH - this.SNAIL_WDT }
        //     ],
        //     items: [
        //         { x: 200, y: 224 },
        //         { x: 150, y: 272 },
        //         { x: 180, y: 272 }
        //     ],
        floors: [87, 143, 199, 255, 311],
        player: { x: 24, y: 200 }
    };
    this.MAX_FLOOR = 4;
    this.FLOOR_HGT = 56;

    this.ZONE_CLEARED_WDT = 128;
    this.ZONE_CLEARED_HGT = 32;
    this.ZONE_CLEARED_ANIM = { frames: [0, 1, 0, 1, 0, 1], delay: 8, loop: false };
    this.zone_cleared = new MiSprite(this.getImage('zone_cleared'), this.ZONE_CLEARED_WDT, this.ZONE_CLEARED_HGT);
    this.zone_cleared.setAnimation(this.ZONE_CLEARED_ANIM);
    this.zone_cleared.position((GAME_WIDTH - this.ZONE_CLEARED_WDT) >> 1, 150);
    this.zone_cleared.update = function () {
        this.animate();
    }
    this.zone_cleared.onEndAnimation = function (anim) {
        game_scene.start();
    }
}

game_scene.start = function () {
    game_scene.state = GAME_READY;

    this.remove(this.player);
    this.remove(this.burst);
    this.remove(this.zone_cleared);

    // for (let enemy of this.enemies) {
    //     this.remove(enemy);
    // }
    // this.enemies.length = 0;

    // for (let item of this.items) {
    //     this.remove(item);
    // }
    // this.items.length = 0;

    this.curr_floor = this.MAX_FLOOR;
    this.player_init();

    // for (let enemy of this.level.enemies) {
    //     let snail = this.spawn_snail(enemy.x, enemy.y, enemy.dir, enemy.x1, enemy.x2);
    //     this.add(snail);
    //     this.enemies.push(snail);
    // }

    // for (let item of this.level.items) {
    //     let gem = this.spawn_gem(item.x, item.y);
    //     this.add(gem);
    //     this.items.push(gem);
    // }

    this.add(this.player);
    this.add(this.burst);

    this.burst.position(this.player.x - 16, this.player.y - 16);
    this.burst.setAnimation(this.BURST_ANIM_RESPAWN);
    this.burst.isVisible = true;

    this.add(this.zone_cleared);
    this.zone_cleared.isVisible = false;
}

game_scene.player_init = function () {
    this.player.dir = DIR_RIGHT;
    this.player.state = STATE_IDLE;
    this.player.vx = 0;
    this.player.vy = 0;
    // this.player.jumping = false;
    // this.player.doubleJump = false;

    // this.player.position(24, this.platforms[this.level.platforms.length - 1].cy - this.player.height);
    // this.player.position(tthis.platforms[this.level.platforms.length - 1]his.level.player.x, this.level.player.y);
    this.player.position(24, this.level.floors[game_scene.curr_floor] - this.player.height);

    this.player.setAnim(STATE_IDLE | DIR_RIGHT);
    this.player.isVisible = false;
    this.player.onPlatform = null;
}

game_scene.player_update = function () {
    this.animate();

    this.move(this.vx, this.vy);

    if (this.y > this.bounds.y2) {
        this.position(this.x, -this.height);
    }
    if (this.x < this.bounds.x1) {
        this.position(this.bounds.x1, this.y);
        game_scene.turn_right();
    } else if (this.x > this.bounds.x2) {
        this.position(this.bounds.x2, this.y);
        game_scene.turn_left();
    }
}

// game_scene.spawn_snail = function (x, y, dir, x1, x2) {
//     let snail = new MiSprite(this.getImage('snail'), this.SNAIL_WDT, this.SNAIL_HGT);

//     snail.position(x, y);
//     snail.bounds = { x1: x1, x2: x2, y1: 0, y2: 0 };
//     snail.update = game_scene.snail_update;

//     if (dir === DIR_LEFT) {
//         snail.vx = -this.SNAIL_SPEED_X;
//         snail.setAnimation(this.SNAIL_ANIM_LEFT);
//         snail.direction = DIR_LEFT;
//     } else {
//         snail.vx = this.SNAIL_SPEED_X;
//         snail.setAnimation(this.SNAIL_ANIM_RIGHT);
//         snail.direction = DIR_RIGHT;
//     }
//     snail.setCollider(3, 5, 28, 17);
//     return snail;
// }

// game_scene.snail_update = function () {
//     if (game_scene.state !== GAME_PLAYING) {
//         return;
//     }
//     this.animate();
//     this.move(this.vx, 0);

//     if (this.collidesWith(game_scene.player)) {
//         game_scene.set_state_game_over();
//     }

//     if (this.x < this.bounds.x1) {
//         this.vx = game_scene.SNAIL_SPEED_X;
//         this.direction = DIR_RIGHT;
//         this.setAnimation(game_scene.SNAIL_ANIM_RIGHT);
//     } else if (this.x > this.bounds.x2) {
//         this.vx = -game_scene.SNAIL_SPEED_X;
//         this.direction = DIR_LEFT;
//         this.setAnimation(game_scene.SNAIL_ANIM_LEFT);
//     }
// }

// game_scene.spawn_gem = function (x, y) {
//     let gem = new MiSprite(this.getImage('gem'), this.GEM_WDT, this.GEM_HGT);

//     gem.position(x, y);
//     gem.setAnimation(this.GEM_ANIM);
//     gem.setCollider(2, 3, 4, 4);
//     gem.update = game_scene.gem_update;

//     return gem;
// }

// game_scene.gem_update = function () {
//     this.animate();

//     if (this.collidesWith(game_scene.player)) {
//         // El jugador recoge la gema
//         game_scene.remove(this);
//         let index = game_scene.items.indexOf(this);
//         if (index > -1) {
//             game_scene.items.splice(index, 1);
//         }
//         if (game_scene.items.length === 0) {
//             // Todas las gemas recogidas, reiniciar el nivel
//             // game_scene.start();
//             game_scene.zone_cleared.isVisible = true;
//             game_scene.state = GAME_VICTORY;
//         }
//     }
// }

game_scene.keyDown = function (event) {
    // console.log(event.key + " " + event.code);
    switch (event.code) {
        case "KeyA":
        case "ArrowLeft":
            this.turn_left();
            break;
        case "KeyD":
        case "ArrowRight":
            this.turn_right();
            break;
        case "KeyW":
        case "ArrowUp":
            this.go_up();
            break;
        case "KeyS":
        case "ArrowDown":
            this.go_down();
            break;
        case "Espace":
            break;
        case "Escape":
            this.start();
            break
    }
}

game_scene.touchStart = function (x, y) {
    this.startX = x;
    this.startY = y;
}

game_scene.touchEnd = function (x, y) {
    const SWIPE_THRESHOLD = 10; // píxeles mínimos para considerar swipe
    const dx = x - this.startX;
    const dy = y - this.startY;

    // alert(this.startX + "," + this.startY + " Tap detected " + x + "," + y);

    // if (x === this.startX && y === this.startY) {
    //     this.jump();
    // } else if (Math.abs(dx) > Math.abs(dy)) {
    //     if (dx < 0) {
    //         this.turn_left();
    //     } else {
    //         this.turn_right();
    //     }
    // }

    if (x === this.startX && y === this.startY) {
        // this.jump();
    } else if (Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) {
            this.turn_left();
        } else {
            this.turn_right();
        }
    } else {
        if (dy < 0) {
            this.go_up();
        } else {
            this.go_down();
        }
    }

    // if (Math.abs(dx) < SWIPE_THRESHOLD && Math.abs(dy) < SWIPE_THRESHOLD) {
    //     alert("Tap detected " + dx + "," + dy);
    //     this.jump();
    //     return;
    // }
    // if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) >= SWIPE_THRESHOLD) {
    //     // Horizontal swipe
    //     if (dx < 0) {
    //         this.turn_left();
    //     } else {
    //         this.turn_right();
    //     }
    // }
}

game_scene.turn_left = function () {
    if (this.player.state === STATE_IDLE) {
        this.player.state = STATE_RUNNING;
        this.player.dir = DIR_NONE;
    }
    if (this.player.dir !== DIR_LEFT) {
        this.player.dir = DIR_LEFT;
        this.player.vx = -this.player.SPEED_X;
        this.player.setAnim(this.player.state | DIR_LEFT);
    }
}

game_scene.turn_right = function () {
    if (this.player.state === STATE_IDLE) {
        this.player.state = STATE_RUNNING;
        this.player.dir = DIR_NONE;
    }
    if (this.player.dir !== DIR_RIGHT) {
        this.player.dir = DIR_RIGHT;
        this.player.vx = this.player.SPEED_X;
        this.player.setAnim(this.player.state | DIR_RIGHT);
    }
}

game_scene.go_up = function () {
    if (this.curr_floor > 0) {
        this.curr_floor--;
        this.player.move(0, -this.FLOOR_HGT);
    }
}


game_scene.go_down = function () {
    if (this.curr_floor < this.MAX_FLOOR) {
        this.curr_floor++;
        this.player.move(0, this.FLOOR_HGT);
    }
}

game_scene.idle = function () {
    this.player.vx = 0;
    this.player.state = STATE_IDLE;
    this.player.setAnim(STATE_IDLE | this.player.dir);
}

game_scene.set_state_game_over = function () {
    this.state = GAME_OVER;
    this.player.isVisible = false;
    this.burst.position(this.player.x - 16, this.player.y - 16);
    this.burst.setAnimation(this.BURST_ANIM_DESPAWN);
    this.burst.isVisible = true;
}