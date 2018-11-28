
//---------this functions are for get information from post-form to localstorage

button_add_post = document.getElementById("add_new_lot");
//console.log(button_add_post)
let section = document.getElementById("id_section");
let type_sell = document.getElementById("id_selling");
let type_pay = document.getElementById("id_pay");
let type_del = document.getElementById("id_del");
let start_date = document.getElementById("start");
let form = document.getElementById("new-post");
//console.log(form);


let menu = "../json/data.json";

function rq(address) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', address, false);
  let buf_info;
  xhr.send();

  if (xhr.readyState!==4 && xhr.status!==200) {
    alert( xhr.status + ': ' + xhr.statusText ); 
  } else {
    buf_info = JSON.parse(xhr.responseText)
  }
  return buf_info;
}

let main_menu = rq(menu);

function insert_options(data, name_data, sec) {  
  let leng = Object.keys(data).length;
  for (i in data[name_data]) {
    let option = document.createElement("option");
    option.innerHTML = data[name_data][i]["name"]; 
    option.setAttribute("value", i);
    if (sec!==null){
    	sec.appendChild(option);
    }
  }
}


function insert_options_id(data, name_data, id) {  
  for (i in data[name_data]) {
   if (i==id){
   	return data[name_data][i]["name"]; 
   }
  }
}


function get_value(sec) {
	let buf_select = sec;
    let value = buf_select.options[buf_select.selectedIndex].value;
    return value;
}

insert_options(main_menu,"menu", section);
insert_options(main_menu,"type_auctione", type_sell);
insert_options(main_menu,"type_payment", type_pay);
insert_options(main_menu,"type_delivery", type_del);

//localStorage.getItem()
function get_from_user(user, val) {
	let user_inf = JSON.parse(localStorage.getItem(user));
	return user_inf[val];
}

function generate_post_id(){
  return Math.random().toString(36).slice(2);
}

//localStorage.removeItem("posts");

let post_id = 0;
if (button_add_post!==null) {
button_add_post.addEventListener("click", function() {
	let goods_name = document.getElementById("goods-name").value;
	let goods_section = get_value(section);
	let goods_img = document.getElementById("goods-img").value;
	//console.log(goods_img);
	let goods_sell = get_value(type_sell);
	let goods_number = document.getElementById("goods-number").value;
	let goods_start_price = document.getElementById("goods-start-price").value;
	//console.log(goods_start_price)
	let goods_now_price = document.getElementById("goods-now-price").value;

	let days = document.getElementById("goods-time-days").value;
	let hours = document.getElementById("goods-time-hours").value;
	let minutes =  document.getElementById("goods-time-minutes").value;

	let small_desc = document.getElementById("small-desc").value;

	let goods_pay = get_value(type_pay);
	let goods_del = get_value(type_del);
	let goods_start_date = get_value(start_date);
	let old_items = JSON.parse(localStorage.getItem("posts")) || [];
	let success_post = document.getElementsByClassName("success-post")[0]; 
	//get_from_user("user_in", "user_id");
	post = {
		"u_id": get_from_user("user_in", "user_id"),
		"id": generate_post_id(),
		"goods_name": goods_name,
		"goods_section": goods_section,
		"goods_img": goods_img,
		"goods_sell": goods_sell,
		"goods_number": goods_number,
		"goods_start_price": goods_start_price,
		"goods_now_price": goods_now_price,
		"days": days,
		"hours": hours,
		"minutes": minutes,
		"goods_pay": goods_pay,
		"goods_del": goods_del,
		"goods_start_date": goods_start_date,
		"current_bid": 0,
		"number_of_bids": 0,
		"small_desc": small_desc
		//
    }
    old_items.push(post);
    localStorage.setItem("posts", JSON.stringify(old_items));
    form.classList.add("hide");
    success_post.classList.remove("class","hide");

  post_id=post_id+1;
});
}
function start_time(n) {
	let obj_date = new Date;
	let next_date;
	for (let i=0; i<n; i++){
		obj_date.setDate(obj_date.getDate() + 1);
		let next_date = {
			"day":obj_date.getDate(),
			"month":obj_date.getMonth(), 
			"year":obj_date.getFullYear() 

		}
		insert_date(next_date, i);
	}
}

function insert_date(date, numb) {
	let option = document.createElement("option");
	option.innerHTML = date["day"]+"-"+date["month"]+"-"+date["year"];
	option.setAttribute("value", numb);
	if (start_date!=null) {
		start_date.appendChild(option);
	}
}

start_time(5);

//не забудь выщитать время до остановки торгов!!!
//---------this functions are for painting posts at the main page 

let posts = JSON.parse(localStorage.getItem("posts"));



