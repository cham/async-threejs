define(function(){
    'use strict';

    function loadUrl(url, onloadfn, onerrorfn){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function(){
            onloadfn(xhr.response);
        };
        xhr.onerror = onerrorfn;

        xhr.send();
    }

    function requiredOptions(opt){
        if(!opt.src){
            throw new Error('src is required');
        }
        if(!opt.width){
            throw new Error('width is required');
        }
        if(!opt.onTick){
            throw new Error('onTick callback is required');
        }
    }

    function AudioData(options){
        requiredOptions(options || {});

        this.width = options.width;
        this.onTick = options.onTick;

        loadUrl(options.src, this.onLoadAudio.bind(this));
    }

    AudioData.prototype.onLoadAudio = function onLoadAudio(data){
        var context = new AudioContext();
        var that = this;

        context.decodeAudioData(data, function(buffer){
            that.source = context.createBufferSource();
            that.source.buffer = buffer;
            that.analyser = context.createAnalyser();
            that.source.connect(that.analyser);
            that.analyser.connect(context.destination);

            that.start();
        });
    };

    AudioData.prototype.start = function(){
        var dataArray = new Uint8Array(this.width);
        var analyser = this.analyser;
        var onTick = this.onTick;

        analyser.fftSize = this.width;

        var numTicks = 0;
        function tick(){
            requestAnimationFrame(tick);

            analyser.getByteTimeDomainData(dataArray);

            onTick(dataArray);
        }

        this.source.start(0);
        tick();
    };

    return AudioData;

});
