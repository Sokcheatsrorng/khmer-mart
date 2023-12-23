'use strict'
const trendingCard = ({ image, name, price, discount }) => {
    return `
      <div class="bg-white rounded-2xl mt-2">
        <a href="/src/detail-card.html">
          <img class="object-fit w-[480px] h-[350px] p-5 rounded-t-lg" src="${image}" alt="product image" />
        </a>
        <div class="px-5 pb-5">
          <a href="#">
            <h5 class="text-2xl font-semibold tracking-tight text-gray-600 pb-5">${name}</h5>
          </a>
          <div class="items-center justify-between pb-5">
            <span class="text-3xl font-bold text-red-600">$${price}</span>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-neutral-700 text-opacity-80 line-through">$${discount}</span>
            <a href="#" class="text-white bg-[#1A6E09] hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center" id="btnaddtoFav">Add to Favorite</a>
          </div>
        </div>
      </div>
    `;
  };
// btnadd to fav

// Fetch data from JSON
fetch('https://cms.istad.co/api/km-products?populate=*')
  .then(res => res.json())
  .then(data => {
    const trendingCardContainer = document.getElementById("display-card-trending");
    const trendingLists = data.attributes;

    trendingLists.map(product => {
      const cardElement = document.createElement('div');
      cardElement.innerHTML = trendingCard(product);
      trendingCardContainer.appendChild(cardElement.firstElementChild);
    });
  })
  .catch(error => console.error('Error:', error));