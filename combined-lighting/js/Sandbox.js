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
        glRenderer.setClearColor(0x3399FF, 0.7);

        return glRenderer;
    }

    function camera(controls){
        var wSize = windowSize();
        var cam = new THREE.PerspectiveCamera(40, wSize.width / wSize.height, 1, 20000);
        
        cam.position.set(controls.cameraX, controls.cameraY, controls.cameraZ);
        cam.target = new THREE.Vector3(0, 20, 0);
        cam.lookAt(cam.target);

        return cam;
    }

    function rotateCamera(cam, controls, ticks){
        var cameraDistance = controls.cameraDistance;
        cam.position.set(
            Math.PI - Math.sin(ticks * controls.rotationSpeed) * cameraDistance,
            10 + ((Math.cos(ticks * controls.rotationSpeed) * cameraDistance) / 2) + cameraDistance / 2,
            Math.PI - Math.cos(ticks * controls.rotationSpeed) * cameraDistance
        );

        cam.target = new THREE.Vector3(0, 20, 0);
        cam.lookAt(cam.target);
    }

    function positionCamera(cam, controls){
        cam.position.set(controls.cameraX, controls.cameraY, controls.cameraZ);
        cam.target = new THREE.Vector3(0, controls.targetY || 0, 0);
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
            if(controls.rotation){
                rotateCamera(cam, controls, numTicks);
                numTicks++;
            }else{
                positionCamera(cam, controls);
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

    Sandbox.prototype.materialsNeedUpdate = function materialsNeedUpdate(){
        this.scene.children.filter(function(threeObj){
            return threeObj instanceof THREE.Mesh;
        }).forEach(function(mesh){
            mesh.material.needsUpdate = true;
        });
    };

    return Sandbox;

});
