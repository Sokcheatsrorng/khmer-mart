// Assuming you have an array of card data stored in localStorage

'use strict'
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
console.log(favorites)

const renderCard = ( favorites) => {
  const { name, discount, rating, price, image ,id} = favorites

  // get image name
  const imageName = image && image.data && image.data.attributes
    ? image.data.attributes.name
    : "";
  const discPrice = price - (price*discount)/100;
  return `
    <tr class="bg-white border-b hover:bg-gray-50 text-black">
        <th scope="row" class="flex items-center px-6 py-3 whitespace-nowrap rtl:pl-6 rtl:pr-3">
            <div class="w-12 h-12 rounded-full overflow-hidden">
                <img src="${image}" alt="${imageName}" class="w-full h-full object-cover"/>
            </div>
            <div class="ps-3">
                <div class="text-base font-semibold">${name}</div>
            </div>
        </th>
        <td class="px-6 py-3">$${price}</td>
        <td class="px-6 py-3">${discount || 0}%</td>
        <td class="px-6 py-3">$${discPrice}</td>
        <td class="px-6 py-3 text-2xl text-[#FF9E37] ">
            ${rating}
        </td>
         <td class="px-4 py-4 text-2xl text-[#FF9E37]">
            <button class="px-4 py-2 rounded-lg flex text-[#FFFFFF] text-sm"  onclick="removeDataFromARow(${id},this)">
            <svg
            class="w-[25px] h-[25px] text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 18 20">
            <path stroke="red"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="0.9"
                d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
        </svg>
       
    </a>
            </button>
            </td>
        
    </tr>
  `;
};

// Function to render all cards and display them on the UI
const renderAllCards = (cards) => {
  // Get the table element where you want to display the cards
  const table = document.querySelector('tbody');

  // Clear existing content in the table
  table.innerHTML = '';

  // Loop through the array of cards and append each card to the table
  cards.forEach((card) => {
    // Use the renderCard function to generate HTML for each card
    const cardHtml = renderCard(card);

    // Append the generated HTML to the table
    table.innerHTML += cardHtml;
  });
};

// Render all cards when the page loads
renderAllCards(favorites);

function removeDataFromARow(productId, button) {
  const rowToRemove = button.closest('tr');
  if (rowToRemove) {
    // Retrieve favorites from local storage
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    // Find the index of the item to remove
    const indexToRemove = favorites.findIndex(item => item.productId === productId);

    if (indexToRemove !== -1) {
      // Remove the item from the array
      favorites.splice(indexToRemove, 1);

      // Update local storage with the modified array
      localStorage.setItem("favorites", JSON.stringify(favorites));

      // Remove the row from the UI after successful removal
      rowToRemove.parentNode.removeChild(rowToRemove);
    } else {
      console.warn(`Product with ID ${productId} not found in favorites.`);
    }
  }
}

