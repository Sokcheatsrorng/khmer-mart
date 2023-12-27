"use strict";

const renderPagination = (pageCount) => {
  const paginationContainer = $("#pagination");
  paginationContainer.empty();

  // Previous button
  paginationContainer.append(
    createPaginationButton("Previous", currentPage > 1)
  );

  for (let i = 1; i <= pageCount; i++) {
    // Regular page button
    const isActive = currentPage === i;
    const button = createPaginationButton(i, isActive);
    paginationContainer.append(button);
  }
  paginationContainer.append(
    createPaginationButton("Next", currentPage < pageCount)
  );
};
// function get only date
function extractDateFromISOString(isoString) {
  const dateObject = new Date(isoString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); 
  const day = String(dateObject.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
// function get only hours
function extractHoursAndMinutesFromISOString(isoString) {
  const dateObject = new Date(isoString);
  const hours = String(dateObject.getHours()).padStart(2, '0');
  const minutes = String(dateObject.getMinutes()).padStart(2, '0');
  return `${hours}h : ${minutes}mn`;
}


const createPaginationButton = (text, isEnabled) => {
  const listItem = $("<li>");
  const link = $("<a>", {
    href: "#",
    text: text,
    class: [
      "flex",
      "items-center",
      "justify-center",
      "px-3",
      "h-8",
      "leading-tight",
      "text-gray-500",
      "bg-white",
      "border",
      "border-gray-300",
      "hover:bg-gray-100",
      "hover:text-gray-700",
      !isEnabled ? "opacity-50 cursor-not-allowed" : "",
    ].join(" "),
  });

  if (isEnabled) {
    link.on("click", () =>
      fetchData(
        text.toLowerCase() === "next" ? currentPage + 1 : currentPage - 1
      )
    );
  }

  listItem.append(link);
  return listItem;
};

const fetchData = async (page) => {
  try {
    const response = await $.ajax({
      url: `https://cms.istad.co/api/km-products?filters[type][id][$containsi]=1&populate=*&&pagination%5Bpage%5D=${page}&pagination[pageSize]=8`,
      method: "GET",
    });
      
    const flashSaleCardContainer = $("#flashSaleDisplayCard");
    flashSaleCardContainer.empty(); // Clear existing content

    const flashSaleLists = response.data;
    flashSaleLists.forEach((product) => {
      flashSaleCardContainer.append(renderCard(product));
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

const renderStars = (rating) => {
  const starCount = Math.round(rating);
  const filledStars = "★".repeat(starCount);
  const emptyStars = "☆".repeat(5 - starCount);
  return `${filledStars}${emptyStars}`;
};

const renderCard = ({ id, attributes}) => {
  const { name, rating, price, image, createdAt} = attributes;
  const isoString = createdAt;
  const extractedDate = extractDateFromISOString(isoString);
  const extractedHours = extractHoursAndMinutesFromISOString(isoString);
  // get image name
  const imageName =
    image && image.data && image.data.attributes
      ? image.data.attributes.name
      : "";
  const imageUrl = image.data != null ? image.data.attributes.url : "";
  const typeId = attributes.type.data.id;


  return `
        <style>
            /* Internal CSS */
            #btnaddtoFav.active {
                background-color: transparent;
                color: white;
            }
        </style>
        <div class="w-full max-w-sm bg-white border border-white rounded-xl shadow-none" >
        <a href="/src/detail-card.html?id=${id}&type=${typeId}" id="productLink">
        <img class="p-5 rounded-t-lg w-full h-52 object-contain z-0" src="https://cms.istad.co${imageUrl}" alt="${imageName}" id="images" class="flashSaleImage"/>
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
                    </div>
                    <span class=" text-gray-500 text-sm px-2.5 py-0.5  ms-3">${rating}.00/5.00</span>
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
                <hr class="mt-3">
                <div class="flex items-center justify-between gap-4 mt-3">
                    <span class="flex items-center">
                        <svg class="w-4 h-4 text-[#1A6E09] " aria-hidden="true" xmlns="http:www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 20 20">
                            <path fill="currentColor"
                                d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 15v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 15v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1Zm.01 0v1h1v-1h-1ZM5 15v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM2 4h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z" />
                        </svg> &nbsp;
                        <span>
                           ${extractedDate}
                        </span>
                    </span>
                    <span class="flex items-center">
                    <svg class="w-4 h-4 text-[#1A6E09]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                  </svg>
                        <span>
                           ${extractedHours}
                        </span>
                    </span>
                    
                </div>
            </div>
        </div>
    `;
};
let currentPage = 1;
fetchData(currentPage);
