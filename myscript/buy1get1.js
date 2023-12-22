
'use strict'
const renderStars = (rating) => {
  const starCount = Math.round(rating);
  const filledStars = "★".repeat(starCount);
  const emptyStars = "☆".repeat(5 - starCount);
  return `${filledStars}${emptyStars}`;
};

const renderCard = ({ attributes }) => {
  const { name, rating, price, image } = attributes;
  // get image name
  const imageName =
    image && image.data && image.data.attributes
      ? image.data.attributes.name
      : "";
  const imageUrl =
    image.data != null ? image.data.attributes.formats.thumbnail.url : "";
  return `
        <style>
            /* Internal CSS */
            #btnaddtoFav.active {
                background-color: transparent;
                color: white;
            }
        </style>
        <div class="w-full max-w-sm bg-white border border-white rounded-xl shadow-none">
    <div>
    <img class=" absolute mx-1  mt-1 h-24 " src="/Img/b1g1/Logobuy1get1.jpg" alt="buy1get1Logo">
    <a href="/src/detail-card.html">
    <img class="p-3 rounded-t-lg w-full h-48 object-cover z-0" src="https://cms.istad.co${imageUrl}" alt="${imageName}" id="images"/>
    </a>
    </div>
    <div class="px-3 pb-5">
    
        <h5 class="text-xl font-semibold tracking-tight text-gray-600 " id="title">${name}</h5>

        <div class="flex items-center mt-2.5 mb-5">
            <div class="flex items-center space-x-1 rtl:space-x-reverse text-[#FF9E37] text-2xl">
             ${renderStars(rating)}
            </div>
            <span class="text-gray-500 text-sm px-2.5 py-0.5  ms-3"> ${rating} </span>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-red-600 ">$${price}</span>
            <button class="flex gap-8" id="btnaddtoFav">
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


//btnadd to fav
$(document).on("click", "#btnaddtoFav", function () {
  console.log("Add to fav clicked");
  // Toggle the 'active' class
  $(this).toggleClass("active");

  if ($(this).hasClass("active")) {
    // Code to execute when the button is active (favorited)
    $(this).html(`
            <svg class="w-6 h-6 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z"/>
            </svg>
        `);
    // Extract data from the card
    const discPercentElement = document.querySelector("#discPercent");
    const imageElement = document.querySelector("#images");
    const priceElement = document.querySelector("#originalPrice");
    const discPriceElement = document.querySelector("#discPrice");
    const titleElement = document.querySelector("#title");
    const starElement = document.querySelector("#stars");

    // Extract text content from the selected elements
    const discPercent = discPercentElement.textContent;
    const image = imageElement.src; // Assuming 'images' is an image element
    const price = priceElement.textContent;
    const discPrice = discPriceElement.textContent;
    const title = titleElement.textContent;
    const stars = starElement.textContent;

    // Prepare the data to be sent to the API
    const storeData = {
      title: title,
      price: price,
      discPrice: discPrice,
      discPercent: discPercent,
      image: image,
      stars: stars,
    };
    console.log("Extracted Data:", storeData);
    // Fetch API to send a request to your server and add a new row
    fetch("/jsondata/addtoFav.json", {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(storeData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        console.log("Server response:", data);

        // Code to store data into a row (customize this part based on your requirements)
        const newRow = ({
          title,
          oriPrice,
          discPrice,
          percPrice,
          discType,
          stars,
        }) => {
          return `
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                             ${title}
                          </th>
                          <td class="px-6 py-4">
                              $${oriPrice}
                              <p>original</p>
                          </td>
                          <td class="px-6 py-4">
                              $${discPrice}
                              <p>${percPrice}%</p>
                          </td>
                          <td class="px-6 py-4">
                              ${discType}
                          </td>
                          <td class="flex px-6 py-4">
                          <div class="flex items-center  text-[#FF9E37]">
                              ${stars}
                          </div>
                          </td>
                          <td class="px-6 py-4 text-right">
                              <a href="#" class="px-3 py-1 bg-red-600 font-sm text-white hover:underline rounded-lg">Remove</a>
                          </td>
                      </tr>
                `;
        };
        $("tbody").append(newRow);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } else {
    $(this).html(`
            <svg class="w-6 h-6 text-gray-800 dark:text-black  md:mt-0" aria-hidden="true" xmlns="http:www.w3.org/2000/svg"
                fill="none" viewBox="0 0 21 19">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8"
                    d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
            </svg>
        `);
    // Code to execute when the button is not active (not favorited)
    fetch("/jsondata/addtoFav.json", {
      // method: 'DELETE',
      // headers: {
      //     'Content-Type': 'application/json',
      // },
      // body: JSON.stringify(storeData),
    })
      .then((response) => response.json()) 
      .then((data) => {
        // Handle the response from the server
        console.log("Server response (remove):", data);
      })
      .catch((error) => {
        console.error("Error (remove):", error);
      });
  }
});

