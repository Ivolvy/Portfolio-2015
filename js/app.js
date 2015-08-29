
//CSS ANIMATIONS ON SCROLL
//modify scrollContainer in WOW.prototype.defaults to change the container selector
new WOW().init();

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

//USED FOR THE HAMB MENU
$(document).ready(function(){
    $('#hamb-menu').click(function(){
        $(this).toggleClass('open');
        $('.overlay').toggleClass('open');
    });
});

//INITIALIZE FLICKITY
var elem = document.querySelector('.hero-gallery');
var flkty = new Flickity( elem, {
    // options
    wrapAround: false,
    prevNextButton: true,
    pageDots: false,
    contain: true
});

//GO TO PAGE ON CLICKED MENU'S ELEMENTS
$('.overlay-menu ul li a').on( 'click', function(event){
    var index = $(event.target).attr('data-slideToGo');
    $('#hamb-menu').toggleClass('open');
    $('.overlay').toggleClass('open');
    flkty.select(parseInt(index));
});

