/* =========================================
   LOAD LISTINGS (Sample + MongoDB)
========================================= */

async function loadListings(){

let box = document.getElementById("cards");
if(!box) return;

box.innerHTML = "";

/* Sample listings from data.js */
let listings = sampleListings || [];

/* Fetch listings from MongoDB */
try{

let res = await fetch("/api/listings");
let dbListings = await res.json();

/* Combine both */
listings = listings.concat(dbListings);

}catch(err){
console.log("Database listings not loaded");
}

/* store globally for other functions */
window.allListings = listings;

/* get wishlist */
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/* show cards */
listings.forEach((item,index)=>{

let isFav = wishlist.find(p => p.title === item.title);
let heartIcon = isFav ? "❤️" : "♡";

box.innerHTML += `

<div class="card">

<span class="heart" onclick="toggleHeart(this,${index})">${heartIcon}</span>

<img src="${item.image}">
<h3>${item.title}</h3>
<p>${item.location}</p>
<p>₹${item.price}/night</p>

<button onclick="viewDetails(${index})">View</button>

</div>

`;

});

}



/* =========================================
   SEARCH FUNCTION
========================================= */

function searchHome(){

let input = document.getElementById("search").value.toLowerCase();
let cards = document.querySelectorAll("#cards .card");
let found = false;

cards.forEach(card => {

let title = card.querySelector("h3").innerText.toLowerCase();
let location = card.querySelector("p").innerText.toLowerCase();

if(title.includes(input) || location.includes(input)){
card.style.display = "inline-block";
found = true;
}else{
card.style.display = "none";
}

});

let msg = document.getElementById("noResult");

if(msg){
msg.style.display = found ? "none" : "block";
}

}



/* =========================================
   VIEW PROPERTY DETAILS
========================================= */

function viewDetails(index){

let listings = window.allListings;

let selected = listings[index];

localStorage.setItem("selected", JSON.stringify(selected));
localStorage.setItem("selectedIndex", index); 

/* save id only if MongoDB listing */
if(selected._id){
  localStorage.setItem("selectedId", selected._id);
}else{
  localStorage.removeItem("selectedId");
}

window.location.href = "details.html";

}


/* =========================================
   LOGIN SYSTEM
========================================= */

async function login(){

let username = document.getElementById("username").value.trim();
let password = document.getElementById("password").value.trim();

if(username === "" || password === ""){
alert("Please fill all fields");
return;
}

const response = await fetch("/api/login",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body: JSON.stringify({
username,
password
})
});

const data = await response.json();

alert(data.message);

if(data.message === "Login successful"){

localStorage.setItem("user","loggedin");

window.location.href = "index.html";

}

}



/* =========================================
   BOOKING FUNCTION
========================================= */

async function confirmBooking(){

   let user = localStorage.getItem("user");

if(!user){
alert("Please login first to book a property");
window.location.href = "login.html";
return;
}

let name = document.getElementById("name").value.trim();
let email = document.getElementById("email").value.trim();
let phone = document.getElementById("phone").value.trim();
let checkIn = document.getElementById("in").value;
let checkOut = document.getElementById("out").value;
console.log(name, email, phone, checkIn, checkOut);

/* empty check */

if(name==="" || email==="" || phone==="" || checkIn==="" || checkOut===""){
alert("Please fill all fields");
return;
}

/* name validation */

let namePattern = /^[A-Za-z ]+$/;
if(!namePattern.test(name)){
alert("Enter valid name (letters only)");
return;
}

/* email validation */

let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
if(!emailPattern.test(email)){
alert("Enter valid email address");
return;
}

/* phone validation */

let phonePattern = /^[0-9]{10}$/;
if(!phonePattern.test(phone)){
alert("Enter valid 10 digit mobile number");
return;
}

/* date validation */

if(checkOut <= checkIn){
alert("Check-out date must be after Check-in date");
return;
}


/* send booking to backend */

const response = await fetch("/api/book",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
name,
email,
phone,
checkIn,
checkOut
})

});

const data = await response.json();

alert("✅ Booking Confirmed!\n\nThank you for booking with us!");

window.location.href = "index.html";

}



/* =========================================
   WISHLIST / HEART TOGGLE
========================================= */

