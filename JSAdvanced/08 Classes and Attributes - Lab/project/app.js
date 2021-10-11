class Modal {
    constructor(message, parent) {
        this.message = message;
        this.element = this._initialize();
        this.render(parent);
    }
    _initialize() {
        const container = createDOMElement('div', createDOMElement('p', this.message), button('Ok', this.onclose.bind(this)));
        container.classList.add('modal');
        return container;
    }
    onclose() {
        this.element.remove();
    }
    render(parent) {
        parent.appendChild(this.element);
    }
}
document.querySelector('#createBtn').addEventListener('click', () => {
    const main = document.querySelector('main');
    new Modal('It work', main);
});

function button(label, callback) {
    const button = createDOMElement('button', label);
    button.addEventListener('click', callback);
    return button;

}
function createDOMElement(type, ...content) {
    const result = document.createElement(type);

    content.forEach(param => {
        if (typeof param == 'string') {
            const node = document.createTextNode(param);
            result.appendChild(node);
            //  result.textContent=param;
        } else {
            result.appendChild(param);
        }
    })
    return result;
}