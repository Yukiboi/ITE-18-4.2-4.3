import * as THREE from 'three'

export default class Fox
{
    constructor(_options)
    {
        this.scene = _options.scene
        this.resources = _options.resources
        this.time = _options.time
        this.debug = _options.debug

        this.debugObject = {}

        this.resource = this.resources.items.foxModel

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }

    setAnimation()
    {
        this.animation = {}
        this.animation.mixer = new THREE.AnimationMixer(this.model)

        this.animation.action = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.action.play()

        this.animation.play = (name) =>
        {
            const newAction = this.animation.mixer.clipAction(this.resource.animations.find((clip) => clip.name === name))
            const oldAction = this.animation.action

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.action = newAction
        }
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}

