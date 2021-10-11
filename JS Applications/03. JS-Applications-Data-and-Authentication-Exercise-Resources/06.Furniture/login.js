function solve() {
  document.getElementById('loginForm').addEventListener('submit', login)
    document.getElementById('registerForm').addEventListener('submit', register)

}
solve();

async function register(ev) {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const email = formData.get('email');
  const password = formData.get('password');
  const rePass = formData.get('rePass');
  
  if (email == "" || password == "") {
      return alert('All fields required')
  }
  if (password !== rePass) {
      return alert('Don`t match')
  }

  const url = 'http://localhost:3030/users/register';
  const res = await request(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
  });
  sessionStorage.setItem('userToken',res.accessToken);
  sessionStorage.setItem('_ownerId',res._id);
  window.location.pathname="06.Furniture/homeLogged.html"
}

async function login(ev) {
  ev.preventDefault();
  const formData = new FormData(ev.target);
  const email = formData.get('email');
  const password = formData.get('password');
  const url = 'http://localhost:3030/users/login';
  const res = await request(url, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
  });
  sessionStorage.setItem('userToken',res.accessToken);
  sessionStorage.setItem('_ownerId',res._id);
  window.location.pathname="06.Furniture/homeLogged.html"
}

async function request(url, option) {
  const response = await fetch(url, option);
  if (response.status == 404) {
    return [];
}
  if (!response.ok) {
      const err = await response.json();
      alert(err.message);
      throw new Error(err.message);
  }
  return await response.json();
}
