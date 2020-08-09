var gl;  // A Global variable for the WebGL Canvas

function start() {
	var canvas = document.getElementById("mazeCanvas");

	// Init the GL context
	gl = initWebGL(canvas);

	// Only continue if WebGL is available and working
	if (!gl) {
		return;
	}

	// Set clear color to black, fully opaque
	gl.clearColor( 0.0, 0.0, 0.0, 1.0 );
	// Enable depth testing
	gl.enable(gl.DEPTH_TEST);
	// Near things onscure far things
	gl.depthFunc(gl.LEQUAL);
	// Clear the color as well as teh depth buffer.
	gl.clear( gl.COLOR_BUFFER_BIT );
}

function initWebGL( canvas ) {
	gl = null;

	// Try to grab the standard context. If it fails, fallback to experimental
	gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

	// If we don't have a GL context, give up now
	if (!gl) {
		alert('Unable to initialize WebGL. Your browser may not support it.');
	}

	return gl;
}
