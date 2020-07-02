(function () {
	'use strict';
	window.addEventListener('load', function () {
		var canvas = document.querySelector('.logo-canvas');

		if (!canvas || !canvas.getContext) {
			return false;
		}

		/********************
			Random Number
		********************/

		function rand(min, max) {
			return Math.floor(Math.random() * (max - min + 1) + min);
		}

		/********************
			Var
		********************/

		var ctx = canvas.getContext('2d');
		var offscreenCanvas = document.createElement('canvas');
		var offscreenCtx = offscreenCanvas.getContext('2d');
		var X = canvas.width = offscreenCanvas.width = 77;
		var Y = canvas.height = offscreenCanvas.height = 32;
		var particles = [];
		var ease = 0.3;
		var friction = 0.8;

		/********************
			offscreenCanvas
		********************/
		
		function drawText() {
			offscreenCtx.save();
			offscreenCtx.fillStyle = '#EE0E33';
			offscreenCtx.font = 28 + 'px sans-serif';
			offscreenCtx.textAlign = 'center';
			offscreenCtx.textBaseline = 'middle';
			offscreenCtx.fillText('N:OW', X / 2, Y / 2);
			offscreenCtx.restore();
		}

		/********************
			Particle
		********************/
		
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

		/********************
			Animation
		********************/

		window.requestAnimationFrame =
			window.requestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function(cb) {
				setTimeout(cb, 17);
			};

		/********************
			Render
		********************/
		
		function initText(cb) {
			var data = offscreenCtx.getImageData(0, 0, X, Y).data;
			var p;
			for (var i = 0; i < Y; i++) {
				for (var j = 0; j < X; j++) {
					var oI = (j + i * X) * 4 + 3; // fantastic! I can not think of it.
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

		/********************
			Render
		********************/
		
		function render() {
			ctx.clearRect(0, 0, X, Y);
			for (var i = 0; i < particles.length; i++) {
				particles[i].render();
			}
			requestAnimationFrame(render);
		}

	});
})();