'use strict';

const searchElement = document.querySelector("#search-category");

const renderStars = (rating) => {
    const starCount = Math.round(rating);
    const filledStars = "★".repeat(starCount);
    const emptyStars = "☆".repeat(5 - starCount);
    return `${filledStars}${emptyStars}`;
};

const searchProductDisplay = ({ attributes }) => {
    const { name, rating, price, image } = attributes;
    // get image name
    const imageName =
        image && image.data && image.data.attributes
        ? image.data.attributes.name
        : "";
    const imageUrl =
        image.data != null ? image.data.attributes.url : "";
    

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
            <div class=" w-full overflow-h max-w-sm md:w-[310px] bg-white rounded-xl relative">
                <img class="p-5 rounded-t-lg w-full h-52 object-contain z-0" src="https://cms.istad.co${imageUrl}" alt="${imageName}" id="images" class="flashSaleImage"/>
                <div class="px-5 pb-5">
                    <div class="flex items-center mt-2.5 mb-3">
                        <a href="#" class="w-full">
                            <h5 class="text-xl font-semibold tracking-tight text-gray-600 " id="title">${name}</h5>
                        </a>
                    </div>
                    
                    <div class="flex items-center mt-2.5 mb-3">
                        <div class="flex items-center space-x-1 rtl:space-x-reverse text-[#FF9E37] text-2xl" id="stars">
                            ${renderStars(rating)} 
                        </div>
                        <span class=" text-gray-500 text-sm px-2.5 py-0.5  ms-3">${rating}.00/5.00</span>
                    </div>
                    <div class="flex items-center justify-between gap-4">
                        <span class="text-3xl font-bold text-red-700" id="originalPrice">$${price}</span>
                        <button class="flex gap-8" id="btnaddtoFav" onclick="unavailable()">
                            <svg class="w-6 h-6 text-gray-800 dark:text-black md:mt-0" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8"
                                    d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Adding an event listener to handle the fetch with the current searchElement value
searchElement.addEventListener('change', () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
    };

    fetch(`https://cms.istad.co/api/km-products?filters[category][name][$containsi]=${searchElement.value}&populate=*&pagination%5Bpage%5D=1&pagination[pageSize]=12`, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Invalid search query');
            }
            return response.json();
        })
        .then(result => {
            const container = $('#categoryDisplayCard');
            container.empty();

            const categoryLists = result.data;
            if (categoryLists.length > 0) {
                categoryLists.forEach((product) => {
                    container.append(searchProductDisplay(product));
                });
            } else {
                container.append('<h1 class="text-[20px]">No results found</h1>');
            }
        })
        .catch(error => {
            console.log('error', error);
            // Display an error message to the user
            alert('Error: Invalid search query');
        });
});

// Initial fetch on page load
searchElement.dispatchEvent(new Event('change'));
