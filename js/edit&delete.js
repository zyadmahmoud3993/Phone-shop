
const items = document.getElementById('items');
const discount_percent = document.getElementById('discount_percent');
const condition = document.getElementById('condition');
const image = document.getElementById('image');
const title = document.getElementById('title');
const price = document.getElementById('price');
const opponent = document.getElementById('opponent');
var _get_id;
var _discounted;

if (performance.navigation.type === 2) {
    location.reload(true);
}

function loading() {
    if (localStorage.getItem('phonesUser')) {
        JSON.parse(localStorage.getItem('phonesUser')).forEach(function (element) {
            items.innerHTML += `
            <div id="${element.id}" class="container_item_shopping w-full">
                    <div class="flex justify-between items-center px-2">
                        <div
                            class="Discount_rate bg-[#ff000048] glass glass_carusel w-fit py-2 px-5 flex justify-center items-center left-2 !rounded-b-none after:!rounded-b-none before:!rounded-b-none">
                            ${element.discount_percent}%</div>

                        <div class="flex gap-1 me-1.5">
                            <!-- delete -->
                            <div class="glass glass_carusel py-2 px-5 flex justify-center items-center top-1 bg-[#ff000048] transition-all duration-200 hover:cursor-pointer hover:bg-[#ff000081] !rounded-b-none after:!rounded-b-none before:!rounded-b-none"
                                onclick="deleted('${element.id}')"><i class="fa-solid fa-trash"></i>
                            </div>
                            <!-- edit -->
                            <div class="glass glass_carusel py-2 px-5 flex justify-center items-center top-1 bg-[#ff990048] transition-all duration-200 hover:cursor-pointer hover:bg-[#ff990081] !rounded-b-none after:!rounded-b-none before:!rounded-b-none"
                                onclick="edit('${element.id}')"><i class="fa-regular fa-pen-to-square"></i>
                            </div>
                        </div>
                    </div>
                    <div class="item_shopping flex items-center gap-2 glass glass_carusel p-3 !h-22.5 !shrink-0 shopp_item">
                        <img class="!w-fit !h-full !flex  shrink-0 !justify-center object-contain me-3 ms-1" src="${element.image[0]}" alt="">
                        <p class="w-full overflow-hidden text-nowrap !text-ellipsis !text-[#ffffff85] font-bold">${element.title}
                        </p>
                        <div class="flex items-center text-xl gap-1">
                            <span
                                class="__price price text-[1rem] font-bold text-gray-900 dark:text-white flex me-1"><span class="PriceItem">$${(element.price - ((element.price * element.discount_percent) / 100)).toFixed(2)}</span><span
                                    class="opponent text-xs line-through ms-0.5">$${element.price}</span></span>
                        </div>
                    </div>
                    <div class="hidden discounted">${element.discounted}</div>
                    <div class="hidden _condition">${element.condition}</div>
                    <div class="hidden brand">${element.brand}</div>
                    <div class="hidden listImage">${element.image.join('zockchin')}</div>
                </div>
        `

        })
    }
}
loading()



function edit(get_id) {
    _get_id = get_id;
    console.log('id ' + get_id)
    const item = document.getElementById(get_id);
    const _price = item.querySelector('.PriceItem');
    const discounted = item.querySelector('.discounted').textContent;
    const Discount_rate = item.querySelector('.Discount_rate');
    const _opponent = item.querySelector('.opponent');

    if (discounted == 'true') {
        _discounted = true;
        price.innerHTML = `
            <span
                        class="__price price text-[1rem] font-bold text-gray-900 dark:text-white flex me-1">${_price.textContent}<span
                        id="opponent" class="text-xs line-through ms-0.5">${_opponent.textContent}</span></span>
        `
        discount_percent.textContent = Discount_rate.textContent
        discount_percent.style.opacity = 1
    } else {
        _discounted = false;
        price.textContent = `${_price.textContent}`;
    }

    const _condition = item.querySelector('._condition');
    condition.textContent = _condition.textContent;
    if (_condition.textContent.includes('A')) {
        condition.style.background = '#00ff153b'
    } else if (_condition.textContent.includes('B')) {
        condition.style.background = '#fffb0052'
    } else if (_condition.textContent.includes('C')) {
        condition.style.background = '#ff00003b'
    }

    const imgSrc = item.querySelector('img').src;
    image.src = imgSrc;
    const itemTitle = item.querySelector('p').textContent;
    title.textContent = itemTitle;

    const brand = item.querySelector('.brand').textContent;
    editing(get_id, brand, itemTitle, discounted, _opponent.textContent.replace('$', ''), _price.textContent.replace('$', ''))
}


