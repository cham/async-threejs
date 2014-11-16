require([
    'js/Sandbox'
], function(
    Sandbox
){
    'use strict';

    function sphere(){
        var geometry = new THREE.SphereGeometry(20, 32, 32);
        var material  = new THREE.MeshLambertMaterial({color: 0xff0000});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(0, 20, 0);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        return mesh;
    }

    function plane(){
        var geometry = new THREE.PlaneGeometry(200, 200, 32, 32);
        var material  = new THREE.MeshLambertMaterial({color: 0xffffff});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;

        return mesh;
    }

    function makeStats(){
        var stats = new Stats();

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0';
        document.body.appendChild(stats.domElement);

        return stats;
    }

    function run(){
        var stats = makeStats();
        var sandbox = new Sandbox();

        function tick(){
            stats.begin();
            sandbox.render();
            stats.end();

            requestAnimationFrame(tick);
        }

        sandbox.add(sphere());
        sandbox.add(plane());

        sandbox.appendTo(document.body);
        requestAnimationFrame(tick);
    }

    run();

});
