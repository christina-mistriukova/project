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

function insert_elements(data) {  
  let leng = Object.keys(data).length;
  let ul = document.getElementsByClassName("menu-wr")[0];
  for (i in data["menu"]) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    li.appendChild(a);
    a.innerHTML = data["menu"][i]["name"]; 
    a.setAttribute("class", "downtag");
    a.setAttribute("href", "/?menu_id=" + data["menu"][i]["id"]);
    ul.appendChild(li);
    if (data["menu"][i].hasOwnProperty("subpuncts")) {
      let ul2 = document.createElement("ul");
      li.appendChild(ul2);
        recurs_menu(data["menu"][i]["subpuncts"], ul2);
    }
  }
}

function recurs_menu (puncts, ul) {
  for (i in puncts) {
    let li = document.createElement("li");
    let a = document.createElement("a");
    li.appendChild(a);
    a.innerHTML = puncts[i]["name"]; 
    a.setAttribute("href", "/?menu_id=" + puncts[i]["id"]);
    ul.appendChild(li);
    if (puncts[i].hasOwnProperty("subpuncts")) {
    li.setAttribute("class", "righttag");
      let ul2 = document.createElement("ul");
      li.appendChild(ul2);
        recurs_menu(puncts[i]["subpuncts"], ul2);
    }
  }
}

insert_elements(main_menu);
