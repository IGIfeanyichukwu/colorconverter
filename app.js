console.log('Color Converter');



//hexadecimal to decimal
function hexToDec(hex) {
	return parseInt(hex, 16);
}

// decimal to hexadecimal
function decToHex(dec) {
	let res = Number(dec).toString(16) ;
	return `${res}`.length == 1 ? `0${res}` : res;
}

//RGB to HEX values
function rgbToHex(r, g, b) {

	let vals = [r, g, b];

	let output = '#';

	vals.forEach(val => {

		output += decToHex(val);

	})

	return output;

}

//HEX to RGB values
function hexToRgb(hex) {
	let r, g, b;
	r = hex.slice(0,2);
	g = hex.slice(2,4);
	b = hex.slice(4,6);

	r = hexToDec(r);
	g = hexToDec(g);
	b = hexToDec(b);

	console.log(`rgb(${r}, ${g}, ${b})`);

}

//RGB to CMYK values
function rgbToCmyk(r, g, b) {
	let c, m, y, k;

	r = parseInt(r)/255;
	g = parseInt(g)/255;
	b = parseInt(b)/255;

	k = Math.min(1 - r, 1 - g, 1 - b);
	c = (1 - r - k) / (1 - k) || 0;
	m = (1 - g - k) / (1 - k) || 0;
	y = (1 - b - k) / (1 - k) || 0;

	c = Number((c * 100).toFixed(2));
	m = Number((m * 100).toFixed(2));
	y = Number((y * 100).toFixed(2));
	k = Number((k * 100).toFixed(2));

	let res = [c, m, y, k];

	console.log(res);	
}


//RGB to HSV values
function rgbToHsv(r, g, b) {

	let h, s, v, max, min, d;

	r = parseInt(r)/255;
	g = parseInt(g)/255;
	b = parseInt(b)/255;

	max = Math.max(r, g, b);
	min = Math.min(r, g, b);
	d = max - min;

	v = max;
	s = max == 0 ? 0 : d / max;


	if (max == min) {
		h = 0; //achromatic
	console.log(h);
	} else {
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g: 
				h = (b - r) / d + 2;
				break;
			case b: 
				h = (r - g) / d + 4;
				break;
		}

		h /= 6;
	}

	h *= 360;
	s *= 100;
	v *= 100;

	h = Number(h.toFixed(2));
	s = Number(s.toFixed(2));
	v = Number(v.toFixed(2));

	console.log(h, s, v);

}


function rgbToHsl(r, g, b) {

	let h, s, l, max, min, d;

	r = parseInt(r)/255;
	g = parseInt(g)/255;
	b = parseInt(b)/255;

	max = Math.max(r, g, b);
	min = Math.min(r, g, b);
	d = max - min;

	l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0);
				break;
			case g: 
				h = (b - r) / d + 2;
				break;
			case b: 
				h = (r - g) / d + 4;
				break;
		}

		h /= 6;
	}

	h *= 360;
	s *= 100;
	l *= 100;

	h = Number(h.toFixed(2));
	s = Number(s.toFixed(2));
	l = Number(l.toFixed(2));


	console.log(h, s, l);

}


function cmykToRgb(c, m, y, k) {

	let r, g, b;

	c = parseInt(c) / 100; 
	m = parseInt(m) / 100; 
	y = parseInt(y) / 100; 
	k = parseInt(k) / 100; 

	c = c * (1 - k) + k;
	m = m * (1 - k) + k;
	y = y * (1 - k) + k;

	r = 1 - c;
	g = 1 - m;
	b = 1 - y;

	r = Math.round(255 * r);
	g = Math.round(255 * g);
	b = Math.round(255 * b);

	console.log(r, g, b);

}


function hsvToRgb(h, s, v) {
	let r, g, b, i, f, p, q, t;

	h = parseInt(h)/360;
	s = parseInt(s)/100;
	v = parseInt(v)/100;

	i = Math.floor(h * 6);
	f = h * 6 - i;
	p = v * (1 - s);
	q = v * (1 - f * s);
	t = v * (1 - (1 - f) * s);


	switch(i % 6) {
		case 0:
			r = v;
			g = t;
			b = p;
			break;

		case 1:
			r = q;
			g = v;
			b = p;
			break;

		case 2:
			r = p;
			g = v;
			b = t;
			break;

		case 3:
			r = p;
			g = q;
			b = v;
			break;

		case 4:
			r = t;
			g = p;
			b = v;
			break;		

		case 5:
			r = v;
			g = p;
			b = q;
			break;
	}

	r = Math.round(255 * r);
	g = Math.round(255 * g);
	b = Math.round(255 * b);

	console.log(r, g, b);

}


