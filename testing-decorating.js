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
    starttoinput(); // 更新顯示
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
        //starttoinput(); // 重新更新產品列表
    } else {
        console.error(`找不到 localStorage 鍵: '${key}'`);
    }
}

// 處理拖曳開始
function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.src); // 設置拖曳的資料
}

// 接受拖曳的圖片並顯示
displayedImage.addEventListener('dragover', (event) => {
    event.preventDefault(); // 必須防止默認事件，才能允許放下
});

displayedImage.addEventListener('drop', (event) => {
    event.preventDefault();
    const imageUrl = event.dataTransfer.getData('text/plain'); // 獲取拖曳的圖片網址
    const x = event.offsetX;  // 計算鼠標點擊位置的 x 坐標
    const y = event.offsetY;  // 計算鼠標點擊位置的 y 坐標
    const image = document.createElement('img'); // 創建一個新的圖片元素
    image.src = imageUrl;
    image.style.position = 'absolute';
    image.style.left = `${x}px`; // 設定圖片的 x 坐標
    image.style.top = `${y}px`;  // 設定圖片的 y 坐標
    image.style.width = '50px';  // 設定圖片的大小
    image.style.height = '50px';
    displayedImage.appendChild(image); // 將圖片添加到 displayedImage 上
});

// 頁面載入時顯示彈窗
window.onload = () => {
    modal.style.display = 'flex';
};
