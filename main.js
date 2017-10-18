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
	
	// console.log(e.keyCode);

	if (e.keyCode == 80){ //p
		post_to_server("the moon");
	}

	if (e.keyCode == 13){ //intro
		mode = "haikus"
		post_to_server($("#text_input").val());
		$("#text_input").val("");
	}
	if (e.keyCode == 40){ //intro
		mode = "hsue"
		post_to_server($("#text_input").val());
		$("#text_input").val("");
	}

})
