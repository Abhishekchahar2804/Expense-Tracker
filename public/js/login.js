const login = document.querySelector(".login");

login.addEventListener("click", AleradyUser);

async function AleradyUser(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const obj = {
    email: email,
    password: password,
  };
  // console.log(obj);
  try {
    const response = await axios.post(
      "http://localhost:3000/user/login/login-user",
      obj
    );
    alert(response.data.message);
    localStorage.setItem('token',response.data.token);
    console.log(response.data.token);
        window.location.href="/expense/";
  } catch (err) {
    console.log(err);
    document.getElementById("err").innerText = err.response.data.message;
  }
}