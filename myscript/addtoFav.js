'use strict'
const newRow = ({ images, title, oriPrice, discPrice, percPrice, discType, stars }) => {
    return `
      <tr class=" border-b dark:border-gray-700" >
        <td scope="row" class="flex justify-center items-center px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
          <img src="${images}" alt="" class="h-20 w-20 bg-gray-500">
          <span class="flex justify-center mx-auto">${title}</span>
        </td>
        <td class="px-6 py-4">
          ${oriPrice}
          <p>original</p>
        </td>
        <td class="px-6 py-4">
          ${discPrice}
          <p>${percPrice}</p>
        </td>
        <td class="px-6 py-4">
          ${discType}
        </td>
        <td class="px-6 py-4 text-[#FF9E37] text-lg">
          ${stars}
        </td>
        <td class="px-6 py-4 text-right">
        <button class="px-4 py-2 rounded-lg bg-red-600 text-[#FFFFFF] text-sm"  onclick="removeDataFromARow(this)">Remove</button>
        </td>
      </tr>
    `;
  };
  // Fetch API to send a request to your server and add a new row
  fetch('/jsondata/addtoFav.json', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => {
      console.log('Server response:', data);
  
      const displayFavList = document.getElementById('addtoFav');
      const newRowData = data.favourite;
  
      // Use .innerHTML to replace the content with the new row
      displayFavList.innerHTML = newRowData.map(pro => newRow(pro)).join('');
    })
    .catch(error => {
      console.error('Error:', error);
    });
  
  
// Function to remove data from a row (customize this function based on your requirements)
function removeDataFromRows() {
  const rowToRemove = document.querySelector('#addtoFav');
  if (rowToRemove) {
    rowToRemove.remove();
    console.log('Data removed from row');
  } else {
    console.warn('Row not found. Data not removed from UI.');
  }

  console.log('Removing data from row');
  
  fetch('/jsondata/addtofav.json', {
    // method: 'DELETE',
    // headers: {
    //   'Content-Type': 'application/json',
    //   // Add any additional headers if needed
    // },
    // No need for a body in a DELETE request
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Server response:', data);
    const removeAllData = data.favourite;
    removeAllData.favourite = [];
    console.log(removeAllData);
  
  })
  .catch(error => {
    console.error('Error:', error);
  });
}


// remove by a row
// function removeDataFromARow(button) {
//   const rowToRemove = button.closest('tr');
//   if (rowToRemove) {
//     // Remove the row from the UI
//     rowToRemove.parentNode.removeChild(rowToRemove);
//     // Send a request to the server to delete the corresponding data
//     fetch('/jsondata/addtoFav.json', {
//       // method: 'DELETE',
      
//     })
//       .then(response => response.json())
//       .then(data => {
//         // catch data that remove 
//         console.log('Server response:', data);
//       })
//       .catch(error => {
//         console.error('Error:', error);
//       });

//     console.log('Data removed from row');
//   } else {
//     console.warn('Row not found. Data not removed.');
//   }
//   console.log('Removing data from row');
// }
function removeDataFromARow(button) {
  const rowToRemove = button.closest('tr');
  if (rowToRemove) {
    // Get the data associated with the row
    //const rowData = getRowData(rowToRemove);
     // Assuming you have a function to retrieve the data from the row
    
    // Send a request to the server to delete the corresponding data
    fetch('/jsondata/addtoFav.json', {
      // method: 'POST', // Use POST instead of DELETE
       //body: JSON.stringify({ action: 'delete', data: rowData }),
       // Pass the data and an action in the request body
      // headers: {
      //   'Content-Type': 'application/json'
      // }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Server response:', data);
        // Handle the server response if needed
        // Remove the row from the UI after successful deletion
        rowToRemove.parentNode.removeChild(rowToRemove);
        console.log('Data removed from row');
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle the error if needed
      });
  }
}

function getRowData(row) {
  const cells = row.querySelectorAll('td');
  const rowData = {
    images: cells[0].querySelector('img').src,
    title: cells[1].textContent,
    oriPrice: cells[2].textContent,
    discPrice: cells[3].textContent,
    percPrice: cells[4].textContent,
    discType: cells[5].textContent,
    stars: cells[6].textContent,
  };
  return rowData;
}
