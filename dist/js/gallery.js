//---------------------for gallery

let posts = JSON.parse(localStorage.getItem("posts"));

function add_pictures() {
	let image_container = document.getElementById("divId");

	if (posts.length > 0) {
		mainImage_container = document.getElementById("mainImage");
		mainImage_container.setAttribute("src", posts[0]["goods_img"]);
	}

	let calc = 0;
	for (let i in posts) {
		if (calc > 9) break; 
		let img_style = document.createElement("img");
		img_style.classList.add("imgStyle");

		img_style.setAttribute("src",  posts[i]["goods_img"]);
		image_container.appendChild(img_style);
		calc++;
	}
}

add_pictures();

