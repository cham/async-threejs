define(function(){
    'use strict';

    function bounceAxis(vertex, axis, size){
        var halfsize = size / 2;
        if(vertex[axis] < -halfsize || vertex[axis] > halfsize){
            vertex.velocity[axis] = -vertex.velocity[axis];
            if(vertex[axis] < -halfsize){
                vertex[axis] = -halfsize+1;
            }else{
                vertex[axis] = halfsize-1;
            }
            vertex.velocity.multiplyScalar(0.8);
        }
    }

    function bounceVertex(vertex, size){
        bounceAxis(vertex, 'x', size);
        bounceAxis(vertex, 'y', size);
        bounceAxis(vertex, 'z', size);
    }

    function moveParticles(vertices, controls, size){
        for(var i = 0; i<vertices.length; i++){
            var vertex = vertices[i];
            if(!vertex.active){
                continue;
            }
            if(!vertex.impulse){
                vertex.impulse = new THREE.Vector3(0, 0, 0);
            }
            if(!vertex.velocity){
                vertex.velocity = new THREE.Vector3(0, 0, 0);
            }
            vertex.accel = new THREE.Vector3(controls.accelX, controls.accelY, controls.accelZ);
            vertex.accel.add(vertex.impulse);
            vertex.velocity.add(vertex.accel);
            vertex.add(vertex.velocity);
            vertex.impulse.multiplyScalar(0.9);
            bounceVertex(vertex, size);
        }
    }

    function fireParticle(controls, vertex){
        vertex.impulse = new THREE.Vector3(
            Math.random() * controls.randomness,
            Math.random() * controls.randomness,
            Math.random() * controls.randomness
        );
        vertex.active = true;
    }

    function createParticles(controls, size){
        var lastTickTime = Date.now();
        var strobing = false;
        var totalParticles = 20000;
        var numParticles = 0;
        var geometry = new THREE.Geometry();
        var material = new THREE.PointCloudMaterial({
            size: 2,
            color: 0x339900
        });

        for(var i = 0; i < 20000; i++){
            geometry.vertices.push(new THREE.Vector3(-size/2, -size/2, -size/2));
        }

        function tick(){
            var now;

            requestAnimationFrame(tick);

            if(!controls.animate){
                return;
            }

            now = Date.now();

            if(numParticles < totalParticles){
                if(controls.strobe && now - lastTickTime > controls.strobeDelay){
                    if(strobing){
                        strobing = false;
                    }else{
                        strobing = true;
                    }
                    lastTickTime = now;
                }else if(controls.emitParticles && (!controls.strobe || !strobing)){
                    fireParticle(controls, geometry.vertices[numParticles]);
                    numParticles++;
                }
            }

            moveParticles(geometry.vertices, controls, size);
            geometry.verticesNeedUpdate = true;
        }
        tick();

        return new THREE.ParticleSystem(geometry, material);
    }

    function Emitter(controls, size){
        this.mesh = createParticles(controls, size);
        this.mesh.position.y = size / 2;
    }

    return Emitter;

});
