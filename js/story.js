$(window).scroll(function(e){

	


});



function getOffset( el ) {
    var _x = 0;
    var _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y };
}

function clickReadMore(e){
	//console.log(e);
	if(!readMoreIsActive){
		$('.story-text').removeClass('animated');
		$('.story-text').css( 'top', $('.story-text').scrollTop());
		$('.story-text').removeClass('sticky');
		$('.story-text').addClass('animated');
		
		$('.story-text').css('top', $(window).scrollTop() - $(window).innerHeight());
		
		readMoreIsActive = true;
		$('.story-read-more-button .hide').show();
		$('.story-read-more-button .show').hide();
	}else{
		$('.story-text').css('top', 'calc(100vh - 146px)');
		$('.story-text').addClass('sticky');
		readMoreIsActive = false;
		$('.story-read-more-button .show').show();
		$('.story-read-more-button .hide').hide();
	}
}

