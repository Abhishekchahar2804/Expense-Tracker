const login = document.querySelector('.login');

login.addEventListener('click',AlreadyUser);

async function AlreadyUser(e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
}