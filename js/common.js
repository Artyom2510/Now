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

		$('.main-menu__logo').append('<canvas class="logo-canvas"></canvas>');

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
		var paretn = $(this).parents('.wp-block-embed__wrapper');
		var iframe = paretn.find('iframe')[0];
		var bg = paretn.find('.block-video__bg');
		iframe.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
		$(this).hide();
		bg.hide();
	});

	// Канвас
	function canvasFunc() {
		var canvas = document.querySelector('.logo-canvas');

		if (!canvas || !canvas.getContext) {
			return false;
		}

		function rand(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}

		var ctx = canvas.getContext('2d');
		var offscreenCanvas = document.createElement('canvas');
		var offscreenCtx = offscreenCanvas.getContext('2d');
		var X = canvas.width = offscreenCanvas.width = 77;
		var Y = canvas.height = offscreenCanvas.height = 32;
		var particles = [];
		var ease = 0.3;
		var friction = 0.8;

		function drawText() {
			offscreenCtx.save();
			offscreenCtx.fillStyle = '#EE0E33';
			offscreenCtx.font = '32px my-fonts';
			offscreenCtx.textAlign = 'center';
			offscreenCtx.textBaseline = 'middle';
			offscreenCtx.fillText('', X / 2, Y / 2);
			offscreenCtx.restore();
		}
		
		function Particle(ctx, x, y, r, cr, cg, cb) {
			this.ctx = ctx;
			this.init(x, y, r, cr, cg, cb);
		}

		Particle.prototype.init = function(x, y, r, cr, cg, cb) {
			this.x = x;
			this.y = y;
			this.xi = rand(0, X);
			this.yi = rand(0, Y);
			this.r = r;
			this.s = 10;
			this.c = {
				r: cr,
				g: cg,
				b: cb,
				a: 1
			};
			this.v = {
				x: rand(-5, 5) * Math.random(),
				y: rand(-5, 5) * Math.random()
			};
			this.a = rand(0, 360);
			this.rad = this.a * Math.PI / 180;
		};

		Particle.prototype.draw = function() {
			var ctx = this.ctx;
			ctx.save();
			ctx.globalCompositeOperation = 'source-over';
			ctx.fillStyle = 'rgb(' + this.c.r + ', ' + this.c.g + ', ' + this.c.b + ')';
			ctx.beginPath();
			ctx.arc(this.xi, this.yi, Math.sin(this.rad) < 0 ? -Math.sin(this.rad) * this.r : Math.sin(this.rad) * this.r, 0, Math.PI * 2, false);
			ctx.fill();
			ctx.restore();
		};

		Particle.prototype.updatePosition = function() {
			this.v.x += (this.xi - this.x) * ease;
			this.v.y += (this.yi - this.y) * ease;
			this.v.x *= friction;
			this.v.y *= friction;
			this.xi -= this.v.x;
			this.yi -= this.v.y;
		};

		Particle.prototype.updateParams = function() {
			this.a += 2;
			this.rad = this.a * Math.PI / 180;
		};

		Particle.prototype.render = function() {
			this.updateParams();
			this.updatePosition();
			this.draw();
		};

		window.requestAnimationFrame =
			window.requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(cb) {
				setTimeout(cb, 17);
			};
		
		function initText(cb) {
			var data = offscreenCtx.getImageData(0, 0, X, Y).data;
			var p;
			for (var i = 0; i < Y; i++) {
				for (var j = 0; j < X; j++) {
					var oI = (j + i * X) * 4 + 3;
					if (data[oI] > 0) {
						// p = new Particle(ctx, j, i, 1, rand(0, 255), rand(0, 255), rand(0, 255));
						p = new Particle(ctx, j, i, 1, 238, 14, 51);
						particles.push(p);
					}
				}
			}
			if (cb) {
				cb();
			} else {
				return;
			}
		}

		drawText();
		initText(render);

		function render() {
			ctx.clearRect(0, 0, X, Y);
			for (var i = 0; i < particles.length; i++) {
				particles[i].render();
			}
			requestAnimationFrame(render);
		}
	}

	// Канвас2
	function canvasFunc2() {
		//Init canvas
		var canvas = document.querySelector('.logo-canvas');
		var ctx = canvas.getContext('2d');

		//Set the canvas width and height to the full width of the window
		//This also sets the width and the height of the canvas to variables, which are used later.
		ctx.canvas.width = width = 77;
		ctx.canvas.height = height = 32;
		var text = "";
		var boxPadding = 10;

		//Set the Y offset
		var yOffset = 0;

		//Draw function
		var draw = () => {
			//Clear the canvas
			ctx.clearRect(0, 0, width, height);
			ctx.font = '28px my-fonts';
			ctx.fillStyle ="#ee0e33";
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			ctx.fillText(text, width/2, height/2);
			
			//Calculate the bounding box of the text
			//This is mostly done to improve efficiency
			//If this wasn't done, the entire canvas would be animated
			//This would waste significant amounts of computing power, considering it's mostly white space
			var textSize = ctx.measureText(text);
			var textLeft = ((width/2) - (textSize.width/2) - (boxPadding/2));
			var textTop = ((height/2) - textSize.actualBoundingBoxAscent) - (boxPadding/2);
			var textWidth = textSize.width + boxPadding;
			var textHeight = (textSize.actualBoundingBoxAscent*2) + boxPadding;
			
			//Cycle through each row of the text
			for(var i=0; i<textHeight; i++){
				//Grab the text within the bounds calculated previously
				var line = ctx.getImageData(textLeft, textTop+i, textWidth, 1);
				//Use sin to calculate a certain offset for the current row
				//Decrease the first 10 to increase the frequency
				//Increase the second 10 to increase the amount of distortion
				var xOffset = (Math.sin((i+yOffset)/5) * 5);
				//Put the row back in the same place, along with the previously calculated offset
				ctx.putImageData(line, textLeft+xOffset, textTop+i);
			}

			
			//Increase the Y offset, moving where each sin calculation is done
			//This resets once it reaches the textHeight + 5
			//The 5 is to account for white space drawn around the text 
			yOffset = (yOffset == textHeight+5 ? 0 : yOffset+=1);

			requestAnimationFrame(draw);
		}

		draw();
	}

	var logo = $('.main-menu__logo');
	// var logoAnimClass = ['glitchtext', 'glitch-noise', 'noise', 'neon2'];
	var logoAnimClass = ['canvas2', 'rotate', 'stroke-glitch', 'three-d', 'pulse', 'canvas', 'wobble'];
	var clazz;

	if ($(window).width() > 1024) {
		logo.on({
			'mouseenter': function() {
				clazz = logoAnimClass[Math.floor(Math.random() * logoAnimClass.length)];
				logo.addClass(clazz);
				if (clazz === 'canvas') {
					canvasFunc();
				}
				if (clazz === 'canvas2') {
					canvasFunc2();
				}
			},
			'mouseleave': function() {
				logo.removeClass(logoAnimClass);
				clazz = '';
			}
		});
		logo.on({
			'mousemove': function(e) {
				if (clazz === 'three-d') {
					var x = e.offsetX;
					var	y = e.offsetY;
					var middleW = logo.outerWidth(true) / 2;
					var middleH = logo.outerHeight(true) / 2;
					var rotateX = -(x - middleW) / 10000;
					var rotateY = -(y - middleH) / 4400;
					logo.css('transform', 'matrix3d(1, 0, 0, ' + rotateX + ', 0, 1, 0, ' + rotateY + ', 0, 0, 1, 0, 0, 0, 0, 1)');
				}
			},
			'mouseleave': function() {
				logo.css('transform', 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1)');
			}
		});
	}
});
