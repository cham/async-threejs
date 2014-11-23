define(function(){
    'use strict';

    function windowSize(){
        return {
            width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        };
    }

    function renderer(){
        var glRenderer = new THREE.WebGLRenderer({antialias: true, alpha: true});
        
        glRenderer.shadowMapEnabled = true;
        glRenderer.shadowMapType = THREE.PCFSoftShadowMap;
        glRenderer.setClearColor(0xffffff, 1);

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
        this.spotlight = spotlight(
            this.controls.spotlight,
            this.controls.spotlightX,
            this.controls.spotlightY,
            this.controls.spotlightZ
        );

        this.scene.add(this.ambient);
        this.scene.add(this.spotlight);

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
        var spotlight = this.spotlight;

        function tick(){
            requestAnimationFrame(tick);
            if(controls.rotation){
                rotateCamera(cam, controls, numTicks);
                numTicks++;
            }else{
                positionCamera(cam, controls);
            }
            ambient.color = new THREE.Color(controls.ambient);
            spotlight.position.set(controls.spotlightX, controls.spotlightY, controls.spotlightZ);
            spotlight.color = new THREE.Color(controls.spotlight);
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
