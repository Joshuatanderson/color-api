const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
const SpeechGrammarList = webkitSpeechGrammarList || SpeechGrammarList;
const SpeechRecognitionEvent =
	webkitSpeechRecognitionEvent || SpeechRecognitionEvent;

const CSS_COLOR_NAMES = [
	"AliceBlue",
	"AntiqueWhite",
	"Aqua",
	"Aquamarine",
	"Azure",
	"Beige",
	"Bisque",
	"Black",
	"BlanchedAlmond",
	"Blue",
	"BlueViolet",
	"Brown",
	"BurlyWood",
	"CadetBlue",
	"Chartreuse",
	"Chocolate",
	"Coral",
	"CornflowerBlue",
	"Cornsilk",
	"Crimson",
	"Cyan",
	"DarkBlue",
	"DarkCyan",
	"DarkGoldenRod",
	"DarkGray",
	"DarkGrey",
	"DarkGreen",
	"DarkKhaki",
	"DarkMagenta",
	"DarkOliveGreen",
	"DarkOrange",
	"DarkOrchid",
	"DarkRed",
	"DarkSalmon",
	"DarkSeaGreen",
	"DarkSlateBlue",
	"DarkSlateGray",
	"DarkSlateGrey",
	"DarkTurquoise",
	"DarkViolet",
	"DeepPink",
	"DeepSkyBlue",
	"DimGray",
	"DimGrey",
	"DodgerBlue",
	"FireBrick",
	"FloralWhite",
	"ForestGreen",
	"Fuchsia",
	"Gainsboro",
	"GhostWhite",
	"Gold",
	"GoldenRod",
	"Gray",
	"Grey",
	"Green",
	"GreenYellow",
	"HoneyDew",
	"HotPink",
	"IndianRed",
	"Indigo",
	"Ivory",
	"Khaki",
	"Lavender",
	"LavenderBlush",
	"LawnGreen",
	"LemonChiffon",
	"LightBlue",
	"LightCoral",
	"LightCyan",
	"LightGoldenRodYellow",
	"LightGray",
	"LightGrey",
	"LightGreen",
	"LightPink",
	"LightSalmon",
	"LightSeaGreen",
	"LightSkyBlue",
	"LightSlateGray",
	"LightSlateGrey",
	"LightSteelBlue",
	"LightYellow",
	"Lime",
	"LimeGreen",
	"Linen",
	"Magenta",
	"Maroon",
	"MediumAquaMarine",
	"MediumBlue",
	"MediumOrchid",
	"MediumPurple",
	"MediumSeaGreen",
	"MediumSlateBlue",
	"MediumSpringGreen",
	"MediumTurquoise",
	"MediumVioletRed",
	"MidnightBlue",
	"MintCream",
	"MistyRose",
	"Moccasin",
	"NavajoWhite",
	"Navy",
	"OldLace",
	"Olive",
	"OliveDrab",
	"Orange",
	"OrangeRed",
	"Orchid",
	"PaleGoldenRod",
	"PaleGreen",
	"PaleTurquoise",
	"PaleVioletRed",
	"PapayaWhip",
	"PeachPuff",
	"Peru",
	"Pink",
	"Plum",
	"PowderBlue",
	"Purple",
	"RebeccaPurple",
	"Red",
	"RosyBrown",
	"RoyalBlue",
	"SaddleBrown",
	"Salmon",
	"SandyBrown",
	"SeaGreen",
	"SeaShell",
	"Sienna",
	"Silver",
	"SkyBlue",
	"SlateBlue",
	"SlateGray",
	"SlateGrey",
	"Snow",
	"SpringGreen",
	"SteelBlue",
	"Tan",
	"Teal",
	"Thistle",
	"Tomato",
	"Turquoise",
	"Violet",
	"Wheat",
	"White",
	"WhiteSmoke",
	"Yellow",
	"YellowGreen"
].map(name => name.toLowerCase());

console.log(CSS_COLOR_NAMES)


const grammar =
	"#JSGF V1.0; grammar colors; public <color> = " +
	CSS_COLOR_NAMES.join(" | ") +
	" ;";

const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

const speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);

const target = document.getElementById("target");
target.style.backgroundColor = "red";

const handlerButton = document.getElementById("handler");
const hints = document.getElementById("hints");
const confidence = document.getElementById("confidence");

hints.innerHTML =
	"Tap/click then say a color to change the background color of the app. Try " +
	"Orange" +
	".";

recognition.onresult = function(event) {
	const last = event.results.length - 1;
	const color = event.results[last][0].transcript;
	console.log(color);
	console.log(
		`CSS color names includes result? ${CSS_COLOR_NAMES.includes(color)}`
	);

	if (CSS_COLOR_NAMES.includes(color)) {
		target.style.backgroundColor = color;
		error.style.display = "none";
	} else {
		error.style.display = "block";
		capitalizedColor = color.charAt(0).toUpperCase() + color.slice(1)
		error.innerHTML = `${capitalizedColor} is not a valid color.  Try orange, purple, blue, or another common color name.`
	}
	hints.textContent = "Result received: " + color + ".";
	confidence.textContent = "Confidence: " + event.results[0][0].confidence;
};

recognition.onspeechend = function() {
	recognition.stop();
};

handlerButton.onclick = function() {
	recognition.start();
	console.log("Ready to receive a color command.");
};

recognition.onnomatch = function(event) {
	hints.textContent = "I didnt recognise that color.";
};

recognition.onerror = function(event) {
	hints.textContent = "Error occurred in recognition: " + event.error;
};
