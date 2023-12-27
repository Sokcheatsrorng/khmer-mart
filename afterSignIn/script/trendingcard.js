document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('trendingProductsContainer');

  // Fetch data from the API
  fetch('https://cms.istad.co/api/km-products?filters[type][name][$containsi]=Trending&populate=*')
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      // Iterate through the products and populate the HTML
      data.data.forEach(product => {
        console.log(product);
        const productHTML = `
          <div class="bg-white rounded-2xl mt-2">
            <a href="${product.url}">
              <img class="object-contain w-[480px] h-[350px] p-5 rounded-t-lg" src="https://cms.istad.co${product.attributes.image.data.attributes.url}" alt="" />
            </a>
            <div class="px-5 pb-5">
              <a href="#">
                <h5 class="text-2xl font-semibold tracking-tight text-gray-600 pb-5">${product.attributes.name}</h5>
              </a>
              <div class="items-center justify-between pb-5">
                <span class="text-3xl font-bold text-red-600">$${product.attributes.price}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-3xl font-bold text-neutral-700 text-opacity-80 line-through">$${product.attributes.discount}</span>
                <a href="#" class="text-white bg-[#1A6E09] hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center" id="btnaddtoFav">Add to Favorite</a>
              </div>
            </div>
          </div>
        `;

        container.innerHTML += productHTML;
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});