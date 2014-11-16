define(function(){
    'use strict';

    function windowSize(){
        return {
            width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        };
    }

    function datControls(){
        var gui = new dat.GUI();
        var config = {
            'rotation': true,
            'rotationSpeed': 0.01,
            'cameraDistance': 200
        };

        gui.add(config, 'rotation');
        gui.add(config, 'rotationSpeed', -0.2, 0.2);
        gui.add(config, 'cameraDistance', 0, 1000);

        return config;
    }

    function renderer(){
        var glRenderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        
        glRenderer.shadowMapEnabled = true;
        glRenderer.shadowMapType = THREE.PCFSoftShadowMap;
        glRenderer.setClearColor(0xffffff, 1);

        return glRenderer;
    }

    function camera(){
        var wSize = windowSize();
        var cam = new THREE.PerspectiveCamera(40, wSize.width / wSize.height, 1, 20000);
        
        cam.position.set(0, 100, -1000);
        cam.target = new THREE.Vector3(0, 0, 0);
        cam.lookAt(cam.target);

        return cam;
    }

    function spotlight(colour, x, y, z){
        var light = new THREE.SpotLight(colour, 1);

        light.position.set(x, y, z);
        light.target.position.set(0, 0, 0);
        light.castShadow = true;
        light.shadowDarkness = 0.4;
        light.shadowMapWidth = 1024;
        light.shadowMapHeight = 1024;

        return light;
    }

    function lighting(){
        var group = new THREE.Group();
        var ambient = new THREE.AmbientLight(0x222222, 1);

        group.add(ambient);
        group.add(spotlight(0xE9C2A6, 100, 100, -100));
        group.add(spotlight(0x555555, -100, 200, -100));

        return group;
    }

    function rotateCamera(cam, controls, ticks){
        var cameraDistance = controls.cameraDistance;
        cam.position.x = Math.PI - Math.sin(ticks * controls.rotationSpeed) * cameraDistance;
        cam.position.y = (Math.cos(ticks * controls.rotationSpeed) * cameraDistance) / 2;
        cam.position.y += cameraDistance / 2;
        cam.position.z = Math.PI - Math.cos(ticks * controls.rotationSpeed) * cameraDistance;

        cam.target = new THREE.Vector3(0, 0, 0);
        cam.lookAt(cam.target);
    }

    function Sandbox(){
        this.scene = new THREE.Scene();
        this.renderer = renderer();
        this.controls = datControls();
        this.camera = camera();
        this.scene.add(lighting());

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

        function tick(){
            requestAnimationFrame(tick);
            rotateCamera(cam, controls, numTicks);
            if(controls.rotation){
                numTicks++;
            }
        }
        tick();
    };

    Sandbox.prototype.appendTo = function appendTo(node){
        node.appendChild(this.renderer.domElement);
    };

    Sandbox.prototype.render = function render(){
        this.renderer.render(this.scene, this.camera);
    };

    Sandbox.prototype.add = function add(threeObject){
        this.scene.add(threeObject);
    };

    return Sandbox;

});
