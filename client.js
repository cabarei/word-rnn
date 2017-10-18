// mode = "haikus"
mode = "hsue"


function post_to_server(words){

	var server_url = "http://localhost:8080/" + mode;
	// var server_url = "http://localhost:8080/hsue";
	// var server_url = "http://34.249.147.24:8080/haikus";

	console.log("posting to " + server_url);

	$.ajax({
		url: server_url,
		method: "POST",
		dataType: "json",
		data: JSON.stringify({"words": words}),
		success: function (answer){
			console.log(answer);
			process_answer(answer);
		},
		error: function( error ){
			console.log("error:", error);
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

	$(".haicku_box").empty();

	for (i in haikus){
		haiku = haikus[i];

		haiku = haiku.split("xxxxxx")[1];
		verses = haiku.split("xxx");

		for (j in verses){
			verse = verses[j];
			$(".haicku_box").append("<br/>"+verse);
		}

		$(".haicku_box").append("<br/><br/>-----------------<br/>");

	}

}



function show_hsue(hsue){

	// $(".haicku_box").empty();
	$(".haicku_box").append("<br/><br/>"+hsue);

}
