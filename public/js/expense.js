const itemList = document.getElementById("details");

// const form = document.getElementById('my-form');
const boardList = document.getElementById("boards");

const adddata = document.querySelector(".adddata");
const leaderboard = document.getElementById("leaderboard");

const rzp = document.querySelector(".rzp");

adddata.addEventListener("click", addItem);
rzp.addEventListener("click", BuyPremium);
leaderboard.addEventListener("click", premiumFeature);

async function addItem(e) {
  e.preventDefault();

  const amount = document.getElementById("amount").value;
  const description = document.getElementById("description").value;
  const category = document.getElementById("category").value;
  console.log(amount, description, category);

  const obj = {
    amount: amount,
    description: description,
    category: category,
  };
  try {
    let token = localStorage.getItem("token");
    let response = await axios.post(
      "http://localhost:3000/expense/add-expense",
      obj,
      { headers: { Authorization: token } }
    );
    console.log(response);
    showOnScreen(response.data.newexpense);
  } catch (err) {
    console.log(err);
  }
}

async function BuyPremium(e) {
  e.preventDefault();
  try {
    let token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3000/purchase/premiummembership",
      { headers: { Authorization: token } }
    );

    const options = {
      key: response.data.key_id,
      order_id: response.data.order.id,
      handler: async function (result) {
        const res = await axios.post(
          "http://localhost:3000/purchase/updatestatus",
          {
            order_id: options.order_id,
            payment_id: result.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        );
        alert("you are premium member");

        document.querySelector(".rzp").style.visibility = "hidden";
        document.querySelector("#msg").textContent = "You Are Premium User";
        document.getElementById("leaderboard").textContent = "Show Leaderboard";
        document.getElementById("downloadexpense").textContent =
          "Download File";
        localStorage.setItem("token", res.data.token);
      },
    };

    const rzpl = new Razorpay(options);

    rzpl.open();
    rzpl.on("payment.failed", async function (res) {
      await axios.post(
        "http://localhost:3000/purchase/updatefailure",
        {
          order_id: response.data.order.id,
        },
        { headers: { Authorization: token } }
      );
      alert("something went wrong");
    });
  } catch (err) {
    console.log(err);
  }
}

async function premiumFeature(e) {
  e.preventDefault();
  try {
    let token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:3000/premium/leaderboard",
      {
        headers: { Authorization: token },
      }
    );
    document.getElementById("boards").innerHTML = "<h2>Leader Board</h2>";
    console.log(response);
    response.data.forEach((details) => {
      let newItem = document.createElement("li");
      newItem.appendChild(
        document.createTextNode(
          `name - ${details.name} Total_Amount - ${details.total_cost}`
        )
      );
      boardList.appendChild(newItem);
    });
  } catch (err) {
    console.log(err);
  }
}

async function download() {
  let token = localStorage.getItem("token");
  try {
    const response = await axios.get("http://localhost:3000/user/download", {
      headers: { Authorization: token },
    });

    var a = document.createElement("a");
    a.href = response.data.fileUrl;
    a.download = "myexpense.csv";
    a.click();
  } catch (err) {
    console.log(err);
  }
}

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

window.addEventListener("DOMContentLoaded", async () => {
  try {
    let token = localStorage.getItem("token");
    const decode = parseJwt(token);
    console.log(decode);
    const isAdmin = decode.ispremuimuser;
    if (isAdmin == true) {
      document.querySelector(".rzp").style.visibility = "hidden";
      document.querySelector("#msg").textContent = "You Are Premium User";
      document.getElementById("leaderboard").textContent = "Show Leaderboard";
      document.getElementById("downloadexpense").textContent = "Download File";
    }
    const page = 1;
    let response = await axios.get(
      `http://localhost:3000/expense/expenses/load-data?page=${page}`,
      { headers: { Authorization: token } }
    );
    //console.log(response);
    for (let i = 0; i < response.data.expenses.length; i++) {
      showOnScreen(response.data.expenses[i]);
    }
    showPagination(response.data);
  } catch (err) {
    console.log(err);
  }
});

function showPagination({currentPage,hasNextPage,nextPage,hasPreviousPage,previousPage}){

  const pagination=document.getElementById('pagination');

  if(hasPreviousPage){
    const prevBtn=document.createElement('button');
    prevBtn.innerHTML=previousPage;
    prevBtn.addEventListener('click' , ()=>{

      getProducts(previousPage);
    });
    pagination.appendChild(prevBtn);
   }

  const crtBtn=document.createElement('button');
  crtBtn.innerHTML=currentPage;
  crtBtn.addEventListener('click',()=>{
    getProducts(currentPage);
  });
  pagination.appendChild(crtBtn);
  if(hasNextPage){
    const nextBtn=document.createElement('button');
    nextBtn.innerHTML=nextPage;
    nextBtn.addEventListener('click',()=>{
      getProducts(nextPage);
    });
    pagination.appendChild(nextBtn);
   }
}

async function getProducts(page) {
  const token = localStorage.getItem('token');
  let response = await axios.get(
    `http://localhost:3000/expense/expenses/load-data?page=${page}`,
    { headers: { Authorization: token } }
  );
  console.log(response.data.expenses);
  const ul=document.getElementById('details');
  console.log(ul);
  const listItems = document.querySelectorAll('#details li');

// 👇️ NodeList(5) [li, li, li, li, li]
console.log(listItems);

listItems.forEach(listItem => {
  listItem.parentNode.removeChild(listItem);
});

  console.log(ul);
  const pagination=document.getElementById('pagination');
  pagination.innerHTML='';
  for (let i = 0; i < response.data.expenses.length; i++) {
    showOnScreen(response.data.expenses[i]);
  }
  showPagination(response.data);
}

function showOnScreen(obj) {
  let newItem = document.createElement("li");
  newItem.className = "item";
  newItem.appendChild(
    document.createTextNode(
      obj.amount + " " + obj.description + " " + obj.category
    )
  );

  let deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.appendChild(document.createTextNode("Delete Expanse"));
  newItem.appendChild(deleteBtn);

  deleteBtn.onclick = async (e) => {
    let li = e.target.parentElement;
    let id = obj.id;
    await axios.delete("http://localhost:3000/expense/delete-expense/" + id);
    itemList.removeChild(li);
  };

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
