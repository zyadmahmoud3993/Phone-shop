const image = document.querySelectorAll('.object-contain');

image.forEach(element => {
    element.classList.remove('!w-1/3');
    element.classList.add('!w-1/5', 'sm:!w-1/9');
});
const p = document.querySelectorAll('p');
p.forEach(element => {
    element.classList.add('text-start');
});

const shoppingItem = document.getElementById('shopping');
const total_price = document.getElementById('total_price');
function buying() {
    if (localStorage.getItem('listitems')) {

        Swal.fire({
            title: "Good job!",
            text: "Saved successfully",
            icon: "success",
            background: 'transparent',
            confirmButtonColor: 'transparent',
            customClass: {
                popup: 'glass glass_carusel',
                htmlContainer: '!font-semibold !text-[1rem]',
                confirmButton: '!text-[#d3c9fc] font-bold transition-all duration-500 !hover:bg-blue-800 !outline-0 !shadow-none  focus:outline-none !bg-transparent  rounded-lg text-base px-5 py-2.5 text-center !flex !items-center  glass glass_carusel'
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

        shoppingItem.innerHTML = '';
        total_price.textContent = 0;
        localStorage.removeItem('listitems');
    }
}
