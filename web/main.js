$( function() {

	$(window).on("resize", resize_elements);
	resize_elements();

	init_params();

})


function init_params(){

}



function resize_elements(){
	
	var w_width = $(window).width();
	var w_height = $(window).height();

}


$(window).keydown(function(e){
	
	console.log(e.keyCode);

	if (e.keyCode == 80){ //p
		post_to_server("the moon");
	}

})
