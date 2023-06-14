const itemList = document.getElementById('details');

// const form = document.getElementById('my-form');

const adddata = document.querySelector('.adddata');

adddata.addEventListener('click',addItem);

async function addItem(e){
    e.preventDefault();

    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    console.log(amount, description, category);

    const obj={
        amount:amount,
        description:description,
        category:category
    }
    try{
        let response = await axios.post('http://localhost:3000/expense/add-expense',obj);
        console.log(response);
        showOnScreen(response.data.newexpense);
    }
    catch(err){
        console.log(err);
    }
 
}

window.addEventListener('DOMContentLoaded',async()=>{
    try{
        let token = localStorage.getItem('token');
        let response = await axios.get('http://localhost:3000/expense/expenses/load-data',{headers:{"Authorization":token}});
        for(let i=0;i<response.data.allData.length;i++){
            showOnScreen(response.data.allData[i]);
        }
    }
    catch(err){
        console.log(err);
    }
})

function showOnScreen(obj){
    let newItem = document.createElement('li');
    newItem.className='item';
    newItem.appendChild(document.createTextNode(obj.amount+" "+obj.description+" "+obj.category));

    let deleteBtn = document.createElement('button');
    deleteBtn.className='delete'
    deleteBtn.appendChild(document.createTextNode('Delete Expanse'));
    newItem.appendChild(deleteBtn);

    deleteBtn.onclick=async (e)=>{
        let li = e.target.parentElement;
        let id = obj.id;
        await axios.delete('http://localhost:3000/expense/delete-expense/'+id);
        itemList.removeChild(li);

    }

    // let editBtn = document.createElement('button');
    // editBtn.className='edit'
    // editBtn.appendChild(document.createTextNode('Edit Expanse'));
    // newItem.appendChild(editBtn);

    // editBtn.onclick=async (e)=>{
    //     let li = e.target.parentElement;
    //     document.getElementById('amount').value=obj.amount;
    //     document.getElementById('description').value=obj.description;
    //     document.getElementById('category').value=obj.category;
    //     let id = obj.id;
    //     await axios.delete('http://localhost:3000/delete-expense/'+id);
    //     itemList.removeChild(li);
    // }
    
    itemList.appendChild(newItem);
}