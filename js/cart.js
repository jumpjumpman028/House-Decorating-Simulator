var cartNumber  ;
var totalprice=0;
function update() {
    let cart = document.getElementById("cart-number");
    sum = 0;
    const list = document.getElementById("cart-list");
    list.innerHTML = " ";
    // 遍歷 LocalStorage 計算所有商品的數量總和
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(0, 7) === "Product") {
            let key = localStorage.key(i);
            let obj = JSON.parse(localStorage.getItem(key));
            sum += parseInt(obj.amount || 0, 10); // 累加每個商品的數量
            
            if(obj.amount != 0){
                const cartItem  = document.createElement('div');
                cartItem.className = 'product';
                let priceofthatxie=parseInt(obj.amount)*parseInt(obj.price);
                totalprice+=parseInt(priceofthatxie);
                cartItem.innerHTML = `
                    <a href="product.html?product=${obj.name}"><img src="${obj.image}"></a>
                    <div class="info">
                        <div class="name">${obj.name}</div>
                        <div class="quantity" id="qty">${obj.amount}</div>
                        <div class="price">$${priceofthatxie}</div>     
                        <button class="delete" id="delete">Delete</button>
                    </div>`;
                // 將每個沙發資訊加入容器中
                list.appendChild(cartItem);
                let trytodeleteall=`<div class="summary" id="summary">總計金額:$${totalprice}</div>`;
                list.appendChild(trytodeleteall);
            }
            
        }
    }

    // 更新購物車顯示
    cart.innerHTML = sum;
    // 同步更新 localStorage 中的 cartnumber
    localStorage.setItem("cartnumber", sum);
    cartNumber = sum; // 更新本地變數
}
/*
function deleted(){
    let key = "Product"+document.getElementById("name").innerHTML;
    localStorage.removeItem("cartnumber");
    let cart = document.getElementById("cart-number");
    cart.innerHTML = cartNumber.innerHTML-parseInt(document.getElementById("qty").value);
    let total = document.getElementById("cart-number");
    total.innerHTML = cartNumber;
    update();
}
    */
function deleted(e){
    e.amount -= 1;
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

document.getElementById("deleteall").addEventListener("click", function(){
    localStorage.clear();
    window.location.reload();
}, false);

window.addEventListener("load",start,false);

