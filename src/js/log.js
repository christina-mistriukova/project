
//---------next functions are for loging

let buf_users = localStorage.getItem("user");
let users = JSON.parse(buf_users);

button = document.getElementById("clicker");
button_ent = document.getElementById("enter-bt");
button_log_out = document.getElementById("log-out");

let form = document.getElementById("enter-form");
let overlay = document.getElementsByClassName("overlay")[0];

button_ent.addEventListener("click", function(){
  if (form.classList.contains("hide")) {
    form.classList.remove("hide");
    overlay.classList.remove("hide");
  } else {
    form.classList.add("hide");
  }
});


let form_wr = document.getElementsByClassName("enter-wr")[0]; 
let log_in = document.getElementsByClassName("user-wr hide")[0]; 
let name = document.getElementById("nick");
let img_wr = document.getElementsByClassName("img-wrapper")[0];
let user_in= [];

button.addEventListener("click", function(){
  let login = get_value("username");
  let pass = get_value("password");

  let buf = 0;
  let log_user;
  for (key in users) {
    if (users[key]["log"]==login && users[key]["pass"]==pass ){
      buf = 1;
      overlay.classList.add("hide");
      form_wr.classList.add("hide");
      log_in.classList.remove("hide");
      name.innerHTML = users[key]["name"];
      img_wr.innerHTML = '<img src='+users[key]["img"]+' alt="" class="acc-photo" />';
      log_user = {
        "user_id": users[key]["user_id"],
        "name": users[key]["name"],
        "img": users[key]["img"]
      }
      localStorage.setItem("user_in", JSON.stringify(log_user));

      break;
    } 
  }
  if (buf==0) {
      let no_log = document.getElementById("no-log");
      no_log.classList.remove("hide");
  } 
});




button_log_out.addEventListener("click", function(){
  let user_wr = document.getElementsByClassName("user-wr")[0];
  let pass = document.getElementById("password");
  window.location="/";
  if (!user_wr.classList.contains("hide")) {
    user_wr.classList.add("hide");
    form_wr.classList.remove("hide");
    document.getElementById("enter-form").classList.add("hide");  
  } 
  localStorage.removeItem("user_in");
});


//---next functions are for registration

let button_join = document.getElementsByClassName("join-button")[0];
let form_reg = document.getElementById("reg");

button_join.addEventListener("click", function() {
  form_reg.classList.remove("hide");
  document.getElementById("enter-form").classList.add("hide");
});

let button_reg = document.getElementById("reg-clicker");

let user_id = 0;

let user=[];

//localStorage.removeItem("user");

button_reg.addEventListener("click", function() {
  let login = get_value("reg-login");
  let pass = get_value("reg-password");
  let username = get_value("reg-username");
  let img = get_value("reg-img");
  let old_items = JSON.parse(localStorage.getItem("user")) || [];
  let test = old_items.length;
  let new_item = {
                "user_id": test,
                "log": login,
                "pass": pass,
                "img": img,
                "name": username       
      };
  let buf = 0;
  let reg_hint = document.getElementById("reg-hint");

  for (key in old_items) {
    if (old_items[key]["log"]==new_item["log"]) {
      buf = 1;
      reg_hint.classList.remove("hide");
      break;
    }
  } 
    if (buf == 0){
      old_items.push(new_item);
      reg_hint.classList.add("hide");
      localStorage.setItem("user", JSON.stringify(old_items));
      user_id++;
    }
});

button_close_reg = document.getElementsByClassName("button-close")[0];
button_close_reg.addEventListener("click", function() {
  document.getElementById("reg").classList.add("hide");
  overlay.classList.add("hide");
});

button_close_log = document.getElementById("log-close");
button_close_log.addEventListener("click", function() {
  form.classList.add("hide");
  overlay.classList.add("hide");
});



function get_value (cl) {
  let text = document.getElementById(cl).value;
  return text;
}

function is_user_login() {
  let user_log_in = JSON.parse(localStorage.getItem("user_in"));
  if((user_log_in)!==null) { 
      form_wr.classList.add("hide");
      log_in.classList.remove("hide");
      name.innerHTML = user_log_in["name"];
      img_wr.innerHTML = '<img src='+user_log_in["img"]+' alt="" class="acc-photo" />';
  }
  else {
    form_wr.classList.remove("hide");
    log_in.classList.add("hide");
  }
}

is_user_login();

button_add_post = document.getElementsByClassName("add-from-user")[0];
button_add_post.addEventListener("click", function() {

});


