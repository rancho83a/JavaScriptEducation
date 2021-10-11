function extractText() {
    const liElements = [...document.getElementsByTagName('li')];
    const text = liElements.map(t=>t.textContent);
    console.log(text);
    return document.getElementById('result').value = text.join('\n');
}
extractText();
