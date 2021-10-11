document.querySelector('ul').addEventListener('click', onclick);

function onclick(ev){
    ev.target.remove();
}



btn = document.querySelector('button');
myObj = {
    count: 0,
    increment() {
        this.count++;
        btn.textContent=this.count;
    }
}



btn.addEventListener('click', myObj.increment);

