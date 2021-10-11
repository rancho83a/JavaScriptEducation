function deleteByEmail() {
let input = document.querySelector('label > input').value;

let rows = document.querySelectorAll('tbody tr');
let output = 'Not found.';
for(let row of rows){
    if(row.textContent.includes(input) && row.textContent!=''){
        row.remove();
        output='Deleted.'
    }
} 



    console.log(document.getElementById('result').textContent=output);
}