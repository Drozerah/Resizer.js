(() => {

    console.log('JS is loaded!')
    // put your code below
    
})()

class Resizer {

    constructor(){

        this._wrapper = document.getElementById('resizer-wrapper')
        this._input = document.querySelector('#resizer input[type="range"]')
        this._output = document.querySelector('#resizer output')
        this._button = document.querySelector('#resizer button')
        this._proxy = new Proxy(this._input, {

            set: (target, prop, value) => {

                target[prop] = value // update proxy target

                this.output(value) // update _output

                return true
            }
        })

    }

    output(value){
        this._output.innerHTML = `${value}%`
    }

    proxy(value){
        this._proxy.valueAsNumber = value
    }

    inputEvent(elm){
        elm.addEventListener('input', e => this.proxy(e.target.valueAsNumber), false)
    }

    onClick(elm){
        elm.addEventListener('click', () => this.proxy(100), false)
    }

    init(){
        this.output(this._input.value) // update _output by default
        this.inputEvent(this._input)
        this.onClick(this._button)
        return true
    }
}

const resizer = new Resizer().init()
