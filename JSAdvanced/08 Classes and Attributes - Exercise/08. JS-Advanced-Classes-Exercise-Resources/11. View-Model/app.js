class Textbox {

    constructor(selector, regex) {
        this.selector=selector;
        this._elements = this.getElements(selector);
        this._invalidSymbols = regex;
        let that = this;
        $(this.selector).on('input', function () {
            that.value = this.value;
        });
    }

    getElements(selector) {
        let el = Array.from(document.querySelectorAll(selector));
        el.forEach(x => x.addEventListener('input', (ev) => {
            this.value = ev.target.value;
        }));
        return el;
    }

    get elements() {
        return this._elements;
    }

    get value() {
        if(!this._value){
            this._value="";
        }

        this.elements.forEach(x => {
            if (x.value) {
                this._value = x.value;
            }
        });

        this.elements.forEach(x => x.value = this._value)

        return this._value;
    }

    set value(param) {
        this._value = param;
        this.elements.forEach(x => x.value = param);
    }
    isValid() {
        return this.value.match(this._invalidSymbols) == null;
    }
}
let textbox = new Textbox(".textbox", /[^a-zA-Z0-9]/);
let inputs = $('.textbox');

inputs.on('input', function () { console.log(textbox.value); });



