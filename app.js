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
            this._output = document.querySelector('#resizer-controls output')
            this._input = document.querySelector('#resizer-controls input[type="range"]')
            this._inputConfig = {
                min: 30,
                max: 100,
                value: 70,
                step: 1
            }
            this._button = document.querySelector('#resizer-controls button')
            /**
            * Proxy instanciation 
            */
            this._proxy = new Proxy(this._input, {

                set: (target, prop, value) => {

                    if (prop = 'valueAsNumber') {
                        
                        target[prop] = value // update proxy target
        
                        this.output(value) // update _output
                    }

                    // console.log(`value: ${value}`) // #DEBUG

                    return true
                }
            })
            /**
            * Timer interval 
            */
            this._interval = {
                handler: undefined,
                isRunning: false,
                duration: 35 // ms
            }
        }

        output(value){this._output.innerHTML = `${value}%`}

        proxy(value){this._proxy.valueAsNumber = value} // update _input value definition

        setRangeMinMax(min = this._inputConfig.min, max = this._inputConfig.max){ // default values => see this._inputConfig Object in constructor

            if(min < 0 || min > 100){
                throw ': min value must stay between 0 and 100'
            } else if (max < 0 || max > 100){
                throw ': max value must stay between 0 and 100'         
            } else {
                this._input.min = min
                this._input.max = max
            }
            return this
        }

        setRangeDefaultValue(value =  this._inputConfig.value ){ // default value => see this._inputConfig Object in constructor

            if (value < 0 || value > 100) {
                throw ': value must stay between 0 and 100'  
            } else {
                this.proxy(value)
            }

            return this
        }

        setSpeed(speed = this._interval.duration){ // default speed => see this._interval Object in constructor
            this._interval.duration = speed
            return true
        }

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
            const min = this._input.min
            const max = this._input.max
            this._interval.handler = setInterval(() => { // set Interval

                /**
                 * increment the _input value until it reaches its max limit
                 * then decrement the value until the min limit is reached and so on
                 */
                if ( value == max || value == min ){
            
                    this._inputConfig.step = -this._inputConfig.step
                    
                }

                if (value + this._inputConfig.step > max || value + this._inputConfig.step < min) {

                    this._inputConfig.step = -this._inputConfig.step     
                }

                value = value + this._inputConfig.step

                this.proxy(value) // update _input value through proxy

            }, this._interval.duration)
    
        }

        stopInterval(){

            this._interval.isRunning = false // update isRunning boolean
            this._button.innerHTML = `Start` // update button text
            clearInterval(this._interval.handler) // clear Interval
        }

        init(){

            this.setSpeed() // initialize resizer instances interval speed => default: 35 ms
            this.setRangeMinMax() // initialize _input min & _input max value => default: min 30 max 100
            this.setRangeDefaultValue() // initialize _input default value => default: 70
            this.output(this._input.value) // update _output by default
            this.inputEvent(this._input) // initialize 'input' event listener
            this.onClick(this._button)  //  initialize 'click' event listener
            return this
        }
    }

    const resizer = new Resizer()
    resizer.init()
    // resizer.init().setRangeMinMax(0, 100).setRangeDefaultValue(10).setSpeed(35)