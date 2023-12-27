
'use strict'
const renderStars = (rating) => {
  const starCount = Math.round(rating);
  const filledStars = "★".repeat(starCount);
  const emptyStars = "☆".repeat(5 - starCount);
  return `${filledStars}${emptyStars}`;
};

const renderCard = ({id, attributes }) => {
  const { name, rating, price, image } = attributes;
  // get image name
  const imageName =
    image && image.data && image.data.attributes
      ? image.data.attributes.name
      : "";
  const imageUrl =
    image.data != null ? image.data.attributes.url : "";
    const typeId = attributes.type.data.id;
  return `
        <style>
            /* Internal CSS */
            #btnaddtoFav.active {
                background-color: transparent;
                color: white;
            }
        </style>
        <div class="w-full max-w-sm bg-white border border-white rounded-xl shadow-none">
        <img class=" absolute mx-1  mt-1 h-24 " src="/Img/b1g1/Logobuy1get1.jpg" alt="buy1get1Logo">
        <a href="/src/detail-card.html?id=${id}&type=${typeId}">
    <img class=" p-5 rounded-t-lg w-full  object-contain z-0" src="https://cms.istad.co${imageUrl}" alt="${imageName}" id="images" class="flashSaleImage"/>
    </a>
        <div class="px-5 pb-5">
            <div class="flex items-center mt-2.5 mb-3">
            <a href="#" class="w-full">
                <h5 class="text-xl font-semibold tracking-tight text-gray-600 " id="title">${name}</h5>
            </a>
            </div>
            
            <div class="flex items-center mt-2.5 mb-3">
                <div class="flex items-center space-x-1 rtl:space-x-reverse text-[#FF9E37] text-2xl" id="stars">
                ${renderStars(rating)} 
                 <span class=" text-gray-500 text-sm px-2.5 py-0.5  ms-3">${rating}.00/5.00</span>
                </div>
               
            </div>
            <div class="flex items-center justify-between gap-4">
                <span class="text-3xl font-bold text-red-700" id="originalPrice">$${price}</span>
                <button class="flex gap-8" id="btnaddtoFav" onclick="unvailable()" >
                        <svg class="w-6 h-6 text-gray-800 dark:text-black md:mt-0" aria-hidden="true" xmlns="http:www.w3.org/2000/svg" fill="none" viewBox="0 0 21 19">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8"
                                d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
                        </svg>
                    </button>
            </div>
        </div>
    </div>
      

        
    `;
};


const renderPagination = (pageCount) => {
  const paginationContainer = $("#pagination");
  paginationContainer.empty();

  // Previous button
  paginationContainer.append(createPaginationButton('Previous', currentPage > 1));

  for (let i = 1; i <= pageCount; i++) {
    // Regular page button
    const isActive = currentPage === i;
    const button = createPaginationButton(i, isActive);
    paginationContainer.append(button);
  }
  paginationContainer.append(createPaginationButton('Next', currentPage < pageCount));
};

const createPaginationButton = (text, isEnabled) => {
  const listItem = $("<li>");
  const link = $("<a>", {
    href: "#",
    text: text,
    class: [
      "flex", "items-center", "justify-center", "px-3", "h-8",
      "leading-tight", "text-gray-500", "bg-white", "border", "border-gray-300",
      "hover:bg-gray-100", "hover:text-gray-700",
      !isEnabled ? "opacity-50 cursor-not-allowed" : ""
    ].join(" ")
  });

  if (isEnabled) {
    link.on("click", () => fetchData(text.toLowerCase() === 'next' ? currentPage + 1 : currentPage - 1));
  }

  listItem.append(link);
  return listItem;
};

const fetchData = async (page) => {
  try {
    const response = await $.ajax({
      url: `https://cms.istad.co/api/km-products?filters[type][id][$containsi]=2&populate=*&&pagination%5Bpage%5D=${page}&pagination[pageSize]=8`,
      method: "GET",
    });

    const buy1get1CardContainer = $("#buy1get1container");
    buy1get1CardContainer.empty(); 

    const buy1get1Lists = response.data;
    buy1get1Lists.forEach((product) => {
      buy1get1CardContainer.append(renderCard(product));
    });

    // Update the current page
    currentPage = page;

    // Assuming 'meta' is the pagination metadata
    const { pageCount } = response.meta.pagination;
    renderPagination(pageCount);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};
let currentPage = 1;
fetchData(currentPage);
;