function hslToRgb(h, s , l) {
	h = parseInt(h);
	s = parseInt(s);
	l = parseInt(l);

	// h /= 360;

	s /= 100;
	l /= 100;

	let c = (1 - Math.abs(2 * l - 1)) * s,
		x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
		m = l - (c / 2),
		r, g, b;


	if(0 <= h && h < 60) {
		r = c; g = x; b = 0;
	} else if (60 <= h && h < 120) {
		r = x; g = c; b = 0;
	} else if ( 120 <= h && h < 180) {
		r = 0; g = c; b = x;
	} else if ( 180 <= h && h < 240) {
		r = 0; g = x; b = c;
	} else if (240 <= h && h < 300) {
		r = x; g = 0; b = c;
	} else if ( 300 <= h && h < 360) {
		r = c; g = 0; b = x;
	}



	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);

	console.log(r, g, b);

}


hslToRgb('24', '10', '35');

//get section selector buttons
const rbBtn = document.getElementById('rgb-section-btn');
const hxBtn = document.getElementById('hex-section-btn');
const ckBtn = document.getElementById('cmyk-section-btn');
const hlBtn = document.getElementById('hsl-section-btn');
const hvBtn = document.getElementById('hsv-section-btn');

//get sections
const rbBox = document.getElementById('rgb-conversion-box');
const hxBox = document.getElementById('hex-conversion-box');
const ckBox = document.getElementById('cmyk-conversion-box');
const hlBox = document.getElementById('hsl-conversion-box');
const hvBox = document.getElementById('hsv-conversion-box');

//get all rgb inputs
const rgbRedInput = document.querySelector('.rgb-red-input input[type="number"]');
const rgbGreenInput = document.querySelector('.rgb-green-input input[type="number"]');
const rgbBlueInput = document.querySelector('.rgb-blue-input input[type="number"]');

//get hex input
const hexSingleInput = document.querySelector('.hex-single-input input[type="text"]');


//get all cmyk inputs
const cmykCyanInput = document.querySelector('.cmyk-cyan-input input[type="number"]');
const cmykMagentaInput = document.querySelector('.cmyk-magenta-input input[type="number"]');
const cmykYellowInput = document.querySelector('.cmyk-yellow-input input[type="number"]');
const cmykBlackInput = document.querySelector('.cmyk-black-input input[type="number"]');


//get all hsl inputs
const hslHueInput = document.querySelector('.hsl-hue-input input[type="number"]');
const hslSaturationInput = document.querySelector('.hsl-saturation-input input[type="number"]');
const hslLightnessInput = document.querySelector('.hsl-lightness-input input[type="number"]');


//get all hsv inputs
const hsvHueInput = document.querySelector('.hsv-hue-input input[type="number"]');
const hsvSaturationInput = document.querySelector('.hsv-saturation-input input[type="number"]');
const hsvValueInput = document.querySelector('.hsv-value-input input[type="number"]');


//get all convert buttons
const rgbConvertBtn = document.querySelector('.rgb-cb-convert-btn');
const hexConvertBtn = document.querySelector('.hex-cb-convert-btn');
const cmykConvertBtn = document.querySelector('.cmyk-cb-convert-btn');
const hslConvertBtn = document.querySelector('.hsl-cb-convert-btn');
const hsvConvertBtn = document.querySelector('.hsv-cb-convert-btn');



//get all reset buttons
const rgbResetBtn = document.querySelector('.rgb-cb-reset-btn');
const hexResetBtn = document.querySelector('.hex-cb-reset-btn');
const cmykResetBtn = document.querySelector('.cmyk-cb-reset-btn');
const hslResetBtn = document.querySelector('.hsl-cb-reset-btn');
const hsvResetBtn = document.querySelector('.hsv-cb-reset-btn');

//get all outputs container

const rgbOutputs = document.querySelector('.rgb-cb-outputs');
const hexOutputs = document.querySelector('.hex-cb-outputs');
const cmykOutputs = document.querySelector('.cmyk-cb-outputs');
const hslOutputs = document.querySelector('.hsl-cb-outputs');
const hsvOutputs = document.querySelector('.hsv-cb-outputs');



//array of all section selectors
let selectorBtnArray = [rbBtn, hxBtn, ckBtn, hlBtn, hvBtn];

//array of all sections
let sectionArray = [rbBox, hxBox, ckBox, hlBox, hvBox];

for (let i = 0; i < selectorBtnArray.length; i++){
	selectorBtnArray[i].addEventListener('click', (e) => {
		selectorBtnArray.forEach(b => {
			b.classList.remove('current-selector-btn');
		});
		sectionArray.forEach(s => {
			s.classList.remove('make-section-visible')
		})

		e.target.classList.add('current-selector-btn');

		sectionArray[i].classList.add('make-section-visible');

	})
}



//handling conversion

rgbConvertBtn.onclick = function (e) {
	let redVal = parseInt(rgbRedInput.value);
	let greenVal = parseInt(rgbGreenInput.value);
	let blueVal = parseInt(rgbBlueInput.value);

	console.log(redVal, greenVal, blueVal);

	if (redVal < 0 || redVal > 255 || 
		greenVal < 0 || greenVal > 255 || 
		blueVal < 0 || blueVal > 255) {
		console.log('The RGB Value is invalid. It should be between 0 and 255');
	}

}

