$(function () {

	var root = $('.root');
	var sections = ['first', 'cases', 'contacts'];
	var wHeight;

	// Скролл по хешу - контакты
	$(document).ready(function() {
		if (window.hashId) {
			setTimeout(function() {
				animateSect($(window.hashId));
			}, 1);
		}

		wHeight = $(window).height() / 1.5;
	});

	$(window).on('resize', function() {
		wHeight = $(window).height() / 1.5;
	});

	// Скролл по стрелке + по якорю
	function animateSect(sect) {
		root.stop().animate({
			scrollTop: sect.offset().top + root.scrollTop()
		}, 500);
		return false;
	};

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

	$('.js-anc-btn').on('click', function() {
		var thisSectId = "." + $(this).data('id');
		animateSect($(thisSectId));
	});

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

});
