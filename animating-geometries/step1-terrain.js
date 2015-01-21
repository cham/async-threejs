require([
    'js/TerrainScene'
], function(
    TerrainScene
){
    'use strict';

    function makePlane(colours){
        var geometry = new THREE.PlaneGeometry(1000, 1000, 128, 128);
        var material  = new THREE.MeshPhongMaterial({
            color: 0xFF69B4
        });
        var wireframeMaterial  = new THREE.MeshPhongMaterial({
            color: 0x000000,
            wireframe: true
        });
        var mesh = new THREE.SceneUtils.createMultiMaterialObject(geometry, [
            material,
            wireframeMaterial
        ]);

        mesh.rotation.x = -Math.PI / 2;

        return mesh;
    }

    var terrainScene = new TerrainScene();
    var terrain = makePlane();

    terrainScene.appendTo(document.body);
    terrainScene.addTerrain(terrain);

    window.onresize = function(){
        terrainScene.resize();
    };

    function tick(){
        requestAnimationFrame(tick);
        terrainScene.render();
    }
    tick();

});
