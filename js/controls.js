define(function(){
    'use strict';

    return function datControls(){
        var gui = new dat.GUI();
        var config = {
            'rotation': true,
            'rotationSpeed': 0.01,
            'cameraDistance': 200,
            'cameraX': 200,
            'cameraY': 200,
            'cameraZ': 200,
            'ambient': 0x222222,
            'spotlight': 0xE9C2A6,
            'spotlightX': 100,
            'spotlightY': 100,
            'spotlightZ': -100
        };

        var f0 = gui.addFolder('Camera rotation');
        f0.add(config, 'rotation');
        f0.add(config, 'rotationSpeed', -0.1, 0.1);
        f0.add(config, 'cameraDistance', 0, 1000);
        f0.open();

        var f1 = gui.addFolder('Camera position');
        f1.add(config, 'cameraX', -1000, 1000);
        f1.add(config, 'cameraY', -1000, 1000);
        f1.add(config, 'cameraZ', -1000, 1000);
        f1.open();

        var f2 = gui.addFolder('Lighting');
        f2.addColor(config, 'ambient');
        f2.addColor(config, 'spotlight');
        f2.add(config, 'spotlightX', -1000, 1000);
        f2.add(config, 'spotlightY', -1000, 1000);
        f2.add(config, 'spotlightZ', -1000, 1000);
        f2.open();

        return config;
    };

});
