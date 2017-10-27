$( function() {

	$(window).on("resize", resize_elements);
	resize_elements();

	init_params();

	setTimeout(function(){ try_server(); }, 200);

})


function init_params(){

	auto_mode = false;

	strict_3_verses = true;

	max_n_haikus = 4;
	show_mode = "normal";

	programatic_params();
	
}


function programatic_params(){
	thinking_haiku = false;
	to_next_haiku = 0;
	new_word = "";
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
		post_to_server($("#text_input").val(), "hsue");
		$("#text_input").val("");
	}


	if (e.keyCode == 65){ //a 
		if (auto_mode) {
			stop_auto_mode();
		}
	}

})




function send_haiku(words){

	mode = "haikus"
	setTimeout( function(){ $(".haiku_box").fadeOut(1500) }, 10);
	$("#text_input").val("");
	post_to_server(words, "haikus");

}



function try_server(){
	mode = "test";
	post_to_server("this is a test", "test", true);
}



function stop_auto_mode(){
	clearTimeout(to_next_haiku);
	$("#text_input").fadeIn(500).focus();
}



function next_haiku(){

	if (!thinking_haiku){

		auto_mode = true;
		mode="haikus";
		$("#text_input").fadeOut(500);

		last_word = new_word;
		new_word = "";
		word_length = 0;

		n_words = $(".single-word").length;

		if (n_words == 0){
			post_to_server("", "haikus");
		}else{

			while (new_word.length < 4 || new_word == last_word){
				word_idx = parseInt( Math.random() * n_words );
				new_word_span = $( ".single-word:eq("+word_idx+")" );
				new_word = new_word_span.text();
			}	

			new_word_span.trigger("click");		
		}

		console.log("next_haiku: " + new_word );

	}

	clearTimeout(to_next_haiku);
	to_next_haiku = setTimeout( function(){next_haiku();}, 12000 );
}




function show_haikus(haikus){

	// console.log("show");

	$(".haiku_box").empty();

	var count = 0;

	for (i in haikus){

		haiku = haikus[i];

		haiku = clean_haiku(haiku);

		haiku = haiku.split("xxxxxx")[1];
		verses = haiku.split("xxx");

		if (i==0 || (verses.length != 3 && strict_3_verses)) continue;

		$(".haiku_box").append('<div class="single_haiku_box" id="single_haiku_box_'+i+'"></div>');

		for (j in verses){
			verse = verses[j];
			$("#single_haiku_box_"+i).append("<p class='verse'>"+verse+"</p>");
			$("#single_haiku_box_"+i).off().on("dblclick", function(){
				content = $(this).text().replace(/  /g , "xxx");
				$(this).addClass("saved");
				console.log("saving: "+content)
				post_to_server(content, "save")
			})
		}

		count++;
		if (count==max_n_haikus) break;

		$(".haiku_box").append("<br/>* * *<br/><br/>");

	}

	split_words();

	$(".haiku_box").fadeIn(1000);

	if (show_mode == "fade") fade_haikus();

}



function clean_haiku(haiku){
	
	return haiku.replace(/piss/g , "water").replace(/["']/g, "");
}


function fade_haikus(){

	$(".single_haiku_box").hide();

	cont=1;
	interval = 1000;

	$(".single_haiku_box").each( function(){
		cont++;
		setTimeout( function(){ $(this).fadeIn(200); }, interval*cont);
	}) 
	
}


function show_hsue(hsue){

	$(".haiku_box").append("<br/><br/>"+hsue);

	// split_words();
}


function split_words(){ 

	$("p").each(function(idx){
		var words = $(this).text().split( /\s+/ );  
		var text = words.join( "</span> <span class='single-word'>" );  
		$(this).html( "<span>" + text + "</span>" );  
	});


	$(".single-word").bind( "click", function() {  
		var word = $(this).text();
		if (word.length > 0) {
			$( this ).css( "background-color", "#33d" );  
			send_haiku(word);
			clearTimeout(to_next_haiku);
		}
	})
}
