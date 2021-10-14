import wrapRegl from "regl"
import mat4 from "gl-mat4"
import bunny from "bunny"
import angleNormals from "angle-normals"
import setupCamera from "./camera.js"


console.log(bunny)


const regl = wrapRegl()


const drawBunny = regl({
    vert: `
        precision mediump float;

        attribute vec3 position, normal;
        uniform mat4 model, view, projection;
        varying vec3 vNormal;

        void main() {
            vNormal = normal;
            gl_Position = projection * view * model * vec4(position, 1.0);
        }
    `,
    frag: `
        precision mediump float;

        varying vec3 vNormal;

        void main() {
            gl_FragColor = vec4(vNormal, 1.0);
        }
    `,
    attributes: {
        position: bunny.positions,
        normal: angleNormals(bunny.cells, bunny.positions)
    },
    uniforms: {
        model: ({ time }) => mat4.fromRotation([], 0.1 * time * Math.PI, [0, 1, 0])
    },
    elements: bunny.cells,
    count: bunny.cells.length * 3
})

console.log(regl.prop)


regl.frame(() => {
    
    const eye = [0, 20, 20]
    const target = [0, 0, 0]

    setupCamera(regl)({ eye, target }, () => {

        regl.clear({
            color: [0.8, 0.4, 0.2, 1.0],
            depth: 1
        })


        drawBunny()
    })
})
