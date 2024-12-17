let gl;
let matrixStack;
let axes, cone, sphere;
let projectionMatrix;

function init() {
    let canvas = document.getElementById("webgl-canvas");
    gl = canvas.getContext("webgl2");
    if (!gl) { alert("Your Web browser doesn't support WebGL 2\nPlease contact Dave"); }

    gl.clearColor(0.9, 0.9, 0.9, 1.0);
    gl.enable(gl.DEPTH_TEST);

    // Create a MatrixStack instance
    matrixStack = new MatrixStack();

    // Create a projection matrix (Orthographic)
    projectionMatrix = ortho(-1, 1, -1, 1, -1, 1);

    // Instantiate objects
    axes = new Axes(gl);
    cone = new Cone(gl, 20);
    sphere = new Sphere(gl, 10, 10);

    console.log("Objects instantiated:", { axes, cone, sphere });
    console.log("Axes program:", axes.program);
    console.log("Cone program:", cone.program);
    console.log("Sphere program:", sphere.program);

    // Start the rendering loop
    render();
}

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Use the matrix stack to transform and draw objects
    matrixStack.loadIdentity();

    // Draw Axes
    matrixStack.push();
    matrixStack.translate(-0.75, 0, 0); // Position to the left
    matrixStack.scale(0.2, 0.2, 0.2); // Scale down
    gl.useProgram(axes.program);
    let pUniformAxes = gl.getUniformLocation(axes.program, "P");
    let mvUniformAxes = gl.getUniformLocation(axes.program, "MV");
    console.log("Axes program:", axes.program);
    console.log("P Uniform Location (Axes):", pUniformAxes);
    console.log("MV Uniform Location (Axes):", mvUniformAxes);
    gl.uniformMatrix4fv(pUniformAxes, false, flatten(projectionMatrix));
    gl.uniformMatrix4fv(mvUniformAxes, false, flatten(matrixStack.current()));
    axes.draw();
    matrixStack.pop();

    // Draw Cone
    matrixStack.push();
    matrixStack.translate(0.75, 0, 0); // Position to the right
    matrixStack.scale(0.2, 0.2, 0.2); // Scale down
    gl.useProgram(cone.program);
    let pUniformCone = gl.getUniformLocation(cone.program, "P");
    let mvUniformCone = gl.getUniformLocation(cone.program, "MV");
    console.log("Cone program:", cone.program);
    console.log("P Uniform Location (Cone):", pUniformCone);
    console.log("MV Uniform Location (Cone):", mvUniformCone);
    gl.uniformMatrix4fv(pUniformCone, false, flatten(projectionMatrix));
    gl.uniformMatrix4fv(mvUniformCone, false, flatten(matrixStack.current()));
    cone.draw();
    matrixStack.pop();

    // Draw Sphere (and animate it)
    matrixStack.push();
    matrixStack.translate(0, 0.5, 0); // Position at the top
    matrixStack.scale(0.2, 0.2, 0.2); // Scale down
    let angle = performance.now() / 1000 * 45; // Rotate 45 degrees per second
    matrixStack.rotate(angle, [0, 1, 0]);
    gl.useProgram(sphere.program);
    let pUniformSphere = gl.getUniformLocation(sphere.program, "P");
    let mvUniformSphere = gl.getUniformLocation(sphere.program, "MV");
    console.log("Sphere program:", sphere.program);
    console.log("P Uniform Location (Sphere):", pUniformSphere);
    console.log("MV Uniform Location (Sphere):", mvUniformSphere);
    gl.uniformMatrix4fv(pUniformSphere, false, flatten(projectionMatrix));
    gl.uniformMatrix4fv(mvUniformSphere, false, flatten(matrixStack.current()));
    sphere.draw();
    matrixStack.pop();

    requestAnimationFrame(render);
}

window.onload = init;
