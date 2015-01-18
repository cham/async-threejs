require([
    'js/controls-threepoint',
    'js/Sandbox'
], function(
    controls,
    Sandbox
){
    'use strict';

    function importedObject(geometry){
        var material = new THREE.MeshLambertMaterial({color: 0x023AD4});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.scale.set(2.5, 2.5, 2.5);
        mesh.rotation.y = Math.PI / 4;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }

    function plane(){
        var geometry = new THREE.PlaneBufferGeometry(1000, 1000, 1, 1);
        var material  = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('textures/sonic-floor.png')
        });

        material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
        material.map.repeat.set(32, 32);

        var mesh = new THREE.Mesh(geometry, material);

        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;

        return mesh;
    }

    function makeStats(){
        var stats = new Stats();

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = 0;
        document.body.appendChild(stats.domElement);

        return stats;
    }

    function hemilight(colour, x, y, z){
        var light = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.15);

        light.position.set(0, 1000, 0);

        return light;
    }

    function spotLight(options){
        var light = new THREE.SpotLight(options.colour, 1);

        light.position.set(options.x, options.y, options.z);

        light.castShadow = true;
        light.shadowMapWidth = 1024;
        light.shadowMapHeight = 1024;
        light.shadowDarkness = 0.2;

        light.target.position.set(0, 40, 0);

        return light;
    }

    function directionalLight(options){
        var light = new THREE.DirectionalLight(options.colour, 1);

        light.position.set(options.x, options.y, options.z);

        light.castShadow = true;
        light.shadowMapWidth = 1024;
        light.shadowMapHeight = 1024;
        light.shadowDarkness = 0.2;

        light.target.position.set(0, 40, 0);

        return light;
    }

    var jsonLoader = new THREE.JSONLoader();
    var file = 'models/sonic.js';

    jsonLoader.load(file, function run(geometry, materials){
        var datControls = controls();
        var stats = makeStats();
        var sandbox = new Sandbox({
            controls: datControls
        });
        var key = spotLight({
            colour: datControls.keyLightColour,
            x: datControls.keyLightX,
            y: datControls.keyLightY,
            z: datControls.keyLightZ
        });
        var fill = directionalLight({
            colour: datControls.fillLightColour,
            x: datControls.fillLightX,
            y: datControls.fillLightY,
            z: datControls.fillLightZ
        });
        var back = directionalLight({
            colour: datControls.backLightColour,
            x: datControls.backLightX,
            y: datControls.backLightY,
            z: datControls.backLightZ
        });
        // back.castShadow = false;

        function tick(){
            stats.begin();
            sandbox.render();
            stats.end();

            key.color = new THREE.Color(datControls.keyLightColour);
            key.position.set(datControls.keyLightX, datControls.keyLightY, datControls.keyLightZ);
            
            fill.color = new THREE.Color(datControls.fillLightColour);
            fill.position.set(datControls.fillLightX, datControls.fillLightY, datControls.fillLightZ);

            back.color = new THREE.Color(datControls.backLightColour);
            back.position.set(datControls.backLightX, datControls.backLightY, datControls.backLightZ);

            requestAnimationFrame(tick);
        }

        window.addEventListener('resize', function(){
            sandbox.resize();
        });

        sandbox.add(plane());
        sandbox.add(importedObject(geometry, materials));
        
        sandbox.add(key);
        sandbox.add(fill);
        sandbox.add(back);
        sandbox.add(hemilight());

        sandbox.camera.target.y = 200;

        sandbox.appendTo(document.body);
        tick();
    });

});
