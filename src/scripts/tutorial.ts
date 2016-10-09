export class Tutorial {

    private storagekey = 'tutorial'
    private classmessage = '.message'

    constructor(private selector: string) {
        $(`${this.selector}`).tooltip(<any>{ trigger: 'manual' })
        $(`${this.selector}`).tooltip('show')
        $(`${this.selector}`).hide()
        $(`${this.selector} + .tooltip`).hide()
    }

    private showcurrent = function () {
        $(`${this.selector}`).hide()
        $(`${this.selector} + .tooltip`).hide()
        $(`${this.selector}${this.classmessage}${this.getlevel()}`).show();
        $(`${this.selector}${this.classmessage}${this.getlevel()} + .tooltip`).show();
    }

    public setlevel = function (nextlevel: number) {
        let level = this.getlevel()
        if (level + 1 == nextlevel) {
            localStorage.setItem(this.storagekey, nextlevel.toString())
        }
        this.showcurrent()
    }

    private getlevel = function () {
        let level = localStorage.getItem(this.storagekey)
        if (level == null) {
            level = 0
        }
        if (isNaN(parseInt(level, 10))) {
            return 0
        }
        return parseInt(level, 10);
    }
}