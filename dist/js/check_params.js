function check_params() {
	let login = document.getElementById("reg-login");
	let pass = document.getElementById("reg-password");
	let username = document.getElementById("reg-username");
	document.getElementById("reg-clicker").disabled = login.value && pass.value && username.value ? false : "disabled";
}

function check_form_add_post() {
	// let p1 = document.getElementById("goods-name");
	// let p2 = document.getElementById("goods-img");
	// let p3 = document.getElementById("goods-number");
	// let p4 = document.getElementById("goods-start-price");
	// let p5 = document.getElementById("goods-now-price");
	// let p6 = document.getElementById("goods-time-days");
	// let p7 = document.getElementById("goods-time-hours");
	// let p8 = document.getElementById("goods-time-minutes");

	// document.getElementById("add_new_lot").disabled = p1.value && p2.value && p3.value && p4.value && p5.value && p6.value && p7.value && p8.value ? false : "disabled";
}

