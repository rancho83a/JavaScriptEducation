function solve(input) {
    let arrObj = JSON.parse(input);

    let outputArr = ['<table>'];

    outputArr.push(makeKeyRow(arrObj));
    arrObj.forEach(el => outputArr.push(makeTableRow(el)));

    outputArr.push('</table>');

    return outputArr.join('\n');

    function makeKeyRow(receivedObj) {
        let row = '   <tr>';
        row += Object.keys(receivedObj[0]).map((pr) => `<th>${pr}</th>`).join('');
        row += '</tr>';
        return row;
    }

    function makeTableRow(receivedObj) {
        let row = '   <tr>';
        row += Object.values(receivedObj).map(v => escapeHtml(v)).map(v => `<td>${v}</td>`).join('');
        row += '</tr>';
        return row;
    }
    function escapeHtml(out) {
        if (typeof (out) === 'string') {
            out = out.replace(/&/gi, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;');
        }
        return out;

    }
}

console.log(solve('[{"Name":"Tomatoes & Chips","Price":2.35},{"Name":"J&B Chocolate","Price":0.96}]'));