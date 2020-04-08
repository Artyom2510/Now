$(function () {

	var root = $('.root');

	// Скролл по якорю
	function animateSect(sect) {
		root.stop().animate({
			scrollTop: sect.offset().top + root.scrollTop()
		}, 700);
		return false;
	};

	// Скролл по хешу - контакты
	$(document).ready(function() {
		if (window.hashId) {
			setTimeout(function() {
				animateSect($(window.hashId));
			}, 1500);
		}
	});

	// Клик по якорю
	// С использовании menu-nav__item ul li a выдавало ошибку
	// При переходе с кейсов
	$('.js-anchor-agency').on('click', function(e) {
		e.preventDefault();
		var hash = $(this).attr("href");
		animateSect($(hash));
	});

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
