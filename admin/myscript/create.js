// Input products
const nameElement = document.querySelector("#name");
const priceElement = document.querySelector("#price");
const discountElement = document.querySelector("#discount");
const ratingElement = document.querySelector("#rating");
const imageElement = document.querySelector("#image");

// Type value
let type = null;
let selectedButton = null;
// get type from click btn
document.getElementById("trending").addEventListener("click", function () {
  type = "3";
  resetBorder(); 
  selectedButton = this;
  this.style.border = "2px solid orange";
});

document.getElementById("flashsale").addEventListener("click", function () {
  type = "1";
  resetBorder(); 
  selectedButton = this;
  this.style.border = "2px solid orange";
});

document.getElementById("amountOff").addEventListener("click", function () {
  type = "4";
  resetBorder(); 
  selectedButton = this;
  this.style.border = "2px solid orange";
});

document.getElementById("buy1get1").addEventListener("click", function () {
  type = "2";
  resetBorder(); 
  selectedButton = this;
  this.style.border = "2px solid orange";
});

document.getElementById("event").addEventListener("click", function () {
  type = "6";
  resetBorder(); 
  selectedButton = this;
  this.style.border = "2px solid orange";
});

function resetBorder() {
  if (selectedButton) {
    selectedButton.style.border = "none"; 
  }
}

// get category from selected
let category = 1;
const dropdown = document.getElementById("dropdown");
dropdown.addEventListener("change", (event) => {
  category = event.target.value;
});

function createProduct() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Get values of product
  const product = {
    name: nameElement.value,
    price: Number(priceElement.value),
    discount: Number(discountElement.value),
    rating: Number(ratingElement.value),
    type: type, 
    category: category,
    image: imageElement.value,
  };

  const raw = JSON.stringify({
    data: product,
  });

  fetch("https://cms.istad.co/api/km-products", {
    method: "POST",
    headers: myHeaders,
    body: raw,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result.data);
      alert("You have created a new discount product!");
    })
    .catch((error) => console.log("error", error));
}

