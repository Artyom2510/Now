$(function () {

	var root = $('.root');

	// Скролл по хешу - контакты
	$(document).ready(function() {
		if (window.hashId) {
			setTimeout(function() {
				animateSect($(window.hashId));
			}, 1500);
		}
	});

	// Скролл по стрелке + по якорю
	function animateSect(sect) {
		root.stop().animate({
			scrollTop: sect.offset().top + root.scrollTop() + 70
		}, 700);
		return false;
	};

	// Видео по наведению на карточку
	var videoCard = $('.js-video-card');
	var object = $('.video-card__object');
	if (videoCard.length) {
		if ($(window).width() > 1279) {
	
			videoCard.on({
				'mouseenter': function() {
					var video = $(this).find(object);
					video[0].play();
				},
				'mouseleave': function() {
					var video = $(this).find(object);
					video[0].pause();
				}
			});
		}
	}
});
