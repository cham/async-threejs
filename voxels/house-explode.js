define([
    'js/Sandbox'
], function(
    Sandbox
){

    var wall = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 1, 1, 1]
    ];
    var wallWithWindow = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 0, 0, 1, 1, 1]
    ];
    var wallWithoutDoor = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
    ];
    var floor = [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
    ];
    var roof = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];
    var chimney = [
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0]
    ];

    function hemilight(colour){
        var light = new THREE.HemisphereLight(0x3284ff, 0x78ab46, 0.8);

        light.position.set(0, 1, 0);

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

    function plane(){
        var geometry = new THREE.PlaneBufferGeometry(500, 500, 32, 32);
        var material  = new THREE.MeshLambertMaterial({color: 0xffffff});
        var mesh = new THREE.Mesh(geometry, material);

        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;

        return mesh;
    }

    var voxelSize = 20;
    function voxel(x, y, z){
        var geometry = new THREE.BoxGeometry(voxelSize, voxelSize, voxelSize);
        var material = new THREE.MeshLambertMaterial({
            map: THREE.ImageUtils.loadTexture('img/minecraft_brick.jpg')
        });
        var mesh = new THREE.Mesh(geometry, material);

        mesh.position.set(voxelSize * x, voxelSize * y + voxelSize / 2, voxelSize * z);

        return mesh;
    }

    var house = [floor, wall, wallWithWindow, wallWithWindow, wallWithoutDoor, floor, roof, chimney, chimney];

    function run(){
        var sandbox = new Sandbox();

        function tick(){
            sandbox.render();

            requestAnimationFrame(tick);
        }

        var houseGroup = new THREE.Group();

        house.forEach(function(slice, sliceNum){
            slice.forEach(function(row, rowNum){
                row.forEach(function(point, pointNum){
                    if(point === 1){
                        houseGroup.add(voxel(rowNum, sliceNum, pointNum));
                    }
                });
            });
        });

        houseGroup.position.x = -45;
        houseGroup.position.z = -45;

        sandbox.add(houseGroup);
        sandbox.add(plane());
        sandbox.add(hemilight());
        sandbox.add(directionallight());

        sandbox.appendTo(document.body);

        setTimeout(function explode(){
            var min = 0;
            var max = 7 * voxelSize;
            var globalAccel = new THREE.Vector3(0, -5, 0);
            houseGroup.children.forEach(function(voxel){
                voxel.velocity = new THREE.Vector3(
                    -(max / 2 - voxel.position.x) * (Math.random() / 5),
                    -(max / 2 - voxel.position.y) * (Math.random() / 5),
                    -(max / 2 - voxel.position.z) * (Math.random() / 5)
                );
                voxel.spin = new THREE.Vector3(
                    Math.random(),
                    Math.random(),
                    Math.random()
                );
            });

            function explodeTick(){
                requestAnimationFrame(explodeTick);

                houseGroup.children.forEach(function(voxel){
                    voxel.position.add(globalAccel);
                    voxel.position.x += voxel.velocity.x;
                    voxel.position.y += voxel.velocity.y;
                    voxel.position.z += voxel.velocity.z;
                    voxel.rotation.x += voxel.spin.x;
                    voxel.rotation.y += voxel.spin.y;
                    voxel.rotation.z += voxel.spin.z;
                    voxel.spin.multiplyScalar(0.95);
                    if(voxel.position.y < voxelSize / 2){
                        voxel.velocity.y = -voxel.velocity.y;
                        voxel.position.y = voxelSize / 2;
                    }
                });
            }

            requestAnimationFrame(explodeTick);
        }, 4000);

        requestAnimationFrame(tick);
    }

    run();

});
