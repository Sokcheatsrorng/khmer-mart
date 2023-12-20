const nameElement = document.querySelector("#name");
const descriptionElement = document.querySelector("#messageDescription");
const priceElement = document.querySelector("#price");
const discountElement = document.querySelector("#discount");
const dropdown = document.getElementById("dropdown");
const ratingElement = document.querySelector("#rating");
const imageElement = document.querySelector("#image");
const searchElement = document.querySelector("#search");

// display data back when we search
function populateForm(data) {
  nameElement.value = data.name;
  priceElement.value = data.price;
  discountElement.value = data.discount;
  dropdown.value = data.category;
  ratingElement.value = data.rating;
}

function fetchProductById(productId) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  fetch(`https://cms.istad.co/api/km-products/${productId}`, {
    method: "GET",
    headers: myHeaders,
  })
    .then((response) => response.json())
    .then((result) => {
      const product = result.data.attributes;
      populateForm(product);
      console.log(product);
    })
    .catch((error) => console.log("error", error));
}

const fetchProductButton = document.getElementById("fetchProductButton");
fetchProductButton.addEventListener("click", function () {
  fetchProductById(searchElement.value);
});

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
dropdown.addEventListener("change", (event) => {
  category = event.target.value;
});

// Update data
function updateProduct(productId) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Upload image
  const formdata = new FormData();
  formdata.append("files", imageElement.files[0], "/path/to/file");

  const requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch("https://cms.istad.co/api/upload", requestOptions)
    .then(response => response.json())
    .then(result => {
      const imageId = result[0].id; // Assuming the image ID is in the first element of the array
      console.log("Image ID:", imageId);

      // Get values of product
      const product = {
        name: nameElement.value,
        price: Number(priceElement.value),
        discount: Number(discountElement.value),
        rating: Number(ratingElement.value),
        type: type,
        category: category,
        image: imageId,
      };

      // Update the product using PUT request, including the new image ID
      return fetch(`https://cms.istad.co/api/km-products/${productId}`, {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({ data: product }),
      });
    })
    .then((response) => response.json())
    .then((result) => {
      console.log(result.data);
      alert("Product updated successfully!");
    })
    .catch((error) => console.log("Error:", error));
}

const updateProductButton = document.getElementById("updateProductButton");
updateProductButton.addEventListener("click", function () {
  updateProduct(searchElement.value);
});
