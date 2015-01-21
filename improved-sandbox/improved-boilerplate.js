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
        var geometry = new THREE.PlaneBufferGeometry(200, 200, 32, 32);
        var material  = new THREE.MeshLambertMaterial({color: 0xffffff});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;

        return mesh;
    }

    var jsonLoader = new THREE.JSONLoader();
    var file = '../importing-objects/horse.js';

    jsonLoader.load(file, function run(geometry, materials){
        var datControls = controls();
        var sandbox = new Sandbox({
            controls: datControls
        });

        function tick(){
            sandbox.render();

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