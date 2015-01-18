define(function(){
    'use strict';

    return function datControls(){
        var gui = new dat.GUI();
        var config = {
            'rotation': false,
            'rotationSpeed': 0.01,
            'cameraDistance': 200,
            'cameraX': 35,
            'cameraY': 45,
            'cameraZ': 170,
            'targetY': 25,
            'hemisphere': true,
            'directional': true
        };

        var f0 = gui.addFolder('Camera rotation');
        f0.add(config, 'rotation');
        f0.add(config, 'rotationSpeed', -0.1, 0.1);
        f0.add(config, 'cameraDistance', 0, 1000);

        var f1 = gui.addFolder('Camera position');
        f1.add(config, 'cameraX', -1000, 1000);
        f1.add(config, 'cameraY', 1, 1000);
        f1.add(config, 'cameraZ', -1000, 1000);
        f1.add(config, 'targetY', 1, 200);

        var f2 = gui.addFolder('Lighting');
        f2.add(config, 'hemisphere');
        f2.add(config, 'directional');
        f2.open();

        return config;
    };

});
