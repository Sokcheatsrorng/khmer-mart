"use strict";


// Function to render pagination buttons
const renderPagination = (pageCount) => {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  // Previous button
  paginationContainer.appendChild(createPaginationButton('Previous', currentPage > 1));
  
  for (let i = 1; i <= pageCount; i++) {
    // Regular page button
    const isActive = currentPage === i;
    const button = createPaginationButton(i, isActive);
    paginationContainer.appendChild(button);
  }
  paginationContainer.appendChild(createPaginationButton('Next', currentPage < pageCount));
};

const createPaginationButton = (text, isEnabled) => {
  const button = document.createElement("li");
  const link = document.createElement("a");

  link.href = "#";
  link.textContent = text;
  link.classList.add(
    "flex", "items-center", "justify-center", "px-3", "h-8",
    "leading-tight", "text-gray-500", "bg-white", "border", "border-gray-300",
    "hover:bg-gray-100", "hover:text-gray-700"
  );

  if (!isEnabled) {
    link.classList.add("opacity-50", "cursor-not-allowed");
  } else {
    link.addEventListener("click", () => fetchData(text.toLowerCase() === 'next' ? currentPage + 1 : currentPage - 1));
  }
  button.appendChild(link);
  return button;
};

// Function to fetch data based on page number
const fetchData = async (page) => {
  try {
    const response = await fetch(
      `https://cms.istad.co/api/km-products?populate=*&pagination%5Bpage%5D=${page}`,
      { method: "GET" }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    const products = result.data;

    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = ""; // Clear existing content before adding new data

    products.forEach((product) => {
      const cardHtml = renderCard(product);
      tableBody.insertAdjacentHTML("beforeend", cardHtml);
    });

    // Update the current page
    currentPage = page;

    // Assuming 'meta' is the pagination metadata
    const { pageCount } = result.meta.pagination;
    renderPagination(pageCount);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Replace this function with your actual implementation
const renderStars = (rating) => {
  const starCount = Math.round(rating);
  const filledStars = "★".repeat(starCount);
  const emptyStars = "☆".repeat(5 - starCount);
  return `${filledStars}${emptyStars}`;
};
const renderCard = ({id, attributes }) => {
  const {name, discount, rating, price, type, category, image } = attributes;
  // get image name
  const imageName =
    image && image.data && image.data.attributes
      ? image.data.attributes.name
      : "";

      
    const imageUrl = image.data != null ? image.data.attributes.formats.thumbnail.url : "";
  // get category name  
  const categoryName =
    category && category.data && category.data.attributes
      ? category.data.attributes.name
      : "";
  // get type name
  const typeName =
    type && type.data && type.data.attributes ? type.data.attributes.name : "";

  return `
        <tr class="bg-white border-b hover:bg-gray-50">
            <td class="w-4 p-4">
                <div class="flex items-center">
                    <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded accent-[#1A6E09] "
                    >
                    <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                </div>
            </td>
            <th scope="row" class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap">
                <div class="w-12 h-12 rounded-full overflow-hidden">
                <img src="https://cms.istad.co${imageUrl}" alt="${imageName}" class="w-full h-full object-cover"/>
                </div>
                <div class="ps-3">
                    <div class="text-base font-semibold">${name}</div>
                </div>
            </th>
            <td class="px-6 py-4">
            ${id}
        </td>
            <td class="px-6 py-4">
                $${price}
            </td>
            <td class="px-6 py-4">
                $${discount}
            </td>
            <td class="px-6 py-4">
                ${typeName}
            </td>
            <td class="px-6 py-4">
            ${categoryName}
        </td>
            <td class="px-6 py-4 text-2xl text-[#FF9E37]">
            ${renderStars(
              rating
            )}  <span class="text-sm ms-5 text-gray-400">${rating}</span>
            </td>
        </tr>
    `;
};
let currentPage = 1; // Initialize the current page
// Initial fetch on page load
fetchData(currentPage);