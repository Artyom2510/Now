$(function () {

	var root = $('.root');
	var next = $('.js-next-sect');

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

	next.on('click', function() {
		animateSect($('#cases'));
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
	});

	popupVideo.on('beforeClose', function() {
		$(this).find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
		blockVideo.removeClass('transform');
	});

});
