$(function () {
	// img-svg
	var imgSvgArray = {};

	function imgSvg() {
		$('img.img-svg').each(function () {
			var $img = $(this);
			var imgID = $img.attr('id');
			var imgClass = $img.attr('class');
			var imgURL = $img.attr('src');

			if (typeof imgSvgArray[imgURL] !== 'undefined') {
				var $svg = $(imgSvgArray[imgURL]);
				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				}
				$img.replaceWith($svg);
			} else {
				$.ajax({
					url: imgURL,
					async: false,
					dataType: "xml",
					success: function (data) {
						var $svg = $(data).find('svg');
		
						if (typeof imgID !== 'undefined') {
							$svg = $svg.attr('id', imgID);
						}
		
						$svg = $svg.removeAttr('xmlns:a');
		
						if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
							$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
						}
		
						imgSvgArray[imgURL] = $svg[0].outerHTML;
		
						if (typeof imgClass !== 'undefined') {
							$svg = $svg.attr('class', imgClass + ' replaced-svg');
						}

						$img.replaceWith($svg);
					}
				});
			}
		});
	}

	imgSvg();

	$('.main').on("DOMNodeInserted", function() {
		imgSvg();
	});

	var header = $('.js-main-menu');
	var menu = $('.js-menu');
	var rightPos = $('.js-pos');
	var widhtMain;
	var wWidth, windowHeight, halfWindowHeight;
	var opacity;
	var scrollW;
	var root = $('.root');
	var animateParent = $('.js-parent-offset-top');
	var animateChild = $('.js-child-animate');
	var sectLine = $('.js-sect-line');
	var contentSect = $('.js-offset-top-sect');

	// Скролл по стрелке + по якорю
	function animateSect(sect) {
		root.stop().animate({
			scrollTop: sect.offset().top + root.scrollTop()
		}, 500);
		return false;
	};

	$('.js-menu a').on('click', function (e) {
		if ($(window).width() < 768) {
			$('.js-menu').removeClass('transform');
			$('.js-btn-burder').children().toggleClass('open close');
			root.removeClass('overflow');
		}
		var href = $(this).attr('href');
		var matches = href.match(/#\w+/);
		if (matches.length) {
			if ($(matches[0]).length) {
				e.preventDefault();
				animateSect($(matches[0]));
				return false;
			}
		}
		return;
	});

	// Карточки
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
	function sectLines(line, wHeight) {
		line.each(function() {
			if ($(this).offset().top < wHeight) {
				$(this).addClass('full-width');
			}
		});
	}

	// Контент
	function sectContent(content, wHeight) {
		content.each(function() {
			if ($(this).offset().top < wHeight) {
				$(this).addClass('up');
			}
		});
	}

	$(document).ready(function() {

		// Скролл по хешу
		if (window.hashId) {
			setTimeout(function() {
				animateSect($(window.hashId));
			}, 1);
		}

		// Ширина не учитывая скролл
		widhtMain = $('.main').width();
		header.width(widhtMain);
		wWidth = $(window).width();
		if (wWidth > 767) {
			scrollW = wWidth - widhtMain;
			rightPos.css('right', 40 + scrollW + 'px');
		}

		windowHeight = $(window).height();
		halfWindowHeight = windowHeight / 1.5;

		// анимации
		if (animateParent.length) {
			opacityTranslate(animateParent, animateChild, windowHeight, 0.2);
		}
		
		if (sectLine.length) {
			sectLines(sectLine, windowHeight);
			sectLine.each(function(i, el) {
				i++;
				i = i < 10 ? "0" + i : i;
				$(el).siblings('.sect-number').text(i);
			});
		}
		if (contentSect.length) {
			sectContent(contentSect, windowHeight);
		}

	});

	$(window).on('resize', function() {
		widhtMain = $('.main').width();
		header.width(widhtMain);
		wWidth = $(window).width();
		if (wWidth > 767) {
			scrollW = wWidth - widhtMain;
			rightPos.css('right', 40 + scrollW + 'px');
		}

		windowHeight = $(window).height();
		halfWindowHeight = windowHeight / 1.5;
	});

	root.on('scroll', function() {

		if ($(this).scrollTop() < 51) {
			opacity = $(this).scrollTop() / 100
		}
		if ($(this).scrollTop() > 70) {
			opacity = 0.9;
		}
		// Бг шапки
		header.css('background', 'rgba(0, 0, 0,' + opacity + ')');

		if (animateParent.length) {
			opacityTranslate(animateParent, animateChild, halfWindowHeight, 0.1);
		}
		if (sectLine.length) {
			sectLines(sectLine, halfWindowHeight);
		}
		if (contentSect.length) {
			sectContent(contentSect, halfWindowHeight);
		}

	});

	$('.js-btn-burder').on('click', function() {
		$(this).children().toggleClass('open close');
		menu.toggleClass('transform');
		root.toggleClass('overflow');
	});

	// Запуск видео по нажатию на нашу кнопку, скрытие постера
	$('.js-start-video').on('click', function() {
		var paretn = $(this).parents('.block-video');
		var iframe = paretn.find('iframe')[0];
		var bg = paretn.find('.block-video__bg');
		iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
		$(this).hide();
		bg.hide();
	});

});
