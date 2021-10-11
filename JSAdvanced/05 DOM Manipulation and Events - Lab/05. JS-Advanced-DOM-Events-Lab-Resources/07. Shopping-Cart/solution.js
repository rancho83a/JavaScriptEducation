function solve() {
   let mainDiv = document.getElementsByClassName('shopping-cart')[0];
      mainDiv.addEventListener('click', onclick);
   let sum = 0;
   let boughtProducts = []

   function onclick(ev) {
      if (ev.target.className == 'add-product') {
        // let price = Number(ev.target.parentNode.parentNode.children[3].textContent);
         let price = Number(ev.target.parentNode.parentNode.querySelector('div.product-line-price').textContent);
         sum += price;
        // let title = ev.target.parentNode.parentNode.children[1].children[0].textContent;
         let title = ev.target.parentNode.parentNode.querySelector('div.product-title').textContent;
        if(!boughtProducts.includes(title)){
         boughtProducts.push(title);
        }
         document.querySelector('textarea').value += `Added ${title} for ${price.toFixed(2)} to the cart.\n`;
      } else if  (ev.target.className == 'checkout' ) {
         document.querySelector('textarea').value += `You bought ${boughtProducts.join(', ')} for ${sum.toFixed(2)}.`;
        mainDiv.removeEventListener('click', onclick);
      }
   }
}