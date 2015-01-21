require([
    'js/Sandbox'
], function(
    Sandbox
){
    'use strict';

    function datControls(){
        var gui = new dat.GUI();
        var config = {
            colour: 0x339900,
            particleSize: 5,
            attenuation: true
        };

        gui.addColor(config, 'colour');
        gui.add(config, 'particleSize', 1, 10);
        gui.add(config, 'attenuation');

        return config;
    }

    function particleSphere(){
        var geometry = new THREE.SphereGeometry(120, 16, 12);
        var material = new THREE.PointCloudMaterial({
            size: 5,
            color: 0x339900
        });
        var system = new THREE.ParticleSystem(geometry, material);

        system.position.y = 100;

        return system;
    }

    function run(){
        var controls = datControls();
        var sandbox = new Sandbox();
        var sphere = particleSphere();

        function tick(){
            sandbox.render();

            sphere.material.color = new THREE.Color(controls.colour);
            sphere.material.size = controls.particleSize;
            if(sphere.material.sizeAttenuation !== controls.attenuation){
                sphere.material.sizeAttenuation = controls.attenuation;
                sphere.material.needsUpdate = true;
            }

            requestAnimationFrame(tick);
        }

        sandbox.add(sphere);

        sandbox.appendTo(document.body);
        requestAnimationFrame(tick);
    }

    run();

});
