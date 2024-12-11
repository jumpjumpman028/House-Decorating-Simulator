var cartNumber = parseInt(localStorage.getItem("cartnumber")); // 初始化 cartnumber，從 localStorage 獲取，若無則設為 0
var sum = 0;

function update() {
    let cart = document.getElementById("cart-number");
    sum = 0;

    // 遍歷 LocalStorage 計算所有商品的數量總和
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i).substring(0, 7) === "Product") {
            let key = localStorage.key(i);
            let obj = JSON.parse(localStorage.getItem(key));
            sum += parseInt(obj.amount || 0, 10); // 累加每個商品的數量
        }
    }

    // 更新購物車顯示
    cart.innerHTML = sum;
    // 同步更新 localStorage 中的 cartnumber
    localStorage.setItem("cartnumber", sum);
    cartNumber = sum; // 更新本地變數
}

function addToCart() {
    let buyNumber = parseInt(document.getElementById("qty").value, 10);
    let nameInput = document.getElementById("name").innerHTML;
    let namea = "Product-" + nameInput;

    let value = localStorage.getItem(namea);
    let valuese = value ? JSON.parse(value) : { amount: 0 };

    valuese.amount = (valuese.amount || 0) + buyNumber;
    localStorage.setItem(namea, JSON.stringify(valuese));

    console.log("商品數量已更新:", localStorage.getItem(namea));

    update(); // 更新購物車顯示並同步 LocalStorage 中的 cartnumber
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
    update(); // 頁面載入時更新購物車數量

    // 綁定按鈕事件
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
    document.querySelector(".price").textContent = `${product.price} 元`;
    document.querySelector(".discription").innerHTML = `
        分類:${product.category}<br>
        尺寸: 寬度 ${product.width}，深度 ${product.depth}，高度 ${product.height}<br>
        ${product.description || "暫無描述"}
    `;

    // 監聽加入購物車事件
    const addToCartButton = document.getElementById("addToCart");
    addToCartButton.addEventListener("click", () => {
        alert(`${product.name} 已加入購物車！`);
    });
});
