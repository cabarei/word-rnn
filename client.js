function post_to_server(words){

	var server_url = "http://localhost:8080/makehaikus";
	// var server_url = "http://34.249.147.24:8080/makehaikus";

	console.log("posting to " + server_url);

	$.ajax({
		url: server_url,
		method: "POST",
		dataType: "json",
		data: JSON.stringify({"words": words}),
		success: function (answer){
			// console.log("answer:", answer);
			process_answer(answer);
		},
		error: function( error ){
			console.log("error:", error);
		}
	})

}
			 

function process_answer(answer){

	console.log(answer);

	console.log("process_answer");
	haikus = JSON.parse(answer.haikus);
	console.log(haikus);

	show_haikus(haikus);

}


function show_haikus(haikus){

	for (i in haikus){
		haiku = haikus[i];

		haiku = haiku.split("xxxxxx")[1];

		// $("body").append(haiku);
		verses = haiku.split("xxx");
		for (j in verses){
			verse = verses[j];
			$("body").append("<br/>"+verse);

		}

		$("body").append("<br/><br/>-----------------<br/>");

	}

}


