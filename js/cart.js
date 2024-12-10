var cartNumber  ;
function update(){
    let cart = document.getElementById("cart-number");
    if(localStorage.getItem("cartnumber") == null) cartNumber = 0;
    else cartNumber = parseInt(localStorage.getItem("cartnumber"));
    cart.innerHTML = cartNumber;
}

function addToCart(){
    let buyNumber = parseInt(document.getElementById("qty").value);
    buyNumber = buyNumber + cartNumber;
    localStorage.setItem("cartnumber",parseInt(buyNumber));
    update();

}

function minus(){
    let n = document.getElementById("qty").value;
    if(parseInt(n)>0){
        document.getElementById("qty").value = parseInt(n)-1;
        localStorage.setItem("cartnumber",parseInt(n)-1);
    let total = document.getElementById("cart-number");
    total.innerHTML = total.innerHTML-1;
    }
    update();
}
function plus(){
    let n = document.getElementById("qty").value;
    document.getElementById("qty").value = parseInt(n)+1;
    localStorage.setItem("cartnumber",parseInt(n)+1);
    let total = document.getElementById("cart-number");
    total.innerHTML = parseInt(total.innerHTML)+1;
    update();
}

function deleted(){
    localStorage.removeItem("cartnumber");
    let cart = document.getElementById("cart-number");
    cart.innerHTML = cartNumber.innerHTML-parseInt(document.getElementById("qty").value);
    document.getElementById("qty").value = "0";
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
    document.getElementById("minus").addEventListener("click",minus,false);
    document.getElementById("plus").addEventListener("click",plus,false);
    document.getElementById("delete").addEventListener("click",deleted,false);
}

window.addEventListener("load",start,false);

