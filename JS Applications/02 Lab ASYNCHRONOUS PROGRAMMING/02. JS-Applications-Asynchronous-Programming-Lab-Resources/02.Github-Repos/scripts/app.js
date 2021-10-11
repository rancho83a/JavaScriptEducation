function loadRepos() {
	let username = document.getElementById('username').value;
	const url = `https://api.github.com/users/${username}/repos`;


	fetch(url)
		.then(responce => {
			if(responce.status == 404){
				console.log(responce);
				throw new Error('Data not found');
			}
			responce.json();
		})
		.then(data => {
			console.log(data);

			// let ul = document.getElementById('repos');
			// ul.innerHTML = '';
			// data.forEach(element => {
			// 	const li = document.createElement('li');
			// 	const a = document.createElement('a');
			// 	a.appendChild(document.createTextNode(`${element.full_name}`))
			// 	a.href=`${element.html_url}`;
			// 	li.appendChild(a);
			// 	ul.appendChild(li);
			// });
		})
		.catch(error=>{
			console.log('promise rejected');
			console.log(error);
		});
		console.log('after ')

}