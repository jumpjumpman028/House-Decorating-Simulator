var cartNumber  ;
function update(){
    //購物車小紅點數字同步
    let cart = document.getElementById("cart-number");
    if(localStorage.getItem("cartnumber") == null) cartNumber = 0;
    else cartNumber = parseInt(localStorage.getItem("cartnumber"));
    cart.innerHTML = cartNumber;
    //商品同步

}

function deleted(){
    localStorage.removeItem("cartnumber");
    let cart = document.getElementById("cart-number");
    cart.innerHTML = cartNumber.innerHTML-parseInt(document.getElementById("qty").value);
    let total = document.getElementById("cart-number");
    total.innerHTML = cartNumber;
    update();
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

    document.getElementById("delete").addEventListener("click",deleted,false);
}

window.addEventListener("load",start,false);

