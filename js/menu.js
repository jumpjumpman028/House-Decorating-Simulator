fetch('json/test.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // 將回應轉為 JSON
  })
  .then(data => {
    const list = document.getElementById("product-list");
    list.innerHTML = " ";

    data.forEach(sofa => {
        const sofaItem = document.createElement('a');
        sofaItem.className = 'product';
        sofaItem.href = sofa.link;
        sofaItem.innerHTML = `
          <img src="${sofa.image}" alt="${sofa.name}">
          <div>
            <h2>${sofa.name}</h2>
            <p>價格: ${sofa.price}</p>
            <p>尺寸: ${sofa.size}</p>
            <a href="${sofa.link}" target="_blank">查看詳情</a>
          </div>
        `;
  
        // 將每個沙發資訊加入容器中
        list.appendChild(sofaItem);
      });
    })
  .catch(error => {
    console.error('發生錯誤:', error);
  });



/*
    預期在載入商品時每個商品都會被存入 key 為"Product-商品名稱" 的local storage,
    存入的內容可能是json轉成的物件+一個amount屬性計算購買數量。
*/

var cartNumber  ;
function update(){
    let cart = document.getElementById("cart-number");
    if(localStorage.getItem("cartnumber") == null) cartNumber = 0;
    else cartNumber = parseInt(localStorage.getItem("cartnumber"));
    cart.innerHTML = cartNumber;
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

}

window.addEventListener("load",start,false);