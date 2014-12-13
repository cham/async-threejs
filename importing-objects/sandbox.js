function windowSize(){
    return {
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    };
}

var wSize = windowSize();

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(40, wSize.width / wSize.height);
var renderer = new THREE.WebGLRenderer();

renderer.setClearColor(0xffffff);
renderer.setSize(wSize.width, wSize.height);

camera.position.set(0, 100, 0);
document.body.appendChild(renderer.domElement);

var tickCount = 0;
function tick(){
    requestAnimationFrame(tick);

    camera.position.x = Math.sin(tickCount) * 100;
    camera.position.z = Math.cos(tickCount) * 100;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    renderer.render(scene, camera);

    tickCount += 0.01;
}
tick();
