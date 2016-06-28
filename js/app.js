
var App = function(){};


App.prototype.init = function(){
    this.initVars();
    this.initLoader();

    if($(window).width() >= 767){
        this.initFlickity(true);
    }
    else{
        this.initFlickity(false);
    }

    this.bindEvents();

    this.initContactForm();
    this.initSmoothScrolling();

    this.bindProjectsPageButtons();

    this.initScrollMagic();

    //Disable for mobiles
    if($(window).width() >= 767) {
        mouseDrag = true;
        this.initParticlesJs();
    }
    else{
        //disable mouse drag if we are on phone or tablet
        mouseDrag = false;
    }
};

App.prototype.initVars = function(){
    var that = this;
    mouseDrag = true; //check custom in flickity.pkgd.js for custom code

    //Used to navigate in flickity
    that.canNavigate = true;

    //used for photo gallery
    that.imagesTab = [];

    //used to get images for photo gallery
    that.tabTypes = ['travel', 'architecture', 'people', 'various'];
};


App.prototype.initLoader = function(){
    var that = this;

    $("#introduction-background").backstretch("img/background/back-sun.jpg");
    $("#presentation-background").backstretch("img/background/back-mountains.jpg");

    $(window).load(function(){
        $('body').toggleClass('loaded');

        //loads images and isotope when we display the first page of the website
        //(So we are waiting less time for the website to load)
        app.displayImagesType(that.tabTypes);

        if($(window).width() >= 767) {
            app.displayHelperToNavigate();
            that.timerHelper = setInterval(app.displayHelperToNavigate, 26000);
        }
    });
};

App.prototype.displayHelperToNavigate = function(){
    //Popup for navigation information
    setTimeout(function () {
        // create the notification
        var notification = new NotificationFx({
            message: '<i class="fa fa-arrows-h" style="display:inline-block;float:left;line-height: 1.4;"></i>' +
            '<p id="navigation-text" style="display:inline-block;margin-left:10px;width: 227px;text-align: center;">' +
                'DRAG EDGES/USE ARROWS TO NAVIGATE' +
            '</p>',
            layout: 'growl',
            effect: 'slide',
            type: 'notice' // notice, warning or error
        });
        // show the notification
        notification.show();
    }, 1200);
};

App.prototype.bindEvents = function(){
    var that = this;

    //GO TO PAGE ON CLICKED MENU'S ELEMENTS
    $('.overlay-menu ul li a').on( 'click', function(event){
        var index = $(event.target).attr('data-slideToGo');
        $('#hamb-menu').toggleClass('open');
        $('.overlay').toggleClass('open');
        that.flkty.select(parseInt(index));
    });

    //USED FOR THE HAMB MENU
    $('#hamb-menu').click(function(){
        $(this).toggleClass('open');
        $('.overlay').toggleClass('open');

        //disable help notification
        clearInterval(that.timerHelper);
    });

    //go to photo page on link click
    $('.introduction .to-photo').click(function(){
        that.flkty.select(parseInt(2));
    });

    //change text style on text menu on page photo
    $('.photos-menu a').on('click', function(){
        $('.photos-menu a').css({'opacity': '0.5'});
        $(this).css({'opacity': '1'});
    });

    //disable mouse drag if we are on phone or tablet
    window.addEventListener('resize', function(event){
        mouseDrag = $(window).width() >= 767;
    });

    $('.image').on('click', function(){
        that.canNavigate = false;
    });


    //Used to navigate in flickity
    $("body").keydown(function(e) {
        if(that.canNavigate && !$("#contact-form input,#contact-form textarea").is(":focus")){
            if(e.which == 37) { // left
                app.testHambMenuOpen();
                that.flkty.select(that.flkty.selectedIndex-1);
            }
            else if(e.which == 39) { // right
                app.testHambMenuOpen();
                that.flkty.select(that.flkty.selectedIndex+1);
            }
        }
    });

    //MESSAGE FORM SUBMIT WITH NOTIFICATION FX
    $(document).on('submit', '#contact-form', function(){
        $.post('contact.php', $(this).serialize())
            .done(function(data){

                var results = JSON.parse(data);

                if(results['success'] == "true"){
                    var notification = new NotificationFx({
                        message : '<p style="display:inline-block;margin-left:10px">MAIL SENDED!</p>',
                        layout : 'growl',
                        effect : 'slide',
                        type : 'notice' // notice, warning or error
                    });
                }
                else{
                    var notification = new NotificationFx({
                        message : '<p style="display:inline-block;margin-left:10px">'+results['msg']+'</p>',
                        layout : 'growl',
                        effect : 'slide',
                        type : 'error' // notice, warning or error
                    });
                }
                // show the notification
                notification.show();
            })
            .error(function(){
                var notification = new NotificationFx({
                    message : '<p style="display:inline-block;margin-left:10px">FAIL</p>',
                    layout : 'growl',
                    effect : 'slide',
                    type : 'error' // notice, warning or error
                });
                // show the notification
                notification.show();
            });
        return false;
    });
};

