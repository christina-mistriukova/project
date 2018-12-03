//---------this functions are for get information from post-form to localstorage

button_add_post = document.getElementById("add_new_lot");
let section = document.getElementById("id_section");
let type_sell = document.getElementById("id_selling");
let type_pay = document.getElementById("id_pay");
let type_del = document.getElementById("id_del");
let start_date = document.getElementById("start");
let form = document.getElementById("new-post");

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
		let goods_sell = get_value(type_sell);
		let goods_number = document.getElementById("goods-number").value;
		let goods_start_price = document.getElementById("goods-start-price").value;
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
			"current_bid": goods_start_price,
			"number_of_bids": 0,
			"small_desc": small_desc,
			"date": get_date(),
	    }
	    old_items.push(post);
	    localStorage.setItem("posts", JSON.stringify(old_items));
	    form.classList.add("hide");
	    success_post.classList.remove("class","hide");

	  post_id=post_id+1;
	});
}

function get_date() {
	let obj_date = new Date;
	let today = {
		"day": obj_date.getDate(),
		"month": obj_date.getMonth(), 
		"year" : obj_date.getFullYear(),
	}
	return new Date().getTime();
	return today;
}

function get_time() {
	let obj_date = new Date;
	let time = {
		"days": obj_date.getDate(),
		"hours": obj_date.getHours(), 
		"minutes" : obj_date.getMinutes(),
	}
	return today;
}

function start_time(n) {
	let obj_date = new Date;
	let next_date;
	for (let i=0; i<n; i++){
		obj_date.setDate(obj_date.getDate() + 1);
		let next_date = {
			"day": obj_date.getDate(),
			"month": obj_date.getMonth(), 
			"year" :obj_date.getFullYear() 

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