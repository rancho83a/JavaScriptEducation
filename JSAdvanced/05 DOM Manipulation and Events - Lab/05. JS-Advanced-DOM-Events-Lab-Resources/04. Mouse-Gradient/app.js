function attachGradientEvents() {
    let box = document.querySelector('#gradient');
    box.addEventListener('mousemove', showPercent);
    box.addEventListener('mouseout', noShowRes);

    function showPercent(ev) {
        let x = Math.trunc(ev.offsetX / (ev.target.clientWidth - 1) * 100);
        document.querySelector('#result').textContent = `${x}%`
    }
    function noShowRes(ev) {
        document.querySelector('#result').textContent = "";

    }

}