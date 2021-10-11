function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      let rows = document.querySelectorAll('tbody>tr');
      let wordSearch = document.querySelector('#searchField').value;
            for( row of rows){
            
            if(row.textContent.includes( wordSearch)&& wordSearch!==''){
              // row.style.select = ;
              row.setAttribute('class','select');
            } else {
               row.removeAttribute('class');
            }
         }
        
      }


   }