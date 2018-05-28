var canvas;
var context;
var screenH;
var screenW;
var stars = [];
var fps = 50;
var numStars = 1000;

$('document').ready(function() {

  // Calculate the screen size
	screenH = $(window).height();
	screenW = $(window).width();

	// Get the canvas
	canvas = $('#space');

	// Fill out the canvas
	canvas.attr('height', screenH);
	canvas.attr('width', screenW);
	context = canvas[0].getContext('2d');

	// Create all the stars
	for(var i = 0; i < numStars; i++) {
		var x = Math.round(Math.random() * screenW);
		var y = Math.round(Math.random() * screenH);
		var length = 2 + Math.random() * 4;
		var opacity = Math.random();

		// Create a new star and draw
		var star = new Star(x, y, length, opacity);

		// Add the the stars array
		stars.push(star);
	}

	setInterval(animate, 1000 / fps);
});

/**
 * Animate the canvas
 */
function animate() {
	context.clearRect(0, 0, screenW, screenH);
	$.each(stars, function() {
		this.draw(context);
	})
}

/**
 * Star
 *
 * @param int x
 * @param int y
 * @param int length
 * @param opacity
 */
function Star(x, y, length, opacity) {
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.length = parseInt(length);
	this.opacity = opacity;
	this.factor = 1;
	this.increment = Math.random() * .07;
	var thro = Math.random();
	var col;
	if(thro < 1) {
		col = "rgba(255, 255, 255, ";

	} else {
		col = "rgba(255, 130, 188, ";
	}
	this.color = col;
}

/**
 * Draw a star
 *
 * This function draws a start.
 * You need to give the contaxt as a parameter
 *
 * @param context
 */
Star.prototype.draw = function() {
	 context.rotate((Math.PI * 1 / 10));

	// Save the context
	context.save();

	// move into the middle of the canvas, just to make room
	context.translate(this.x, this.y);

	// Change the opacity
	if(this.opacity > 1) {
		this.factor = -1;
	}
	else if(this.opacity <= 0) {
		this.factor = 1;

		this.x = Math.round(Math.random() * screenW);
		this.y = Math.round(Math.random() * screenH);
	}

	this.opacity += this.increment * this.factor;

	// context.beginPath();
	// context.moveTo(0, 0);
	// context.lineTo(0, this.length);
	// context.moveTo(0, 0);
	// context.lineTo(0, - this.length);
	// context.moveTo(0, 0);
	// context.rotate(Math.PI/2);
	// context.lineTo(0, this.length);
	// context.moveTo(0, 0);
	// context.lineTo(0, - this.length);
	// context.moveTo(0, 0);
	// context.strokeStyle = this.color + this.opacity + ")";

	// context.closePath();
	// context.stroke();
	// context.closePath();
	context.beginPath()
	for (var i = 4; i--;) {
		context.lineTo(0, this.length);
		context.translate(0, this.length);
		context.rotate((Math.PI * 2 / 8));
		context.lineTo(0, - this.length);
		context.translate(0, - this.length);
		context.rotate(-(Math.PI * 6 / 8));
	}
	context.lineTo(0, this.length);
	context.closePath();
	context.fillStyle = this.color + this.opacity + ")";
	context.shadowBlur = 1000;
	context.shadowColor = this.color;
	context.fill();

	context.restore();
}
