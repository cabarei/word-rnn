$( function() {

	$(window).on("resize", resize_elements);
	resize_elements();

	init_params();

	try_server();

})


function init_params(){
	mode = "haikus"
	auto_mode = false;
	thinking_haiku = false;
	to_next_haiku = 0;
}



function resize_elements(){
	
	var w_width = $(window).width();
	var w_height = $(window).height();

}


$(window).keydown(function(e){
	
	// console.log(e.keyCode);

	if (e.keyCode == 13){ //intro
		var words = $("#text_input").val();
		if (words != "")
			send_haiku(words);
		else 
			next_haiku();
	}
	if (e.keyCode == 38){ //up
		mode = "hsue"
		post_to_server($("#text_input").val());
		$("#text_input").val("");
	}


	if (e.keyCode == 65){ //a 
		if (auto_mode) {
			clearTimeout(to_next_haiku);
			$("#text_input").fadeIn(500);
		}
	}

})




function send_haiku(words){

	mode = "haikus"
	$(".haiku_box").fadeOut(1500);
	$("#text_input").val("");
	post_to_server(words);

}

function try_server(){
	mode = "test";
	post_to_server("this is a test", true);
}


function toogle_auto_mode(){

	auto_mode = !auto_mode;

	if (auto_mode){
		next_haiku();
		$("#text_input").fadeOut(500);
	}else {
		clearTimeout(to_next_haiku);
		$("#text_input").fadeIn(500);
	}
}



function next_haiku(){

	if (!thinking_haiku){

		thinking_haiku = true;
		setTimeout( function(){ thinking_haiku = false; }, 10000);

		console.log("next_haiku");
		auto_mode = true;
		$("#text_input").fadeOut(500);

		word_length = 0;

		while (word_length < 4){
			n_words = $(".single-word").length;
			word_idx = parseInt( Math.random() * n_words );
			new_word = $( ".single-word:eq("+word_idx+")" );
			word_length = new_word.text().length;
			console.log(word_length);
		}

		console.log("next_haiku: " + new_word.text() );
		new_word.trigger("click");
	}

	clearTimeout(to_next_haiku);
	to_next_haiku = setTimeout( function(){next_haiku();}, 15000 );
}
