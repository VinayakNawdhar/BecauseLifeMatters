const user_name= document.getElementById("Name").value;
const email= document.getElementById("email").value;
const address= document.getElementById("address").value;
const state= document.getElementById("country-state").value;
const Ph_no= document.getElementById("number").value;


const button = document.querySelector(".bouton-contact");
button.addEventListener("click",function(e){
    e.preventDefault();
    console.log(user_name,email,address,state,Ph_no)

})

