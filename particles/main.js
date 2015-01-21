require([
    'js/Sandbox',
    'js/Emitter',
    'js/boxFrame',
    'js/controls'
], function(
    Sandbox,
    Emitter,
    boxFrame,
    controls
){
    'use strict';

    function makeStats(){
        var stats = new Stats();

        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = 0;
        document.body.appendChild(stats.domElement);

        return stats;
    }

    function run(){
        var stats = makeStats();
        var sandbox = new Sandbox();
        var emitter = new Emitter(controls(), 200);

        function tick(){
            stats.begin();
            sandbox.render();
            stats.end();

            requestAnimationFrame(tick);
        }

        sandbox.add(boxFrame());
        sandbox.add(emitter.mesh);

        sandbox.appendTo(document.body);
        requestAnimationFrame(tick);
    }

    run();

});
