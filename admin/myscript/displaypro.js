'use strict'
const renderCard = ({images,title,originalPrice,discountedPrice,discountType,stars})=>{
    return `
    <tr
                                        class="bg-white border-b hover:bg-gray-50">
                                        <td class="w-4 p-4">
                                            <div class="flex items-center">
                                                <input
                                                    id="checkbox-table-search-1"
                                                    type="checkbox"
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded accent-[#1A6E09] ">
                                                <label
                                                    for="checkbox-table-search-1"
                                                    class="sr-only">checkbox</label>
                                            </div>
                                        </td>
                                        <th scope="row"
                                            class="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap ">
                                            <img class="w-12 h-12 rounded-full"
                                                src="${images}"
                                                alt="Jese image">
                                            <div class="ps-3">
                                                <div
                                                    class="text-base font-semibold"> ${title}</div>
                                            </div>
                                        </th>
                                        <td class="px-6 py-4">
                                            $${originalPrice}
                                        </td>
                                        <td class="px-6 py-4">
                                           $${discountedPrice}
                                        </td>
                                        <td class="px-6 py-4">
                                          ${discountType}
                                        </td>
                                        <td class="px-6 py-4 text-2xl text-[#FF9E37]">
                                            ${stars}
                                        </td>
                                    </tr>
    `;
}

fetch('/admin/jsondata/discountpro.json', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
      const tableDisplay = document.querySelector('tbody');
      const newRowData = data.foods;
  
      // Use .innerHTML to replace the content with the new row
      tableDisplay.innerHTML = newRowData.map(pro => renderCard(pro)).join('');
    })
    .catch(error => {
      console.error('Error:', error);
    });