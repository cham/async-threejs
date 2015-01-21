require([
    'js/TerrainScene'
], function(
    TerrainScene
){
    'use strict';

    function makePlane(colours, width, height){
        var geometry = new THREE.PlaneGeometry(1000, 1000, 128, 128);
        var material  = new THREE.MeshPhongMaterial({
            color: colours.fill,
            ambient: 0x000000
        });
        var wireframeMaterial  = new THREE.MeshPhongMaterial({
            color: colours.wireframe,
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
    var terrain = makePlane({fill: 0xFF69B4, wireframe: 0});

    terrainScene.appendTo(document.body);
    terrainScene.addTerrain(terrain);

    window.onresize = function(){
        terrainScene.resize();
    };

    function tick(){
        requestAnimationFrame(tick);

        var geometry = terrain.children[0].geometry;
        var vertices = geometry.vertices;
        var numVertices = vertices.length;
        var movementRange = 4;

        for(var i = 0; i < numVertices; i++){
            vertices[i].z += Math.random() * movementRange - movementRange / 2;
        }

        geometry.verticesNeedUpdate = true;

        terrainScene.render();
    }
    tick();

});
