export default class EventEmitter
{
    constructor()
    {
        this.callbacks = {}
    }

    on(event, callback)
    {
        if(!this.callbacks[event])
        {
            this.callbacks[event] = []
        }

        this.callbacks[event].push(callback)
    }

    trigger(event, ...args)
    {
        const callbacks = this.callbacks[event]

        if(callbacks)
        {
            for(const callback of callbacks)
            {
                callback(...args)
            }
        }
    }
}

