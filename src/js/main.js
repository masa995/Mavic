$(function () {
	const body = $('body');
	const paddingLock = $('.js-padding-lock');
	const links = $('.js-link');
	const sections = $('.js-section');
	const menuBtn = $('.js-menu__btn');
	const menuBody = $('.js-menu__list');

	const widthScroll = window.innerWidth - document.documentElement.clientWidth + 'px';
	let windowHeight;
	let touchStartY;
	let touchEndY;
	let arrSectionOffset = [];
	let arrSectionHeight = [];
	let scrollFlag = true;
	let sectionActive = 0;
	let focusElem;

	animationScrollLock(sectionActive);
	smoothScroll(sectionActive);
	$(sections[sectionActive]).addClass('js-active');

	menuBtn.on('click', function (e) {
		$(this).toggleClass('active');
		menuBody.toggleClass('active');

		if ($(this).hasClass('active')) {
			$(window).off();
			lock();
			$(':input, a').attr('tabindex', '-1');
		}
		else {
			unlock();
			$(':input, a').attr('tabindex', '1');
			scrollResponse();
		}
	});

	//Click links Smooth Scroll
	links.on('click', function (e) {
		e.preventDefault();
		let href = $(this).attr('href');
		let sectionNum = $(this).attr('data-scroll');
		sectionActive = sectionNum;
		animationScrollLock(sectionNum);

		//tab managering
		sections.removeClass('js-active');
		$(sections[sectionNum]).addClass('js-active');
		tabSwitch(focusElem);

		let offset = $(href).offset().top;
		smoothScroll(offset);

		menuBtn.removeClass('active');
		menuBody.removeClass('active');
		unlock();
		scrollResponse();
	});

	$(window).on('load resize', function (e) {
		focusElem = $('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"]')

		windowHeight = $(window).height();
		sections.css({ "min-height": windowHeight + "px" });

		sectionCalculate();
		scrollResponse();
		tabSwitch(focusElem);
	});

	function scrollResponse() {
		let maxSectionHeight = Math.max.apply(null, arrSectionHeight);
		let difference = windowHeight - maxSectionHeight;

		if (difference >= 0) {
			lock();
			pageScrollTouch();
			pageScrollKey();
			pageScrollWheel();
		}
		else if (difference < 0) {
			unlock();
			animationScrollUnlock();
		}
	}

	function pageScrollTouch() {
		$(window).on('touchstart', function (e) {
			e.preventDefault();
			touchStartY = e.touches[0].clientY;
		});

		$(window).on('touchmove', function (e) {
			e.preventDefault();
			touchEndY = e.touches[0].clientY;

			if (scrollFlag) {
				scrollFlag = false;

				if (touchStartY > touchEndY) {
					moveDown();
				}
				else {
					moveUp();
				}
			}

			setTimeout(function () {
				scrollFlag = true;
			}, 500);
		});
	}

	function pageScrollKey() {
		$(window).on('keydown', function (e) {
			if (scrollFlag) {
				scrollFlag = false;
				if (e.keyCode == '40') {
					moveDown();
				}
				else if (e.keyCode == '38') {
					moveUp();
				}
			}

			setTimeout(function () {
				scrollFlag = true;
			}, 500);
		});
	}

	function pageScrollWheel() {
		$(window).on('wheel', function (e) {
			if (scrollFlag) {
				scrollFlag = false;

				if (e.originalEvent.deltaY > 0) {
					moveDown();
				}
				else {
					moveUp();
				}
			}

			setTimeout(function () {
				scrollFlag = true;
			}, 500);
		});
	}

	function moveDown() {
		if (sectionActive < sections.length - 1) {
			sectionActive++;

			$(sections[sectionActive]).addClass('js-active');
			let offsetSection = arrSectionOffset[sectionActive];
			smoothScroll(offsetSection);
			animationScrollLock(sectionActive);

			sections.removeClass('js-active');
			$(sections[sectionActive]).addClass('js-active');
			tabSwitch(focusElem);
		}
	}

	function moveUp() {
		if (sectionActive > 0) {
			sectionActive--;

			$(sections[sectionActive]).addClass('js-active');
			let offsetSection = arrSectionOffset[sectionActive];
			smoothScroll(offsetSection);
			animationScrollLock(sectionActive);

			sections.removeClass('js-active');
			$(sections[sectionActive]).addClass('js-active');
			tabSwitch(focusElem);
		}
	}

	function sectionCalculate() {
		for (let i = 0; i < sections.length; i++) {
			let heightSection = $(sections[i]).innerHeight();
			let offsetSection = $(sections[i]).offset().top;
			arrSectionOffset.push(offsetSection);
			arrSectionHeight.push(heightSection);
		}
	}

	function smoothScroll(value) {
		$('html, body').animate(
			{
				scrollTop: value
			}, 500)
	}

	function lock() {
		body.addClass('lock');
		$('html').addClass('html_lock');

		paddingLock.css({
			'padding-right': widthScroll
		});
	}

	function unlock() {
		body.removeClass('lock');
		$('html').removeClass('html_lock');

		paddingLock.css({
			'padding-right': 0
		});
	}

	function tabSwitch(arr) {
		for (let i = 0; i < arr.length; i++) {
			let elem = arr[i];
			if (elem.closest('.js-section')) {
				$(arr[i]).attr('tabindex', '-1'); // lock tab

				if (elem.closest('.js-active')) {
					$(arr[i]).removeAttr('tabindex'); // unlock tab
				}
			}
		}
	}

	//Animation
	function animationScrollLock(num) {
		let animeteItem = $(sections[num]).find('.js-animate-elem');
		if (animeteItem.length > 0) {
			for (let i = 0; i < animeteItem.length; i++) {
				$(animeteItem[i]).addClass('animate');
			}
		}
	}

	function animationScrollUnlock() {
		$('.js-animate-elem').addClass('no-animate');
	}
});