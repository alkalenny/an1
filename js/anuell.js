var currentPageType,
readMoreIsSticky = false,
readMoreIsActive = false,
currentScrollPos = 0,
currentTextScrollPos = 0,
textScrollPointZero = 0,
theRatio = 0,
scrolldirection,
theLine,
theEndLine,
browser;

// ladeanimation loswerden (firsttime)
$(window).load(function(e){
	generalLoad();
});


// ready (first time only, egal ob story oder index)
window.onload = function(){
	//console.log($('.barba-container').data('type'));
	currentPageType = $('.barba-container').data('type');

	switch(currentPageType) {
    case 'story':
        storyLoaded();
        break;
    case 'index':
        indexLoaded();
        break;
    default:
        break;
}

if(Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification)){
  browser = "safari";
}

};


/// scroll 


$(window).scroll(function(e){
	var st = $(this).scrollTop();

	if(st > currentScrollPos){
		scrolldirection = 'down';
	}else{
		scrolldirection = 'up';
	}

	currentScrollPos = $(this).scrollTop();

	currentAlpha =  $(window).scrollTop() / $(window).height();

	if(currentAlpha <= 1){
		// console.log(currentAlpha);
		nextAlpha = currentAlpha * 1.4;
		$('#splash .overlay').css({ opacity: nextAlpha });
	}

	switch(currentPageType) {
    	case 'story':
        	storyScroll();
        	break;
    	case 'index':
        	indexScroll();
        	break;
    	default:
        	break;
        }

});

////General onload

function generalLoad(){
		sizing();
	

	//console.log($('#splash').css('background-image'));

	//check if background url load

	var bgPure = $('#splash').css('background-image');
	var bgPure = bgPure.replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, '')

	 $('<img/>').attr('src', bgPure).load(function() {
 	  		
 	  		$(this).remove(); // prevent memory leaks as @benweet suggested
   			window.scrollTo(0, 0);
   			$('#loading').fadeOut('slow', function(){$('#loading').addClass('blurred')});
			$('#logo').css('position', 'absolute');
				//scrollTop muss hier noch hin!
			$('#logo .background').removeClass('animated');
			$('#logo .nav').show();
			$('#logo .nav').addClass('animated zoomIn');
	 });
}

///// INDEX FUNCTIONS!!!!

function indexLoaded(){

	var $collection = $('#collection');

	$collection.imagesLoaded( function(){
  		$collection.masonry({
    		columnWidth: 120,
    		isFitWidth: true
  		});
	});

}

function indexScroll(){

}


//// STORY FUNCTIONS!!!!
function storyLoaded(){
	$('.story-read-more-button').on('click', function(){clickReadMore($(this))});
	$('.story-close-read-more').on('click', function(){clickReadMore($(this))});
	
 //setTimeoutFunction noch mit mainCSS Loading abgleichen.
		theLine = $('.story-text').offset().top + $('.story-read-more-button').outerHeight();
    theEndLine = $('.storywrapper').outerHeight() + $('#splash').outerHeight(); 

	if($(window).outerWidth() >= 1024){
		
		ratio = $('.story-text').outerHeight() / $('.story-images').outerHeight();

		var imagesNum = 1;
		


		$('.story-images img').on('load',function(){
			//console.log($(this));
			if( $(this).outerWidth() <  $(this).outerHeight()){
				$(this).addClass('highcunt');
			}

			imagesNum++
			if(imagesNum == $('.story-images img').length){
				ratio = $('.story-text').outerHeight() / $('.story-images').outerHeight();
			}
		}).each(function() {
  			if(this.complete) $(this).load();
		});
	}
}

function storyScroll(){
	if(!readMoreIsActive && $(window).innerWidth()<=1024)
		checkForStickyness(scrolldirection);

	if( $(window).innerWidth()>=1025 )
		parallax();
}


function checkForStickyness(sd){
	//console.log("storytext-offset " +  $('.story-text').offset().top );
	//console.log("scrolltop " + $(window).scrollTop() );
	//console.log("readmoreheight " + $('.story-read-more-button').outerHeight());
	//console.log("innerHeight " + $(window).innerHeight());
	var theSpace = $(window).scrollTop() + $(window).innerHeight();;
	
	if(sd == 'down'){
		if( theLine <= theSpace && !readMoreIsSticky){
			$('.story-text').addClass('sticky');
			readMoreIsSticky = true;
		}

    if(readMoreIsSticky && theSpace >= theEndLine){
      $('.story-text').removeClass('sticky');
      readMoreIsSticky = false;
    }

	}else{
		
    if( theLine >= theSpace && readMoreIsSticky){
		  $('.story-text').removeClass('sticky');
			readMoreIsSticky = false;
		}

    if(!readMoreIsSticky && theSpace <= theEndLine && theSpace >= theLine){
      $('.story-text').addClass('sticky');
      readMoreIsSticky = true;
    }

	}
}

