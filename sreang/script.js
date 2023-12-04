"use strict";

const trending = document.querySelector(".display-card-trending");
const card = ({ images, title, price}) => {
  return `
    <div class="bg-white border border-gray-200 rounded-2xl shadow ">
                    <a href="#">
                        <img class="object-fit w-[480px] h-[320px] p-5 rounded-t-lg" src="${images[0]}" alt="product image" />
                    </a>
                    <div class="px-5 pb-5">
                        <a href="#">
                            <h5 class="text-xl font-semibold tracking-tight text-neutral-700 text-opacity-80 pb-5">${title}</h5>
                        </a>
                        <div class="items-center justify-between pb-5">
                            <span class="text-3xl font-bold text-red-600">$${price}</span>
                        </div>
                        <div class="flex items-center justify-between ">
                            <span class="text-3xl font-bold text-neutral-700 text-opacity-80 line-through">$699</span>
                            <a href="#" class="text-white bg-green-800 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center dark:focus:ring-blue-800">Add to Favorite</a>
                        </div>
                </div>
                </div>
                `;
};
fetch('https:dummyjson.com/products').then(res =>
    res.json()).then(data=>{
        const productList = data.products
        productList.map(product =>{
            trending.insertAdjacentHTML('beforeend',card(product));
        })
    }).catch(err => console.log(err));
