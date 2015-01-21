define(function(){
    'use strict';

    function makePlane(colours, width, height){
        var geometry = new THREE.PlaneGeometry(1000, 1000, Math.ceil(width / 2), Math.ceil(height / 2));
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

    function setFaceVelocity(vertices, face, velocity){
        vertices[face.a].z = velocity;
        vertices[face.b].z = velocity;
        vertices[face.c].z = velocity;
    }

    function requiredOptions(opt){
        if(!opt.colours){
            throw new Error('colours {fill,wireframe} is required');
        }
        if(!opt.width){
            throw new Error('width is required');
        }
        if(!opt.height){
            throw new Error('height is required');
        }
    }

    function Terrain(options){
        requiredOptions(options || {});

        this.width = options.width;
        this.plane = makePlane(options.colours, options.width, options.height);
    }

    Terrain.prototype.getObject = function getObject(){
        return this.plane;
    };

    Terrain.prototype.update = function(vertexData){
        var numDataPoints = vertexData.length;
        var geometry = this.plane.children[0].geometry;
        var vertices = geometry.vertices;
        var faces = geometry.faces;

        for(var i = 0; i < numDataPoints; i++){
            setFaceVelocity(vertices, faces[i], vertexData[i]);
        }

        geometry.verticesNeedUpdate = true;
    };

    Terrain.prototype.smearDown = function(){
        var geometry = this.plane.children[0].geometry;
        var vertices = geometry.vertices;
        var faces = geometry.faces;

        for(var i = faces.length - 1; i >= this.width; i--){
            var aVelocity = vertices[faces[i - this.width].a].z;
            var bVelocity = vertices[faces[i - this.width].b].z;
            var cVelocity = vertices[faces[i - this.width].c].z;
            var avgVelocity = (aVelocity + bVelocity + cVelocity) / 3;
            setFaceVelocity(vertices, faces[i], avgVelocity);
        }

        geometry.verticesNeedUpdate = true;
    };

    return Terrain;

});
