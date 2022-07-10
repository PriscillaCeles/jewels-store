import Swiper from 'https://unpkg.com/swiper@8/swiper-bundle.esm.browser.min.js'

  const swiperHeader = new Swiper('.header__informations-top--swiper', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 3,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      319: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
    }
  })

  const swiperBanner = new Swiper('.highlight-banner', {
    direction: 'horizontal',

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
  })

  const swiperHighlights = new Swiper('.highlights', {
    direction: 'horizontal',
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    breakpoints: {
      319: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 2,
      },
      1100: {
        slidesPerView: 4,
      },
    }
  })

  const swiperStones = new Swiper('.stones', {
    direction: 'horizontal',

    pagination: {
      el: '.stones__item--dots',
      type: 'bullets',
      clickable: true,
    },

    breakpoints: {
      319: {
        slidesPerView: 2,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 7,
        spaceBetween: 19,
      },
    }
  })


