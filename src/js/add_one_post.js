export function paint_one_post(post, cards_wr) {
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

		initializeClock(clock_block, deadline);

		
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

		button_bid.addEventListener("click", function() {
		    bid(button_bid);
		    let btn_sbm = "submit".concat(post["id"]);
		    let bid_sub = document.getElementById(btn_sbm);
		    bid_sub.addEventListener("click", function() { 
		    	let bid_val_concat = "input".concat(post["id"])
				let bid_val = document.getElementById(bid_val_concat).value;
				if (bid_val<post["current_bid"]){
					let div3 = document.createElement("div");
					goods_descr_wr.appendChild(div3);
					div3.innerHTML = "Your bid is too small";
					place_bid.classList.add("hide");
					return;
				}
				if (bid_val>post["goods_now_price"]){
					let div3 = document.createElement("div");
					goods_descr_wr.appendChild(div3);
					div3.innerHTML = "Congrats! Your bid was bigger than \"Buy now price\", so you won auction!";
					bid_val = post["goods_now_price"];
				}
				
				li2.innerHTML = bid_val;
				posts = make_bid(button_bid.dataset.bid, bid_val);
				localStorage.setItem("posts", JSON.stringify(posts));
				place_bid.classList.add("hide");
				

				
		   });
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

		
		

		let lbl = document.createElement("lable");
		lbl.innerHTML = "Your bid: ";

		let input = document.createElement("input");
		input.setAttribute("id", "input"+post["id"]);
		console.log(input)
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

		place_bid.appendChild(min_bid_submit);
		
		min_bid_submit.appendChild(inpt);

		let buy_now_wrapper = document.createElement("div");
		buy_now_wrapper.classList.add("buy-now-wrapper");
		let lbl_buy_now = document.createElement("label");
		lbl_buy_now.setAttribute("for", "but-now");
		let span3 = document.createElement("span");
		span3.innerHTML = post["goods_now_price"];
		lbl_buy_now.innerHTML = "Buy now:"+" ";
		 // now_price
		lbl_buy_now.appendChild(span3);
		buy_now_wrapper.appendChild(lbl_buy_now);
		let inpt_buy_now = document.createElement("input");
		inpt_buy_now.setAttribute("id", post["id"]);
		inpt_buy_now.setAttribute("type", "submit");
		inpt_buy_now.setAttribute("value", "submit");
		buy_now_wrapper.appendChild(inpt_buy_now);
		place_bid.appendChild(buy_now_wrapper);
		place_bid.classList.add("hide");
		place_bid.setAttribute("data-bid", post["id"])

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
