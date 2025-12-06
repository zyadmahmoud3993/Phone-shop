let icon_search = document.getElementById('icon_search');
let div_search = document.getElementById('div_search');
let div_search_glass_property = document.querySelector('div.glass')
let attribute_divsearch;
let input_search = document.getElementById('input_search');
let header = document.getElementById('header');


icon_search.addEventListener('click', function () {
  attribute_divsearch = getComputedStyle(div_search_glass_property).getPropertyValue('--height');
  attribute_divsearch = (attribute_divsearch == '1000%') ? '6000%' : '1000%';
  setTimeout(() => {
    div_search_glass_property.style.setProperty('--height', attribute_divsearch)
  }, attribute_divsearch == '1000%' ? 1000 : 100);
  div_search.classList.toggle('w-full');
  div_search.classList.toggle('w-9');
  div_search.classList.toggle('h-10');

  input_search.classList.toggle('hidden');

})







// load from localstorage
const shopping = document.getElementById('shopping');
const total_shopping_ = document.getElementById('total_shopping');
function loaditem(key) {
  if (localStorage.getItem(key)) {
    JSON.parse(localStorage.getItem(key)).forEach(element => {
      shopping.innerHTML += element
      if(total_shopping_){
        total_shopping_.innerHTML++
      }
      
    });

    // calculate total price
    const total_price_items = document.querySelectorAll('.total_price');
    const total_price_item = document.getElementById('total_price');
    total_price_item.innerHTML = 0;
    total_price_items.forEach(function (item) {
      total_price_item.innerHTML = (parseFloat(item.innerHTML.replace('$', '')) + parseFloat(total_price_item.innerHTML)).toFixed(2)
    })
  }


}
if(shopping){
  loaditem('listitems')
}


// plus minus item shopping cart
function plus_minus(elemt, price, get_id, PorM) {
  const pr = document.getElementById('_' + get_id).querySelector('.total_price');
  if (PorM == '+') {
    elemt.previousElementSibling.innerHTML++;
    pr.innerHTML = '$' + (parseFloat(pr.innerHTML.replace('$', '')) + (price)).toFixed(2);

  } else if (PorM == '-' && elemt.nextElementSibling.innerHTML >= 2) {
    elemt.nextElementSibling.innerHTML--
    pr.innerHTML = '$' + (parseFloat(pr.innerHTML.replace('$', '')).toFixed(2) - (price)).toFixed(2);
  }

  saveLoade();
}


// delete item shopping cart
function delete_item_shopping(get_id) {
  const item_shopping = document.getElementById('_' + get_id);
  item_shopping.remove();
  if(total_shopping_){
    total_shopping.innerHTML--;
  }

  saveLoade();
}


// save and load shopping cart
function saveLoade() {
  // save shopping cart items
  const list_total_shoping = [];
  const item_shopping = document.querySelectorAll('.container_item_shopping');
  item_shopping.forEach(function (item) {
    list_total_shoping.push(item.outerHTML)
  })
  saveitem('listitems', JSON.stringify(list_total_shoping))

  // calculate total price
  const total_price_items = document.querySelectorAll('.total_price');
  const total_price_item = document.getElementById('total_price');
  total_price_item.innerHTML = 0;
  total_price_items.forEach(function (item) {
    total_price_item.innerHTML = (parseFloat(item.innerHTML.replace('$', '')) + parseFloat(total_price_item.innerHTML)).toFixed(2)
  }
  )
}

// save to localstorage
function saveitem(key, list) {
  localStorage.setItem(key, list);
  // JSON.parse(localStorage.getItem(key)).forEach(element => {
  //   console.log(element)
  // });
}





input_search.addEventListener('keydown',function(){
  if(event.key === 'Enter') {
      if(this.value)
          localStorage.setItem('Searched',this.value)
        window.location.href = '/../pages/search.html'
    }
})



const _details = document.getElementById('details');
function details(productId) {
    _details.querySelector('.imagesProduct').innerHTML = '';
    
    const product = phones.find(p => p.id == productId); 

    const images = product.image; 
    const title = product.title;

    images.forEach(function (image) {
        _details.querySelector('.imagesProduct').innerHTML += `
            <div class="hidden duration-700 ease-in-out" data-carousel-item>
                <img src="${image}"
                class="absolute block w-1/2 h-1/2 sm:w-full sm:h-full object-contain -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="...">
            </div>
        `;
    });

    _details.querySelector('.textTitle').textContent = title;
    initCarousels();
    _details.classList.remove('hidden');
}