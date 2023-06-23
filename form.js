const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const address = document.getElementById("address").value;
const btn = document.querySelector(".sendBtn");

btn.addEventListener('click',function(e){
    e.preventDefault();
    console.log(name,email,address);
})