const countries_select = document.getElementById('countries_select');
const Description = document.getElementById('Description');
const _price = document.getElementById('_price');
const _discount_percent = document.getElementById('_discount_percent');
function editing(get_id, brand, itemTitle, discounted, opponent, price) {
    console.log(get_id)
    countries_select.value = brand;
    Description.value = itemTitle
    if (discounted == 'true') {
        _price.value = opponent;
        console.log(opponent)
        _discount_percent.value = (((opponent - price) / opponent) * 100).toFixed(0)
    }
}



const dropzone_file = document.getElementById("dropzone-file");

dropzone_file.addEventListener("change", function () {

    if (this.files[0]) {
        image.src = URL.createObjectURL(this.files[0]);
    }
});


Description.addEventListener("input", function () {
    title.innerText = Description.value;
});


_price.addEventListener("input", function () {
    if (_discount_percent.value == '') {
        price.textContent = `$${_price.value}`
    } else {
        price.innerHTML = `
        $${(_price.value - (_price.value * (_discount_percent.value / 100))).toFixed(2)}<span
                            id="opponent" class="text-sm line-through ms-0.5">$${_price.value}</span>
    `
    }

});


_discount_percent.addEventListener("input", function () {
    if (_discount_percent.value > 100) {
        _discount_percent.value = _discount_percent.value.slice(0, 2);
    }

    if (_discount_percent.value != '') {
        discount_percent.style.opacity = '1';
        discount_percent.textContent = _discount_percent.value + '%';
        price.innerHTML = `
        $${(_price.value - (_price.value * (_discount_percent.value / 100))).toFixed(2)}<span
                            id="opponent" class="text-sm line-through ms-0.5">$${_price.value}</span>
    `
    } else {
        discount_percent.style.opacity = '0';
        discount_percent.textContent = '';
        price.textContent = `$${_price.value}`
    }

});


const contenier_raido = document.querySelectorAll('.contenier_raido');
contenier_raido.forEach((element) => {
    element.addEventListener('click', () => {
        contenier_raido.forEach((el) => {
            el.style.background = '';
        });
        element.querySelector('input[type="radio"]').checked = true;
        if (element.textContent.includes('A')) {
            element.style.background = '#00ff153b';
            condition.textContent = 'A';
            condition.style.background = '#00ff153b';
        } else if (element.textContent.includes('B')) {
            element.style.background = '#fffb0052';
            condition.textContent = 'B';
            condition.style.background = '#fffb0052';
        } else if (element.textContent.includes('C')) {
            element.style.background = '#ff00003b';
            condition.textContent = 'C';
            condition.style.background = '#ff00003b';
        }
    });
});



let listImage = []
function encodeImageFileAsURL(element) {
    listImage = []
    var file = element.files;
    const count = file.length;
    let num = 0;
    Array.from(file).forEach(function (image) {
        const reader = new FileReader();
        var dataURL;
        reader.onloadend = function () {
            num++;
            listImage.push(reader.result)
            if (num == count) {
                dataURLtoFile(listImage)
            }
        }
        reader.readAsDataURL(image);
    })

}



