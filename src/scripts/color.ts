export class Color {
    constructor(public r: number = 0, public g: number = 0, public b: number = 0) {

    }

    public tohex() {
        let r = this.r.toString(16);
        r = r.length < 2 ? '0' + r : r;
        let g = this.g.toString(16);
        g = g.length < 2 ? '0' + g : g;
        let b = this.b.toString(16);
        b = b.length < 2 ? '0' + b : b;
        return `#${r}${g}${b}`;
    }

    public torgb() {
        return `rgb(${this.r},${this.g},${this.b})`;
    }

    public parsehex(hex: string) {
        let r = hex.substr(1, 2)
        let g = hex.substr(3, 2)
        let b = hex.substr(5, 2)
        this.r = parseInt(r, 16)
        this.g = parseInt(g, 16)
        this.b = parseInt(b, 16)
    }
}