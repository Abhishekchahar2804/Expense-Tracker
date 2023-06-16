const button = document.getElementById('btn');

button.addEventListener('click',forgetPassword);

async function forgetPassword(e){
    e.preventDefault();
    const email = document.getElementById('email').value;
    try{
        const response =await axios.post("htpp://localhost:3000/password/forgetpassword",{email:email});
        console.log(response.data.message);
    }
    catch(err){
        console.log(err);
    }
}