App.prototype.testHambMenuOpen = function(){
    if($('#hamb-menu').hasClass('open')){
        $('#hamb-menu').toggleClass('open');
        $('.overlay').toggleClass('open');
    }
};

// USED FOR THE FORM CONTACT'S ANIMATIONS
App.prototype.initContactForm = function(){
    var that = this;

    [].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {
        // in case the input is already filled..
        if( inputEl.value.trim() !== '' ) {
            classie.add( inputEl.parentNode, 'input--filled' );
        }

        // events:
        inputEl.addEventListener( 'focus', that.onInputFocusContactForm );
        inputEl.addEventListener( 'blur', that.onInputBlurContactForm );
    } );
};

App.prototype.onInputFocusContactForm = function(ev){
    classie.add( ev.target.parentNode, 'input--filled' );
};

App.prototype.onInputBlurContactForm = function(ev){
    if( ev.target.value.trim() === '' ) {
        classie.remove( ev.target.parentNode, 'input--filled' );
    }
};

//INITIALIZE FLICKITY
App.prototype.initFlickity = function(draggable){
    var that = this;
    var elem = document.querySelector('.website-gallery');
    that.flkty = new Flickity( elem, {
        // options
        wrapAround: false,
        prevNextButtons: false,
        pageDots: false,
        contain: false,
        draggable: draggable
    });
    //event when we change the page
    that.flkty.on( 'settle', function() {
        clearInterval(that.timerHelper);
        // console.log( 'Flickity settled at ' + flkty.selectedIndex );
    });
};


//SMOOTH SCROLLING ON ELEMENT CLICK
App.prototype.initSmoothScrolling = function(){
    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
                $('html, body, #introduction-page').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
};

//bind projects link on project page
App.prototype.bindProjectsPageButtons = function(){
    $('.oveWebsite .linkButton').on('click', function(){
        window.open('http://michaelgenty.com/OVE-website/', '_blank');
    });
    $('.unityGame .linkButton').on('click', function(){
        window.open('../sources/UnityGame/index.html', '_blank');
    });
    $('.itycom .linkButton').on('click', function(){
        window.open('http://www.itystudio.com/', '_blank');
    });
    $('.mobile-games .linkButton-pong').on('click', function(){
        window.open('../sources/pong/PongGame.apk', '_blank');
    });
    $('.mobile-games .linkButton-flamingo').on('click', function(){
        window.open('../sources/flamingo/flamingooo.apk', '_blank');
    });
};


//Init particles js for the home page
App.prototype.initParticlesJs = function(){
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('particles-js', 'assets/particles.json', function () {
        //console.log('callback - particles.js config loaded');
    });
};

