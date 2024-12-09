var cartNumber  ;
function update(){
    let cart = document.getElementById("cart-number");
    cartNumber = parseInt(localStorage.getItem("cartnumber"));
    cart.innerHTML = cartNumber;
}
function addToCart(){
    update();
    let buyNumber = parseInt(document.getElementById("qty").value);
    buyNumber = buyNumber + cartNumber;
    localStorage.setItem("cartnumber",parseInt(buyNumber));
    update();

}

function minus(){
    let n = document.getElementById("qty").value;
    if(parseInt(n)>0)document.getElementById("qty").value = parseInt(n)-1;
}
function plus(){
    let n = document.getElementById("qty").value;
    document.getElementById("qty").value = parseInt(n)+1;
}

function start(){
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
    document.getElementById("minus").addEventListener("click",minus,false);
    document.getElementById("plus").addEventListener("click",plus,false);
    document.getElementById("addToCart").addEventListener("click",addToCart,false);
}

window.addEventListener("load",start,false);

