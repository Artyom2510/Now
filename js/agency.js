$(function () {

	var wWidth = $(window).width();

	// Видео по наведению на карточку
	var videoCard = $('.js-video-card');
	var object = $('.video-card__object');
	if (videoCard.length) {
		if (wWidth > 1279) {
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

	// Слайдер логотипов
	var slider = $('.js-logos-slider');

	if (slider.length && wWidth < 768) {
		slider.slick({
			infinite: true,
			dots: false,
			arrows: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			speed: 300,
			cssEase: 'ease',
			adaptiveHeight: true,
			swipeToSlide: true,
			autoplay: true,
			autoplaySpeed: 2000
		});
	}
});
