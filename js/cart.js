var cartNumber  ;
var totalprice=0;
function update() {
    totalprice=0;
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
                totalprice=totalprice+parseInt(priceofthatxie);
                cartItem.innerHTML = `
                    <a href="product.html?product=${obj.name}"><img src="${obj.image}"></a>
                    <div class="info">
                        <div class="name">${obj.name}</div>
                        <div class="quantity" id="qty">${obj.amount}</div>
                        <div class="price">$${priceofthatxie}</div>     
                        <button class="delete" onclick="deleteItem('${key}')">Delete</button>
                    </div>`;
                // 將每個沙發資訊加入容器中
                list.appendChild(cartItem);
                
            }
            
        }
    }
    document.getElementById("summary").innerHTML = `總計金額:${totalprice}<button class="deleteall" id="deleteall">delete all</button><button class="deleteall" id ="startdecorate"  onclick='location.href="decorate.html"' >開始布置</button>`;

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
function deleteItem(key) {
    // 確認是否存在該 key
    const obj = JSON.parse(localStorage.getItem(key));
    if (obj) {
        obj.amount -= 1; // 更新數量為 0（如果需要直接移除，也可以使用 localStorage.removeItem）
        localStorage.setItem(key, JSON.stringify(obj));
        location.reload(); // 重新載入頁面來更新列表
    } else {
        console.error(`Key '${key}' not found in localStorage.`);
    }
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

    document.getElementById("deleteall").addEventListener("click", function(){
    localStorage.clear();
    localStorage.setItem("cartnumber",parseInt(0));
    update();
    }, false);
    document.getElementById("startdecorate").addEventListener("click", function(){

        for (let i = localStorage.length - 1; i >= 0; i--) {
            let key = localStorage.key(i);
            if (key && key.substring(0, 7) === "Product") {
                let value = localStorage.getItem(key);
        
                try {
                    let obj = JSON.parse(value);
                    if (obj.amount != 0) {
                        localStorage.setItem(`dc-${key}`, value);
                    }
                } catch (e) {
                    console.error(`Error parsing JSON for key: ${key}`, e);
                }
        
                
            }
            localStorage.removeItem(key);
        }
        localStorage.removeItem("cartnumber");

    },false);
}





window.addEventListener("load",start,false);

