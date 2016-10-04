import { Color } from './../color'

class GradData {

    constructor(public value: number, public color: Color = new Color()) {

    }
}

export { GradData, Color }