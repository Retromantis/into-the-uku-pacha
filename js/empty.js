
empty_scene = new MiScene();

empty_scene.preload = function () {
    this.loadImage('bg', 'assets/images/empty/bg.png');
}

empty_scene.create = function () {
    this.add(new MiImage(this.getImage('bg')));
}