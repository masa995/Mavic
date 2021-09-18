$(function () {
  const slider = $('.products__slider');

  slider.slick({
    prevArrow: '<button type = "button" class="slider-btn slider-btn__left aria-label= "Предыдуший слайд"><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.21839 1L1 9L9.21839 17"/></svg></button>',
    nextArrow: '<button type = "button" class="slider-btn slider-btn__right aria-label= "Следуйщий слайд""><svg width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.78161 17L9 9L0.78161 1"/></button>',
    infinite: false,
    responsive: [
      {
        breakpoint: 540,
        settings: {
          dots: true,
          arrows: false
        }
      }
    ]
  });
});
