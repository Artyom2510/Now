$(function () {
	// Галерея
	if ($('.swipebox').length) {
		$('.swipebox').swipebox(
			{
				useSVG: false,
				loopAtEnd: false,
			}
		);
	}
});
