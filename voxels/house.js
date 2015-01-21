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
        requestAnimationFrame(tick);
    }

    run();

});