//init scroll magic
App.prototype.initScrollMagic = function(){
    //CSS ANIMATIONS ON SCROLL
    var controller = new ScrollMagic.Controller();

    // build scene
    new ScrollMagic.Scene({triggerElement: ".first"})
        // trigger animation by adding a css class
        .setClassToggle(".anim1", "slideInLeft")
        //.addIndicators({name: "1 - add a class"}) // add indicators (requires plugin)
        .triggerHook(0.79)
        .addTo(controller);
    new ScrollMagic.Scene({triggerElement: ".second"})
        .setClassToggle(".anim2", "slideInRight")
        .triggerHook(0.67)
        .addTo(controller);
    new ScrollMagic.Scene({triggerElement: ".third"})
        .setClassToggle(".anim3", "slideInLeft")
        .triggerHook(0.67)
        .addTo(controller);
    new ScrollMagic.Scene({triggerElement: ".fourth"})
        .setClassToggle(".anim4", "slideInRight")
        .triggerHook(0.67)
        .addTo(controller);
};


/*Get all the images for a type/category selected in the corresponding folder*/
App.prototype.displayImagesType = function(tabTypes){
    var folderPath = 'img/photos/';
    for(var i = 0; i<tabTypes.length;i++){
        if(i == 3){
            var functionEnd = true;
        }
        app.getImagesNameFromFolder(folderPath, tabTypes[i], functionEnd);
    }
};

/*Display the retrieved images in the grid*/
App.prototype.displayImagesInGrid = function(sortImages, type, functionEnd){

    var arrayOfStrings;

    for(var i = 0; i<sortImages.length;i++){

        arrayOfStrings = sortImages[i].split('/');

        $('.grid').append('<div class="grid-item '+arrayOfStrings[2]+'">' +
        '<a class="fancybox" rel="group" href="'+sortImages[i]+'">' +
            '<img src="'+sortImages[i]+'"/>' +
        '</a>' +
        '</div>');

        if(i == sortImages.length-1){
            //Launch isotope when we have loaded all the images
            if(functionEnd == true){
                app.launchIsotope();
            }
        }
    }
};

/*Get the path and name of the images with php function*/
App.prototype.getImagesNameFromFolder = function(folderPath, type, functionEnd){
    var that = this;

    $.post('listImages.php', {
        'folder':folderPath+type
    },$(this).serialize())
        .done(function(data){
            that.imagesTab[type] = JSON.parse(data);
            if(functionEnd){
                var images = that.imagesTab['people'].concat(that.imagesTab['travel'],
                    that.imagesTab['architecture'], that.imagesTab['various']);

                $.post('sortFiles.php', {
                    'images': images
                },$(this).serialize())
                    .done(function(data){
                        var sortImages = JSON.parse(data);
                        app.displayImagesInGrid(sortImages, type, functionEnd);
                    })
                    .error(function(){
                        alert('error with photo gallery - please reload the page');
                    });
            }
        })
        .error(function(){
            alert('error with photo gallery - please reload the page');
        });
};

//launch isotope for photo gallery
App.prototype.launchIsotope = function(){
    // init Isotope
    var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        masonry: {
            columnWidth: '.grid-sizer'
        }
    });
    // layout Isotope after each image loads
    $grid.imagesLoaded().progress( function() {
        $grid.isotope('layout');
    });

    // filter items on button click
    $('.photos-menu').on( 'click', 'a', function() {
        var filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });

    if($(window).width() >= 767) {
        app.initFancybox();
    }
    else{
        $('.fancybox').on('click', function(){
           return false;
        });
    }
};

//Init fancybox for each images in photo gallery
App.prototype.initFancybox = function(){
    var that = this;

    $(".fancybox").fancybox({
        openEffect	: 'elastic',
        closeEffect	: 'elastic',

        helpers : {
            title	: {
                type: 'outside'
            },
            overlay : {
                css : {
                    'background' : 'rgba(255, 255, 255, 0.8)'
                }
            }
        },
        afterShow: function(){
            that.canNavigate = false;
        },
        afterClose: function(){
            that.canNavigate = true;
        }
    });
};


/*Launch the robot*/
var app = new App();
app.init();
