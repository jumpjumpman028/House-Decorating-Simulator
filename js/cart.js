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
                        <div class="quantity">
                            <button id="minus" >-</button>
                            <input type="number" id="qty" class="input-box" value="${obj.amount}" min="1" max="10">
                            <button id="plus">+</button>
                        </div>
                        <div class="price">$${priceofthatxie}</div>     
                        <button class="delete" onclick="deleteItem('${key}')">Delete</button>
                    </div>`;
                // 將每個沙發資訊加入容器中
                list.appendChild(cartItem);
                
            }
            
        }
    }
    document.getElementById("summary").innerHTML = `總計金額:${totalprice}
    <button  class="export" id="exportButton">匯出Excel檔</button>
    <button class="deleteall" id="deleteall">刪除全部</button>
    `;

    // 更新購物車顯示
    cart.innerHTML = sum;
    // 同步更新 localStorage 中的 cartnumber
    localStorage.setItem("cartnumber", sum);
    cartNumber = sum; // 更新本地變數
}

document.addEventListener("click", function (event) {
    // 確保點擊的元素是按鈕，並且擁有我們需要的類名
    if (event.target.id === "minus" || event.target.id === "plus") {
        const quantityDiv = event.target.closest(".quantity"); // 找到父層 .quantity
        const inputBox = quantityDiv.querySelector(".input-box"); // 獲取對應的輸入框
        const cartItem = quantityDiv.closest(".product"); // 找到對應的商品區塊
        const productName = cartItem.querySelector(".name").innerText; // 取得商品名稱

        let currentValue = parseInt(inputBox.value); // 當前數量

        // 獲取對應的商品資料
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);

            if (key.substring(0, 7) === "Product") {
                let obj = JSON.parse(localStorage.getItem(key));

                if (obj.name === productName) {
                    // 處理減號按鈕
                    if (event.target.id === "minus" && currentValue > parseInt(inputBox.min)) {
                        inputBox.value = currentValue - 1;
                        obj.amount -= 1; // 更新商品數量
                    }

                    // 處理加號按鈕
                    if (event.target.id === "plus" && currentValue < parseInt(inputBox.max)) {
                        inputBox.value = currentValue + 1;
                        obj.amount += 1; // 更新商品數量
                    }

                    // 同步更新 localStorage
                    localStorage.setItem(key, JSON.stringify(obj));
                    break; // 已找到對應商品，結束迴圈
                }
            }
        }

        // 更新購物車顯示
        update();
    }
});


function deleteItem(key) {
    // 確認是否存在該 key
    const obj = JSON.parse(localStorage.getItem(key));
    if (obj) {
        obj.amount = 0; // 更新數量為 0（如果需要直接移除，也可以使用 localStorage.removeItem）
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
        let num=localStorage.length
        for (let i =  0; i <num; i++) {
            let key = localStorage.key(i);
            if (key && key.substring(0, 7) === "Product") {
                let value = localStorage.getItem(key);
        
                try {
                    let obj = JSON.parse(value);
                    if (obj && obj.amount && typeof obj.amount === "number" && obj.amount !== 0) {
                        localStorage.setItem(`dc-${key}`, value);
                        num+=1;
                        
                    }
                } catch (e) {
                    console.error(`Error parsing JSON for key: ${key}`, e);
                }
            }
        }
    },false);
    // Function to export table data to Excel
    document.getElementById("exportButton").addEventListener('click', function(){
        // Retrieve product details
    const products = document.querySelectorAll('.product');
    const data = [['Name', 'Price', 'Quantity','Link']]; // Header row

    products.forEach(product => {
        const name = product.querySelector('.name').textContent.trim();
        const price = product.querySelector('.price').textContent.trim().replace('$', '');
        const quantity = product.querySelector('#qty').value.trim();
        const link = "https://jumpjumpman028.github.io/House-Decorating-Simulator/"+product.querySelector('a').href;

        data.push([name, price, quantity,link]);
    });

    // Create a CSV string from the data array
    const csvContent = data.map(row => row.join(",")).join("\n");

    // Create a Blob and download it as an Excel file
    const bom = '\ufeff'; // UTF-8 BOM
    const blob = new Blob([bom + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'YourList.csv';
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    }, false);   
}


window.addEventListener("load",start,false);

