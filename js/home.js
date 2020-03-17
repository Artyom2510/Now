$(function () {

	// Скролл по хешу
	$(document).ready(function() {
		if (window.hashId) {
			setTimeout(function() {
				$('.root').animate({
					scrollTop: $(window.hashId).offset().top
				}, 500);
			}, 1);
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
	});

	popupVideo.on('beforeClose', function() {
		$(this).find('iframe')[0].contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
		blockVideo.removeClass('transform');
	});
	
	// Скролл по стрелке
	var root = $('.root');
	var sects = ['.js-second', '#contacts'];
	var length = sects.length;
	var i = 0;
	var next = $('.js-next-sect');

	function animateSect(sect) {
		root.animate({
			scrollTop: sect.offset().top + root.scrollTop()
		}, 400);
	}

	next.on('click', function() {
		animateSect($(sects[i]));
	});

	root.on('scroll', function() {
		if (i < length) {
			next.show();
			if ($(this).scrollTop() >= $(sects[i]).offset().top) {
				i++;
			}
		} else {
			next.hide();
		}
		// console.log(i)
	});

	$('.js-anchor a').on('click', function(e) {
		e.preventDefault();
		animateSect($(sects[1]));
	});

});
