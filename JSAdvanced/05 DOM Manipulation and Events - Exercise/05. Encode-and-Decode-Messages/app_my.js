function encodeAndDecodeMessages() {

    let sendDiv = document.querySelectorAll('main div')[0];
    let receiveDiv = document.querySelectorAll('main div')[1];

    sendDiv.lastElementChild.addEventListener('click', onclick);
    receiveDiv.lastElementChild.addEventListener('click', receive);

    function onclick(ev) {
        let text = sendDiv.children[1].value;

        sendDiv.children[1].value = "";
        receiveDiv.children[1].value = encoding(text);

    }

    function receive(ev) {
        let text = ev.target.previousElementSibling.value;
        console.log(ev.target.previousElementSibling);
        textArea.value = decoding(text);

    }

    function encoding(text) {
        return text.split('').map((i) => String.fromCharCode(i.charCodeAt(0) + 1)).join('');
        // return text.split('').reduce((acc, i) => acc + String.fromCharCode(i.charCodeAt(0) + 1), '');
    }

    function decoding(text) {
        //  return text.split('').reduce((acc, i) => acc + String.fromCharCode(i.charCodeAt(0) - 1), '');
        return text.split('').map((i) => String.fromCharCode(i.charCodeAt(0) - 1)).join('');

    }

}