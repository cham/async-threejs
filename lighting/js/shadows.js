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
            'lightX': 100,
            'lightY': 100,
            'lightZ': -100,
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
        f1.open();

        var f2 = gui.addFolder('Shadows');
        f2.add(config, 'castShadow', true);
        f2.add(config, 'shadowDarkness', 0, 1);
        f2.add(config, 'showFrustrum', false);
        f2.open();

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

    function cube(){
        var geometry = new THREE.BoxGeometry(40, 40, 40);
        var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0, 20, 0);
        mesh.castShadow = true;

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

    function run(){
        var datControls = controls();
        var stats = makeStats();
        var sandbox = new Sandbox({
            controls: datControls,
            lightType: 'spotlight'
        });

        function tick(){
            stats.begin();
            sandbox.render();
            stats.end();

            requestAnimationFrame(tick);
        }

        sandbox.add(pyramid());
        sandbox.add(cube());
        sandbox.add(sphere());
        sandbox.add(plane());

        window.addEventListener('resize', function(){
            sandbox.resize();
        });

        sandbox.appendTo(document.body);
        requestAnimationFrame(tick);
    }

    run();

});