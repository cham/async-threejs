require([
    'Sandbox'
], function(
    Sandbox
){
    'use strict';

    function controls(){
        var gui = new dat.GUI();
        var config = {
            'rotation': false,
            'rotationSpeed': 0.01,
            'cameraDistance': 400,
            'cameraX': 300,
            'cameraY': 160,
            'cameraZ': 0,
            'ambient': 0x000000,
            'lightColour': 0xffffff,
            'lightX': 15,
            'lightY': 60,
            'lightZ': -15,
            'lightDistance': 200,
            'showFrustrum': false,
            'castShadow': true,
            'shadowDarkness': 0.4
        };

        var f0 = gui.addFolder('Camera rotation');
        f0.add(config, 'rotation');
        f0.open();

        var f1 = gui.addFolder('Lighting');
        f1.addColor(config, 'lightColour');
        f1.add(config, 'lightX', -1000, 1000);
        f1.add(config, 'lightY', -1000, 1000);
        f1.add(config, 'lightZ', -1000, 1000);
        f1.add(config, 'lightDistance', 1, 1000);
        f1.open();

        return config;
    }

    function sphere(){
        var geometry = new THREE.SphereGeometry(20, 32, 32);
        var material = new THREE.MeshLambertMaterial({color: 0xff0000});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0, 20, 50);
        mesh.castShadow = true;

        return mesh;
    }

    function importedObject(geometry){
        var material = new THREE.MeshLambertMaterial({color: 0xffffff});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.scale.set(0.4, 0.4, 0.4);
        mesh.rotation.y = Math.PI / 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }

    function plane(){
        var geometry = new THREE.PlaneBufferGeometry(2000, 2000, 128, 128);
        var material  = new THREE.MeshLambertMaterial({color: 0xffffff});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;

        return mesh;
    }

    function pyramid(){
        var geometry = new THREE.CylinderGeometry(0, 20, 40, 3);
        var material  = new THREE.MeshLambertMaterial({color: 0x0000ff});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0, 20, -50);
        mesh.castShadow = true;

        return mesh;
    }

    function makeStats(){
        var stats = new Stats();

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = 0;
        document.body.appendChild(stats.domElement);

        return stats;
    }

    var jsonLoader = new THREE.JSONLoader();
    var file = 'models/statue.js';

    jsonLoader.load(file, function(geometry){
        var datControls = controls();
        var stats = makeStats();
        var sandbox = new Sandbox({
            controls: datControls,
            lightType: 'point'
        });

        function tick(){
            stats.begin();
            sandbox.render();
            stats.end();

            requestAnimationFrame(tick);
        }

        sandbox.add(pyramid());
        sandbox.add(importedObject(geometry));
        sandbox.add(sphere());
        sandbox.add(plane());

        window.addEventListener('resize', function(){
            sandbox.resize();
        });

        sandbox.appendTo(document.body);
        requestAnimationFrame(tick);
    });

});