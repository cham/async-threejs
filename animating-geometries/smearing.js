require([
    'js/AudioData',
    'js/TerrainScene',
    'js/AudioTerrain'
], function(
    AudioData,
    TerrainScene,
    AudioTerrain
){

    var terrain = new AudioTerrain({
        colours: {fill: 0xff69b4, wireframe: 0x000000},
        width: 256,
        height: 256
    });

    var audio = new AudioData({
        src: 'mp3/minuit-jacuzzi.mp3',
        width: 256,
        onTick: function(buffer){
            terrain.update(buffer);
            terrain.smearDown();
        }
    });

    var terrainScene = new TerrainScene();

    terrainScene.appendTo(document.body);
    terrainScene.addTerrain(terrain.getObject());

    window.onresize = function(){
        terrainScene.resize();
    };

    function tick(){
        requestAnimationFrame(tick);
        terrainScene.render();
    }
    tick();

});
