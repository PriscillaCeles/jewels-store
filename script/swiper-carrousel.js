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
      1025: {
        slidesPerView: 3,
      },
    }
  })

  const swiper = new Swiper('.highlight-banner', {
    direction: 'horizontal',
    // loop: true,

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
      },
      1024: {
        slidesPerView: 7,
      },
    }
  })

  const swiperProducts = new Swiper('.shelf__products', {
    direction: 'horizontal',

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    pagination: {
      el: '.shelf__dots',
      type: 'bullets',
      clickable: true,
    },

    breakpoints: {
      319: {
        slidesPerView: 1,
      },
      1024: {
        slidesPerView: 4,
      },
    }
  })

