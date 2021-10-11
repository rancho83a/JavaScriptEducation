function attachEvents() {
    const postsBtn = document.getElementById('btnLoadPosts');
    const btnViewPost = document.getElementById('btnViewPost');
    const select = document.getElementById('posts');
    const ulComment = document.getElementById('post-comments');
    const postsURL = 'http://localhost:3030/jsonstore/blog/posts';
    const commentURL = 'http://localhost:3030/jsonstore/blog/comments/';

    postsBtn.addEventListener('click', getPosts);
    btnViewPost.addEventListener('click', getComments);
    let dataPosts = {};

    async function getPosts() {
        const responce = await fetch(postsURL);
        dataPosts = await responce.json();

        Object.values(dataPosts).forEach(p => {
            let option = document.createElement('option');
            option.value = p.id;
            option.textContent = p.title;
            select.appendChild(option);
        });
    }

    async function getComments() {
        let selectedOption = select.options[select.selectedIndex];
        let idPost = selectedOption.value;
        document.getElementById('post-title').textContent = selectedOption.textContent;
        document.getElementById('post-body').textContent = Object.values(dataPosts).find(p => p.id == idPost).body;
        
        const responce = await fetch(commentURL);
        const data = await responce.json();
        ulComment.innerHTML = '';

        Object.values(data)
            .filter(c => c.postId == idPost)
            .forEach(c => {
                let li = document.createElement('li');
                li.textContent = c.text;
                li.setAttribute('id', c.id)
                ulComment.appendChild(li);
            })
    }
}
attachEvents();