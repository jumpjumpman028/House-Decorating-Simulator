var cartNumber = parseInt(0);
var sum = parseInt(0);
function update(){
    let cart = document.getElementById("cart-number");
    sum = parseInt(0);
    for(var i=0;i<localStorage.length;i++){
        
        if(localStorage.key(i).substring(0,7)=="Product"){
            let key = localStorage.key(i);
            let obj = JSON.parse(localStorage.getItem(key));
            sum = sum + parseInt(obj.amount);
        }
    }

    cart.innerHTML = sum;

}

function addToCart() {
    let buyNumber = parseInt(document.getElementById("qty").value);
    let nameInput = document.getElementById("name").innerHTML;
    let namea = "Product-" + nameInput;
    let value = localStorage.getItem(namea);
    let valuese = JSON.parse(value); 
    valuese.amount = (valuese.amount || 0) + buyNumber;
    let totalvalue = JSON.stringify(valuese);
    localStorage.setItem(namea, totalvalue);
    console.log("数据已更新:", localStorage.getItem(namea));
    update();
}

function minus() {
    let n = document.getElementById("qty").value;
    if (parseInt(n) > 0) document.getElementById("qty").value = parseInt(n) - 1;
}

function plus() {
    let n = document.getElementById("qty").value;
    document.getElementById("qty").value = parseInt(n) + 1;
}

function start() {
    update();
    document.getElementById("minus").addEventListener("click", minus, false);
    document.getElementById("plus").addEventListener("click", plus, false);
    document.getElementById("addToCart").addEventListener("click", addToCart, false);
}

window.addEventListener("load", start, false);

document.addEventListener("DOMContentLoaded", () => {
    // 獲取 URL 中的查詢參數
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get("product");

    if (!productName) {
        alert("商品名稱未提供！");
        return;
    }

    // 從 LocalStorage 獲取對應的商品資料
    const productKey = `Product-${productName}`;
    const productData = localStorage.getItem(productKey);

    if (!productData) {
        alert("找不到對應的商品資料！");
        return;
    }

    // 將 JSON 資料轉換為物件
    const product = JSON.parse(productData);

    const nameElement = document.querySelector(".name");
    if (nameElement) {
        nameElement.id = "name"; // 新增 id 屬性
    }  
    nameElement.textContent = product.name;
    
    // 動態填充頁面內容
    document.querySelector(".pic img").src = product.image;
    //document.querySelector(".name").textContent = product.name;
    document.querySelector(".price").textContent = `${product.price} 元`;
    document.querySelector(".discription").innerHTML = `
        分類:${product.category}<br>
        尺寸: 寬度 ${product.width}，深度 ${product.depth}，高度 ${product.height}<br>
        ${product.description || "暫無描述"}
    `;


    // 添加購物車功能
    const addToCartButton = document.getElementById("addToCart");
    addToCartButton.addEventListener("click", () => {
        alert(`${product.name} 已加入購物車！`);
    });
});
