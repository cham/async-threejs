var slideNum = 0;
var subsectionNum = 0;

if(window.location.hash){
    var hashParts = window.location.hash.split('-');

    slideNum = parseInt(hashParts[0].replace('#',''), 10);
    if(hashParts.length > 1){
        subsectionNum = parseInt(hashParts[1], 10);
    }
}

function windowSize(){
    return {
        width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
        height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    };
}

function getSection(index){
    return document.querySelectorAll('section')[index];
}

function getVisibleSubsection(index){
    var currentSlide = getSection(slideNum);
    var visibleSubsections = Array.apply(null, currentSlide.querySelectorAll('.subsection')).filter(function(node, i){
        return node.style.display === 'block';
    });
    if(visibleSubsections.length){
        return visibleSubsections[0];
    }
}

function loadSlide(index){
    var slide = getSection(index);
    var frame = slide.querySelector('iframe');
    var content = slide.querySelector('.content');
    var wSize = windowSize();

    if(frame){
        frame.width = wSize.width + 'px';
        frame.height = wSize.height + 'px';
        frame.src = frame.dataset.src;
    }
    if(content){
        content.style.display = 'block';
    }
}

function showSection(sectionIndex, subsectionIndex){
    var slide = getSection(sectionIndex);
    Array.apply(null, slide.querySelectorAll('.subsection')).forEach(function(subsection, i){
        if(i === subsectionIndex){
            subsection.style.display = 'block';
        }else{
            subsection.style.display = 'none';
        }
    });
}

function resetSubsections(section){
    var subsections = Array.apply(null, section.querySelectorAll('.subsection'));
    subsections.forEach(function(subsection){
        subsection.style.display = 'none';
    });
    if(subsections[0]){
        subsections[0].style.display = 'block';
    }
}

function updateHash(){
    window.location.hash = '#' + slideNum + (subsectionNum ? '-' + subsectionNum : '');
}

function unloadSlideOnTransition(slide){
    function removeLastFrame(){
        var prevFrame = slide.querySelector('iframe');
        if(prevFrame){
            prevFrame.src = '';
        }
        document.body.removeEventListener('transitionend', removeLastFrame);
    }
    document.body.addEventListener('transitionend', removeLastFrame);
}

function next(){
    var currentSlide = getSection(slideNum);
    var nextSlide = getSection(slideNum+1);
    var wSize = windowSize();

    currentSlide.style.left = -wSize.width + 'px';
    nextSlide.style.left = '0px';

    loadSlide(slideNum+1);
    unloadSlideOnTransition(currentSlide);
    resetSubsections(nextSlide);

    slideNum++;
    subsectionNum = 0;
    updateHash();
}

function prev(){
    var currentSlide = getSection(slideNum);
    var nextSlide = getSection(slideNum-1);
    var wSize = windowSize();

    currentSlide.style.left = '0px';
    nextSlide.style.left = -wSize.width + 'px';
    nextSlide.classList.remove('transitionable');

    requestAnimationFrame(function(){
        nextSlide.classList.add('transitionable');

        currentSlide.style.left = wSize.width + 'px';
        nextSlide.style.left = '0px';

        loadSlide(slideNum-1);
        unloadSlideOnTransition(currentSlide);
        resetSubsections(nextSlide);

        slideNum--;
        subsectionNum = 0;
        updateHash();
    });
}

function hideSectionAndShowSibling(siblingSelector){
    var subsectionToHide = getVisibleSubsection(slideNum);
    var subsectionToShow = subsectionToHide[siblingSelector];
    if(!subsectionToHide || !subsectionToShow || !subsectionToShow.classList.contains('subsection')){
        return false;
    }
    subsectionToHide.style.display = 'none';
    subsectionToShow.style.display = 'block';
    return true;
}

function up(){
    var success = hideSectionAndShowSibling('previousElementSibling');
    if(success){
        subsectionNum--;
    }
    updateHash();
}

function down(){
    var success = hideSectionAndShowSibling('nextElementSibling');
    if(success){
        subsectionNum++;
    }
    updateHash();
}

document.addEventListener('keydown', function(e){
    var keycode = e.which;
    if(keycode === 39){
        return next();
    }
    if(keycode === 37){
        return prev();
    }
    if(keycode === 40){
        return down();
    }
    if(keycode === 38){
        return up();
    }
});

function init(){
    var windowWidth = windowSize().width;
    Array.apply(null, document.querySelectorAll('section')).forEach(function(section){
        resetSubsections(section);
        section.style.left = windowWidth + 'px';
        section.style.width = windowWidth + 'px';
        section.classList.add('transitionable');
        section.style.display = 'block';
    });
    var firstSection = getSection(slideNum);
    firstSection.style.left = '0px';
    loadSlide(slideNum);
    showSection(slideNum, subsectionNum);
}

hljs.initHighlightingOnLoad();
init();
