function encodeAndDecodeMessages() {
    let textAreas = document.querySelectorAll('textarea');
    let btns = document.querySelectorAll('buttons');

    let fields = {
        first: {
            text: textAreas[0],
            btn: btns[0],
            func: (i)=>String.fromCharCode(i.charCodeAt(0) + 1)
        },
        second: {
            text: textAreas[1],
            btn: btns[1],
            func: (i)=>String.fromCharCode(i.charCodeAt(0) - 1)
        }
    }

    document.querySelector('#main').addEventListener('click', (ev) => {

        if (ev.target.tagName !== "BUTTON") {
            return;
        }

        const type = ev.target.textContent.includes('Encode') ? 'first' : 'second';
        let message = fields[type].text.value
        .split('').map(fields[type].func).join('');


        fields.first.text.value="";
        fields.second.text.value = message; 



    })




    console.log(textAreas);



}