
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

//---------this functions are for painting posts and pagination at the main page 

let all_posts = JSON.parse(localStorage.getItem("posts"));
let posts = all_posts;
//localStorage.removeItem("posts")

var deadline;

//console.log(check_time(posts[9]));

function check_time(post){
	deadline =new Date();
	let time_to_death = ( ( parseInt(post["days"])*24+parseInt(post["hours"]) ) * 60 + parseInt(post["minutes"])) * 60 * 1000;
	deadline.setTime(post["date"] + time_to_death);
	let t = Date.parse(deadline) - Date.parse(new Date());
	if (t <= 0) return false;
	return true;
}

function update_posts_timing(){
	posts = JSON.parse(localStorage.getItem("posts")) || [];
	for (i in posts){
		if (!check_time(posts[i])) posts[i]["is_ended"] = true;
	}

	localStorage.setItem("posts", JSON.stringify(posts));
	all_posts = posts;
}

function paint_one_post(post, cards_wr) {
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

		//CREATING CLOCK_TIMER

		let li4 = document.createElement("li");
		li4.setAttribute("id", "time_left");
		
		let clock_block = create_timer(li4);

		deadline =new Date();
		let time_to_death = ( ( parseInt(post["days"])*24+parseInt(post["hours"]) ) * 60 + parseInt(post["minutes"])) * 60 * 1000;

		deadline.setTime(post["date"] + time_to_death);

		initializeClock(clock_block, deadline, post["is_ended"]);

		
		ul.appendChild(li2);
		ul2.appendChild(li4);

		let goods_buttons = document.createElement("div");
		goods_buttons.classList.add("goods-buttons");
		goods_descr_wr.appendChild(goods_buttons);
				
		let button_bid = document.createElement("button");
		button_bid.classList.add("button-bid");
		button_bid.innerHTML = "Place Bit";
		button_bid.setAttribute("data-bid", post["id"]);
		let span2 = document.createElement("span");
		span2.innerHTML = "or";
		goods_buttons.appendChild(button_bid);
		goods_buttons.appendChild(span2);

		let place_bid = document.createElement("div");
		place_bid.classList.add("place-bid");
		goods_descr_wr.appendChild(place_bid);

		let min_bid = document.createElement("div");
		min_bid.classList.add("min-bid-wrapper");
		place_bid.appendChild(min_bid);

		//bet placing 

		let lbl = document.createElement("lable");
		lbl.innerHTML = "Your bid: ";

		let input = document.createElement("input");
		input.setAttribute("id", "input"+post["id"]);
		input.setAttribute("data-minbid", post["id"]);
		input.setAttribute("type", "number");
		input.classList.add("min-bid");
		input.setAttribute("placeholder", post["current_bid"]) //current bid
		input.setAttribute("min", post["current_bid"]) //current bid
		min_bid.appendChild(lbl);
		min_bid.appendChild(lbl);
		min_bid.appendChild(input);

		let min_bid_submit = document.createElement("div");
		min_bid_submit.classList.add("min-bid-submit");
		let lbl_sub = document.createElement("div");
		lbl_sub.setAttribute("for", post["id"]);

		let inpt = document.createElement("input");
		inpt.setAttribute("id", "submit"+post["id"]);
		inpt.setAttribute("data-minbidsubmit", post["id"]);
		inpt.setAttribute("class","min-bid-sub");
		inpt.setAttribute("type","submit");
		inpt.setAttribute("value","submit");

		let div_message_about_bidding = document.createElement("div");
		goods_descr_wr.appendChild(div_message_about_bidding);
		let p_sold_out = document.createElement("div");
		p_sold_out.innerHTML = "Sold Out";
		if (post["is_ended"]) {
			goods_headline_wr.appendChild(p_sold_out);
		}

		let p_your_bet = document.createElement("div");
		p_your_bet.innerHTML = "Your Bet";
		let is_user_bet = false;
		let user_in = JSON.parse(localStorage.getItem("user_in"));
		if (user_in!==null && post["bid_history"].length > 0 && post["bid_history"][post["bid_history"].length-1]["user_id"] == user_in["user_id"]) {
			goods_headline_wr.appendChild(p_your_bet);
			is_user_bet = true;
		}
			

		inpt.addEventListener("click", function() { 
		    let bid_val_concat = "input".concat(post["id"])
			let bid_val = parseInt(document.getElementById(bid_val_concat).value);
			//console.log(typeof(post["current_bid"]))
			if(!check_time(post)) {
				div_message_about_bidding.innerHTML = "Time is run out. You can't bid anymore!";
				place_bid.classList.add("hide");
				return;
			}
			if(post["is_ended"]) {
				div_message_about_bidding.innerHTML = "This lot is already bought!";
				place_bid.classList.add("hide");
				return;
			}
			if (bid_val <= post["current_bid"] && post["number_of_bids"] > 0) {
				div_message_about_bidding.innerHTML = "Your bid is too small";
				place_bid.classList.add("hide");
				return;
			}
			if (bid_val >= parseInt(post["goods_now_price"])){
				console.log(post["goods_now_price"]);
				post["is_ended"] = true;
				goods_headline_wr.appendChild(p_sold_out);
				div_message_about_bidding.innerHTML = "Congrats! Your bid is enough for buying now. So you won the auction with bid "+post["goods_now_price"]+"$!";
				bid_val = post["goods_now_price"];
			}
			else {
				div_message_about_bidding.innerHTML = "Your bet is made!";
			}
			if (!is_user_bet) {
				goods_headline_wr.appendChild(p_your_bet);
				is_user_bet = true;
			}
			li2.innerHTML = bid_val;
			post["current_bid"] = bid_val;
			post["number_of_bids"]++;
			posts = make_bid(button_bid.dataset.bid, bid_val);
			span.innerHTML = post["number_of_bids"];
			place_bid.classList.add("hide");
				
		});

		place_bid.appendChild(min_bid_submit);
		
		min_bid_submit.appendChild(inpt);

		let buy_now_wrapper = document.createElement("div");
		buy_now_wrapper.classList.add("buy-now-wrapper");
		let lbl_buy_now = document.createElement("label");
		let span3 = document.createElement("span");
		span3.innerHTML = post["goods_now_price"];
		lbl_buy_now.innerHTML = "Buy now:"+" ";
		 // now_price
		lbl_buy_now.appendChild(span3);
		buy_now_wrapper.appendChild(lbl_buy_now);
		let inpt_buy_now = document.createElement("input");
		inpt_buy_now.setAttribute("id", "now".concat(post["id"]));
		inpt_buy_now.setAttribute("type", "submit");
		inpt_buy_now.setAttribute("value", "submit");
		buy_now_wrapper.appendChild(inpt_buy_now);
		place_bid.appendChild(buy_now_wrapper);
		place_bid.classList.add("hide");
		place_bid.setAttribute("data-bid", post["id"]);

		button_bid.addEventListener("click", function() {
		    bid(button_bid);
		}, true);

		let button_detail = document.createElement("button");
		button_detail.classList.add("button-detail");
		button_detail.innerHTML = "View Details";
		button_detail.setAttribute("data-test", post["id"]);
		goods_buttons.appendChild(button_detail);

		button_detail.addEventListener("click", function(){
		   detail(button_detail);
		}, true);
				
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

function paint_posts(cards_wr, posts, page_current, posts_per_page) {
	first_post_print = page_current*posts_per_page;
	for(let i = first_post_print; i < first_post_print + posts_per_page && i < posts.length; i++) { // to what number to print
		paint_one_post(posts[posts.length - i - 1], cards_wr);
	}
}


function not_empty(obj) {
	if (obj!==null) return true;
}

let posts_per_page = 4; 

let page_current = 0;

function reload_posts(){
	let page_num = Math.ceil(posts.length / posts_per_page);
	let pagination_block = document.getElementsByClassName("pagination")[0];
	pagination_block.innerHTML = "";
	make_magic_pagination(pagination_block, page_current, 2, page_num);

	let cards_wr = document.getElementsByClassName("cards-wr")[0];
	cards_wr.innerHTML = "";
	paint_posts(cards_wr, posts, page_current, posts_per_page);
}

function create_page_button(page_num, text, attribute, to_click){
	let button = document.createElement("button");
	button.setAttribute("data-button", page_num);
	button.innerHTML = text;
	button.classList.add(attribute);
	if (to_click)
		button.onclick = (function(e){
			let button_id =+ e.target.dataset.button;
			page_current = button_id;
			reload_posts();
		});
	return button;
}

function make_magic_pagination(pagination_block, page_current, buttons_num, page_num) { 
	button = create_page_button(page_current, page_current+1, "current-page-button", 0);
	pagination_block.appendChild(button);
	let i = 0;
	for (i = page_current+1; i <= page_current+buttons_num && i < page_num; i++){
		button2 = create_page_button(i, i+1, "page-button", 1);
		pagination_block.appendChild(button2);
	}
	if (i < page_num - 1) {
		button2 = create_page_button(page_num - 1, "last", "page-button", 1);
		pagination_block.appendChild(button2);
	}
	for (i = page_current-1; i >= 0 && i >= page_current-buttons_num; i--){
		button2 = create_page_button(i, i+1, "page-button", 1);
		pagination_block.insertBefore(button2, pagination_block.firstChild);
	}
	if (i > 0) {
		button2 = create_page_button(0, "first", "page-button", 1);
		pagination_block.insertBefore(button2, pagination_block.firstChild);
	}
}

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


function bid(button) {
let button_id =  button.dataset.bid;
let place_bid = document.getElementsByClassName("place-bid");
	for (let j = 0; j<place_bid.length; j++) {
		if (place_bid[j].dataset.bid == button_id ) {
			show_hide(place_bid[j]);
			break;
		}
	}
	//break;
}


function detail(button){
	let button_id =  button.dataset.test;
	for (i in posts) {
		if (button_id == posts[i]["id"]) {
			let view_detail = document.getElementsByClassName("view-detail-wrapper");
			for (let j = 0; j<view_detail.length; j++) {
				if (view_detail[j].dataset.id == button_id ) {
					show_hide(view_detail[j]);	
					break;			
				}
			}
			break;
		}
	}
}

function show_hide(block) {
	if (!block.classList.contains("hide")) {
		block.classList.add("hide");
	}
	else {
		block.classList.remove("hide")
	}
}



function show_user_filter() {
	let user_filter_block = document.getElementsByClassName("checkboxes-wrapper")[0]; 
	user_filter_block.classList.remove("hide");
	let user_filter_p = user_filter_block.getElementsByClassName("user-filter");

	for (let i = 0; i < user_filter_p.length; i++) {
		//console.log(i)
		user_filter_p[i].addEventListener("click", function(){
			page_current = 0;
			posts = filtering();
			reload_posts();
		});
	}
}

function create_timer(parent_block) {

	let clockdiv = document.createElement("div");
	clockdiv.setAttribute("class","clockdiv");
	parent_block.appendChild(clockdiv);

	let div1 = document.createElement("div");
	clockdiv.appendChild(div1);

	let span = document.createElement("span");
	span.classList.add("days");

	div1.appendChild(span)

	let div2  = document.createElement("div");
	div2.classList.add("smalltext");
	div1.appendChild(div2);

	let div3 = document.createElement("div");
	clockdiv.appendChild(div3);

	let span2 = document.createElement("span");
	span2.classList.add("hours");

	div3.appendChild(span2)

	let div4  = document.createElement("div");
	div4.classList.add("smalltext");
	div3.appendChild(div4);

	let div5 = document.createElement("div");
	clockdiv.appendChild(div5);

	let span3 = document.createElement("span");
	span3.classList.add("minutes");

	div5.appendChild(span3)
	let div6  = document.createElement("div");
	div6.classList.add("smalltext");
	div5.appendChild(div6);

	let div7 = document.createElement("div");
	clockdiv.appendChild(div7);

	let span4 = document.createElement("span");
	span4.classList.add("seconds");

	div7.appendChild(span4)
	let div8  = document.createElement("div");
	div8.classList.add("smalltext");
	div7.appendChild(div8);

	return clockdiv;
}

function getTimeRemaining(endtime) {
  let t = Date.parse(endtime) - Date.parse(new Date());
  let seconds = Math.floor((t / 1000) % 60);
  let minutes = Math.floor((t / 1000 / 60) % 60);
  let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
}

function initializeClock(clock, endtime, is_ended) {

  if (getTimeRemaining(endtime).total > 0 && !is_ended) {
  	  let daysSpan = clock.querySelector('.days');
      let hoursSpan = clock.querySelector('.hours');
  	  let minutesSpan = clock.querySelector('.minutes');
  	  let secondsSpan = clock.querySelector('.seconds');
	  function updateClock() {
	    var t = getTimeRemaining(endtime);

	    daysSpan.innerHTML = t.days;
	    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
	    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
	    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

	    if (t.total <= 0) {
	      clearInterval(timeinterval);
	    }
	  }
	  updateClock();
	  let timeinterval = setInterval(updateClock, 1000);
  } 
  else {
  	clock.innerHTML = "Ended";
  }
}

//--------------------next functions are for generating adress and make search


function filtering(){
	update_posts_timing();

	let result = all_posts;
	
	//console.log(user_in);

	//---------------------------searching

	let search_ph = get_url_vars()["search-phrase"];

	if (typeof(search_ph)!=="undefined") {
		result = filter_posts(result, search_ph, function (post, search_ph) {
			return post["goods_name"].indexOf(search_ph)+1;
		});
	}

	//---------------------------categorizing

	let category = get_url_vars()["menu_id"];

	if (typeof(category)!=="undefined") {
		let search_id = recurs_id(category, main_menu["menu"]);

		result = filter_posts(result, search_id, function (post, search_id) {
			return search_id.indexOf(parseInt(post["goods_section"])) + 1;
		});
	}

	//---------------------------searching >= min price

	let min_pr = parseInt(document.getElementById("min-price").value);

	if (!Number.isNaN(min_pr)) {
		result = filter_posts(result, min_pr, function (post, min_pr) {
			return post["current_bid"] >= min_pr;
		});
	}

	//---------------------------searching <= max price

	let max_pr = parseInt(document.getElementById("max-price").value);

	if (!Number.isNaN(max_pr)) {
		result = filter_posts(result, max_pr, function (post, max_pr) {
			return post["current_bid"] <= max_pr;
		});
	}

	let select_delivery = document.getElementById("filter-delivery");
	let delivery_id = parseInt(select_delivery.options[select_delivery.selectedIndex].value);

	if (delivery_id != -1) {
		result = filter_posts(result, delivery_id, function (post, delivery_id) {
			return post["goods_del"] == delivery_id;
		});
	}

	let select_pay = document.getElementById("filter-pay");
	let pay_id = parseInt(select_pay.options[select_pay.selectedIndex].value);

	if (pay_id != -1) {
		result = filter_posts(result, pay_id, function (post, pay_id) {
			return post["goods_pay"] == pay_id;
		});
	}

	let show_ended = false;

	let u_id = get_url_vars()["u_id"];

	if (typeof(u_id)!=="undefined") {
		let user_in = JSON.parse(localStorage.getItem("user_in"));
		
		if (user_in!==null){

			let ratio_my_bets = document.getElementById("my_bets");

			if (ratio_my_bets.checked){
				show_ended = false;
				result = filter_posts(result, user_in, function (post, user_in) {
					for (let i = 0; i < post["bid_history"].length; i++) {
						if (post["bid_history"][i]["user_id"] == user_in["user_id"]) {
							return true;
						}
					}
					return false;
				});
			}
			
			let ratio_my_purch = document.getElementById("my_purch");

			if (ratio_my_purch.checked){
				show_ended = true;
				result = filter_posts(result, user_in, function (post, user_in) {
					return (post["is_ended"] && post["bid_history"].length > 0 && post["bid_history"][post["bid_history"].length-1]["user_id"] == user_in["user_id"]);  
				});
			}

			let ratio_my_lots = document.getElementById("my_lots");

			if (ratio_my_lots.checked){
				show_ended = false;
				result = filter_posts(result, user_in, function (post, user_in) {
					return post["u_id"] == user_in["user_id"];  
				});
			}

			let ratio_my_history = document.getElementById("my_history");

			if (ratio_my_history.checked){
				show_ended = true;
				result = filter_posts(result, user_in, function (post, user_in) {
					return post["is_ended"] && post["u_id"] == user_in["user_id"];  
				});
			}
			// result = filter_posts(result, user_in, function (post, user_in) {
			// 	return post["u_id"]==user_in["user_id"];				
			// });
		}
	}

	if (!show_ended){
		result = filter_posts(result, show_ended, function (post, show_ended) {
				return post["is_ended"]==false;
			});
	}

	console.log(result);

	return result;
}

function filter_posts(posts, filter_data, filter_func) {
	let result=[];
	for (i in posts) {
		if (filter_func(posts[i], filter_data)) {
			result.push(posts[i]);
		}
	}
	return result;
}



//---------------


function recurs_add(data) {
	let result = [];
	for (i in data){
		result.push(data[i]["id"]);
		if (data[i].hasOwnProperty("subpuncts")) {
				result = [...result, ...recurs_add(data[i]["subpuncts"])];
		}
	}
	return result;
} 

function recurs_id(id_category, data) {
	let result = [];
	for (i in data){
		if (data[i]["id"]==id_category){
			result.push(data[i]["id"]);
			
			if (data[i].hasOwnProperty("subpuncts")) {
				result = [...result, ...recurs_add(data[i]["subpuncts"])];
			}
		} 
		else if (data[i].hasOwnProperty("subpuncts")) {
				result = [...result, ...recurs_id(id_category, data[i]["subpuncts"])];
		} 
		if (result.length) break;
	}
	return result;
}

update_posts_timing();
paint_filter();

posts = filtering();
reload_posts(); //works with arr posts

//-------next functions are for filter

function paint_filter() {
	let min_pr = 0;
	let max_pr = 100;

	let prices = get_prices();
	if (prices.length == 2) {
		max_pr = prices[0];
		min_pr = prices[1];
	}

	let is_user_filter = get_url_vars()["u_id"];

	if (typeof(is_user_filter)!=="undefined") {
		
		let user_in = JSON.parse(localStorage.getItem("user_in"));
		console.log("here");
		if (user_in != null) show_user_filter();
	}
	

	let main_wr = document.getElementsByClassName("main-filter")[0];
	let main_filter = document.createElement("div");
	main_filter.classList.add("main-filter");

	let form = document.createElement("div");
	form.classList.add("filter");
	let p = document.createElement("p");
	p.innerHTML = "Filter";
	form.appendChild(p);

	main_filter.appendChild(form);
	let div2 = section_in_filter("Price", "Min-Price", "min-price", min_pr)
	div2.appendChild(p_in_filter("Max-Price", "max-price", max_pr))
	div2.classList.add("price_filter")

	form.appendChild(div2);

	let div3 = document.createElement("div");
	let lbl = document.createElement("label");
	let select_p = document.createElement("select");
	select_p.setAttribute("id","filter-delivery");
	div3.appendChild(lbl);
	div3.appendChild(select_p);

	insert_options(main_menu,"type_delivery", select_p);

	let div4 = document.createElement("div");
	let select_p2 = document.createElement("select");

	let lbl2 = document.createElement("label");
	lbl2.innerHTML = "Payment type";
	lbl2.setAttribute("for", "filter-pay");
	div4.appendChild(lbl2);

	insert_options(main_menu,"type_payment", select_p2);
	select_p2.setAttribute("id", "filter-pay");
	div4.appendChild(select_p2);

	lbl.innerHTML  = "Type of delivery";
	lbl.setAttribute("for","filter-delivery");	

	let btn_sbm_filter = document.createElement("button");
	btn_sbm_filter.setAttribute("type", "submit");
	// btn_sbm_filter.setAttribute("onsubmit", "return false;");

	//btn_sbm_filter.setAttribute("type", "submit");
	btn_sbm_filter.setAttribute("id", "btn_sbm_filter");
	btn_sbm_filter.innerHTML = "Submit";

	form.appendChild(div2);
	form.appendChild(div3);
	form.appendChild(div4);
	form.appendChild(btn_sbm_filter);

	main_wr.appendChild(main_filter);
}

function section_in_filter(in_text, p1, p2, p3) {
	let div2 = document.createElement("div");
	let p = document.createElement("p");
	p.innerHTML = in_text;

	div2.appendChild(p);
	div2.appendChild(p_in_filter(p1, p2, p3));
	return div2;
	
}

function p_in_filter(in_text2, id, pl1){
	let p2_1 = document.createElement("p");
	let label = document.createElement("label");
	label.setAttribute("for", id); 
	label.innerHTML = in_text2;
	let input = document.createElement("input");
	input.setAttribute("id", id);
	input.setAttribute("type", "number");
	input.setAttribute("placeholder", pl1)
	p2_1.appendChild(label);
	p2_1.appendChild(input);
	return p2_1;
}

function get_prices() {
	if (posts.length!=0){
		let buf_arr = [];
		let max = parseInt(posts[0]["current_bid"]);
		let min = parseInt(posts[0]["current_bid"]);
		for (i in posts) {
			if (parseInt(posts[i]["current_bid"])>max) {
				max = posts[i]["current_bid"];
			}
			if (parseInt(posts[i]["current_bid"])<min) {//goods_start_price
				min = posts[i]["current_bid"];
			}
		}
		buf_arr.push(max);
		buf_arr.push(min);
		return buf_arr;
	}
	return [];
}


function insert_options(data, name_data, sec) {
    let option = document.createElement("option");
    option.innerHTML = "All"; 
    option.setAttribute("value", -1);
    if (sec!==null){
    	sec.appendChild(option);
    }	

    let leng = Object.keys(data).length;
    for (i in data[name_data]) {
	    option = document.createElement("option");
	    option.innerHTML = data[name_data][i]["name"]; 
	    option.setAttribute("value", data[name_data][i]["id"]);
	    if (sec!==null){
	    	sec.appendChild(option);
	    }
  }
}


let btn_sbm_filter = document.getElementById("btn_sbm_filter");

btn_sbm_filter.addEventListener("click", function() {
	page_current = 0;
	posts = filtering();
	reload_posts();
	
});


// let btn_my_posts = document.getElementById("my-posts");

// btn_my_posts.addEventListener("click", function() {
// 	page_current = 0;
// 	posts = filtering();
// 	console.log(posts)
// 	reload_posts();
// });


//-----------------------make bid

function make_bid(id, val) {
	//console.log(val)
	//let old_items = JSON.parse(localStorage.getItem("posts")) || [];


	//let posts = all_posts;
	let posts = JSON.parse(localStorage.getItem("posts")) || [];
	// let count_bidds = document.get
	let user_in = JSON.parse(localStorage.getItem("user_in"));
	

	for (i in posts) {
		if (posts[i]["id"]==id) {
			posts[i]["current_bid"] = val;
			// posts[i]["bid_history"][posts[i]["bid_history"].length] = [{"user_id": user_in["user_id"], "bid": val}];
			posts[i]["bid_history"].push({"user_id": user_in["user_id"], "bid": val});
			posts[i]["number_of_bids"] = posts[i]["bid_history"].length;
			if (val >= posts[i]["goods_now_price"]) posts[i]["is_ended"] = true;
		}
	}

	localStorage.setItem("posts", JSON.stringify(posts));

	return posts;
}

// 
// old_items.push(post);
// localStorage.setItem("posts", JSON.stringify(old_items));

