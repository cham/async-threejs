(function(THREE){
    'use strict';

    var easing = {
        easeInOutCubic: function easeInOutCubic(t, b, c, d){
            t /= d/2;
            if (t < 1){
                return c/2*t*t + b;
            }
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },

        easeInCubic: function easeInCubic(t, b, c, d){
            t /= d;
            return c*t*t*t + b;
        },

        easeOutCubic: function easeOutCubic(t, b, c, d){
            t /= d;
            t--;
            return c*(t*t*t + 1) + b;
        }
    };

    function cartesianToPolar(position){
        var x = position.x;
        var y = position.y;
        var z = position.z;
        var sqrd = (x*x) + (y*y) + (z*z);
        var radius = Math.pow(sqrd, 0.5);

        return {
            radius: radius,
            theta: Math.acos(z / radius),
            phi: Math.atan2(y, x)
        };
    }

    function polarToCartesian(polar){
        return new THREE.Vector3(
            polar.radius * Math.sin(polar.theta) * Math.cos(polar.phi),
            polar.radius * Math.sin(polar.theta) * Math.cos(polar.phi),
            polar.radius * Math.cos(polar.theta)
        );
    }

    function latLngToCartesian(lat, lng, radius){
        var phi = (lat)*Math.PI/180,
            theta = (lng-180)*Math.PI/180;

        return new THREE.Vector3(
            -radius * Math.cos(phi) * Math.cos(theta),
            radius * Math.sin(phi),
            radius * Math.cos(phi) * Math.sin(theta)
        );
    }

    function rotationTick(cam){
        var radians = cam.rotation.ticks * 0.05;

        cam.camera.position.x = Math.cos(radians) * cam.rotation.radius;
        cam.camera.position.y = 0;
        cam.camera.position.z = Math.sin(radians) * cam.rotation.radius;

        cam.rotation.ticks++;
        targetCenter(cam.camera);
    }

    function ensureBoundaries(minRadius, position){
        var scaling = 1;
        var distance = Math.sqrt(Math.pow(position.x, 2) + Math.pow(position.y, 2) + Math.pow(position.z, 2));

        if(distance < minRadius){
            scaling = minRadius / distance;
        }

        return position.multiplyScalar(scaling);
    }

    function animationTick(cam, done){
        var progress = (Date.now() - cam.animation.startTime);
        var delta = new THREE.Vector3(
            cam.animation.endPosition.x - cam.animation.startPosition.x,
            cam.animation.endPosition.y - cam.animation.startPosition.y,
            cam.animation.endPosition.z - cam.animation.startPosition.z
        );
        var deltaDot = delta.dot(new THREE.Vector3(1,1,1));
        var newPosition = ensureBoundaries(cam.animation.minRadius, new THREE.Vector3(
            easing.easeOutCubic(progress, cam.animation.startPosition.x, delta.x, cam.animation.duration),
            easing.easeOutCubic(progress, cam.animation.startPosition.y, delta.y, cam.animation.duration),
            easing.easeOutCubic(progress, cam.animation.startPosition.z, delta.z, cam.animation.duration)
        ));

        cam.camera.position.x = newPosition.x;
        cam.camera.position.y = newPosition.y;
        cam.camera.position.z = newPosition.z;

        cam.camera.target = new THREE.Vector3(0, 0, 0);
        cam.camera.lookAt(cam.camera.target);

        if(progress > cam.animation.duration || Math.abs(deltaDot) < 0.5){
            cam.animation.enabled = false;
            done();
        }
    }

    function moveToPosition(cam, options){
        var start = new THREE.Vector3(cam.camera.position.x, cam.camera.position.y, cam.camera.position.z);
        var end = options.position;

        cam.animation.startTime = Date.now();
        cam.animation.startPosition = start;
        cam.animation.endPosition = end;
        cam.animation.enabled = true;
    }

    function targetCenter(camera){
        camera.target = new THREE.Vector3(0,0,0);
        camera.lookAt(camera.target);
    }

    function moveToLatLng(cam, lat, lng, radius){
        var start = new THREE.Vector3(cam.camera.position.x, cam.camera.position.y, cam.camera.position.z);
        var end = latLngToCartesian(lat, lng, radius);

        cam.animation.startTime = Date.now();
        cam.animation.startPosition = start;
        cam.animation.endPosition = end;
        cam.animation.enabled = true;
        cam.animation.minRadius = radius;
    }

    function MoveableCamera(options){
        options = options || {};
        if(!options.width){
            throw new Error('width is required');
        }
        if(!options.height){
            throw new Error('height is required');
        }
        if(!options.position){
            options.position = new THREE.Vector3(0,0,0);
        }

        this.camera = new THREE.PerspectiveCamera(40, options.width / options.height, 1, 20000);
        this.camera.position.x = options.position.x;
        this.camera.position.y = options.position.y;
        this.camera.position.z = options.position.z;

        targetCenter(this.camera);

        this.animation = {
            duration: options.duration || 2000
        };
        this.rotation = {
            radius: options.rotationRadius || 500,
            ticks: 0,
            enabled: options.hasOwnProperty('rotate') ? !!options.rotate : false
        };
    }

    MoveableCamera.prototype.moveTo = function moveTo(options, done){
        options = options || {};
        this.animation.doneFn = done || function(){};
        if(!options.position && !(options.lat && options.lng && options.radius)){
            throw new Error('position or lat, lng and radius required');
        }
        if(options.position){
            return moveToPosition(this, options);
        }
        return moveToLatLng(this, options.lat, options.lng, options.radius);
    };

    MoveableCamera.prototype.animate = function animate(){
        if(this.animation.enabled){
            return animationTick(this, this.animation.doneFn);
        }
        if(this.rotation.enabled){
            return rotationTick(this);
        }
    };

    MoveableCamera.prototype.resize = function resize(width, height){
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    };

    MoveableCamera.prototype.disableRotation = function disableRotation(){
        this.rotation.enabled = false;
    };

    MoveableCamera.prototype.enableRotation = function enableRotation(){
        this.rotation.enabled = true;
    };

    window.MoveableCamera = MoveableCamera;

})(window.THREE);
