(() => {

    console.log('JS is loaded!')
    // put your code below
    
})()

class Resizer {

    constructor(){

        /**
        * DOM elements bindings 
        */
        this._wrapper = document.getElementById('resizer-wrapper')
        this._output = document.querySelector('#resizer output')
        this._input = document.querySelector('#resizer input[type="range"]')
        this._button = document.querySelector('#resizer button')
        /**
        * Proxy instanciation 
        */
        this._proxy = new Proxy(this._input, {

            set: (target, prop, value) => {

                target[prop] = value // update proxy target

                this.output(value) // update _output

                console.log(`value: ${value}`) // #DEBUG

                return true
            }
        })
        /**
        * Timer interval 
        */
        this._interval = {
            handler: undefined,
            isRunning: false,
            step: 1,
            duration: 1000 // ms
        }
    }

    output(value){this._output.innerHTML = `${value}%`}

    proxy(value){this._proxy.valueAsNumber = value} // update _input value definition

    inputEvent(elm){

        elm.addEventListener('input', e => {
            
            // stop interval if running
            if (this._interval.isRunning) {

                this.stopInterval() // clear Interval

            }

            this.proxy(e.target.valueAsNumber) // update _input value through proxy

        }, false)
    }

    onClick(elm){

        elm.addEventListener('click', () => {


            if (!this._interval.isRunning) {
        
                this.startInterval(this._input.valueAsNumber) // set Interval

            } else {

                this.stopInterval() // clear Interval

            }

        }, false)
    }

    startInterval(value){

        this._interval.isRunning = true // update isRunning boolean
        this._button.innerHTML = `Stop` // update button text
        this._interval.handler = setInterval(() => { // set Interval

            value = value + this._interval.step

            this.proxy(value) // update _input value through proxy

        }, this._interval.duration)
   
    }

    stopInterval(){

        this._interval.isRunning = false // update isRunning boolean
        this._button.innerHTML = `Start` // update button text
        clearInterval(this._interval.handler) // clear Interval

    }

    init(){

        this.output(this._input.value) // update _output by default
        this.inputEvent(this._input) // initialize 'input' event listener
        this.onClick(this._button)  //  initialize 'click' event listener
        return true
    }
}

const resizer = new Resizer().init()
