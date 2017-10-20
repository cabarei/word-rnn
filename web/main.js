$( function() {

	$(window).on("resize", resize_elements);
	resize_elements();

	init_params();

	try_server();

})


function init_params(){
	mode = "haikus"
}



function resize_elements(){
	
	var w_width = $(window).width();
	var w_height = $(window).height();

}


$(window).keydown(function(e){
	
	console.log(e.keyCode);

	// if (e.keyCode == 80){ //p
	// 	post_to_server("test");
	// }

	if (e.keyCode == 13){ //intro
		mode = "haikus"
		$(".haiku_box").fadeOut(500);
		post_to_server($("#text_input").val());
		$("#text_input").val("");
	}
	if (e.keyCode == 38){ //up
		mode = "hsue"
		post_to_server($("#text_input").val());
		$("#text_input").val("");
	}

})



function try_server(){
	mode = "test";
	post_to_server("this is a test", true);
}