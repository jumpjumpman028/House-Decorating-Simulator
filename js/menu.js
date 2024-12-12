function dofetch(get){
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
        furnitureItem.href = `product.html?product=${furniture.name}`;
        furnitureItem.innerHTML = `
          <img src="${furniture.image}" alt="${furniture.name}">
                <div class="abbreviation">
                    ${furniture.name}<br><div class="price">${furniture.price}NTD</div>
                </div>
        `;
        // 將每個沙發資訊加入容器中
        list.appendChild(furnitureItem);

        //store to local storage
        if(get==0){
          let key = "Product-"+ furniture.name;
          let value = JSON.stringify(furniture);
          localStorage.setItem(key,value);
        }
        
      });
    })
  .catch(error => {
    console.error('發生錯誤:', error);
  });
}




/*
    預期在載入商品時每個商品都會被存入 key 為"Product-商品名稱" 的local storage,
    存入的內容可能是json轉成的物件+一個amount屬性計算購買數量。
*/

var cartNumber  ;
function update(){
    let cart = document.getElementById("cart-number");
    if(localStorage.getItem("cartnumber") == null){
      cartNumber = 0;
    }
    else cartNumber = parseInt(localStorage.getItem("cartnumber"));
    dofetch(cartNumber);
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

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.getElementById("menuButton");
  const sidebar = document.getElementById("sidebar");
  const applyButton = document.getElementById("apply");
  const categorySelect = document.getElementById("categorySelect");
  const searchInput = document.getElementById("search");
  const typingInput = document.getElementById("typing");
  const pricelow=document.getElementById("priceValueHead");
  const pricehigh=document.getElementById("priceValueTail");

  // 點擊選單按鈕，切換側邊欄顯示/隱藏
  menuButton.addEventListener("click", () => {
    sidebar.classList.toggle("visible");
  });

  applyButton.addEventListener("click", () => {
    const selectedCategory = categorySelect.value;
    const priceLowValue = parseInt(pricelow.value);
    const priceHighValue = parseInt(pricehigh.value);
    if(priceHighValue<priceLowValue){
      alert("請輸入正確的範圍");
      return;
    }

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
        if(selectedCategory==furniture.category){
          if(furniture.price>=priceLowValue && furniture.price<=priceHighValue){
          const furnitureItem = document.createElement('a');
          furnitureItem.className = 'product';
          furnitureItem.href = `product.html?product=${furniture.name}`;
          furnitureItem.innerHTML = `
            <img src="${furniture.image}" alt="${furniture.name}">
                  <div class="abbreviation">
                      ${furniture.name}<br><div class="price">${furniture.price}NTD</div>
                  </div>
          `;
          // 將每個XX資訊加入容器中
          list.appendChild(furnitureItem);
            }
          }
          
        });
      })
    .catch(error => {
      console.error('發生錯誤:', error);
    });
  });

  searchInput.addEventListener("click", () => {
    const searchKeyword = typingInput.value.toLowerCase();
    document.getElementById("result")=`"${searchKeyword}"的搜尋結果`;
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
      if (furniture.name.toLowerCase().includes(searchKeyword)) {
        const furnitureItem = document.createElement('a');
        furnitureItem.className = 'product';
        furnitureItem.href = `product.html?product=${furniture.name}`;
        furnitureItem.innerHTML = `
          <img src="${furniture.image}" alt="${furniture.name}">
          <div class="abbreviation">
            ${furniture.name}<br><div class="price">${furniture.price} NTD</div>
          </div>
        `;
        list.appendChild(furnitureItem);
      }
        
      });
    })
  .catch(error => {
    console.error('發生錯誤:', error);
  });
  });

  resetButton.addEventListener("click", () => {
    // 重置分類和價格輸入框
    categorySelect.value = "all";
    priceValueHead.value = 0;
    priceValueTail.value = 100000;
  });

  
});


window.addEventListener("load",start,false);