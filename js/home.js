$(function () {

	var root = $('.root');

	// Скролл по хешу - контакты
	$(document).ready(function() {
		if (window.hashId) {
			setTimeout(function() {
				animateSect($(window.hashId));
			}, 1);
		}

	});

	// Скролл по стрелке + по якорю
	function animateSect(sect) {
		root.stop().animate({
			scrollTop: sect.offset().top + root.scrollTop()
		}, 500);
		return false;
	}

	$('.js-next-sect').on('click', function() {
		animateSect($('.cases'));
	});

	// Якорь - контакты
	$('.js-anchor a').on('click', function(e) {
		e.preventDefault();
		var hash = $(this).attr("href");
		if ($(window).width() < 768) {
			$('.js-menu').removeClass('transform');
			$('.js-btn-burder').children().toggleClass('open close');
			root.removeClass('overflow');
		}
		animateSect($(hash));
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

	// Свг анимация надпись в контактах
	root.on('scroll', function() {
		if ($('.contacts').offset().top < $(window).height() / 2) $('.anim-svg').addClass('go');
	});

});
