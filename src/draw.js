let canvas = document.getElementById('canvas');
canvas.width = window.innerWidth * 0.75;


var slider = document.getElementById("accuracySlider");
var speedSlider = document.getElementById("speedSlider");

var variance = 3;
var varianceColor = 2;
var speed = 5;

slider.oninput = function() {
  variance = this.value;
}
speedSlider.oninput = function() {
  speed = this.value;
}

var stopped = false
function stop() {
	stopped = !stopped
	if (!stopped) {
		document.getElementById("stopButton").innerHTML = "Stopp"
		brownian()
	}

	else {
		document.getElementById("stopButton").innerHTML = "Start"
	}
}

function download() {
	var link = document.createElement('a');
  link.download = 'filename.png';
  link.href = canvas.toDataURL()
  link.click();
	link.remove();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)
  canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
}

var width = canvas.width
var height = canvas.height
var canvasWidth = canvas.width
var canvasHeight = canvas.height

window.addEventListener('resize', function(){
  canvas.width = window.innerWidth * 0.75;
  width = canvas.width
  height = canvas.height
  canvasWidth = canvas.width
  canvasHeight = canvas.height
}, false);

let ctx = canvas.getContext('2d');
var canvasData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);

function onload() {
  width = image.getWidth()
	height = image.getHeight()

  if (width < canvas.width && height < canvas.height) {}
  else if (width < height) {
    Marvin.scale(image.clone(), image, Math.round(canvas.height * width / height))
  }
  else {
    Marvin.scale(image.clone(), image, canvas.width)
  }

	width = image.getWidth()
	height = image.getHeight()
}

function normal() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    return Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

function drawPixel (x, y, r, g, b, a) {
    var index = (x + y * canvas.width) * 4;

    canvasData.data[index + 0] = r;
    canvasData.data[index + 1] = g;
    canvasData.data[index + 2] = b;
    canvasData.data[index + 3] = a;
}

var x = Math.round(canvasWidth / 2);
var y = Math.round(canvasHeight / 2);
var r = 255;
var g = 155;
var b = 255;
var a = 255;


function brownian() {
  ctx.beginPath();
  ctx.moveTo(x, y);

	for (let i = 0; i < speed * 0.1 * (41 - variance); i++) {
    x = Math.round(x + variance * normal());

    if (x > canvasWidth) {
      x = canvasWidth;
      continue;
    }

    else if (x < 0) {
      x = 0;
      continue;
    }

    y = Math.round(y + variance * normal());

    if (y > canvasHeight) {
      y = canvasHeight;
      continue;
    }

    else if (y < 0) {
      y = 0;
      continue;
    }

    r = Math.round(r + varianceColor * normal());
    r = 100 + Math.abs(r) % 155;
    g = Math.round(g + varianceColor * normal());
    g = 150 + Math.abs(g) % 105;
    b = Math.round(b + varianceColor * normal());
    b = 200 + Math.abs(b) % 55;

    ctx.strokeStyle = "#" + r.toString(16) + g.toString(16) + b.toString(16);
		ctx.lineTo(x, y);
	}

  ctx.stroke();

	if (stopped) {return}
	setTimeout(brownian, 50)

}

function brownian_pixel() {
  ctx.beginPath();
  ctx.moveTo(x, y);

	for (let i = 0; i < 10; i++) {
    x = Math.round(x + variance * normal());

    x = x % canvasWidth;

    y = Math.round(y + variance * normal());
    y = y % canvasHeight;

    ctx.lineTo(x, y);

    r = Math.round(r + 10 * normal());
    r = r % 255;
    g = Math.round(g + 10 * normal());
    g = g % 255;
    b = Math.round(b + 10 * normal());
    b = b % 255;
	}

  ctx.stroke();

	if (stopped) {return}
	setTimeout(brownian, 50)
}

brownian();
