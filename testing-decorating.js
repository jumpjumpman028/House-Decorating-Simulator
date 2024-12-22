// 初始化變數
const modal = document.getElementById('modal');
const confirmBtn = document.getElementById('confirmBtn');
const adjustBtn = document.getElementById('adjustBtn');
const exportBtn = document.getElementById('expoet');
const displayedImage = document.getElementById('displayedImage');
const showeverything = document.getElementById('all');
const productList = document.getElementById('productlist');
let selectedImage = null;

// 彈出視窗選擇圖片
const images = document.querySelectorAll('.modal-content img');

images.forEach((image) => {
    image.addEventListener('click', () => {
        images.forEach((img) => img.classList.remove('selected'));
        image.classList.add('selected');
        selectedImage = image.getAttribute('data-image');
        confirmBtn.disabled = false;
    });
});

// 確認按鈕功能
confirmBtn.addEventListener('click', () => {
    
    if (selectedImage) {
        displayedImage.innerHTML = ''; // 清空可能的多余元素
        displayedImage.style.backgroundImage = `url(${selectedImage})`;
        displayedImage.style.backgroundSize = 'cover';
        displayedImage.style.backgroundPosition = 'center';
        displayedImage.style.display = 'block';
        modal.style.display = 'none';
    }
});

// 重新選擇功能
adjustBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
    confirmBtn.disabled = true;
});

// 匯出成圖片功能
exportBtn.addEventListener('click', async () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const rect = displayedImage.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    context.drawImage(displayedImage, 0, 0, rect.width, rect.height);

    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'design.png';
    link.click();
});

// 家具拖動功能
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
    furniture.style.left = `${event.offsetX}px`;
    furniture.style.top = `${event.offsetY}px`;
    furniture.style.zIndex = 100;
    furniture.style.width = '5%';
    furniture.style.height = '5%';
    furniture.draggable = false;

    // 添加旋轉按鈕
    const rotateButton = document.createElement('button');
    rotateButton.classList.add('rotate-button');
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

    showeverything.appendChild(furniture);
    showeverything.appendChild(rotateButton);
});

