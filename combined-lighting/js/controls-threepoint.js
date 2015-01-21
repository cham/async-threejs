define(function(){
    'use strict';

    return function datControls(){
        var gui = new dat.GUI();
        var config = {
            'rotation': false,
            'rotationSpeed': 0.01,
            'cameraDistance': 200,
            'cameraX': 37,
            'cameraY': 56,
            'cameraZ': 147,
            'targetY': 38,
            'keyLightColour': 0xffffff,
            'keyLightX': -52,
            'keyLightY': 210,
            'keyLightZ': 390,
            'fillLightColour': 0x777777,
            'fillLightX': 191,
            'fillLightY': 80,
            'fillLightZ': 169,
            'backLightColour': 0x999999,
            'backLightX': 90,
            'backLightY': 80,//500
            'backLightZ': -90//-400
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

        var f2 = gui.addFolder('Key Light');
        f2.addColor(config, 'keyLightColour');
        f2.add(config, 'keyLightX', -1000, 1000);
        f2.add(config, 'keyLightY', -1000, 1000);
        f2.add(config, 'keyLightZ', -1000, 1000);
        f2.open();

        var f3 = gui.addFolder('Fill Light');
        f3.addColor(config, 'fillLightColour');
        f3.add(config, 'fillLightX', -1000, 1000);
        f3.add(config, 'fillLightY', -1000, 1000);
        f3.add(config, 'fillLightZ', -1000, 1000);
        f3.open();

        var f4 = gui.addFolder('Back Light');
        f4.addColor(config, 'backLightColour');
        f4.add(config, 'backLightX', -1000, 1000);
        f4.add(config, 'backLightY', -1000, 1000);
        f4.add(config, 'backLightZ', -1000, 1000);
        f4.open();

        return config;
    };

});
