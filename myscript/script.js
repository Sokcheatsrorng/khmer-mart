
'use strict'


const renderCard = ({ discPer, title, price, discPrice, images, rating, stars, dateTime, hours }) => {
    return `
        <style>
            /* Internal CSS */
            #btnaddtoFav.active {
                background-color: transparent;
                color: white;
            }
        </style>

        <div class="w-full max-w-sm bg-white border border-white rounded-xl shadow-none">
            <div class="discount-percent z-10 h-12 w-24 mt-4 ms-4 text-center justify-center text-2xl flex items-center mx-auto">
                ${discPer}
            </div>
            <a href="#">
                <img class="p-5 rounded-t-lg w-[400px] h-[200px] z-0" src="${images}" alt="food-discount" />
            </a>
            <div class="px-5 pb-5">
                <a href="#" class="w-full">
                    <h5 class="text-xl font-semibold tracking-tight text-gray-600 ">${title}</h5>
                </a>
                <div class="flex items-center mt-2.5 mb-5">
                    <div class="flex items-center space-x-1 rtl:space-x-reverse text-[#FF9E37] text-xl ">
                        ${stars}
                    </div>
                    <span class=" text-gray-500 text-sm px-2.5 py-0.5  ms-3">${rating}</span>
                </div>
                <div class="flex items-center justify-between gap-4">
                    <span class="text-3xl font-bold text-gray-900 dark:text-red-700">$${price}</span>
                    <span class="text-3xl font-inter text-gray-700"><del>${discPrice} </del> </span>
                    <button class="flex gap-8" id="btnaddtoFav">
                        <svg class="w-6 h-6 text-gray-800 dark:text-black md:mt-0" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8"
                                d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
                        </svg>
                    </button>
                </div>
                <hr class="mt-3">
                <div class="flex items-center justify-between gap-4 mt-3">
                    <span class="flex items-center">
                        <svg class="w-4 h-4 text-[#1A6E09] " aria-hidden="true" xmlns="http:www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 20 20">
                            <path fill="currentColor"
                                d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z" />
                        </svg> &nbsp;
                        <span>
                            ${dateTime}
                        </span>
                    </span>
                    <span class="flex items-center">
                        <svg class="w-4 h-4 text-[#1A6E09]" aria-hidden="true" xmlns="http:www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2"
                                d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                        &nbsp;
                        <span>
                            ${hours}
                        </span>
                    </span>
                </div>
            </div>
        </div>
    `;
};

$(document).on("click", "#btnaddtoFav", function () {
    console.log("Add to fav clicked");
    $(this).toggleClass('active');

    if ($(this).hasClass('active')) {
        
        $(this).html(`
        <svg class="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
        <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"/>
        </svg>
        `);
    } else {
        $(this).html(`
            <svg class="w-6 h-6 text-gray-800 dark:text-black  md:mt-0" aria-hidden="true" xmlns="http:www.w3.org/2000/svg"
                fill="none" viewBox="0 0 21 19">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8"
                    d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
            </svg>
        `);
    }

});
//fetch data from api
// foods

fetch('/jsondata/flashsale.json').then(res =>
res.json())
.then(data=>{
  const foodCardContainer = document.getElementById('foodsDisplayCard');
  const drinkCardContainer = document.getElementById('drinksDisplayCard');
  const electronicCardContainer = document.getElementById('electronicsDisplayCard');
  const cosmeticCardContainer = document.getElementById('cosmeticsDisplayCard');
  const clothCardContainer = document.getElementById('clothesDisplayCard');
  const plantCardContainer = document.getElementById('plantsDisplayCard');
    const foodLists = data.foods
    foodLists.map(product =>{
        foodCardContainer.insertAdjacentHTML('beforeend',renderCard(product));
    });
    const drinkLists = data.drinks
    drinkLists.map(product =>{
        drinkCardContainer.insertAdjacentHTML('beforeend',renderCard(product));
    });
    const electronicLists = data.electronics
    electronicLists.map(product =>{
        electronicCardContainer.insertAdjacentHTML('beforeend',renderCard(product));
    });
    const clothLists = data.clothes
    clothLists.map(product =>{
        clothCardContainer.insertAdjacentHTML('beforeend',renderCard(product));
    });
    const cosmeticLists = data.cosmetics
    cosmeticLists.map(product =>{
        cosmeticCardContainer.insertAdjacentHTML('beforeend',renderCard(product));
    });
    const plantLists = data.plants
    plantLists.map(product =>{
        plantCardContainer.insertAdjacentHTML('beforeend',renderCard(product));
    });
}).catch(err => console.log(err));

// rating star
// function getStarRating(rating) {
//     const maxRating = 5; // Maximum rating value
//     const fullStar = '★';
//     const emptyStar = '☆';
//     let stars = '';
  
//     // Add full stars
//     for (let i = 0; i < Math.floor(rating); i++) {
//       stars += fullStar;
//     }
  
//     // Add half star if needed
//     if (rating % 1 !== 0) {
//       stars += '½'; // Add a half-star symbol or modify it based on your requirements
//     }
  
//     // Add empty stars to fill the remaining space
//     for (let i = Math.ceil(rating); i < maxRating; i++) {
//       stars += emptyStar;
//     }
  
//     return stars;
//   }
  
//   const rating = 4.5; // Example rating value
//   const starRating = getStarRating(rating);
//   console.log(starRating); // Output: ★★★★½☆















