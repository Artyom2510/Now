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

	// Меню
	var header = $('.js-header');

	// Ширина не учитывая скролл
	$(document).ready(function() {
		if ($(window).width() > 767) {
			header.width($('.main').width());
		}
	});

	$(window).on('resize', function() {
		if ($(this).width() > 767) {
			header.width($('.main').width());
		}
	});

	// Бг шапки
	var opacity;
	
	$('.root').on('scroll', function() {
		if ($(window).width() > 767) {
			if ($(this).scrollTop() < 51) {
				opacity = $(this).scrollTop() / 100
			}
			if ($(this).scrollTop() > 70) {
				opacity = 0.95;
			}
			header.css('background', 'rgba(0, 0, 0,' + opacity + ')');
		}
	});

	$('.js-btn-open').on('click', function() {
		header.addClass('transform');
		$('html').css('overflow', 'hidden');
	});

	$('.js-btn-close').on('click', function() {
		header.removeClass('transform');
		$('html').css('overflow', 'auto');
	});

	// Время при наведении на лого
	var firstNum, casesNum;
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
				$(this).find('#now').css('opacity', '0');
				$(this).children('svg:last-child').css('opacity', '1');
				var now = new Date();
				var hours = now.getHours();
				var minutes = now.getMinutes();
				addZero(hours);
				addZero(minutes);
			},
			'mouseleave': function() {
				$(this).find('#now').css('opacity', '1');
				$(this).children('svg:last-child').css('opacity', '0');
				$(this).find('svg:last-child path').attr('fill', '#ee0e33');
				cnt = 0;
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
