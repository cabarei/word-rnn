
function post_to_server(words, _mode, _testing){

	mode = _mode || "haikus";
	testing = _testing || false;

	var server_url = "http://localhost:8080/" + mode;
	// var server_url = "http://34.249.147.24:8080/" + mode;

	console.log("posting to " + server_url);
	console.log(testing +" | "+ mode);
	thinking_haiku = true;

	$.ajax({
		url: server_url,
		method: "POST",
		dataType: "json",
		data: JSON.stringify({"words": words}),
		success: function (answer){
			thinking_haiku = false;
			console.log(answer);
			if (!testing) 
				process_answer(answer);
			else
				$("#text_input").show().focus();
		},
		error: function( error ){
			console.log("error:", error);
			alert("no server connection");
		},
		timeout: 10000
	})

}
			 


function process_answer(answer){

	// console.log("process_answer");

	if (mode == "haikus"){
		haikus = JSON.parse(answer.data);
		show_haikus(haikus);
	}
	if (mode == "hsue"){
		hsue = JSON.parse(answer.data);
		show_hsue(hsue);
	}

}

