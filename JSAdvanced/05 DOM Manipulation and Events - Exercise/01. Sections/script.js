function create(words) {
   let arr = [...words];

   let globaldiv = document.getElementById('content');
   globaldiv.addEventListener('click', onclick)

   arr.forEach(el=>{
      let div = document.createElement('div')
      globaldiv.appendChild(div);
      let p = document.createElement('p'); 
      p.textContent = el;
      p.style.display='none';      
      div.appendChild(p);
   })

   function onclick(ev){
      ev.target.querySelector('p').style.display="block";
      console.log(ev.target, ev.currentTarget)
   }
}