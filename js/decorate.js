const modal = document.getElementById('modal');
const confirmBtn = document.getElementById('confirmBtn');
const adjustBtn = document.getElementById('adjustBtn');
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
});

// 重新選擇按鈕的事件
adjustBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    adjustBtn.style.display = 'none';
    displayedImage.style.display = 'none';
    selectedImage = null;
    confirmBtn.disabled = true;
    images.forEach(img => img.classList.remove('selected'));
});

// 初始化產品顯示清單
function starttoinput() {
    let productlist = document.getElementById('productlist');
    productlist.innerHTML = ''; // 清空列表

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = localStorage.getItem(key);

        // 嘗試解析 JSON
        try {
            let obj = JSON.parse(value);

            // 生成產品項目
            let item = `
                <div class="item" draggable="true" data-src="img/furniture/${obj.category}.png">
                    <img src="img/furniture/${obj.category}.png">
                    <div class="info">
                        <div class="name">${obj.name}</div>
                        <div class="quantity">剩餘數量: ${obj.amount}</div>
                    </div>
                </div>
            `;
            productlist.innerHTML += item; // 使用 innerHTML 添加內容
        } catch (error) {
            console.warn(`跳過無效 JSON 鍵: ${key}`, value);
        }
    }
}

// 讓每個 item 可拖曳
document.querySelectorAll('.item').forEach(item => {
    item.addEventListener('dragstart', (e) => {
        const src = e.target.closest('.item').getAttribute('data-src');
        e.dataTransfer.setData('src', src);
        e.dataTransfer.setDragImage(new Image(), 0, 0); // 防止顯示預覽
    });
});

// 當拖曳物品到畫布時，放置它
const canvas = document.getElementById('canvas');

canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
});

canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const src = e.dataTransfer.getData('src');
    if (!src) return;

    // 創建家具放置物件
    const furniture = document.createElement('div');
    furniture.className = 'furniture';
    furniture.style.left = `${e.offsetX - 50}px`; // 放置物品位置
    furniture.style.top = `${e.offsetY - 50}px`; 

    // 創建圖片元素
    const img = document.createElement('img');
    img.src = src;
    furniture.appendChild(img);

    // 旋轉按鈕
    const rotateBtn = document.createElement('button');
    rotateBtn.className = 'rotate-btn';
    rotateBtn.innerText = '↻';
    furniture.appendChild(rotateBtn);

    // 旋轉按鈕事件
    rotateBtn.addEventListener('click', () => {
        const currentRotation = parseInt(furniture.dataset.rotation || 0, 10);
        const newRotation = (currentRotation + 90) % 360;
        furniture.style.transform = `rotate(${newRotation}deg)`;
        furniture.dataset.rotation = newRotation;
    });

    // 追加到畫布中
    canvas.appendChild(furniture);

    // 讓物品可移動
    let isDragging = false;
    let offsetX, offsetY;

    furniture.addEventListener('mousedown', (e) => {
        isDragging = true;
        const rect = furniture.getBoundingClientRect();
        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });

    function onMouseMove(e) {
        if (!isDragging) return;
        const dx = e.clientX - canvas.getBoundingClientRect().left - offsetX;
        const dy = e.clientY - canvas.getBoundingClientRect().top - offsetY;
        furniture.style.left = `${dx}px`;
        furniture.style.top = `${dy}px`;
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }
});

starttoinput(); // 載入產品清單