function toggleHeart(el,index){

let listings = window.allListings;

let selected = listings[index];

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

/* check if already favourite */

let existIndex = wishlist.findIndex(item => item.title === selected.title);

if(existIndex !== -1){

wishlist.splice(existIndex,1);

localStorage.setItem("wishlist", JSON.stringify(wishlist));

el.innerText = "♡";

alert("Removed from favourites");

}else{

wishlist.push(selected);

localStorage.setItem("wishlist", JSON.stringify(wishlist));

el.innerText = "❤️";

alert("Added to favourites ❤️");

}

}



/* =========================================
   DELETE PROPERTY
========================================= */

async function removeListing(index){

let confirmDelete = confirm("Are you sure you want to delete this property?");
if(!confirmDelete) return;

let listings = window.allListings;

let selected = listings[index];

/* if listing is from MongoDB */

if(selected._id){

await fetch("/api/listings/"+selected._id,{
method:"DELETE"
});

alert("Property deleted from database");

}

/* if listing is sample */

else{

let local = JSON.parse(localStorage.getItem("listings")) || sampleListings;

local.splice(index,1);

localStorage.setItem("listings", JSON.stringify(local));

alert("Property removed");

}

loadListings();

}



/* =========================================
   LOGIN / LOGOUT UI CONTROL
========================================= */

function checkLogin(){

let user = localStorage.getItem("user");

let loginBtn = document.getElementById("loginBtn");
let logoutBtn = document.getElementById("logoutBtn");
let addBtn = document.getElementById("addBtn");

/* stop if elements not present */

if(!loginBtn || !logoutBtn){
return;
}

if(user){

loginBtn.style.display = "none";
logoutBtn.style.display = "inline-block";

if(addBtn){
addBtn.style.display = "inline-block";
}

}else{

loginBtn.style.display = "inline-block";
logoutBtn.style.display = "none";

if(addBtn){
addBtn.style.display = "none";
}

}

}

function logout(){

localStorage.removeItem("user");

alert("Logged out successfully");

window.location.href = "login.html";

}



/* =========================================
   REMOVE PROPERTY FROM DETAILS PAGE
========================================= */

function removeFromDetails(){

let index = parseInt(localStorage.getItem("selectedIndex"));

removeListing(index);

window.location.href = "index.html";

}



/* =========================================
   SIGNUP FUNCTION
========================================= */

async function signup(){

const username = document.getElementById("username").value;
const email = document.getElementById("signupEmail").value;
const password = document.getElementById("signupPassword").value;

const response = await fetch("/api/signup",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({
username,
email,
password
})

});

const data = await response.json();

alert(data.message);

 }

function openModal(type){

let modal = document.getElementById("infoModal");

let title = document.getElementById("modalTitle");
let img = document.getElementById("modalImg");
let text1 = document.getElementById("modalText1");
let text2 = document.getElementById("modalText2");

if(type === "about"){

title.innerText = "About StayEasy";

img.src = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80";

text1.innerText =
"StayEasy is a property booking platform inspired by Airbnb. We help travelers find and book the perfect stays effortlessly.";

text2.innerText =
"Explore amazing properties, save your favorites, and book your next getaway with ease!";

}

if(type === "contact"){

title.innerText = "Contact StayEasy";

img.src = "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80";

text1.innerText =
"If you have any questions or need help with bookings, feel free to contact us.";

text2.innerText =
"Email: support@stayeasy.com | Phone: +91 98765 43210 | Location: Vasai, India";

}

if(type === "privacy"){

title.innerText = "Privacy Policy";

img.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

text1.innerText =
"We respect your privacy and protect your personal data.";

text2.innerText =
"StayEasy never shares your information with third parties without your permission.";

}

if(type === "terms"){

title.innerText = "Terms & Conditions";

img.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

text1.innerText =
"By using StayEasy, you agree to our terms and conditions.";

text2.innerText =
"Users must provide accurate information and follow our booking guidelines.";

}

document.getElementById("infoModal").style.display = "flex";

setTimeout(()=>{
  modal.classList.add("show");
},10);

}

function closeModal(){

let modal = document.getElementById("infoModal");

modal.classList.remove("show");

setTimeout(()=>{
  modal.style.display = "none";
},300);

}



/* =========================================
   PAGE LOAD FUNCTIONS
========================================= */

document.addEventListener("DOMContentLoaded", function(){

/* only load listings if cards container exists */

let cards = document.getElementById("cards");

if(cards){
loadListings();
}

checkLogin();

/* refresh listings if wishlist changed */

if(localStorage.getItem("wishlistChanged")){
if(cards){
loadListings();
}
localStorage.removeItem("wishlistChanged");
}

});