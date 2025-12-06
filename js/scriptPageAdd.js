if (performance.navigation.type === 2) {
    location.reload(true);
}
const dropzone_file = document.getElementById("dropzone-file");
const image = document.getElementById("image");
dropzone_file.addEventListener("change", function () {

    if (this.files[0]) {
        dropzone_file.parentElement.classList.remove('!border-[#ff0000]');
        image.src = URL.createObjectURL(this.files[0]);
    }
});


const Description = document.getElementById("Description");
const title = document.getElementById("title");
Description.addEventListener("input", function () {
    Description.classList.remove('!bg-[#ff00003b]');
    Description.nextElementSibling.classList.remove('!bg-[#ff000011]');
    title.innerText = Description.value;
});

const _opponent = document.getElementById("_discount_percent");
const _price = document.getElementById("_price");
const price = document.getElementById("price");
_price.addEventListener("input", function () {
    _price.classList.remove('!bg-[#ff00003b]');
    _price.nextElementSibling.classList.remove('!bg-[#ff000011]');
    if (_opponent.value == '') {
        price.textContent = `$${_price.value}`
    } else {
        price.innerHTML = `
        $${(_price.value - (_price.value * (_opponent.value / 100))).toFixed(2)}<span
                            id="opponent" class="text-sm line-through ms-0.5">$${_price.value}</span>
    `
    }

});


const countries_select = document.getElementById('countries_select');
countries_select.addEventListener('change', function () {
    this.parentElement.classList.remove('!bg-[#ff00003b]')
})



const discount_percent = document.getElementById("discount_percent");
_opponent.addEventListener("input", function () {
    if (_opponent.value > 100) {
        _opponent.value = _opponent.value.slice(0, 2);
    }

    if (_opponent.value != '') {
        discount_percent.style.opacity = '1';
        discount_percent.textContent = _opponent.value + '%';
        price.innerHTML = `
        $${(_price.value - (_price.value * (_opponent.value / 100))).toFixed(2)}<span
                            id="opponent" class="text-sm line-through ms-0.5">$${_price.value}</span>
    `
    } else {
        discount_percent.style.opacity = '0';
        discount_percent.textContent = '';
        price.textContent = `$${_price.value}`
    }

});


const Radios = document.querySelectorAll('input[type="radio"]');
const contenier_raido = document.querySelectorAll('.contenier_raido');
const condition = document.getElementById('condition');
contenier_raido.forEach((element) => {

    element.addEventListener('click', () => {
        Radios.forEach(function (radio) {
            radio.parentElement.classList.remove('!bg-[#ff00003b]')
        })
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
        const result = encodeImageFileAsURL(dropzone_file);

    }




}

function dataURLtoFile(base64Image) {
    if (localStorage.getItem('phonesUser')) {
        const phonesUser = JSON.parse(localStorage.getItem('phonesUser'));
        phones = phones.concat(phonesUser);
    }
    let count = phones[phones.length - 1].id + 1;
    console.log(count)
    const dicsave = { id: count, brand: countries_select.value, title: Description.value, image: base64Image, price: _price.value, discounted: _opponent.value != '' ? true : false, discount_percent: _opponent.value != '' ? _opponent.value : 0, condition: condition.textContent };
    console.log(dicsave);
    try{
        localStorage.setItem('phonesUser', JSON.stringify([...JSON.parse(localStorage.getItem('phonesUser') || '[]'), dicsave]));
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
    }catch(e){
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You have reached the maximum local storage capacity. Please delete one of the products first.",
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