function parallax(){
	//console.log( $(window).scrollTop() - $('#splash').outerHeight() );
	//console.log( $('.story-images').outerHeight() / $('.story-text').outerHeight() );
	textScrollPointZero = $(window).scrollTop() - $('#splash').outerHeight();
	currentTextScrollPos = Math.floor(textScrollPointZero * (1-ratio));

	//console.log($(window).scrollTop() + $(window).innerHeight());
	//console.log($('#splash').outerHeight() + $('.storywrapper').outerHeight());

	var stoppingpoint =  ($('#splash').outerHeight() + $('.storywrapper').outerHeight() ) > ($(window).scrollTop() + $(window).innerHeight()) ? true : false;
	//currentTextScrollPos = Math.floor(currentTextScrollPos*2)/2;
	//console.log(currentTextScrollPos);
	//console.log(stoppingpoint);
	if(currentTextScrollPos >= 1 && stoppingpoint){
	//$('.story-text').css('top', currentTextScrollPos);
    if(browser == "safari"){
	     $('.story-text').css({"transform":"translate3d(0," + currentTextScrollPos + "px,0)"});
    }else{
      $('.story-text').css({"transform":"translate(0," + currentTextScrollPos + "px)"});
    }
	}

}

///////BARBA!

document.addEventListener("DOMContentLoaded", function() {
  var lastElementClicked;
  var PrevLink = document.querySelector('a.prev');
  var NextLink = document.querySelector('a.next');
  // console.log(PrevLink);
  
  Barba.Pjax.init();
  Barba.Pjax.start();
  Barba.Prefetch.init();

  Barba.Dispatcher.on('linkClicked', function(el) {
    lastElementClicked = el;
  });

  Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
  	
	});

  var MovePage = Barba.BaseTransition.extend({

    start: function() {
      this.originalThumb = lastElementClicked;

      Promise
        .all([this.newContainerLoading, this.scrollTop()])
        .then(this.movePages.bind(this));
    },

    scrollTop: function() {
      var deferred = Barba.Utils.deferred();
      //var obj = { y: window.pageYOffset };

      $('html, body').animate({
        	scrollTop: 0
    		}, 0);
		
      // $(this.oldContainer).fadeOut( "slow", function() {
      // 		deferred.resolve();
     	// 	return deferred.promise;
      // });

       return $(this.oldContainer).animate({ opacity: 0 }).promise();
    },

    movePages: function() {
      var _this = this;
      var goingForward = true;
      this.updateLinks();


      if (this.getNewPageFile() === this.oldContainer.dataset.prev) {
        goingForward = false;
      }

 //      $('html, body').animate({
 //        	scrollTop: $( $.attr(this, 'href') ).offset().top
 //    		}, 300);
 //    	return false;
	// });


		currentPageType = $(this.newContainer).data('type')
        

        setTimeout(function(){
         
        //window.scrollTo(0, 0);
        	switch(currentPageType) {
    		case 'story':
        		storyLoaded();
        		generalLoad()
        		break;
    		case 'index':
        		indexLoaded();
        		generalLoad()
        		break;
    		default:
        		break;
        	}
		
        sizing();
        },1);

        $(this.newContainer).fadeIn( "slow", function() {
     	 });

        ga('set', 'page', window.location.pathname);
        _this.done();

        
    },

    updateLinks: function() {
      // PrevLink.href = this.newContainer.dataset.prev;
      // NextLink.href = this.newContainer.dataset.next;
    },

    getNewPageFile: function() {
      return Barba.HistoryManager.currentStatus().url.split('/').pop();
    }
  });

  Barba.Pjax.getTransition = function() {
    //console.log(Barba.HistoryManager);
    return MovePage;
  };
});



//HELPER

(function($){
    $.fn.imgLoad = function(callback) {
        return this.each(function() {
            if (callback) {
                if (this.complete || /*for IE 10-*/ $(this).height() > 0) {
                    callback.apply(this);
                }
                else {
                    $(this).on('load', function(){
                        callback.apply(this);
                    });
                }
            }
        });
    };
})(jQuery);
