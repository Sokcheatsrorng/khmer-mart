const nameElement = document.querySelector('#name');
const priceElement = document.querySelector('#price');
const discountElement = document.querySelector('#discount');
const ratingElement = document.querySelector('#rating');
const typeElement = document.querySelector('#type');
const categoryElement = document.querySelector('#category');
const imageElement = document.querySelector('#image');

function createProduct() {
  const name = nameElement.value;
  const price = Number(priceElement.value);
  const discount = Number(discountElement.value);
  const rating = Number(ratingElement.value);
  const type = typeElement.value;
  let category = categoryElement.value;
  const image = imageElement.value;

  const product = {
    name,
    price,
    discount,
    rating,
    type,
    category,
    image,
  };

  console.log(product);

  fetch('https://cms.istad.co/api/km-products', {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(responseData => {
      const createdProduct = responseData.data;
      console.log('Product created successfully:', createdProduct);
    })
    .catch(error => {
      console.error('Error creating product:', error);
    });
}
