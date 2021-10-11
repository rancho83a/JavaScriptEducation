function loadCommits() {
    const username = document.getElementById('username').value;
    const repo = document.getElementById('repo').value;

    const url = `https://api.github.com/repos/${username}/${repo}/commits`
    const ul = document.getElementById('commits');
    ul.innerHTML = '';
    
        fetch(url)
            .then(responce => {
                console.log(responce);
                if (!responce.ok) {
                    throw new Error(`Error: ${responce.status} (${responce.statusText})`);
                }
                return responce.json()
            })
            .then(data => {

                data.forEach(c => {
                    let li = document.createElement('li');
                    li.textContent = `${c.commit.author.name}: ${c.commit.message}`;
                    ul.appendChild(li);
                });
            })
     .catch (err=> {
        let li = document.createElement('li');
        li.textContent = err.message;
        ul.appendChild(li);

    });
}