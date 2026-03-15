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

let listings = JSON.parse(localStorage.getItem("listings")) || sampleListings;