const _save = document.getElementById('save');
_save.addEventListener('click', save);
function save() {
    if (_get_id) {
        const radioChecked = []
        const Radios = document.querySelectorAll('input[type="radio"]');
        Radios.forEach(function (radio) {
            if (radio.checked) {
                radioChecked.push(radio.checked);
            }
        })
        console.log(dropzone_file.files)
        const list = [];
        if (!dropzone_file.value) {
            console.log(dropzone_file.value)
            dropzone_file.parentElement.classList.add('!border-[#ff0000]');
            list.push('Image');
        } if (!Description.value) {
            Description.classList.add('!bg-[#ff00003b]');
            Description.nextElementSibling.classList.add('!bg-[#ff000011]');
            list.push('Description')
        } if (!_price.value) {
            _price.classList.add('!bg-[#ff00003b]');
            _price.nextElementSibling.classList.add('!bg-[#ff000011]');
            list.push('price')
        } if (countries_select.value == 'Brand') {
            countries_select.parentElement.classList.add('!bg-[#ff00003b]')
            list.push('Brand')
        } if (!radioChecked[0]) {
            Radios.forEach(function (radio) {
                radio.parentElement.classList.add('!bg-[#ff00003b]')
            })
            list.push('radioButton')
        }

        if (list[0]) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Please fill in the required fields!",
                background: 'transparent',
                confirmButtonColor: 'transparent',
                customClass: {
                    popup: 'glass glass_carusel',
                    htmlContainer: '!font-semibold !text-[1rem]',
                    confirmButton: '!text-[#d3c9fc] font-bold transition-all duration-500 !hover:bg-blue-800  focus:outline-none !bg-transparent  rounded-lg text-base px-5 py-2.5 text-center !flex !items-center  glass glass_carusel'
                },
                didOpen: function () {
                    const button = Swal.getConfirmButton();
                    button.addEventListener('mouseover', _onmouseover);
                    function _onmouseover() {
                        this.classList.remove('glass_carusel')
                    }
                    button.addEventListener('mouseout', _onmouseout);
                    function _onmouseout() {
                        this.classList.add('glass_carusel')
                    }
                }
            });
        } else {
            if (_discount_percent.value != '' && _discount_percent.value > 0) {
                document.getElementById(_get_id).querySelector('.discounted').textContent = true
            } else {
                document.getElementById(_get_id).querySelector('.discounted').textContent = false
            }

            const result = encodeImageFileAsURL(dropzone_file);
            Swal.fire({
                title: "Good job!",
                text: "Saved successfully",
                icon: "success",
                background: 'transparent',
                confirmButtonColor: 'transparent',
                customClass: {
                    popup: 'glass glass_carusel',
                    htmlContainer: '!font-semibold !text-[1rem]',
                    confirmButton: '!text-[#d3c9fc] font-bold transition-all duration-500 !hover:bg-blue-800  focus:outline-none !bg-transparent  rounded-lg text-base px-5 py-2.5 text-center !flex !items-center  glass glass_carusel'
                },
                didOpen: function () {
                    const button = Swal.getConfirmButton();
                    button.addEventListener('mouseover', _onmouseover);
                    function _onmouseover() {
                        this.classList.remove('glass_carusel')
                    }
                    button.addEventListener('mouseout', _onmouseout);
                    function _onmouseout() {
                        this.classList.add('glass_carusel')
                    }
                }

            });
        }
    }




}
let listimageElement;
function dataURLtoFile(base64Image) {

    if (_get_id) {
        const item = document.getElementById(_get_id);
        const _price = item.querySelector('.__price');
        const discounted = item.querySelector('.discounted').textContent;
        const Discount_rate = item.querySelector('.Discount_rate');
        const _opponent = item.querySelector('.opponent');
        const itemTitle = item.querySelector('p');
        const Description = document.getElementById('Description');
        const price = document.getElementById('_price');
        const _discount_percent = document.getElementById('_discount_percent');
        const img = item.querySelector('img');
        const brand = item.querySelector('.brand');
        const countries_select = document.getElementById('countries_select');
        if (_discounted) {
            _price.innerHTML = `<span class="PriceItem">$${(price.value - (price.value * (_discount_percent.value / 100))).toFixed(2)}</span><span
                                 class="opponent text-xs line-through ms-0.5">$${price.value}</span>`;
        }

        Discount_rate.textContent = `${_discount_percent.value}%`;
        const contenier_raido = document.querySelectorAll('input[type="radio"]');
        const _condition = item.querySelector('._condition');
        contenier_raido.forEach(function (element) {
            if (element.checked) {
                console.log(element.value)
                _condition.textContent = element.value;
            }
        })

        itemTitle.textContent = Description.value;

        img.src = base64Image[0]

        brand.textContent = countries_select.value;

        listimageElement = item.querySelector('.listImage').textContent = base64Image.join('zockchin');
        listimageElement = base64Image.join('zockchin')
        listimageElement = listimageElement.split('zockchin')
        saved()
    }




}

function deleted(get_id) {
    document.getElementById(`${get_id}`).remove();
    saved();
}

function saved() {
    const container_item_shopping = document.querySelectorAll('.container_item_shopping');
    const listItem = [];

    container_item_shopping.forEach(function (element) {
        const get_id = element.getAttribute('id');
        const brand = element.querySelector('.brand').textContent.trim();
        const title = element.querySelector('p').textContent.trim();
        const discount_percent_text = element.querySelector('.Discount_rate').textContent.replace('%', '').replace(/\s/g, '');
        const imagesContent = element.querySelector('.listImage').textContent;
        let images;

        if (imagesContent && imagesContent.includes('zockchin')) {
            images = imagesContent.split('zockchin');
        } else if (imagesContent) {
            images = [imagesContent];
        } else {
            images = [];
        }


        const price = element.querySelector('.opponent').textContent.replace('$', '');
        const discounted = element.querySelector('.discounted').textContent;
        const condition = element.querySelector('._condition').textContent.trim();


        const dicsave = {
            id: parseInt(get_id),
            brand: brand,
            title: title,
            image: images,
            price: price,
            discounted: discounted == 'true',
            discount_percent: discount_percent_text != '' ? discount_percent_text : 0,
            condition: condition
        };
        listItem.push(dicsave);
    });

    localStorage.setItem('phonesUser', JSON.stringify(listItem));
}
