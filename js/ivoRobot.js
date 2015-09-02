/*The crazy talking Robot*/
var Ivolvy = function() {
    var that = this;

    var sentenceLength = 0;
    var sentence = '';
    var sequence = ["0","1","2"]; //The order to write the texts
    var indexSequence = 0;

    var currentScreen = 'home';

    //load the robot's texts
    //var data = JSON.parse(data);

    this.init = function(){
        setInterval (that.cursorAnimation, 600);
        textArea = $('.speak');

        //setWriteAndEraseSequence();
        setTimeout(that.loadSequenceSentences, 1500);
    };

    this.setWriteAndEraseSequence = function(){
        that.loadRandomSentence();
        setTimeout(that.eraseSentence, 5000);
    };

    /*Write in order the texts' sequence defined in sequence array*/
    this.loadSequenceSentences = function(){
        //sequence.length if we want to define a custom sequence
        if(indexSequence < data.texts[0][currentScreen].length){
            var sentence = that.getSentenceFromId(indexSequence); //sequence[indexSequence]) if custom sequence
            that.writeSentence(sentence);
            setTimeout(that.eraseSentence, 5000);
            indexSequence++;
        }
        else{
            indexSequence = 0;
            that.loadSequenceSentences();
        }
    };

    this.getSentenceFromId = function(indexSentence){
        return data.texts[0][currentScreen][indexSentence].sentence.toString();
    };
    this.getActionFromId = function(indexSentence){
        return data.texts[0][currentScreen][indexSentence].action.toString();
    };

    /*Load random sentence from the texts*/
    this.loadRandomSentence = function(){
        var indexSentence = that.getRandomSentence();
        var sentence = that.getSentenceFromId(indexSentence);
        this.writeSentence(sentence);
    };

    this.getRandomSentence = function(){
        var maxItem = that.getNumberOfSentences();
        return Math.floor((Math.random() * maxItem));
    };

    this.getNumberOfSentences = function(){ //check this
        var key, count = 0;
        for(key in data.text) {
            if(data.text.hasOwnProperty(key)) {
                count++;
            }
        }
        return count;
    };


    this.writeSentence = function(sentence){
        textArea.html(sentence.substr(0, sentenceLength++));
        if(sentenceLength < sentence.length+1) {
            setTimeout(function(){that.writeSentence(sentence)}, 50);
        } else {
            sentenceLength = 0;
            sentence = '';

            if(indexSequence == 6){ //put this when we delete the sentence
                flkty.select(1);
            }

        }
    };

    this.eraseSentence = function(){
        sentence = textArea.html();
        sentenceLength = sentence.length;
        if (sentenceLength>0) {
            that.erase();
        }
    };

    this.erase = function(){
        textArea.html(sentence.substr(0, sentenceLength--));
        if(sentenceLength >= 0) {
            setTimeout(that.erase, 30);
        } else {
            sentenceLength = 0;
            sentence = '';
            setTimeout(that.loadSequenceSentences, 1000);
        }
    };

    /*Simply animate the cursor*/
    this.cursorAnimation = function(){
        $('#cursor').animate({
            opacity: 0
        }, 450).animate({
            opacity: 1
        }, 450);
    };

    /*Set the current screen viewed by the user*/
    this.setCurrentScreen = function(screen){
        currentScreen = screen;
    };



};

/*Launch the robot*/
var ivolvy = new Ivolvy();
ivolvy.init();











