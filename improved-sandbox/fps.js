require([
    'js/Sandbox'
], function(
    Sandbox
){
    'use strict';

    function importedObject(geometry, material){
        var mesh = new THREE.Mesh(geometry, material);

        mesh.scale.set(5, 5, 5);
        mesh.position.y = 25;
        mesh.rotation.y = Math.PI / 4;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }

    function plane(){
        var geometry = new THREE.PlaneBufferGeometry(200, 200, 32, 32);
        var material  = new THREE.MeshLambertMaterial({color: 0xffffff});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;

        return mesh;
    }

    function makeStats(){
        var stats = new Stats();

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = 0;
        stats.domElement.style.right = 0;
        document.body.appendChild(stats.domElement);

        return stats;
    }

    var jsonLoader = new THREE.JSONLoader();
    var file = '../importing-objects/horse.js';

    jsonLoader.load(file, function run(geometry, materials){
        var stats = makeStats();
        var sandbox = new Sandbox({
            controls: {
                rotation: true,
                rotationSpeed: 0.01,
                cameraDistance: 200,
                cameraX: 150,
                cameraY: 80,
                cameraZ: -10,
                ambient: 0x111111,
                spotlight: 0xE9C2A6,
                spotlightX: 100,
                spotlightY: 100,
                spotlightZ: -100
            }
        });

        function tick(){
            stats.begin();
            sandbox.render();
            stats.end();

            requestAnimationFrame(tick);
        }

        sandbox.add(plane());
        sandbox.add(importedObject(geometry, materials[0]));

        window.addEventListener('resize', function(){
            sandbox.resize();
        });

        sandbox.appendTo(document.body);
        requestAnimationFrame(tick);
    });

});