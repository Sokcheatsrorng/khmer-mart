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

    // Find the parent card element
    const cardElement = $(this).closest('.max-w-sm');

    // Extract data from the card
    const discPercent = cardElement.find('#discPrice').text().trim();
    const stringWithoutDollar1 = discPercent.replace("$", "");
    const discountPrice = parseFloat(stringWithoutDollar1);
    const imageUrl = cardElement.find('#images').attr('src').trim();
    const title = cardElement.find('#title').text().trim();
    const stars = cardElement.find('#stars').text().trim();
    const originalPrice = cardElement.find('#originalPrice').text().trim();
    const stringWithoutDollar2 = originalPrice.replace("$", "");
    const price = parseFloat(stringWithoutDollar2);

    // Prepare the data to be stored in localStorage
    const storeData = {
      name: title,
      discount: discountPrice,
      rating: stars,
      price: price,
      image: imageUrl,
    };
    console.log("Extracted Data:", storeData);

    // Store data in localStorage
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(storeData);
    localStorage.setItem("favorites", JSON.stringify(favorites));

  } else {
    // Code to execute when the button is not active (not favorited)
    $(this).html(`
      <svg class="w-6 h-6 text-gray-800 dark:text-black  md:mt-0" aria-hidden="true" xmlns="http:www.w3.org/2000/svg"
        fill="none" viewBox="0 0 21 19">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0.8"
          d="M11 4C5.5-1.5-1.5 5.5 4 11l7 7 7-7c5.458-5.458-1.542-12.458-7-7Z" />
      </svg>
    `);

    // Code to execute when the button is not active (not favorited)
    try {
      // Attempt to store data in localStorage
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (e) {
      // Handle the error (e.g., show a message to the user)
      console.error("Error storing data in localStorage:", e);
    }
  }
});
