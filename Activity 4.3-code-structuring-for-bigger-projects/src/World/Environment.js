import * as THREE from 'three'

export default class Environment
{
    constructor(_options)
    {
        this.scene = _options.scene
        this.resources = _options.resources
        this.debug = _options.debug

        this.debugObject = {}

        this.setSunLight()
        this.setEnvironmentMap()
    }

    setSunLight()
    {
        this.sunLight = new THREE.DirectionalLight('#ffffff', 4)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(3.5, 2, -1.25)
        this.scene.add(this.sunLight)

        this.debugObject.sunLight = this.sunLight
        this.debug.ui.add(this.sunLight, 'intensity').min(0).max(10).step(0.001).name('lightIntensity')
        this.debug.ui.add(this.sunLight.position, 'x').min(-5).max(5).step(0.001).name('lightX')
        this.debug.ui.add(this.sunLight.position, 'y').min(-5).max(5).step(0.001).name('lightY')
        this.debug.ui.add(this.sunLight.position, 'z').min(-5).max(5).step(0.001).name('lightZ')
    }

    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 0.4
        this.environmentMap.texture = this.resources.items.environmentMap
        this.environmentMap.texture.encoding = THREE.sRGBEncoding

        this.scene.environment = this.environmentMap.texture

        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                    child.castShadow = true
                    child.receiveShadow = true
                }
            })
        }

        this.environmentMap.updateMaterials()

        this.debugObject.envMapIntensity = this.environmentMap.intensity
        this.debug.ui.add(this.debugObject, 'envMapIntensity').min(0).max(4).step(0.001).onChange(() =>
        {
            this.environmentMap.intensity = this.debugObject.envMapIntensity
            this.environmentMap.updateMaterials()
        })
    }
}