function paint_one_post(post) {
		let cards_wr = document.getElementsByClassName("cards-wr")[0];
		let c_wr = document.createElement("div");
		c_wr.classList.add("c-wr");
		cards_wr.appendChild(c_wr);

		let div = document.createElement("div");
		div.classList.add("img-wr");
		c_wr.appendChild(div);

		let img = document.createElement("img");
		img.setAttribute("src", post["goods_img"]);
		div.appendChild(img);

		let goods_descr_wr = document.createElement("div");
		goods_descr_wr.classList.add("goods-descr-wr");
		c_wr.appendChild(goods_descr_wr);

		let goods_headline_wr = document.createElement("div");
		goods_headline_wr.classList.add("goods-headline-wr");
		goods_descr_wr.appendChild(goods_headline_wr);
		let p = document.createElement("p");
		let span = document.createElement("span");
		span.innerHTML = post["number_of_bids"];
		p.innerHTML = post["goods_name"];
		p.appendChild(span);
		goods_headline_wr.appendChild(p);
		if (typeof(post["small_desc"])!=="undefined"){
			let goods_sm_text = document.createElement("div");
			goods_sm_text.classList.add("goods-sm-text");
			goods_sm_text.innerHTML = post["small_desc"];
			goods_descr_wr.appendChild(goods_sm_text);
		}

		let goods_last_news = document.createElement("div");
		goods_last_news.classList.add("goods-last-news");
		goods_descr_wr.appendChild(goods_last_news);
		let ul = document.createElement("ul");
		let ul2 = document.createElement("ul");
		goods_last_news.appendChild(ul);
		goods_last_news.appendChild(ul2);
				

		add_el("li", "Current bid", "money", ul);

		let li2 = document.createElement("li");
		li2.innerHTML = post["current_bid"];
		li2.setAttribute("id","bid");

		add_el("li", "Time Remaining", "time", ul2);

		let li4 = document.createElement("li");
		li4.innerHTML = post["days"] +"d"+" "+post["hours"]+"h"+" "+post["minutes"]+"m";
		li4.setAttribute("id", "time_left");
		ul.appendChild(li2);
		ul2.appendChild(li4);

		let goods_buttons = document.createElement("div");
		goods_buttons.classList.add("goods-buttons");
		goods_descr_wr.appendChild(goods_buttons);
				
		let button_bid = document.createElement("button");
		button_bid.classList.add("button-bid");
		button_bid.innerHTML = "Place Bit";
		button_bid.setAttribute("data-bid",post["id"]);
		let span2 = document.createElement("span");
		span2.innerHTML = "or";
		goods_buttons.appendChild(button_bid);
		goods_buttons.appendChild(span2);

		let button_detail = document.createElement("button");
		button_detail.classList.add("button-detail");
		button_detail.innerHTML = "View Details";
		button_detail.setAttribute("data-bid", post["id"]);
		goods_buttons.appendChild(button_detail);
				
		let view_detail_wrapper = document.createElement("div");
		view_detail_wrapper.classList.add("view-detail-wrapper");
		view_detail_wrapper.setAttribute("data-id", post["id"]);
		view_detail_wrapper.classList.add("hide");
		goods_descr_wr.appendChild(view_detail_wrapper);

		add_el("div", get_name(post["u_id"]), "seller-wrapper", view_detail_wrapper, "Seller");
				
		// add_el("div", post["goods_sell"], "goods-sell", view_detail_wrapper,""); blitz or auction

		add_el("div", post["goods_number"], "goods-number", view_detail_wrapper,"Number of goods");

		add_el("div", post["goods_start_price"], "goods-start-price", view_detail_wrapper,"Start price");

		add_el("div", post["goods_pay"], "goods-pay", view_detail_wrapper,"Payment method");

		add_el("div", post["goods_del"], "goods-del", view_detail_wrapper,"Delivery");
}

function add_el(el, inner_text, add_class, prnt, before_text) {
	let buf = document.createElement(el);
	if (!!(before_text)) { // not ""
		buf.innerHTML = before_text+": "+inner_text;
		buf.classList.add(add_class)
		prnt.appendChild(buf);
	}
	else {
		buf.innerHTML = inner_text;
		buf.classList.add(add_class)
		prnt.appendChild(buf);
	}
}

let posts_count = posts.length;
let per_page = 1; 
let pages = Math.ceil(posts_count / per_page); 

function paint_post(posts) {
	for(i in posts){
		paint_one_post(posts[i])
	}
}

function not_empty(obj) {
	if (obj!==null) return true;
}

function paint_pages(pages) {
	let paginator = document.getElementsByClassName("pagination")[0];
	let page = "";
	for (let i = 0; i < pages; i++) {
	  page += "<span data-page=" + i * pages + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
	}
	paginator.innerHTML = page;
}

//paint_post(posts_count, per_page, pages);
paint_post(posts);

function get_name(id) {
	let buf_users = localStorage.getItem("user");
	let users = JSON.parse(buf_users);
	let name;
	for (i in users) {
		if (users[i]["user_id"]==id) {
			name = users[i]["name"];
		}
	}
	return name;
} 


//--------------next functions are for adding bid or view details
console.log(document.getElementsByClassName('goods-buttons')[0]);
let buttons_wr = document.getElementsByClassName('goods-buttons')[0];



document.onclick = function(event){
    event = event || window.event;
    if (!event.target) {
        event.target = event.srcElement;
    }
    let button = event.target;
    //console.log(button.classList.contains("button-detail"))
    let button_id = button.dataset.bid;

    console.log(button_id)
    for (i in posts) {
    console.log("yay")	
    	if(button.classList.contains("button-detail")) {
    		let details = document.getElementById(button_id);
    		console.log(details)
    		details.classList.remove("hide");
    	}
    }

}