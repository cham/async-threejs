define(function(){
    'use strict';

    var dims = [200,200,200];
    var frameWidth = 0.5;

    function box(){
        var geometry = new THREE.BoxGeometry(dims[0], dims[1], dims[2]);
        var material  = new THREE.MeshLambertMaterial({
            color: 0x000000,
            transparent: true,
            opacity: 0.1
        });
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = 100;

        return mesh;
    }

    function strut(){
        var geometry = new THREE.BoxGeometry(dims[0], frameWidth, frameWidth);
        var material  = new THREE.MeshBasicMaterial({color: 0xffffff});
        return new THREE.Mesh(geometry, material);
    }

    function frameSide(){
        var group = new THREE.Group();
        var strut1 = strut();
        var strut2 = strut();
        var strut3 = strut();
        var strut4 = strut();

        strut2.rotation.z = Math.PI / 2;
        strut4.rotation.z = Math.PI / 2;

        strut2.position.x = dims[0] / 2;
        strut2.position.y = dims[0] / 2;
        strut3.position.y = dims[0];
        strut4.position.x = -dims[0] / 2;
        strut4.position.y = dims[0] / 2;

        group.add(strut1);
        group.add(strut2);
        group.add(strut3);
        group.add(strut4);

        return group;
    }

    function frame(){
        var group = new THREE.Group();
        var side1 = frameSide();
        var side2 = frameSide();
        var side3 = frameSide();
        var side4 = frameSide();

        side2.rotation.y = Math.PI / 2;
        side4.rotation.y = Math.PI / 2;

        side1.position.z = dims[0] / 2;
        side2.position.x = dims[0] / 2;
        side3.position.z = -dims[0] / 2;
        side4.position.x = -dims[0] / 2;

        group.add(side1);
        group.add(side2);
        group.add(side3);
        group.add(side4);

        return group;
    }

    return function boxFrame(){
        var group = new THREE.Group();

        group.add(box());
        group.add(frame());

        return group;
    };

});
