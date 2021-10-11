function extract(content) {
    let text = document.getElementById(content).textContent;
    const regex = /\((.+?)\)/gm

    let match = regex.exec(text);
    let res =[];
    while (match != null) {
        res.push(match[1]);
        match = regex.exec(text);
    }
    return res.join("; ")
}