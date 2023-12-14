'use strict'
// create item for title, des, price and img
// select element
const nameElement = document.querySelector('#name');
const feeElement = document.querySelector('#fee');
const discountElement = document.querySelector('#discount');
const ratingElement = document.querySelector('#rating');
const createElement = document.querySelector('#createdAt');
const updateElement = document.querySelector('#updatedAt');
const publishElement = document.querySelector('#publishedAt')
const imageElement = document.querySelector('#image');

// create function
async function createProduct(){
    // get products
    const name= nameElement.value
    const fee = Number(feeElement.value)
    const discount = Number(discountElement.value)
    const rating = Number(ratingElement.value)
    const image = imageElement.files[0]
    const imageUrl = await uploadImage(image);

    const product = {
       id: 2,
       name,
       fee,
       discount,
       rating,
       images:[imageUrl.location]

    };
     // fetch to create products

 fetch('https://cms.istad.co/api/km-products',{
     method:"POST",
     body: JSON.stringify(product),
     headers:{
        "Content-Type": "application/json"
     }
 }).then(res => res.json()).then(data => console.log(data))

} 
  // upload image to server
    async function uploadImage(image){
     const formData = new FormData();
     formData.append('file',image);
     // send request
     const res = await fetch('https://cms.istad.co/api/upload',{
        method: "POST",
        body: formData,
     });
     return res.json();
    
    }
  