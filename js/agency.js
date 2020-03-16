$(function () {
	// Видео по наведению на карточку
	var videoCard = $('.js-video-card');
	var object = $('.video-card__object');
	if (videoCard.length) {
		if ($(window).width() > 1279) {
	
			videoCard.on({
				'mouseenter': function() {
					var video = $(this).children(object);
					video[0].play();
				},
				'mouseleave': function() {
					var video = $(this).children(object);
					video[0].pause();
				}
			});
		} else {
			videoCard.each(function() {
				var poster = $(this).children(object).data('poster');
				$(this).children(object).attr("poster", poster);
			});
		}
	}
});
