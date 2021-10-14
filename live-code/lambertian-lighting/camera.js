import mat4 from "gl-mat4"

const setupCamera = (regl) => {
    return regl({
      context: {
              projection: function (context) {
                        return mat4.perspective([],
                                    Math.PI / 4,
                                    context.viewportWidth / context.viewportHeight,
                                    0.01,
                                    1000.0)
                      },

              view: function (context, props) {
                        return mat4.lookAt([],
                                    props.eye,
                                    props.target,
                                    [0, 1, 0])
                      },

              eye: regl.prop('eye')
            },

      uniforms: {
              view: regl.context('view'),
              projection: regl.context('projection')
            }
    })
}

export default setupCamera
