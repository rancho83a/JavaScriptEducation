function create(words) {

   let parent  = document.querySelector('#content');
   words.forEach(w => {
      addSection(w);
   });

   function addSection(content){
      let pEl = createEl('p', content);
      pEl.style.display = 'none';
      
      let divEl = createEl('div', pEl);
   
     parent.appendChild(divEl);
      divEl.addEventListener('click', () => {
         pEl.style.display = "";
      });
      return divEl;
   }
  

   function createEl(type,content){
      let result = document.createElement(type);
      if(typeof(content)=='string'){
      result.textContent=content;
      } else {
         result.appendChild(content);
      }
      return result;
   }

}