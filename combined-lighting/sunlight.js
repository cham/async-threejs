require([
    'js/controls-sunlight',
    'js/Sandbox'
], function(
    controls,
    Sandbox
){
    'use strict';

    function importedObject(geometry){
        var material = new THREE.MeshLambertMaterial({color: 0xA0522D});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.scale.set(0.5, 0.5, 0.5);
        mesh.rotation.y = Math.PI / 4;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }

    function plane(){
        var geometry = new THREE.CircleGeometry(2000, 256);
        var material  = new THREE.MeshLambertMaterial({color: 0x78ab46});
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
        var light = new THREE.HemisphereLight(0x3284ff, 0x78ab46, 0.8);

        light.position.set(0, 1000, 0);

        return light;
    }

    function directionallight(){
        var light = new THREE.DirectionalLight(0xfff4e5, 1);

        light.position.set(-50, 90, 50);

        light.castShadow = true;
        light.shadowMapWidth = 2048;
        light.shadowMapHeight = 2048;

        return light;
    }

    var jsonLoader = new THREE.JSONLoader();
    var file = 'models/scrat.js';

    jsonLoader.load(file, function run(geometry, materials){
        var datControls = controls();
        var stats = makeStats();
        var sandbox = new Sandbox({
            controls: datControls
        });
        var hemi = hemilight();
        var directional = directionallight();

        function tick(){
            stats.begin();
            sandbox.render();
            stats.end();

            if(directional.visible !== datControls.directional){
                sandbox.materialsNeedUpdate();
            }

            hemi.visible = datControls.hemisphere;
            directional.visible = datControls.directional;

            requestAnimationFrame(tick);
        }

        window.addEventListener('resize', function(){
            sandbox.resize();
        });

        sandbox.add(plane());
        sandbox.add(importedObject(geometry));

        sandbox.add(hemi);
        sandbox.add(directional);

        sandbox.appendTo(document.body);
        tick();
    });

});
