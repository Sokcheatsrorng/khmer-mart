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
    // image: imageElement.value,
  };

  const raw = JSON.stringify({
    data: product,
  });

  // Upload image
  const formdata = new FormData();
  formdata.append("files", imageElement.files[0], "/path/to/file");

  const requestOptions = {
    method: "POST",
    body: formdata,
    redirect: "follow",
  };

  fetch("https://cms.istad.co/api/upload", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      const imageId = result[0].id; // Assuming the image ID is in the first element of the array
      console.log("Image ID:", imageId);

      // Add image ID to the product data
      product.image = imageId;

      // Create product after uploading the image
      fetch("https://cms.istad.co/api/km-products", {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify({ data: product }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log(result.data);
          alert('You have created new discount Product successfully!');
          window.location.reload();
        })
        .catch((error) => console.log("error", error));
    })
    .catch((error) => console.log("error", error));
}
