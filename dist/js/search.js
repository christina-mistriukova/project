let button_search = document.getElementById("searching-clicker");

button_search.addEventListener("click", function() {
	let search_ph = document.getElementById("searching").value;
	window.location="/?search-phrase="+search_ph;
});

let button_my_posts = document.getElementById("my-posts");

button_my_posts.addEventListener("click", function() {
	let posts = JSON.parse(localStorage.getItem("posts"));
	let addr;
	let user_in = JSON.parse(localStorage.getItem("user_in"));
	if (user_in!==null) {
		//for (i in posts) {
		//	if (posts[i]["u_id"]==user_in["user_id"]) {
				addr = "/?u_id="+user_in["user_id"];
				//break;
		//	}
		//}
	}
	
	window.location=addr;
});


function get_url_vars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}
