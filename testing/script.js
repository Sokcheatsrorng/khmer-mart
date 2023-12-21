// Input products
const nameElement = document.querySelector("#name");
const priceElement = document.querySelector("#price");
const discountElement = document.querySelector("#discount");
const ratingElement = document.querySelector("#rating");
const typeElement = document.querySelector("#type");
const categoryElement = document.querySelector("#category");
const imageElement = document.querySelector("#image");

function createProduct() {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  // Get values of product
  const product = {
    name: nameElement.value,
    price: Number(priceElement.value),
    discount: Number(discountElement.value),
    rating: Number(ratingElement.value),
    type: typeElement.value,
    category: categoryElement.value,
    image: imageElement.value,
  };

  const raw = JSON.stringify({
    data: product, 
  });

  fetch("https://cms.istad.co/api/km-products",{
    method: 'POST',
    headers: myHeaders,
    body: raw
  })
    .then(response => response.json())
    .then(result => {console.log(result.data)
     alert("You have created new discount product!")})
    .catch(error => console.log('error', error));
}
