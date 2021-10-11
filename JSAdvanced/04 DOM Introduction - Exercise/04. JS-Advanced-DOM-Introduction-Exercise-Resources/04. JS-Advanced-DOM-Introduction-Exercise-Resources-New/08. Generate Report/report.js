function generateReport() {
    count=0;
    let head = document.querySelectorAll('th');

    let properties = []
    let indexProp=[];


    for(let i=0; i<head.length;i++){
        let inputField = head[i].firstElementChild;
         if(inputField.checked){
            properties.push(inputField.getAttribute('name'));
            indexProp.push(i);
        }       
    }
let resArr=[]
    let rows = document.querySelectorAll('tbody>tr');
    for(row of rows){
        let cell = row.children;
        let obj = {};
        for(i=0; i<properties.length;i++){
            obj[properties[i]]=cell[indexProp[i]].textContent;
        }
        resArr.push(obj);
    }
    document.getElementById('output').value=JSON.stringify(resArr);
}