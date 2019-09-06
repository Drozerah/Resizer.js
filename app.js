(() => {

    console.log('JS is loaded!')
    // put your code below
    
})()

class Resizer {

    constructor(){

        this._input = document.querySelector('input[type="range"]')

    }

    init(){
        console.log(this._input)
        return true
    }
}

const resizer = new Resizer().init()
