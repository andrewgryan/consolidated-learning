import wrapRegl from "regl"
import mat4 from "gl-mat4"
import frag from "./frag.glsl"
import vert from "./vert.glsl"


const regl = wrapRegl()


const drawTriangle = regl({
    vert,
    frag,
    count: 3,
    attributes: {
        position: [
            [-1, -1],
            [0, +1],
            [+1, -1]
        ]
    },
    uniforms: {
        model: ({ time }) => {
            const aboutY = mat4.fromRotation([], time * Math.PI / 2, [0, 1, 0])
            const aboutZ = mat4.fromRotation([], time * Math.PI / 2, [0, 0, 1])
            return mat4.multiply([], aboutZ, aboutY)
        },
        view: () => {
            const eye = [0, 0, 10]
            const target = [0, 0, 0]
            const up = [0, 1, 0]
            return mat4.lookAt([], eye, target, up)
        },
        projection: ({ viewportWidth, viewportHeight }) => {
            return mat4.perspective([], Math.PI / 4, viewportWidth / viewportHeight, 0.01, 1000.0)
        },
        time: ({ time }) => time
    }
})


regl.frame(() => {
    regl.clear({
        color: [0.2, 0.3, 0.4, 1.0],
        depth: 1
    })

    drawTriangle()
})
