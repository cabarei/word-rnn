
function post_to_server(words, testing=false){

	// var server_url = "http://localhost:8080/" + mode;
	var server_url = "http://34.249.147.24:8080/" + mode;

	console.log("posting to " + server_url);

	$.ajax({
		url: server_url,
		method: "POST",
		dataType: "json",
		data: JSON.stringify({"words": words}),
		success: function (answer){
			console.log(answer);
			if (!testing) process_answer(answer);
			$("#text_input").show();
		},
		error: function( error ){
			console.log("error:", error);
			alert("no server connection");
		}
	})

}
			 


function process_answer(answer){

	console.log("process_answer");

	if (mode == "haikus"){
		haikus = JSON.parse(answer.data);
		// console.log(haikus);
		show_haikus(haikus);
	}
	if (mode == "hsue"){
		hsue = JSON.parse(answer.data);
		// console.log(haikus);
		show_hsue(hsue);
	}

}



function show_haikus(haikus){

	$(".haiku_box").empty();

	for (i in haikus){
		haiku = haikus[i];

		haiku = haiku.split("xxxxxx")[1];
		verses = haiku.split("xxx");

		for (j in verses){
			verse = verses[j];
			$(".haiku_box").append("<br/><p>"+verse+"</p>");
		}

		$(".haiku_box").append("<br/><br/>***<br/>");

	}

	$(".haiku_box").fadeIn(1000);

	split_words();
}



function show_hsue(hsue){

	$(".haiku_box").append("<br/><br/>"+hsue);

	split_words();
}


function split_words(){ 

	for (i in $("p")){
		$p = $($("p")[i]);
		var words = $p.text().split( /\s+/ );  
		var text = words.join( "</span> <span>" );  
		$p.html( "<span>" + text + "</span>" );  
	}

	$( "span" ).on( "click", function() {  
		if ($(this).text().length > 2) {
			$( this ).css( "background-color", "red" );  
		}
	})
}
