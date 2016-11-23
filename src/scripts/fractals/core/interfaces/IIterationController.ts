import { Point } from '../../point'
import { IFractalCalculator } from './IFractalCalculator'

export interface IIterationController {

    getpixellevel(posx: number, posy: number, sspix: number, sspix2: number): number


}