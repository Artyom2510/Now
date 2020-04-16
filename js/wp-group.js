$(function () {

	var windowHeight, halfWindowHeight;
	var root = $('.root');
	var sectLine;
	var children = $('.start-numbering').children('.wp-block-group');
	var animateParent = $('.blocks-gallery-grid');
	var animateChild = $('.js-child-animate');

	// Карточки - Фотогалерея
	function opacityTranslate(parent, child, wHeight, delay) {
		parent.each(function(i, el) {
			if ($(el).offset().top < wHeight) {
				$(el).find(child).each(function(k) {
					$(this).css('transition-delay', k * delay + "s").addClass('up');
				});
			}
		});
	}

	// Линии
	function wpGroupUp(contentGroup, line, wHeight) {
		contentGroup.each(function() {
			if ($(this).offset().top < wHeight) {
				$(this).addClass('up');
				$(this).find(line).addClass('full-width');
			}
		});
	}

	$(document).ready(function() {

		// Высрта экрана
		windowHeight = $(window).height();
		halfWindowHeight = windowHeight / 1.25;

		children.each(function(i, el) {
			console.log(i)
			i++;
			i = i < 10 ? "0" + i : i;
			$(el)
				.prepend('<hr class="sect-line sect-line_wp js-sect-line-wp">')
				.prepend('<span class="sect-number">' + i + '</span>');

			// Анимация полосок
			sectLine = $('.js-sect-line-wp');
		});

		if (sectLine.length) {
			wpGroupUp(children, sectLine, halfWindowHeight);
		}

		// анимации
		if (animateParent.length) {
			opacityTranslate(animateParent, animateChild, windowHeight, 0.2);
		}

	});

	$(window).on('resize', function() {
		windowHeight = $(window).height();
		halfWindowHeight = windowHeight / 1.25;
	});

	root.on('scroll', function() {

		if (sectLine.length) {
			wpGroupUp(children, sectLine, halfWindowHeight);
		}

		if (animateParent.length) {
			opacityTranslate(animateParent, animateChild, halfWindowHeight, 0.1);
		}

	});

});
