
var mouseDrag = true; //check custom in flickity.pkgd.js for custom code

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



// USED FOR THE FORM CONTACT'S ANIMATIONS
[].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {
    // in case the input is already filled..
    if( inputEl.value.trim() !== '' ) {
        classie.add( inputEl.parentNode, 'input--filled' );
    }

    // events:
    inputEl.addEventListener( 'focus', onInputFocus );
    inputEl.addEventListener( 'blur', onInputBlur );
} );

function onInputFocus( ev ) {
    classie.add( ev.target.parentNode, 'input--filled' );
}

function onInputBlur( ev ) {
    if( ev.target.value.trim() === '' ) {
        classie.remove( ev.target.parentNode, 'input--filled' );
    }
}
/*END OF FORM CONTACT's ANIMATIONS*/



//INITIALIZE FLICKITY
var elem = document.querySelector('.website-gallery');
var flkty = new Flickity( elem, {
    // options
    wrapAround: false,
    prevNextButtons: false,
    pageDots: false,
    contain: false
});
//event when we change the page
flkty.on( 'settle', function() {
   // console.log( 'Flickity settled at ' + flkty.selectedIndex );
});



//GO TO PAGE ON CLICKED MENU'S ELEMENTS
$('.overlay-menu ul li a').on( 'click', function(event){
    var index = $(event.target).attr('data-slideToGo');
    $('#hamb-menu').toggleClass('open');
    $('.overlay').toggleClass('open');
    flkty.select(parseInt(index));
});


//SMOOTH SCROLLING
$(function() {
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
});


/* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
particlesJS.load('particles-js', 'assets/particles.json', function() {
    //console.log('callback - particles.js config loaded');
});


//MESSAGE FORM SUBMIT
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



$(document).ready(function(){
    //USED FOR THE HAMB MENU
    $('#hamb-menu').click(function(){
        $(this).toggleClass('open');
        $('.overlay').toggleClass('open');
    });

    //disable mouse drag if we are on phone or tablet
    mouseDrag = $(window).width() >= 767;

    bindProjectsButtons();
});

//
function bindProjectsButtons(){
    $('.oveWebsite .linkButton').on('click', function(){
        window.open('http://michaelgenty.com/OVE-website/', '_blank');
    });
    $('.unityGame .linkButton').on('click', function(){
        window.open('', '_blank');
    });
    $('.itycom .linkButton').on('click', function(){
        window.open('http://www.itystudio.com/', '_blank');
    });
}


//disable mouse drag if we are on phone or tablet
window.addEventListener('resize', function(event){
    mouseDrag = $(window).width() >= 767;
});
