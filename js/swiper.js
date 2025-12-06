var swiper = new Swiper(".mySwiper", {
    autoplay: {
       delay: 5000,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        480: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        
        1020: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1280: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        1600: {
            slidesPerView: 5,
            spaceBetween: 20,
        }
    },
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
    },
    navigation: {
        nextEl: ".button-next",
        prevEl: ".button-prev",
    },
    loop: true
});


// Swiper Android
var swiperAndroid = new Swiper(".mySwiperAndroid", {
    autoplay: {
        delay: 5000,
    },
    slidesPerView: 1,
    spaceBetween: 20,
    breakpoints: {
        480: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        
        1020: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1280: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        1600: {
            slidesPerView: 5,
            spaceBetween: 20,
        }
    },
    pagination: {
        el: ".swiper-pagination",
        type: "progressbar",
    },
    navigation: {
        nextEl: ".button-next-Android",
        prevEl: ".button-prev-Android",
    },
    loop: true
});