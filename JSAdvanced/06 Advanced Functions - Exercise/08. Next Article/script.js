function getArticleGenerator(articles) {



    let div = document.getElementById('content');

    function show() {

        if (articles.length > 0) {
            let art = document.createElement('article');
            art.textContent = articles.shift();
            div.appendChild(art);
        }
    }

    return show;


}
