import wrapRegl from "regl"
import mat4 from "gl-mat4"
import bunny from "bunny"
import angleNormals from "angle-normals"

console.log(bunny)


const regl = wrapRegl()


const quad = {
    positions: [
        // Triangle
        [-1, -1, 0],
        [-1, +1, 0],
        [+1, +1, 0],
    ]
}

// Draw a triangle
const draw = regl({
    vert: `
    precision mediump float;

    attribute vec3 positions, color;
    uniform mat4 model, view, perspective;
    varying vec3 vColor;

    void main() {
        vColor = color;
        gl_Position = perspective * view * model * vec4(positions, 1.0);
    }

    `,
    frag: `
    precision mediump float;

    varying vec3 vColor;

    void main() {
        gl_FragColor = vec4(vColor, 1.0);
    }

    `,
    count: 3,
    // elements: quad.cells,
    attributes: {
        positions: quad.positions,
        color: [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
        ]
        // normal: angleNormals(quad.cells, quad.positions)
    },
    uniforms: {
        model: ({ time }) => {
            const rotate = mat4.fromRotation([], time * Math.PI / 4, [0, 1, 0])
            return mat4.identity([]) },
        view: ({ time }) => {
            const eye = [0, 0, 2 ]
            const target = [0, 0, 0]
            const up = [0, 1, 0]
            return mat4.lookAt([], eye, target, up)
        },
        perspective: ({ viewportHeight, viewportWidth }) => {
            return mat4.perspective([],
                Math.PI / 4, viewportWidth / viewportHeight, 0.01, 1000.0)
        }
    }
})


regl.frame(() => {
    regl.clear({
        color: [0.6, 0.7, 0, 1]
    })

    draw()
})

