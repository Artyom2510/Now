$(function () {
	// Видео по наведению на карточку
	if ($(window).width() > 1024 && $('.js-video-card').length) {

		$('.js-video-card').on({
			'mouseenter': function() {
				var video = $(this).find('.video-card__object');
				video[0].play();
			},
			'mouseleave': function() {
				var video = $(this).find('.video-card__object');
				video[0].pause();
			}
		});

	}
});
