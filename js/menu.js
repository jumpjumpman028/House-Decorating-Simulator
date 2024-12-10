/*
    預期在載入商品時每個商品都會被存入 key 為"Product-商品名稱" 的local storage,
    存入的內容可能是json轉成的物件+一個amount屬性計算購買數量。
*/

var cartNumber  ;
function update(){
    let cart = document.getElementById("cart-number");
    if(localStorage.getItem("cartnumber") == null) cartNumber = 0;
    else cartNumber = parseInt(localStorage.getItem("cartnumber"));
    cart.innerHTML = cartNumber;
}

function start(){
    update();
    let cart = document.getElementById("cart-number");
    if (localStorage.getItem("cartnumber") !== null) {
        update();
        cart.innerHTML = cartNumber;
    } 
    else {
        localStorage.setItem("cartnumber",parseInt(0));
        update();
        cart.innerHTML = cartNumber;
    }

}

window.addEventListener("load",start,false);