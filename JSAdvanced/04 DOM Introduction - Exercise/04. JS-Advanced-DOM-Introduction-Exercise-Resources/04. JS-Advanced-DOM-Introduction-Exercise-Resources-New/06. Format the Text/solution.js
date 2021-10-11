function solve() {
  let text = document.getElementById('input')
  let output = document.getElementById('output');

  text.value.split(/[.!?]/g).filter(x => x)
    .reduce((acc, sentence, index) => {
      if (index % 3 == 0) {
        acc.push([sentence + "."])
      } else {
        acc[acc.length - 1].push(sentence + ".");
      }
      return acc;
    }, [])
    .forEach(p => {
      let parHTML = document.createElement('p');
      parHTML.textContent = p.join('');
      output.appendChild(parHTML);
    });
}