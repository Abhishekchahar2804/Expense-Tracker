const button = document.getElementById('btn');

button.addEventListener('click',forgetPassword);

async function forgetPassword(e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    console.log(email);
    const obj={
        email:email
    }
    try{
        const response =await axios.post("http://localhost:3000/password/forgetpassword",obj);
        console.log(response.data.message);
    }
    catch(err){
        console.log(err);
    }
}