import {Point} from './point'

export function scaleto(lv: number, scale: number, max: number) {
    return lv / max * scale;
}

export function getclickposition(
    canvas: HTMLCanvasElement,
    e: MouseEvent
) {
    let rect = canvas.getBoundingClientRect(), // abs. size of element
        scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
        scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

    let pos = {
        x: (e.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
        y: (e.clientY - rect.top) * scaleY     // been adjusted to be relative to element
    }
    return pos;
}

export function getcoords(
    e: MouseEvent,
    canvas: HTMLCanvasElement,
    pxratio: number,
    base: Point
) {
    let pos = getclickposition(canvas, e);
    return new Point(
        (pos.x - canvas.width / 2) * pxratio + base.x,
        (canvas.height / 2 - pos.y) * pxratio + base.y
    );
}