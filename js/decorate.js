const modal = document.getElementById('modal');
const confirmBtn = document.getElementById('confirmBtn');
const adjustBtn = document.getElementById('adjustBtn');
const displayedImage = document.getElementById('displayedImage');
const myroom = document.getElementById('all');
let selectedImage = null;

// 選擇圖片的事件
const images = document.querySelectorAll('.modal-content img');
images.forEach(image => {
    image.addEventListener('click', () => {
        images.forEach(img => img.classList.remove('selected'));
        image.classList.add('selected');
        selectedImage = image.getAttribute('data-image');
        confirmBtn.disabled = false;
    });
});

// 確認按鈕的事件
confirmBtn.addEventListener('click', () => {
    displayedImage.src = selectedImage;
    displayedImage.style.display = 'block';
    modal.style.display = 'none';
    adjustBtn.style.display = 'inline-block'; // 顯示重新選擇按鈕
    starttoinput();
});

// 重新選擇按鈕的事件
adjustBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    adjustBtn.style.display = 'none'; // 隱藏重新選擇按鈕
    displayedImage.style.display = 'none'; // 隱藏顯示的圖片
    selectedImage = null;
    confirmBtn.disabled = true;
    images.forEach(img => img.classList.remove('selected'));
});

// 初始化產品顯示清單
function starttoinput() {
    
    localStorage.removeItem("cartnumber")
    let productlist = document.getElementById('productlist');
    productlist.innerHTML = ''; // 清空列表

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value;
        if (key && key.substring(0, 2) === "dc") {value = localStorage.getItem(key);}
        else{continue;}
        let obj;
        // 嘗試解析 JSON
        try {
            obj = JSON.parse(value);
        } catch (error) {
            console.warn(`跳過無效 JSON 鍵: ${key}`, value);
            continue; // 跳過非 JSON 鍵
        }

        // 檢查鍵的格式並生成內容
        if (key && key.substring(0, 2) === "dc" && obj.amount!=0) {
            let item = `
                <div class="item" onclick="createfurniture()">
                    <img src="img/furniture/${obj.category}.png">
                    <div class="info">
                        <div class="name">${obj.name}</div>
                        <div class="quantity" id="qty">剩餘數量:${obj.amount}</div>   
                        <button class="delete" onclick="deleteItem('${key}')">Delete</button>
                    </div>
                </div>`;
            productlist.innerHTML += item; // 使用 innerHTML 添加內容
        }
    }
    let keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        if (key && key.substring(0, 7) === "Product") {
            keysToRemove.push(key);
        }
    }
    keysToRemove.forEach(key => {
        localStorage.removeItem(key);
    });
}

// 刪除指定產品的事件
function deleteItem(key) {
    const obj = JSON.parse(localStorage.getItem(key));
    if (obj) {
        obj.amount -= 1;
        if (obj.amount <= 0) {
            localStorage.removeItem(key); // 移除數量為 0 的產品
        } else {
            localStorage.setItem(key, JSON.stringify(obj));
        }
        location.reload(); // 重新載入頁面更新列表
    } else {
        console.error(`找不到 localStorage 鍵: '${key}'`);
    }
}

// 頁面載入時顯示彈窗
window.onload = () => {
    modal.style.display = 'flex';
};

productList.addEventListener('dragstart', (event) => {
    event.dataTransfer.setData('text/plain', event.target.outerHTML);
});

displayedImage.addEventListener('dragover', (event) => {
    event.preventDefault(); // 必須阻止默認行為
});

displayedImage.addEventListener('drop', (event) => {
    event.preventDefault();
    const itemHtml = event.dataTransfer.getData('text/plain');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = itemHtml;
    const furniture = tempDiv.firstChild;

    // 設定家具樣式
    furniture.style.position = 'absolute';
    furniture.style.left = `${e.clientX - canvasRect.left - 40}px`;
    furniture.style.top = `${e.clientY - canvasRect.top - 40}px`;
    furniture.style.zIndex = 100;
    furniture.style.width = '5%';
    furniture.style.height = '5%';
    furniture.draggable = false;

    // 添加旋轉按鈕
    const rotateButton = document.createElement('button');
    rotateButton.classList.add('rotate-button');
    rotateButton.innerText = '↻';
    rotateButton.style.left = `${event.offsetX- 20}px`;
    rotateButton.style.top = `${event.offsetY - 20}px`;

    furniture.addEventListener('click', () => {
        rotateButton.style.display = 'block';
    });

    rotateButton.addEventListener('click', () => {
        const currentRotation = parseInt(furniture.dataset.rotation || '0', 10);
        const newRotation = (currentRotation + 90) % 360;
        furniture.style.transform = `rotate(${newRotation}deg)`;
        furniture.dataset.rotation = newRotation;
    });

    myroom.appendChild(furniture);
    myroom.appendChild(rotateButton);
});