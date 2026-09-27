/**
 * @author Victor Zegarra
 * @date 20/09/2026
 */

GAME_WIDTH = 180;
GAME_HEIGHT = 320;

GAME_WIDTH_HALF = GAME_WIDTH >> 1;
GAME_HEIGHT_HALF = GAME_HEIGHT >> 1;

document.addEventListener("DOMContentLoaded", () => {
    // player_dies = new Audio('assets/sfx/player_dies.mp3');
    // player_dies.volume = 0.1;
    // bg_music = new Audio('assets/sfx/bg_music.wav');
    // bg_music.loop = true;
    // bg_music.volume = 1;

    game = createGame(null, 0, 0, GAME_WIDTH, GAME_HEIGHT, false);
    game.addScene('empty', empty_scene);
    // game.addScene('splash', splash_scene);
    game.addScene('credits', credits_scene);
    game.addScene('game', game_scene);
    game.addScene('menu', menu_scene);
    game.startScene('empty');
});