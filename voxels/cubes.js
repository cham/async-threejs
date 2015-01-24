(function(THREE){
    'use strict';

    var boxsize = 6;
    var map = [
        [
            [1, 1, 0, 1, 0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 0, 1, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1]
        ],
        [
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1]
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 1]
        ],
        [
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1]
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1]
        ],
        [
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 0, 0, 0, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1]
        ],
        [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 0, 0, 0, 0, 0, 1]
        ],
        [
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1]
        ],
        [
            [1, 1, 0, 1, 0, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 1, 0, 1, 1, 1, 0, 1, 1],
            [1, 1, 0, 1, 1, 1, 0, 1, 1],
            [1, 1, 0, 1, 1, 1, 0, 1, 1],
            [1, 1, 0, 1, 1, 1, 0, 1, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1]
        ]
    ];

    function windowSize(){
        return {
            width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        };
    }

    function addStarfield(scene){
        var imgPath = 'img/galaxy_starfield.png';
        var geometry = new THREE.SphereGeometry(5000, 32, 32);
        var material  = new THREE.MeshBasicMaterial();

        material.map = new THREE.ImageUtils.loadTexture(imgPath);
        material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
        material.map.repeat.set(1.5, 1.5);
        material.side  = THREE.BackSide;

        scene.add(new THREE.Mesh(geometry, material));
    }

    function renderer(width, height){
        var webglRenderer = new THREE.WebGLRenderer({antialias: true, alpha: true});

        webglRenderer.setSize(width, height);

        return webglRenderer;
    }

    function addLighting(scene){
        var plight = new THREE.PointLight(0xcc9999, 0.6);
        var plight2 = new THREE.PointLight(0xcc9999, 0.6);

        plight.position.set(-3.4, 50, -8);
        plight2.position.set(63, 50, 55);

        scene.add(plight);
        scene.add(plight2);
    }

    function addFloor(scene){
        var material  = new THREE.MeshPhongMaterial({
            shininess: 0
        });

        material.map = new THREE.ImageUtils.loadTexture('img/minecraft-grass.png');
        material.map.wrapS = material.map.wrapT = THREE.RepeatWrapping;
        material.map.repeat.set(2048, 2048);

        var floor = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(20000, 20000, 1, 1),
            material
        );

        floor.castShadow = false;
        floor.receiveShadow = true;

        floor.position.set(0, -boxsize, 0);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = -1;
        scene.add(floor);
    }

    function cube(position){
        var cubeMesh = new THREE.Mesh(
            new THREE.BoxGeometry(boxsize, boxsize, boxsize),
            new THREE.MeshPhongMaterial({
                map: THREE.ImageUtils.loadTexture('img/minecraft_brick.jpg'),
                shininess: 0
            })
        );

        cubeMesh.castShadow = true;
        cubeMesh.receiveShadow = true;

        cubeMesh.position.set(position.x, position.y, position.z);

        return cubeMesh;
    }

    function addCubes(scene, map, position, rotation){
        var group = new THREE.Object3D();
        var depth = map.length;
        var height = map[0].length;
        var width = map[0][0].length;
        var page;
        var row;
        var cell;

        for(var i in map){
            page = map[i];
            for(var j in page){
                row = page[j];
                for(var k in row){
                    cell = row[k];
                    if(cell === 1){
                        group.add(cube(new THREE.Vector3(boxsize*k, -boxsize*j, -boxsize*i)));
                    }
                }
            }
        }

        group.position.set(position.x - depth*boxsize/2, position.y + height*boxsize, position.z + depth*boxsize/2);
        group.rotation.set(rotation.x, rotation.y, rotation.z);

        scene.add(group);
    }

    function CubesScene(options){
        if(typeof options.width !== 'number' || typeof options.height !== 'number'){
            throw new Error('width and height are required');
        }

        var width = options.width;
        var height = options.height;

        this.scene = new THREE.Scene();

        this.renderer = renderer(width, height);
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapType = THREE.PCFSoftShadowMap;

        this.camera = new THREE.PerspectiveCamera(40, width / height, 1, 20000);
        this.camera.position.set(-137, 10, 60);
        this.camera.target = new THREE.Vector3(20, 50, 0);
        this.camera.lookAt(this.camera.target);

        if(options.controls){
            this.controls = new THREE.FirstPersonControls(this.camera);
            this.clock = new THREE.Clock();

            this.controls.movementSpeed = 100;
            this.controls.domElement = this.renderer.domElement;
            // this.controls.rollSpeed = Math.PI / 4;
            this.controls.autoForward = false;
            // this.controls.dragToLook = true;
            this.controls.lookSpeed = 0.1;
        }

        addLighting(this.scene);
        addFloor(this.scene);
        addStarfield(this.scene);

        this.personalLight = new THREE.PointLight(0xffffff, 1, 70);
        this.scene.add(this.personalLight);
    }

    CubesScene.prototype.addObject = function addObject(map, position, rotation){
        addCubes(this.scene, map, position, rotation);
    };

    CubesScene.prototype.resize = function resize(){
        var dims = windowSize();
        this.renderer.setSize(dims.width, dims.height);
        this.camera.aspect = dims.width / dims.height;
        this.camera.updateProjectionMatrix();
    };

    CubesScene.prototype.render = function render(){
        if(this.controls){
            this.controls.update(this.clock.getDelta());
            this.camera.position.y = 10;
        }
        this.personalLight.position.set(this.camera.position.x, this.camera.position.y, this.camera.position.z);
        this.renderer.render(this.scene, this.camera);
// console.log(this.camera.position.x, this.camera.position.y, this.camera.position.z);
    };

    CubesScene.prototype.domElement = function domElement(){
        return this.renderer.domElement;
    };

    var sceneDims = windowSize();
    var cubes = new CubesScene({
        width: sceneDims.width,
        height: sceneDims.height,
        controls: true
    });

    cubes.addObject(map, new THREE.Vector3(0, -4, 0), new THREE.Vector3(0, 0, 0));
    cubes.addObject(map, new THREE.Vector3(54, -4, 5), new THREE.Vector3(0, -Math.PI/2, 0));

    document.body.appendChild(cubes.domElement());
    window.onresize = function(){
        var dims = windowSize();
        cubes.resize(sceneDims.width, sceneDims.height);
    };
    
    function tick(){
        requestAnimationFrame(tick);
        cubes.render();
    }
    tick();

})(window.THREE);
