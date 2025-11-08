import * as THREE from 'three'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Fox from './Fox.js'

export default class World
{
    constructor(_options)
    {
        this.scene = _options.scene
        this.resources = _options.resources
        this.time = _options.time
        this.debug = _options.debug

        this.resources.on('ready', () =>
        {
            this.environment = new Environment({
                scene: this.scene,
                resources: this.resources,
                debug: this.debug
            })
            this.floor = new Floor({
                scene: this.scene,
                resources: this.resources
            })
            this.fox = new Fox({
                scene: this.scene,
                resources: this.resources,
                time: this.time,
                debug: this.debug
            })
        })
    }
}

