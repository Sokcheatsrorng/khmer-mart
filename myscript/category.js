'use strict'


const buy1Get1Card = ({ title, price, images, rating, stars }) => {
    return `
        <style>
            /* Internal CSS */
            #btnaddtoFav.active {
                background-color: transparent;
                color: white;
            }
        </style>
        <div class="w-full mt-6 flex flex-wrap justify-center items-center gap-8 md:gap-x-14 xl:gap-x-2 xl:justify-between ">

                    <!-- Cart -->
                    <div class=" w-full h-[320px] max-w-sm md:w-[310px] bg-white rounded-xl relative">
                        <div>
                            <img class=" absolute mx-1  mt-1 h-24 " src="/Img/b1g1/Logobuy1get1.jpg" alt="">
                            <img class=" rounded-t-lg" src="${images}" alt="buy one get one img"/>
                        </div>
                        <div class="px-5 mt-0">
                            <a href="#">
                                <h5 class="mt-4 mb-8 absolute bottom-20  font-semibold tracking-normal text-xl text-[#363636]">${title}</h5>
                            </a>
                            <div class="flex items-center mt-2.5 mb-5 absolute bottom-12">
                            <div class="flex items-center space-x-1 rtl:space-x-reverse text-[#FF9E37] text-xl ">
                            ${stars}
                           </div>
                                <span
                                    class="  ms-3 text-gray-500 text-sm px-2.5 py-0.5">${rating}</span>
                            </div>
                            
                            <div class="flex items-center justify-between ">
                                <span class="text-3xl font-bold text-[red] dark:text-white absolute bottom-4 left-4">$${price}</span>
                                <button class="flex gap-8 md:mt-0 absolute bottom-4 right-4" id="btnaddtoFav">
                                <svg class="w-6 h-6 text-gray-800 dark:text-black" aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                        stroke-width="0.8"
                                        d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
                                </svg>
                            </button>
                            </div>
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

fetch('/jsondata/buy1get1.json').then(res =>
    res.json())
    .then(data=>{
      const featureCardContainer = document.getElementById('featureDisplayCard');
      const hotReleaseCardContainer = document.getElementById('hotReleaseDisplayCard');
      const bestSaleCardContainer = document.getElementById('bestSaleDisplayCard');

        const productList = data.foods
        productList.map(product =>{
            featureCardContainer.insertAdjacentHTML('beforeend',buy1Get1Card(product));
        });
        const productList1 = data.foods
        productList1.map(product =>{
            hotReleaseCardContainer.insertAdjacentHTML('beforeend',buy1Get1Card(product));
        });
        const productList2 = data.foods
        productList2.map(product =>{
            bestSaleCardContainer.insertAdjacentHTML('beforeend',buy1Get1Card(product));
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