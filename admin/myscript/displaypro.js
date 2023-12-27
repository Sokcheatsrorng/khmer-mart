"use strict";
let currentPage = 1; // Initialize the current page

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
// Initial fetch on page load
fetchData(currentPage);

// review all discount product 
const getReview = document.querySelector('#reviewProducts');
const renderReview = `'
<div class="flex items-center mb-5">

<p
    class="font-medium text-gray-900 dark:text-white">Discount
    Products</p>
<span
    class="w-1 h-1 mx-2 bg-gray-900 rounded-full dark:bg-gray-500"></span>
<p
    class="text-sm font-medium text-gray-500 dark:text-gray-400">128
    products</p>
<a href="read.html"
    class="ms-auto text-sm font-medium text-blue-600 hover:underline ">Read
    all products</a>
</div>
<div class="gap-8 sm:grid sm:grid-cols-2">
<div>
    <dl>
        <dt
            class="text-sm font-medium text-gray-500 dark:text-gray-400">Foods</dt>
        <dd class="flex items-center mb-3">
            <div
                class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                <div
                    class="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                    style="width: 88%"></div>
            </div>
            <span
                class="text-sm font-medium text-gray-500 dark:text-gray-400">8.8</span>
        </dd>
    </dl>
    <dl>
        <dt
            class="text-sm font-medium text-gray-500 dark:text-gray-400">Drinks</dt>
        <dd class="flex items-center mb-3">
            <div
                class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                <div
                    class="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                    style="width: 89%"></div>
            </div>
            <span
                class="text-sm font-medium text-gray-500 dark:text-gray-400">8.9</span>
        </dd>
    </dl>
    <dl>
        <dt
            class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Electronics</dt>
        <dd class="flex items-center mb-3">
            <div
                class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                <div
                    class="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                    style="width: 88%"></div>
            </div>
            <span
                class="text-sm font-medium text-gray-500 dark:text-gray-400">8.8</span>
        </dd>
    </dl>
    <dl>
        <dt
            class="text-sm font-medium text-gray-500 dark:text-gray-400">Clothes</dt>
        <dd class="flex items-center">
            <div
                class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                <div
                    class="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                    style="width: 54%"></div>
            </div>
            <span
                class="text-sm font-medium text-gray-500 dark:text-gray-400">5.4</span>
        </dd>
    </dl>
</div>
<div>
    <dl>
        <dt
            class="text-sm font-medium text-gray-500 dark:text-gray-400">
            Cosmentics</dt>
        <dd class="flex items-center mb-3">
            <div
                class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                <div
                    class="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                    style="width: 89%"></div>
            </div>
            <span
                class="text-sm font-medium text-gray-500 dark:text-gray-400">8.9</span>
        </dd>
    </dl>
    <dl>
        <dt
            class="text-sm font-medium text-gray-500 dark:text-gray-400">Plants</dt>
        <dd class="flex items-center mb-3">
            <div
                class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                <div
                    class="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                    style="width: 70%"></div>
            </div>
            <span
                class="text-sm font-medium text-gray-500 dark:text-gray-400">7.0</span>
        </dd>
    </dl>
  
</div>
</div>
`;
getReview.innerHTML = renderReview;
