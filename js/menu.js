fetch('./json/products.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json(); // 將回應轉為 JSON
  })
  .then(data => {
    const list = document.getElementById("product-list");
    list.innerHTML = " ";

    data.forEach(furniture => {
        const furnitureItem = document.createElement('a');
        furnitureItem.className = 'product';
        furnitureItem.href = furniture.link;
        furnitureItem.innerHTML = `
          <img src="${furniture.image}" alt="${furniture.name}">
          <img src="img/hery.jpg">
                <div class="abbreviation">
                    <br>${furniture.name}<br><br>${furniture.price}NTD
                </div>
        `;
        // 將每個沙發資訊加入容器中
        list.appendChild(furnitureItem);

        //store to local storage
        let key = "Product-"+ furniture.name;
        let value = JSON.stringify(furniture);
        localStorage.setItem(key,value);

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