
var captionLength = 0;
var caption = '';

//load the robot's texts
var obj = JSON.parse(data);
//obj.text[0].sentence

$(document).ready(function() {
    setInterval ('cursorAnimation()', 600);
    captionEl = $('#caption');


    setWriteAndEraseSequence();

    $('#test-erasing').click(function(){
        eraseSentence();
    });
});



function setWriteAndEraseSequence(){
    loadRandomSentence();
    setTimeout(eraseSentence, 5000);
}

function loadRandomSentence(){
    var indexSentence = getRandomSentence();
    var caption = obj.text[indexSentence].sentence.toString();
    writeSentence(caption);
}

function getRandomSentence(){
    var maxItem = getNumberOfSentences();
    return Math.floor((Math.random() * maxItem));
}

function getNumberOfSentences(){
    var key, count = 0;
    for(key in obj.text) {
        if(obj.text.hasOwnProperty(key)) {
            count++;
        }
    }
    return count;
}

function writeSentence(caption) {
    captionEl.html(caption.substr(0, captionLength++));
    if(captionLength < caption.length+1) {
        setTimeout(function(){writeSentence(caption)}, 50);
    } else {
        captionLength = 0;
        caption = '';
    }
}

function eraseSentence() {
    caption = captionEl.html();
    captionLength = caption.length;
    if (captionLength>0) {
        erase();
    }
}

function erase() {
    captionEl.html(caption.substr(0, captionLength--));
    if(captionLength >= 0) {
        setTimeout('erase()', 30);
    } else {
        captionLength = 0;
        caption = '';
        setTimeout(setWriteAndEraseSequence, 3000);
    }
}

function cursorAnimation() {
    $('#cursor').animate({
        opacity: 0
    }, 450).animate({
        opacity: 1
    }, 450);

}