import * as THREE from 'three'
import Sizes from './utils/Sizes.js'
import Time from './utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './utils/Resources.js'
import sources from './sources.js'
import Debug from './utils/Debug.js'

let instance = null

export default class Experience
{
    constructor(_canvas)
    {
        if(instance)
        {
            return instance
        }
        instance = this

        this.canvas = _canvas
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera({
            scene: this.scene,
            sizes: this.sizes,
            canvas: this.canvas
        })
        this.renderer = new Renderer({
            canvas: this.canvas,
            sizes: this.sizes,
            scene: this.scene,
            camera: this.camera
        })
        this.world = new World({
            scene: this.scene,
            resources: this.resources,
            time: this.time,
            debug: this.debug
        })

        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    update()
    {
        this.camera.update()
        this.world.fox?.update()
        this.renderer.update()
    }
}

