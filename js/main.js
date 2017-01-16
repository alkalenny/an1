

$(document).ready(function(e){

	$('#hamburger').click(function(){toggleOffcanvas()});

	$('.nav a').click(function(){
		if($('#hamburger').hasClass('active')){
			toggleOffcanvas();
		}
	});


	$('a').click(function(){
		$('html, body').animate({
        	scrollTop: $( $.attr(this, 'href') ).offset().top
    		}, 300);
    	return false;
	})

	$('#submit').click(function(){sendContact()});
	grabImages(access_parameters);
});

$(window).bind('resize', function () { 
		sizing();			
	});




function sizing(){
	$('#splash').css('height', $(window).height());
	$('#logo-ship').css('height', $(window).height());

	$('#insta').css('height', $(window).height());
	$('#contact').css('height', $(window).height());

}

function toggleOffcanvas(){
	if($('#hamburger').hasClass('active')){

		$('#logo').css('top', $('#logo-ship').height() / 2 - 150); 
		$('#loading').fadeOut('slow');



		$('#hamburger').removeClass('active');
		$('#hamburger').addClass('inactive');
		$('#logo-ship').removeClass('offcanvas-open');
		$('.nav .offcanvas').removeClass('animated zoomIn');
		//console.log('hideOffcanvas');

	}else{

		$('#logo').css('top', $('#logo-ship').height() / 2 - 272);
		$('#loading').fadeIn('slow');

		$('#hamburger').addClass('active');
		$('#hamburger').removeClass('inactive');
		$('#logo-ship').addClass('offcanvas-open');

		//console.log($('.nav .offcanvas').length);

		var menPoints = $('.nav .offcanvas');
		
		jQuery.each(menPoints, function(i) { 
    		var el=$(this);
    		setTimeout(function() { 
        		el.addClass('animated zoomIn');
    		}, i * 100); 
		});

		//console.log('showOffcanvas');
	}
}

function sendContact(){
	var name = $("#name").val();
	var email = $("#email").val();
	var message = $("#message").val();

	$("#returnmessage").empty();

	if (name == '' || email == '') {
		$("#returnmessage").append('Please fill in the required fields *');
	} else {
		$.post("contact_form.php", {
			name1: name,
			email1: email,
			message1: message,
		}, function(data) {
			$("#returnmessage").append(data); // Append returned message to message paragraph.
			if (data == "Your Query has been received, We will contact you soon.") {
			$("#form")[0].reset(); // To reset form fields on success.
			}
		});
	}
}

	var tag = "anuell";
	var user = 1647259321;
	var count = 8;
	var access_token = "1647259321.1677ed0.7e5658abf0d846c595f8c8c6158f04e2";
	var access_parameters = {access_token:access_token};

	function grabImages(access_parameters) {  

		//console.log("yay.,")
		// var instagramUrl = 'https://api.instagram.com/v1/tags/' + tag + '/media/recent?callback=?&count='+ count;
		var instagramUrl = 'https://api.instagram.com/v1/users/' + user +'/media/recent?callback=?&count='+ count;

		$.getJSON(instagramUrl, access_parameters, onDataLoaded);

	}			

	function onDataLoaded(instagram_data) {  

							 // instagram_data.meta is where the secret messages from Instagram live
							  // and instagram_data.meta.code holds the status code of the request
							  // 404 means nothing was found, and 200 means everything is all good so...

							  //console.log(instagram_data)

							  if(instagram_data.meta.code == 200) {
							    // create a variable that holds all returned payload
							    var photos = instagram_data.data;

							    //as long as that variable holds data (does not = ) then...

							    if(photos.length > 0) {
							      //since there are multiple objects in the payload we have
							      //to create a loop
							      for (var key in photos ){
							        //we create a variable for one object
							        var photo = photos[key];
							        //then we create and append to the DOM an  element in jQuery
							        //the source of which is the thumbnail of the photo
							        		//thumbnail
							        		//$('#instafeed').append('<img src="' + photo.images.thumbnail.url + '">');
							        		//low resolution

							        		$('#insta .wrapper #pics').append('<div class="small-12 medium-6 large-3 columns"><a target="_blank" class="wow fadeInUp" href="'+ photo.link +'"><img src="' + photo.images.low_resolution.url + '" /></a></div>');
							        	}
							        }
							        else {
							      //if the photos variable doesn’t hold data
							      $('#target').append('Hmm.  I couldn’t find anything!');
							  }
							}
							else{
							      //if we didn’t get a 200 (success) request code from instagram
							      //then we display instagram’s error message instagram
							      //var error = data.meta.error_message;
							      //$('#target').append('Something happened, Instagram said: ' + error);
							  }
							}


