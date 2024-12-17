/////////////////////////////////////////////////////////////////////////////
//
//  BasicCube.js
//
//  A cube defined of 12 triangles
//

class BasicCube {
    constructor(gl, vertexShader, fragmentShader) {
        vertexShader ||= `
            in vec4 aPosition;

            void main() {
                gl_Position = aPosition;
            }
        `;

        fragmentShader ||=`
            out vec4 fColor;

            void main() {
                const vec4 red = vec4(1, 0, 0, 1);
                const vec4 green = vec4(0, 1, 0, 1);

                fColor = gl_FrontFacing ? green : red;
            }
        `;

        let program = new ShaderProgram(gl, this, vertexShader, fragmentShader);

        let positions = new Float32Array([
            1.0, 0.0,
            0.5, 0.866,
            -0.5, 0.866,

            1.0, 0.0,
            -0.5, 0.866,
            -1.0, 0.0,
        
            1.0, 0.0,
             -1.0, 0.0,
             0.5, -0.866,

            -1.0, 0.0,
            -0.5, -0.866,
            0.5, -0.866
        ]);

        let aPosition = new Attribute(gl, program, "aPosition",
            positions, 2, gl.FLOAT);

        this.draw = () => {
            program.use();

            aPosition.enable();
            gl.drawArrays(gl.TRIANGLES, 0, aPosition.count);
            aPosition.disable();
        };
    }
}