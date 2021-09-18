$(function () {
  const accordionItem = $('.js-accordion__item');
  const accordionHeader = $('.js-accordion__header');

  accordionHeader.on('click', function () {
    accordionItem.removeClass('accordion__item--active');
    accordionItem.find('.js-accordion__arrow-btn').removeClass('accordion__item--active');
    accordionItem.find('.js-accordion__arrow-btn').attr('aria-expanded', 'false');
    accordionItem.find('.js-questions__text').attr('aria-hidden', 'true');

    $(this).closest('.js-accordion__item').addClass('accordion__item--active');
    $(this).find('.js-accordion__arrow-btn').addClass('accordion__item--active');
    $(this).find('.js-accordion__arrow-btn').attr('aria-expanded', 'true');
    $(this).find('.js-questions__text').attr('aria-hidden', 'false');
  });
});
