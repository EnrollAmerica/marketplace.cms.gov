$(document).ready(function(){

	/* Mobile Navigation View */
	$('#nav').prepend('<div id="menu-icon"><a href="#">Menu</a></div>');
	
	/* toggle nav */
	$("#menu-icon").on("click", function(){
		$(".navbar-inner").slideToggle();
		$("navbar-inner").toggleClass("active");
	});	
	/* End */
	
		
		
		if(!Modernizr.input.placeholder){

			$('[placeholder]').focus(function() {
			  var input = $(this);
			  if (input.val() == input.attr('placeholder')) {
				input.val('');
				input.removeClass('placeholder');
			  }
			}).blur(function() {
			  var input = $(this);
			  if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			  }
			}).blur();
			$('[placeholder]').parents('form').submit(function() {
			  $(this).find('[placeholder]').each(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
				  input.val('');
				}
			  })
			});
		
		}
		
    
  /* Badge Code */  
    
    
    $(".wlink").click(function (event) {

	  if ($('#code'+$(this).attr('target')).css('display') == 'none') {
	  
	        
	           
	         $('#code'+$(this).attr('target')).show(200);
	         $(this).html('Hide Code');  
	     }
	   else {
	
	   $('#code'+$(this).attr('target')).hide(200);
	         $(this).html('Show Code');   
	
	  }
	    event.preventDefault();
	});




 /* Print */
	$('.print').click(function() {
			window.print();
			return false;
	});
	
	
	
});
	


/* Addthis */
	
var addthis_config = {
            ui_508_compliant: true,
		   services_compact: 'email, facebook, twitter, linkedin, gmail, blogger, tumblr',
           services_exclude: 'print',
		   ui_click: true
  } 
  
 
 /* Google site search */
  google.load('search', '1');

                function inputFocus() {

                    //document.getElementById('query-input').style['background'] = '';

                }

                function inputBlur() {

                    var queryInput = document.getElementById('query-input');

                }

                function init() {

                    google.search.CustomSearchControl.attachAutoCompletion(

  '004711181796222465330:rs9xgyeakbq',

  document.getElementById('query-input'),

  'two-page-form');

                    inputBlur();

                }

                function submitQuery() {
                    window.location = '/search.html?q=' + encodeURIComponent(
            document.getElementById('query-input').value);
                    return false;
                }
                google.setOnLoadCallback(init);
  
  
  		