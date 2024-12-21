const modal = document.getElementById('modal');
const confirmBtn = document.getElementById('confirmBtn');
const adjustBtn = document.getElementById('adjustBtn');
const selectedImageText = document.getElementById('selectedImage');
const displayedImage = document.getElementById('displayedImage');
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
    localStorage.removeItem("cartnumber");
    starttoinput();
});

// 重新選擇按鈕的事件
adjustBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    adjustBtn.style.display = 'none'; // 隱藏重新選擇按鈕
    displayedImage.style.display = 'none'; // 隱藏顯示的圖片
    selectedImageText.textContent = '選擇的圖片：無';
    selectedImage = null;
    confirmBtn.disabled = true;
    images.forEach(img => img.classList.remove('selected'));
});

function starttoinput() {
    let productlist = document.getElementById('productlist');
    productlist.innerHTML = ''; // 清空列表
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);
        let obj;

        // 檢查 JSON 格式
        try {
            obj = JSON.parse(value);
        } catch (error) {
            console.error(`Invalid JSON for key: ${key}`, value, error);
            continue; // 跳過無效的項目
        }

        // 檢查鍵的格式並生成內容
        if (key && key.substring(0, 2) === "dc") {
            let item = `
                <div class="item" onclick="createfurniture()">
                    <img src="${obj.image}">
                    <div class="info">
                        <div class="name">${obj.name}</div>
                        <div class="quantity" id="qty">${obj.amount}</div>   
                        <button class="delete" onclick="deleteItem('${key}')">Delete</button>
                    </div>
                </div>`;
            productlist.innerHTML += item; // 使用 innerHTML 添加內容
        }
    }
}

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

// 頁面載入時顯示彈窗
window.onload = () => {
    modal.style.display = 'flex';
};
