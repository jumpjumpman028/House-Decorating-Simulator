var cartNumber  ;

function start(){
    let cart = document.getElementById("cart-number");
    if (localStorage.getItem("cartnumber") !== null) {
        cartNumber = parseInt(localStorage.getItem("cartnumber"));
        cart.innerHTML = cartNumber;
    } 
    else {
        console.log("The key does not exist in local storage.");
        localStorage.setItem("cartnumber",parseInt(0));
        cartNumber = parseInt(localStorage.getItem("cartnumber"));
        cart.innerHTML = cartNumber;
    }


}
window.addEventListener("load",start,false);