$(function () {

	var root = $('.root');
	var sects = ['.js-second', '#contacts'];
	var length = sects.length;
	var i = 0;
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
		animateSect($(sects[i]));
	});

	// root.on('scroll', function() {
	// 	i === length ? next.hide() : next.show();
	// 	if ($(this).scrollTop() >= $(sects[i]).offset().top && $(this).scrollTop() <= $(sects[i]).outerHeight(true)) {
	// 		i++;
	// 	}
	// 	// if (i < length) {
	// 	// 	next.show();
	// 	// 	if ($(this).scrollTop() >= $(sects[i]).offset().top) {
	// 	// 		i++;
	// 	// 	}
	// 	// } else {
	// 	// 	next.hide();
	// 	// }
	// 	console.log(i)
	// });

	// Якорь - контакты
	$('.js-anchor a').on('click', function(e) {
		e.preventDefault();
		var hash = $(this).attr("href");
		// animateSect($(this).attr("href"));
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
