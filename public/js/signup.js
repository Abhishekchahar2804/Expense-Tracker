const sign = document.querySelector('.sign');

sign.addEventListener('click',AddUser)

async function AddUser(e){
    e.preventDefault();
    const name=document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if(name=="" || email=="" || password==""){
        window.alert("please enter all fields");
    } 

    const obj={
        name:name,
        email:email,
        password:password,
        totalamount:0
    }

    try{
        const response = await axios.post('http://localhost:3000/user/sign-up',obj);
        console.log(response.data.newSignUp);
    }
    catch(err){
        console.log(err);
    }
}