
const renderStars = (rating) => {
  const starCount = Math.round(rating);
  const filledStars = "★".repeat(starCount);
  const emptyStars = "☆".repeat(5 - starCount);
  return `${filledStars}${emptyStars}`;
};

const detail = ({ attributes }) => {
  const { name, rating, price, image, discount } = attributes;
  const imageName = image && image.data && image.data.attributes ? image.data.attributes.name : "";
  const imageUrl = image.data != null ? image.data.attributes.url : "";
  const discountprice = price - (discount * price) / 100;
  const totalSave = price - discountprice;
  const currentDate = new Date();
  return `
    <div class="rounded-[15px] bg-white w-3/5">
      <a href="/src/BuyoneGetoneList.html">
        <img class="p-5 rounded-t-lg w-full object-cover z-0" src="https://cms.istad.co${imageUrl}" alt="${imageName}" id="images" class="detail"/>
      </a>
    </div>
    <!-- Card -->
    <div class="h-1/2 w-2/5 bg-white rounded-[15px] relative p-4 ">
      <div class="flex items-center mb-4 gap-2 space-x-2 ">
        <div class="flex items-center space-x-1 rtl:space-x-reverse text-[#FF9E37] text-2xl" id="stars">
          ${renderStars(rating)}
        </div>
        <div class="text-neutral-700 text-opacity-80 text-base font-normal leading-9 tracking-tight ">${rating}.0/5.0</div>
      </div>
      <h5 class="mb-6 text-2xl font-semibold text-opacity-80 tracking-tight text-neutral-700 ">${name}</h5>
      <div class="flex items-center space-x-1 rtl:space-x-reverse mb-4 gap-4">
        <div class="text-[#FF0000] text-4xl font-bold leading-9 tracking-tight">Now $${discountprice.toFixed(2)}</div>
        <div class="w-[109px] h-[35.76px] text-neutral-700 text-opacity-80 text-2xl font-normal line-through leading-9 tracking-tight  ">$${price}</div>
      </div>
      <h5 class="mb-2 text-2xl font-semibold tracking-tight text-[#FF0000] ">You save ${totalSave.toFixed(2)}</h5>  
      <div class="flex items-center space-x-1 rtl:space-x-reverse mb-4 justify-between">
        <div class="flex gap-2">
          <svg class="w-[20px] h-[20px] text-[#1A6E09]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path fill="currentColor" d="M6 1a1 1 0 0 0-2 0h2ZM4 4a1 1 0 0 0 2 0H4Zm7-3a1 1 0 1 0-2 0h2ZM9 4a1 1 0 1 0 2 0H9Zm7-3a1 1 0 1 0-2 0h2Zm-2 3a1 1 0 1 0 2 0h-2ZM1 6a1 1 0 0 0 0 2V6Zm18 2a1 1 0 1 0 0-2v2ZM5 11v-1H4v1h1Zm0 .01H4v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM10 11v-1H9v1h1Zm0 .01H9v1h1v-1Zm.01 0v1h1v-1h-1Zm0-.01h1v-1h-1v1ZM15 11v-1h-1v1h1Zm0 .01h-1v1h1v-1ZM.01 6h16V2H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v14h2V4h-2Zm0 14v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 18H0a2 2 0 0 0 2 2v-2Zm0 0V4H0v14h2ZM2 4V2a2 2 0 0 0-2 2h2Zm2-3v3h2V1H4Zm5 0v3h2V1H9Zm5 0v3h2V1h-2ZM1 8h18V6H1v2Zm3 3v.01h2V11H4Zm1 1.01h.01v-2H5v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H5v2h.01v-2ZM9 11v.01h2V11H9Zm1 1.01h.01v-2H10v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM9 15v.01h2V15H9Zm1 1.01h.01v-2H10v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H10v2h.01v-2ZM14 15v.01h2V15h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM14 11v.01h2V11h-2Zm1 1.01h.01v-2H15v2Zm1.01-1V11h-2v.01h2Zm-1-1.01H15v2h.01v-2ZM4 15v.01h2V15H4Zm1 1.01h.01v-2H5v2Zm1.01-1V15h-2v.01h2Zm-1-1.01H5v2h.01v-2Z"/>
          </svg>
          <p class="mb-3 font-normal text-gray-700 ">${currentDate}</p>
        </div>
        <div class="flex gap-2">
          <svg class="w-[20px] h-[20px] text-[#1A6E09] " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 6v4l3.276 3.276M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
          </svg>
          <p class="mb-3 font-normal text-gray-700 ">5h 00mn</p>
        </div>
      </div>
      <a href="#" class="mb-4 flex items-center text-lg px-20 font-medium text-center text-white bg-[#1A6E09] rounded-[59px] hover:bg-green-500  focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 w-72 h-12">
        Add to favorite
      </a> 
    </div>
  `;
};

var settings = {
  "url": " ",
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done(function (response) {
  
 const amountOffCardContainer = $("#amountOffDisplayCard");
 amountOffCardContainer.empty();

 const amountOffLists = response.data;
 amountOffLists.forEach((product) => {
   amountOffCardContainer.append(amountOff(product))})
});
