import { GradData } from './graddata'
import { GradOptions } from './gradoptions'
import { GradBody } from './gradbody'

function GradPlugin(initialvalues: GradOptions) {

    let instance = this;
    let body = <GradBody>instance.data('gradbw');

    if (body == null) {
        body = new GradBody(instance, initialvalues)        
        instance.data('gradbw', body)
    }

    return body;
}

export {GradData, GradOptions, GradBody, GradPlugin}