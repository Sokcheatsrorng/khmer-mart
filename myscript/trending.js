"use strict";

const trending = document.querySelector(".display-card-trending");
let products = [{
    "image":"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT613ref_VW_34FR+watch-49-titanium-ultra2_VW_34FR+watch-face-49-trail-ultra2_VW_34FR?wid=2000&hei=2000&fmt=png-alpha&.v=1694507270905",
    "title":"Apple Watch",
    "price": 120

},{
    "image":"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT613ref_VW_34FR+watch-49-titanium-ultra2_VW_34FR+watch-face-49-trail-ultra2_VW_34FR?wid=2000&hei=2000&fmt=png-alpha&.v=1694507270905",
    "title":"Apple Watch",
    "price": 120
},{
    "image":"https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MT613ref_VW_34FR+watch-49-titanium-ultra2_VW_34FR+watch-face-49-trail-ultra2_VW_34FR?wid=2000&hei=2000&fmt=png-alpha&.v=1694507270905",
    "title":"Apple Watch",
    "price": 120
}

];
let proItem = " ";
products.forEach(pro =>{
    proItem +=`
    <div class="bg-white rounded-2xl ">
    <a href="#">
        <img class="object-fit w-[480px] h-[350px] p-5 rounded-t-lg" src="${pro.image}" alt="product image" />
    </a>
    <div class="px-5 pb-5">
        <a href="#">
            <h5 class="text-2xl font-semibold tracking-tight text-gray-600 pb-5">${pro.title}</h5>
        </a>
        <div class="items-center justify-between pb-5">
            <span class="text-3xl font-bold text-red-600">$${pro.price}</span>
        </div>
        <div class="flex items-center justify-between ">
            <span class="text-3xl font-bold text-neutral-700 text-opacity-80 line-through">$699</span>
            <a href="#" class="text-white bg-[#1A6E09] hover:bg-green-600   font-medium rounded-xl text-sm px-5 py-2.5 text-center">Add to Favorite</a>
        </div>
</div>
</div>
    `
    ;
})
trending.innerHTML = proItem;






