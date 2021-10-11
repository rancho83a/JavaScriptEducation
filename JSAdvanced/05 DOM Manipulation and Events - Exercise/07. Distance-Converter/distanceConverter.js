function attachEventsListeners() {
    document.getElementById('convert').addEventListener('click', convert);

    from = {
        km: x => x *= 1000,
        m: x => x,
        cm: x => x /= 100,
        mm: x => x /= 1000,
        mi: x => x *= 1609.34,
        yrd: x => x *= 0.9144,
        ft: x => x *= 0.3048,
        in: x => x *= 0.0254
    }
    to = {
        km: x => x /= 1000,
        m: x => x,
        cm: x => x *= 100,
        mm: x => x *= 1000,
        mi: x => x /= 1609.34,
        yrd: x => x /= 0.9144,
        ft: x => x /= 0.3048,
        in: x => x /= 0.0254
    }

    function convert() {
        let inputDist = Number(document.getElementById('inputDistance').value);
        let unitFrom = document.getElementById('inputUnits').value;
        let meterDist = from[unitFrom](inputDist);

        let unitTo = document.getElementById('outputUnits').value;
        document.getElementById('outputDistance').value = to[unitTo](meterDist);
    }
}