import { GradData } from './graddata'

export class GradOptions {
    constructor(
        public values: Array<GradData>, 
        public sliderclick: (el:any, data:GradData) => void = () => {},
        public setgradient: (gradient:Array<GradData>) => void = () => {}    
    ) {

    }
}