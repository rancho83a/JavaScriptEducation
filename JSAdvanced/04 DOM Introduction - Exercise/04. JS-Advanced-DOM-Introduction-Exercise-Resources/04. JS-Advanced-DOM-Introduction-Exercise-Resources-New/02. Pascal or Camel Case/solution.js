function solve() {

  let text = document.querySelector('#text').value.toLowerCase();
  let convention = document.querySelector('#naming-convention').value;
  let arr = []

  let res = 'Error!';
  arr = text.split(" ");
  if (convention === 'Camel Case') {
    arr = arr.map((x, index) => {
      if (index == 0) {
        return x;
      } else {
        return x.charAt(0).toUpperCase() + x.slice(1)
      }
    });
    res = arr.join('');

  }
  
  if (convention === 'Pascal Case') {
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    res = arr.join('');
  } 

  document.getElementById('result').textContent = res;

}