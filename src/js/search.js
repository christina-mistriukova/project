let button_search = document.getElementById("searching-clicker");

button_search.addEventListener("click", function() {
	let search_ph = document.getElementById("searching").value;
	window.location="/?search-phrase="+search_ph;
});


function get_url_vars() {
    let vars = {};
    let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}