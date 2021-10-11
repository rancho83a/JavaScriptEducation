function search() {
   let towns = document.getElementsByTagName('li');
   let serchSymbols = document.getElementById('searchText').value;
   let count = 0;
   for( t of towns) {
      if (t.textContent.includes(serchSymbols) && serchSymbols!='') {
         count++;
         t.style.textDecoration = "underline";
        t.style.fontWeight= "bold";
      } else {
         t.style.textDecoration = "";
         t.style.fontWeight= "";
      }
   };
   document.getElementById('result').textContent = `${count} matches found`;
}
