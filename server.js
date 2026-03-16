
const Listing = require("./models/Listing");
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const Booking = require("./models/Booking");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

/* MongoDB connection */

mongoose.connect("mongodb://127.0.0.1:27017/stayeasy")
.then(()=> console.log("MongoDB connected"))
.catch(err => console.log(err));

app.get("/insert-sample", async (req,res)=>{

let sampleListings = [

{
  title: "Sea Facing Luxury Apartment",
  location: "Mumbai",
  price: 5200,
  image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc"
},

{
  title: "Modern 2BHK City Flat",
  location: "Pune",
  price: 3800,
  image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb"
},

{
  title: "Premium High-Rise Apartment",
  location: "Delhi",
  price: 6100,
  image: "https://images.unsplash.com/photo-1484154218962-a197022b5858"
},

{
  title: "Minimalist Designer Flat",
  location: "Hyderabad",
  price: 4200,
  image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae"
},

{
  title: "Spacious Family Apartment",
  location: "Goa",
  price: 5500,
  image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688"
},

{
  title: "Luxury Penthouse With Balcony",
  location: "Chennai",
  price: 7200,
  image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4"
},

{
  title: "Budget Friendly Smart Studio",
  location: "Nagpur",
  price: 2400,
  image: "https://images.unsplash.com/photo-1554995207-c18c203602cb"
},

{
  title: "Elegant Apartment Near Beach",
  location: "Kochi",
  price: 4800,
  image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85"
},

{
  title: "Fully Furnished City Apartment",
  location: "Ahmedabad",
  price: 3600,
  image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
},

{
  title: "Stylish Couple Retreat Flat",
  location: "Jaipur",
  price: 3900,
  image: "https://images.unsplash.com/photo-1502005097973-6a7082348e28"
},

{
  title: "Lake View Premium Apartment",
  location: "Udaipur",
  price: 6500,
  image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
},

{
  title: "Executive Business Apartment",
  location: "Noida",
  price: 4700,
  image: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353"
}

];
await Listing.insertMany(sampleListings);

res.json({message:"Sample listings inserted successfully"});

});

/* Get listings */

app.get("/api/listings", async (req,res)=>{
  const listings = await Listing.find();
  res.json(listings);
});

/* Add listing */

app.post("/api/listings", async (req,res)=>{
  const listing = new Listing(req.body);
  await listing.save();
  res.json({message:"Listing added"});
});



//signup api//
app.post("/api/signup", async (req,res)=>{

const {username,email,password} = req.body;

const existing = await User.findOne({username});

if(existing){
return res.json({message:"Username already exists"});
}

const user = new User({
username,
email,
password
});

await user.save();

res.json({message:"User created"});
});
//login API/
app.post("/api/login", async (req,res)=>{

  const {username,password} = req.body;

  const user = await User.findOne({username,password});

  if(user){
    res.json({message:"Login successful"});
  }else{
    res.json({message:"Invalid username or password"});
  }

});

//booking API//
app.post("/api/book", async (req,res)=>{
  const booking = new Booking(req.body);
  await booking.save();
  res.json({message:"Booking confirmed"});
});

app.delete("/api/listings/:id", async (req,res)=>{

let id = req.params.id;

/* important check */
if(!id || id === "undefined"){
  return res.json({message:"Invalid ID"});
}

await Listing.findByIdAndDelete(id);

res.json({message:"Listing deleted"});

});

/* Start server */

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
  console.log("Server running on port " + PORT);
});