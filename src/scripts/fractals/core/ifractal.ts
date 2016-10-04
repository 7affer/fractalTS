export interface IFractal {
    width: number
    height: number
    max: number
    pixelsize: number
    centerx: number
    centery: number
    supersampling: number

    getfractaldata(): Uint32Array
}