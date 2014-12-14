require([
    'js/controls',
    'js/Sandbox'
], function(
    controls,
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
        var geometry = new THREE.PlaneBufferGeometry(2000, 2000, 256, 256);
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
        document.body.appendChild(stats.domElement);

        return stats;
    }

    var jsonLoader = new THREE.JSONLoader();
    var file = '../importing-objects/horse.js';

    jsonLoader.load(file, function run(geometry, materials){
        var datControls = controls();
        var stats = makeStats();
        var sandbox = new Sandbox({
            controls: datControls
        });

        function tick(){
            stats.begin();
            sandbox.render();
            stats.end();

            requestAnimationFrame(tick);
        }

        window.addEventListener('resize', function(){
            sandbox.resize();
        });

        sandbox.add(plane());
        sandbox.add(importedObject(geometry, materials[0]));

        sandbox.appendTo(document.body);
        tick();
    });

});
