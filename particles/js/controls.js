define(function(){
    'use strict';

    return function datControls(){
        var gui = new dat.GUI();
        var config = {
            'accelX': 0.01,
            'accelY': 0.02,
            'accelZ': 0.04,
            'randomness': 0.00001,
            'emitParticles': true,
            'animate': true,
            'strobe': false,
            'strobeDelay': 100
        };

        var f0 = gui.addFolder('Scene');
        f0.add(config, 'animate');
        f0.open();

        var f1 = gui.addFolder('Gravity');
        f1.add(config, 'accelX', 0, 0.5, 0.001);
        f1.add(config, 'accelY', 0, 0.5, 0.001);
        f1.add(config, 'accelZ', 0, 0.5, 0.001);
        f1.open();

        var f2 = gui.addFolder('Stream Controls');
        f2.add(config, 'emitParticles');
        f2.add(config, 'randomness', 0, 0.5, 0.01);
        f2.open();

        var f3 = gui.addFolder('Strobe Controls');
        f3.add(config, 'strobe');
        f3.add(config, 'strobeDelay', 1, 2000, 1);
        f3.open();

        return config;
    };

});
