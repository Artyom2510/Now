$(function () {

	var root = $('.root');
	var sections = ['first', 'cases', 'contacts'];
	var wHeight;

	// Скролл по хешу
	$(document).ready(function() {
		wHeight = $(window).height() / 1.5;
	});

	// Скролл по стрелке + по якорю
	function animateSect(sect) {
		root.stop().animate({
			scrollTop: sect.offset().top + root.scrollTop()
		}, 500);
		return false;
	};

	$(window).on('resize', function() {
		wHeight = $(window).height() / 1.5;
	});

	// Скролл по стрелке
	$('.js-next-sect').on('click', function() {
		animateSect($('.cases'));
	});

	// Скролл по булетам
	$('.js-anc-btn').on('click', function() {
		var thisSectId = "." + $(this).data('id');
		animateSect($(thisSectId));
	});

	// При скролле страницы меняется активный булет
	root.on('scroll', function() {
		if ($(window).width() > 767) {
			if ($("." + sections[0]).offset().top === 0) {
				$('.js-anc-btn:not([data-id="'+ sections[0] + '"])').removeClass('active');
				$('.js-anc-btn[data-id="'+ sections[0]+ '"]').addClass('active');
			}
			if ($("." + sections[1]).offset().top - wHeight <= 0 && $("." + sections[2]).offset().top - wHeight > 0) {
				$('.js-anc-btn:not([data-id="'+ sections[1] + '"])').removeClass('active');
				$('.js-anc-btn[data-id="'+ sections[1] + '"]').addClass('active');
			}
			if ($("." + sections[2]).offset().top - wHeight <= 0) {
				$('.js-anc-btn:not([data-id="'+ sections[2] + '"])').removeClass('active');
				$('.js-anc-btn[data-id="'+ sections[2] + '"]').addClass('active');
			}
		}
	});

	// Видео на главной
	var popupVideo = $('.popup-video');
	popupVideo.switchPopup({
		btnClass: 'js-tgl-video',
		duration: 300,
		overflow: true,
	});

	var blockVideo = $('.block-video');

	popupVideo.on('afterOpen', function() {
		blockVideo.addClass('transform');
		$(this).find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
	});

	popupVideo.on('beforeClose', function() {
		$(this).find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
		blockVideo.removeClass('transform');
	});

	// Фильтр
	var idTag;
	var checkbox = $('.js-checkbox');
	checkbox.on('click', function() {
		if (!checkbox.is(':checked').length) {
			$('.card').show();
		}
		if ($(this).is(':checked')) {
			checkbox.not(this).prop('checked', false);
			idTag = $(this)[0].id;
			$('.card').each(function() {
				if ($(this).data('id').indexOf(idTag) !== - 1) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
		}
	});

	// Клик по стрелочке для скролла тегов
	var scrollPos;
	var scrollW;
	var width;
	// Начальная ширина прокрутки
	$(document).ready(function () {
		scrollW = $('.tags')[0].scrollWidth;
		width = scrollW - $('.tags').outerWidth(true);
	});

	// Начальная ширина прокрутки при ресайзе
	$(window).on('resize', function() {
		scrollW = $('.tags')[0].scrollWidth;
		width = scrollW - $('.tags').outerWidth(true);
	});
	// Вправо
	$('.js-scroll-btn-right').on('click', function() {
		scrollPos = $('.tags').scrollLeft() + 100;
		$(this).siblings('.tags').animate({scrollLeft: scrollPos}, 200);
	});
	// Влево
	$('.js-scroll-btn-left').on('click', function() {
		scrollPos = $('.tags').scrollLeft() - 100;
		$(this).siblings('.tags').animate({scrollLeft: scrollPos}, 200);
	});

	$('.tags').on('scroll', function() {
		if ($(this).scrollLeft() === 0) {
			$('.js-scroll-btn-left').removeClass('display');
		} else {
			$('.js-scroll-btn-left').addClass('display');
		}
		if ($(this).scrollLeft() >= width) {
			$('.js-scroll-btn-right').removeClass('display');
		} else {
			$('.js-scroll-btn-right').addClass('display');
		}
	});

	var slider = $('.js-now-slider');
	var slide = $('.js-song-slide');
	var textSong = $('.slide__text-wrap');
	var img = $('.slide__img');
	var child;
	var childImg;

	if (slider.length) {
		slider.slick({
			infinite: true,
			dots: false,
			arrows: false,
			swipeToSlide: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			fade: true,
			speed: 300,
			cssEase: 'ease',
			adaptiveHeight: true
		});
	}

	if (slider.length) {
		slide.on('click', function() {
			slider.slick('slickNext');
		});
		slide.on({
			'mouseenter': function() {
				child = $(this).children(textSong);
				childImg = $(this).children(img);
				child.addClass('transform');
				childImg.addClass('glitch');
			},
			// 'mouseleave': function() {
			// 	child = $(this).children(textSong);
			// 	childImg = $(this).children(img);
			// 	child.removeClass('transform');
			// 	childImg.removeClass('glitch');
			// }
		});
	}


});
