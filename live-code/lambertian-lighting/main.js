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
        uniform vec3 lightPosition;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
            vNormal = normal;
            vec4 worldPosition = model * vec4(position, 1.0);
            vPosition = worldPosition.xyz;
            gl_Position = projection * view * worldPosition;
        }
    `,
    frag: `
        precision mediump float;

        varying vec3 vNormal, vPosition;
        uniform vec3 lightPosition;

        void main() {
            vec3 color = vec3(0.5, 0.5, 0.0);
            float intensity = max(0.0, dot(vNormal, normalize(lightPosition - vPosition)));
            float ambient = 0.2;
            gl_FragColor = vec4(ambient + intensity * color, 1.0);
        }
    `,
    attributes: {
        position: bunny.positions,
        normal: angleNormals(bunny.cells, bunny.positions)
    },
    uniforms: {
        model: ({ time }) => mat4.fromRotation([], Math.PI / 2, [0, 1, 0]),
        lightPosition: ({ time }) => [0, 10 * Math.cos(time), 10 * Math.sin(time)]
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
