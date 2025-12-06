function add_shopping(elemnt) {
  const get_id = elemnt.getAttribute('id_parent');
  const _id = document.getElementById(get_id);
  const image = _id.querySelector('img').src;
  const title = _id.querySelector('h5').textContent;
  const price = _id.querySelector('.price').textContent.split(' ')[0];
  const total_price = _id.querySelector('.total_price');
  const shopping = document.getElementById('shopping');


  shopping.innerHTML += `
          <div id="_${get_id}" class="container_item_shopping">
              <div class="flex justify-between items-center px-2">
                    <div class="total_price glass glass_carusel w-fit py-2 px-5 flex justify-center items-center left-2 !rounded-b-none after:!rounded-b-none before:!rounded-b-none">${price}</div>
                    <div class="glass glass_carusel py-2 px-5 flex justify-center items-center top-1 bg-[#ff000048] transition-all duration-200 hover:cursor-pointer hover:bg-[#ff000081] !rounded-b-none after:!rounded-b-none before:!rounded-b-none"
                      onclick="delete_item_shopping('${get_id}')"><i class="fa-solid fa-trash"></i></div>
              </div>
              <div class="item_shopping flex items-center gap-2 glass glass_carusel p-3 !h-22.5 !shrink-0 !rounded-r-none after:!rounded-r-none before:!rounded-r-none shopp_item">
                <img class="!w-1/3 !h-full !flex  shrink-0 !justify-center object-contain" src="${image}" alt="">
                <p class="w-full overflow-hidden text-nowrap !text-ellipsis !text-[#ffffff85] font-bold">${title}</p>
                <div class="flex items-center text-xl gap-1">
                    <button class="glass glass_carusel cursor-pointer !text-[#ffffff6b] !pt-[0px] pb-1  px-3.5 font-bold !rounded-sm after:!rounded-sm before:!rounded-sm flex items-center" 
                            onmouseover="this.classList.remove('glass_carusel')" onmouseout="this.classList.add('glass_carusel')" onclick="plus_minus(this,${price.replace('$', '')},'${get_id}','-')">-</button>
                    <p class="!text-[#ffffff85]">1</p>
                    <button class="glass glass_carusel cursor-pointer  !text-[#ffffff6b] !pt-[0px] pb-1  px-3 font-bold !rounded-sm after:!rounded-sm before:!rounded-sm flex items-center"
                            onmouseover="this.classList.remove('glass_carusel')" onmouseout="this.classList.add('glass_carusel')" onclick="plus_minus(this,${price.replace('$', '')},'${get_id}','+')">+</button>
              </div>
            </div>
          </div>
  `

  total_shopping.innerHTML++
  saveLoade()
}

//botton shopping
const button_shopping = document.getElementById('button_shopping');
const shopping_continar = document.getElementById('shopping_continar');
button_shopping.addEventListener('click', function () {
  if (shopping_continar.classList.contains('-right-full')) {
    shopping_continar.classList.remove('-right-full')
    shopping_continar.classList.add('-right-0');
  } else {
    shopping_continar.classList.remove('-right-0');
    shopping_continar.classList.add('-right-full')
  }
})





const continer_apple_offer = document.getElementById('items');

function add_item_apple_offers() {
  const searchedKeyword = localStorage.getItem('Searched');
  
  if (searchedKeyword) {
    phones.forEach(dt => {
      if (dt.title.toLowerCase().includes(searchedKeyword.toLowerCase())) {
        
        const discountElement = dt.discounted ? `
          <span class="!absolute !z-50 top-0.5 left-1 glass glass_carusel p-3 offer_card text-sm font-bold flex items-center bg-[#ff00003b]">${dt.discount_percent}%</span>
        ` : '';
        const PriceBeforediscountElement = dt.discounted ?
          `<span class="text-sm line-through ms-0.5">$${dt.price}</span>` : '';
        const conditionClass = dt.condition === 'A' ? 'bg-[#00ff153b]' :
                               dt.condition === 'B' ? 'bg-[#fffb0052]' :
                               dt.condition === 'C' ? 'bg-[#ff00003b]' : '';

        const conditionElement = dt.condition ? `
          <span class="!absolute !z-50 top-0.5 right-0.5 glass glass_carusel py-3 px-5 offer_card_right text-sm font-bold flex items-center ${conditionClass}">
            ${dt.condition}
          </span>
        ` : '';

        continer_apple_offer.innerHTML += `
          <div id="${dt.id}" class="item_phone !flex !flex-col !h-95 xxs:!w-[calc((100%/2)-.5rem)] md:!w-[calc((100%/3)-.5rem)] lg:!w-[calc((100%/3)-.5rem)] xl:!w-[calc((100%/4)-.5rem)] max-w-sm rounded-lg shadow-sm !bg-gray-800 !border-gray-700 swiper-slide glass glass_carusel">
            ${discountElement} <!-- إضافة خانة الخصم إذا كان هناك خصم -->
            ${conditionElement} <!-- إضافة خانة condition -->
            <div class="hover:cursor-pointer" onclick="details('${dt.id}')">
              <img class="p-3 rounded-t-lg !h-45" src="${dt.image[0]}" alt="product image" />
            </div>
            <div class="px-5 pb-5">
              <div class="hover:cursor-pointer" onclick="details('${dt.id}')">
                <h5 class="text-xl font-semibold h-21 tracking-tight text-white line-clamp-3">${dt.title}</h5>
              </div>
              <div class="flex items-center mt-2.5 mb-5">
                <div class="flex items-center space-x-1 rtl:space-x-reverse">
                  <!-- Stars -->
                  <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <svg class="w-4 h-4 text-yellow-300" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path
                    d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <!-- Add more stars as needed -->
                </div>
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">5.0</span>
              </div>
              <div class="flex items-center justify-between">
                  <span class="price text-[1rem] font-bold text-gray-900 dark:text-white flex me-1">$${dt.price - (dt.price * (dt.discount_percent / 100))} ${PriceBeforediscountElement}</span>
                  <button onmouseover="this.classList.remove('glass_carusel')"
                  onmouseout="this.classList.add('glass_carusel')"
                  class="cursor-pointer !text-[#d3c9fc] font-bold transition-all duration-500 !hover:bg-blue-800  focus:outline-none   rounded-lg text-[18px] xxs:text-[13px] sm:text-base px-2 xs:px-2.5 sm:px-3 md:px-5 py-2.5 text-center flex items-center  glass glass_carusel"
                  id_parent="${dt.id}" onclick="add_shopping(this)">Add
                  to cart</button>
            </div>
            </div>
          </div>
        `;
      }
    });
  }
}

add_item_apple_offers();
