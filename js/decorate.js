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


    for (let i =  0; i <5000; i++) {
        let key = localStorage.key(i);
        if (key && key.substring(0, 7) == "Product") {
            let value = localStorage.getItem(key);
                    localStorage.removeItem(key);
            } 
        }
    localStorage.removeItem("cartnumber");
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

// 頁面載入時顯示彈窗
window.onload = () => {
    modal.style.display = 'flex';
};
