import { IIterationController } from './IIterationController'
import { IFractalCalculator } from './IFractalCalculator'
import { Point } from '../../point'

export interface IFractal {
    width: number
    height: number
    limit: number
    pixelsize: number
    z: Point
    supersampling: number
    controller: IIterationController

    getfractaldata(): Uint32Array


}