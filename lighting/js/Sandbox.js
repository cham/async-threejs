define(function(){
    'use strict';

    function windowSize(){
        return {
            width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        };
    }

    function updateMeshMaterials(scene){
        scene.children.filter(function(threeObj){
            return threeObj instanceof THREE.Mesh;
        }).forEach(function(mesh){
            mesh.material.needsUpdate = true;
        });
    }

    function renderer(){
        var glRenderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        
        glRenderer.shadowMapEnabled = true;
        glRenderer.shadowMapType = THREE.PCFSoftShadowMap;
        glRenderer.setClearColor(0x000000, 1);

        return glRenderer;
    }

    function camera(controls){
        var wSize = windowSize();
        var cam = new THREE.PerspectiveCamera(40, wSize.width / wSize.height, 1, 20000);
        
        cam.position.set(controls.cameraX, controls.cameraY, controls.cameraZ);
        cam.target = new THREE.Vector3(0, 0, 0);
        cam.lookAt(cam.target);

        return cam;
    }

    function rotateCamera(cam, controls, ticks){
        var cameraDistance = controls.cameraDistance;
        cam.position.set(
            Math.PI - Math.sin(ticks * controls.rotationSpeed) * cameraDistance,
            ((Math.cos(ticks * controls.rotationSpeed) * cameraDistance) / 2) + cameraDistance / 2,
            Math.PI - Math.cos(ticks * controls.rotationSpeed) * cameraDistance
        );

        cam.target = new THREE.Vector3(0, 0, 0);
        cam.lookAt(cam.target);
    }

    function positionCamera(cam, controls){
        cam.position.set(controls.cameraX, controls.cameraY, controls.cameraZ);
        cam.target = new THREE.Vector3(0, 0, 0);
        cam.lookAt(cam.target);
    }

    function createLight(type, colour, x, y, z, groundColour){
        var light;

        if(type === 'spotlight'){
            light = new THREE.SpotLight(colour, 1);
        }
        if(type === 'directional'){
            light = new THREE.DirectionalLight(colour, 1);
        }
        if(type === 'ambient'){
            light = new THREE.AmbientLight(colour, 1);
        }
        if(type === 'hemisphere'){
            light = new THREE.HemisphereLight(colour, groundColour, 1);
        }
        if(type === 'point'){
            light = new THREE.PointLight(colour, 1, 200);
        }

        light.position.set(x, y, z);
        if(light.target){
            light.target.position.set(0, 0, 0);
        }
        if(type === 'spotlight' || type === 'directional'){
            light.shadowDarkness = 0.4;
            light.shadowMapWidth = 2048;
            light.shadowMapHeight = 2048;
        }

        return light;
    }

    function requiredOptions(opt){
        if(!opt.controls){
            throw new Error('controls are required');
        }
    }

    function Sandbox(options){
        requiredOptions(options || {});

        this.scene = new THREE.Scene();
        this.renderer = renderer();
        this.controls = options.controls;
        this.camera = camera(this.controls);

        this.ambient = new THREE.AmbientLight(this.controls.ambient, 1);
        this.light = createLight(
            options.lightType,
            this.controls.lightColour,
            this.controls.lightX,
            this.controls.lightY,
            this.controls.lightZ,
            this.controls.groundColour
        );

        this.scene.add(this.ambient);
        this.scene.add(this.light);

        this.resize();
        this.animate();
    }

    Sandbox.prototype.resize = function resize(){
        var wSize = windowSize();
        this.renderer.setSize(wSize.width, wSize.height);
        this.camera.aspect = wSize.width / wSize.height;
        this.camera.updateProjectionMatrix();
    };

    Sandbox.prototype.animate = function(){
        var cam = this.camera;
        var controls = this.controls;
        var numTicks = 0;
        var ambient = this.ambient;
        var light = this.light;

        function tick(){
            requestAnimationFrame(tick);
            if(controls.rotation){
                rotateCamera(cam, controls, numTicks);
                numTicks++;
            }else{
                positionCamera(cam, controls);
            }
            ambient.color = new THREE.Color(controls.ambient);
            light.position.set(controls.lightX, controls.lightY, controls.lightZ);
            light.color = new THREE.Color(controls.lightColour);
            light.groundColor = new THREE.Color(controls.groundColour);
        }
        tick();
    };

    Sandbox.prototype.appendTo = function appendTo(node){
        node.appendChild(this.renderer.domElement);
    };

    Sandbox.prototype.render = function render(){
        if(this.light instanceof THREE.SpotLight || this.light instanceof THREE.DirectionalLight){
            this.light.shadowCameraVisible = this.controls.showFrustrum;
            this.light.shadowDarkness = this.controls.shadowDarkness;

            if(this.light.castShadow !== this.controls.castShadow){
                this.light.castShadow = this.controls.castShadow;
                updateMeshMaterials(this.scene);
            }
        }
        if(this.light instanceof THREE.PointLight){
            this.light.distance = this.controls.lightDistance;
        }

        this.renderer.render(this.scene, this.camera);
    };

    Sandbox.prototype.add = function add(threeObject){
        this.scene.add(threeObject);
    };

    return Sandbox;

});
