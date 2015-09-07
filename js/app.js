var flkty;

var Main = function(){
    this.init = function() {
        var wow = new Main.Wow();
        var flickity = new Main.Flickity();
        var formContact = new Main.FormContact();
        var hambMenu = new Main.HambMenu();
        var smoothScroll = new Main.SmoothScroll();

        wow.init();
        flickity.init();
        formContact.init();
        hambMenu.init();
        smoothScroll.init();
    }
};

//CSS ANIMATIONS ON SCROLL
//modify scrollContainer in WOW.prototype.defaults to change the container selector
Main.Wow = function(){
    this.init = function(){
        new WOW().init();
    };
};

// USED FOR THE FORM CONTACT'S ANIMATIONS
Main.FormContact = function(){
    var that = this;
    this.init = function(){
        [].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {
            // in case the input is already filled..
            if( inputEl.value.trim() !== '' ) {
                classie.add( inputEl.parentNode, 'input--filled' );
            }

            // events:
            inputEl.addEventListener( 'focus', that.onInputFocus );
            inputEl.addEventListener( 'blur', that.onInputBlur );
        } );
    };
    this.onInputFocus = function(ev){
        classie.add( ev.target.parentNode, 'input--filled' );
    };
    this.onInputBlur = function(ev){
        if( ev.target.value.trim() === '' ) {
            classie.remove( ev.target.parentNode, 'input--filled' );
        }
    };
};

//USED FOR THE HAMB MENU
Main.HambMenu = function(){
    var that = this;
    this.init = function() {
        $('#hamb-menu').click(function () {
            $(this).toggleClass('open');
            $('.overlay').toggleClass('open');
        });
        that.eventOnClick();
    };
    this.eventOnClick = function(){
        //GO TO PAGE ON CLICKED MENU'S ELEMENTS
        $('.overlay-menu ul li a').on( 'click', function(event){
            var index = $(event.target).attr('data-slideToGo');
            $('#hamb-menu').toggleClass('open');
            $('.overlay').toggleClass('open');
            flkty.select(parseInt(index));
        });
    }
};

//SLIDER
Main.Flickity = function(){
    var that = this;
    this.init = function() {
        //INITIALIZE FLICKITY
        var elem = document.querySelector('.website-gallery');
        flkty = new Flickity( elem, {
            // options
            wrapAround: false,
            prevNextButtons: true,
            pageDots: false,
            contain: true
        });
        that.onPageChange();
    };
    this.onPageChange = function(){
        //event when we change the page
        flkty.on( 'settle', function() {
            var currentScreen = 'home';
            //console.log( 'Flickity settled at ' + flkty.selectedIndex );
            switch(flkty.selectedIndex){
                case 0:
                    currentScreen = 'home';
                    break;
                case 1:
                    currentScreen = 'projects';
                    break;
                case 2:
                    currentScreen = 'contact';
                    break;
                default:
                    break;
            }
            ivolvy.setCurrentScreen(currentScreen);
        });
    };
};

Main.SmoothScroll = function(){
    this.init = function() {
        $(function () {
            $('a[href*=#]:not([href=#])').click(function () {
                if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                    var target = $(this.hash);
                    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                    if (target.length) {
                        $('#introduction-page').animate({ //set the id of our element to move
                            scrollTop: target.offset().top
                        }, 1000);
                        return false;
                    }
                }
            });
        });
    };
};

$(document).ready(function(){
    var main = new Main();
    main.init();
});