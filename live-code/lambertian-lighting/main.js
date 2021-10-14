import wrapRegl from "regl"
import setupCamera from "./camera.js"
import drawBunny from "./bunny.js"


const regl = wrapRegl()

const draw = drawBunny(regl)


regl.frame(() => {
    
    const eye = [0, 20, 20]
    const target = [0, 0, 0]

    setupCamera(regl)({ eye, target }, () => {

        regl.clear({
            color: [0.8, 0.4, 0.2, 1.0],
            depth: 1
        })


        draw()
    })
})
