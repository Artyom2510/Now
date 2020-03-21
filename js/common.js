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

	var header = $('.js-header');
	var menu = $('.js-menu');
	var halfWindowHeight;
	var opacity;
	var root = $('.root');
	var animateParent = $('.js-parent-offset-top');
	var animateChild = $('.js-child-animate');
	var sectLine = $('.js-sect-line');
	var contentSect = $('.js-offset-top-sect');

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
		// Ширина не учитывая скролл
		header.width($('.main').width());

		var windowHeight = $(window).height();
		halfWindowHeight = windowHeight / 1.5;

		// анимации
		if (animateParent.length) {
			opacityTranslate(animateParent, animateChild, windowHeight, 0.2);
		}
		
		if (sectLine.length) {
			sectLines(sectLine, windowHeight);
		}
		if (contentSect.length) {
			sectContent(contentSect, windowHeight);
		}
	});

	$(window).on('resize', function() {
		header.width($('.main').width());
		halfWindowHeight = $(window).height() / 1.5;
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

	// Время при наведении на лого
	var firstNum, secondNum;
	var cnt = 0;
	function addZero(num) {
		num += "".split('');
		if(num.length > 1) {
			firstNum = num[0];
			secondNum = num[1];
		} else {
			firstNum = "0";
			secondNum = num;
		}
		caseOfNum(firstNum);
		caseOfNum(secondNum);
	}

	var timer;

	function start() {
		timer = setInterval(function() {
			nowTime();
		}, 10000);
	};

	function nowTime() {
		$('.js-logo').find('svg:last-child path').attr('fill', '#ee0e33');
		var now = new Date();
		var hours = now.getHours();
		var minutes = now.getMinutes();
		cnt = 0;
		addZero(hours);
		addZero(minutes);
		console.log(now)
	}

	function caseOfNum(part) {
		cnt++;
		switch (part) {
			case "0":
				$('#middle' + cnt).attr("fill", "transparent");
				break;
			case "1":
				$('#middle' + cnt + ', #left-top' + cnt + ', #left-bottom' + cnt + ', #top' + cnt + ', #bottom' + cnt).attr("fill", "transparent");
				break;
			case "2":
				$('#left-top' + cnt + ', #right-bottom' + cnt).attr("fill", "transparent");
				break;
			case "3":
				$('#left-top' + cnt + ', #left-bottom' + cnt).attr("fill", "transparent");
				break;
			case "4":
				$('#top' + cnt + ', #left-bottom' + cnt + ', #bottom' + cnt).attr("fill", "transparent");
				break;
			case "5":
				$('#right-top' + cnt + ', #left-bottom' + cnt).attr("fill", "transparent");
				break;
			case "6":
				$('#right-top' + cnt).attr("fill", "transparent");
				break;
			case "7":
				$('#middle' + cnt + ', #left-top' + cnt + ', #left-bottom' + cnt + ', #bottom' + cnt).attr("fill", "transparent");
				break;
			case "8":
				break;
			case "9":
				$('#left-bottom' + cnt).attr("fill", "transparent");
				break;
		};
	}

	if($(window).width() > 1024) {
		$('.js-logo').on({
			'mouseenter': function() {
				$(this).find('.now').css('opacity', '0');
				$(this).children('svg:last-child').css('opacity', '1');
				start();
				nowTime();
			},
			'mouseleave': function() {
				$(this).find('.now').css('opacity', '1');
				$(this).children('svg:last-child').css('opacity', '0');
				setTimeout(function() {
					$(this).find('svg:last-child path').attr('fill', '#ee0e33');
				}, 100);
				cnt = 0;
				clearTimeout(timer);
			}
		});
	}

	// Запуск видео по нажатию на нашу кнопку, скрытие постера
	$('.js-start-video').on('click', function() {
		var paretn = $(this).parent('.block-video');
		var iframe = paretn.children('iframe')[0];
		var bg = paretn.children('.block-video__bg');
		iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
		$(this).hide();
		bg.hide();
	});

});
