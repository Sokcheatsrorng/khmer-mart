function handleSignInClick() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const rememberMe = document.getElementById('remember').checked;

  // In a real scenario, replace the alert with a fetch request to your server
  fetch('/jsondata/signin.json', {
    // method: 'POST',
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    // body: JSON.stringify({
    //   username: email,
    //   password: password,
    //   rememberMe: rememberMe,
    // }),
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Handle the server response, which might include a token
    console.log('Server Response:', data);
    // Check if there are users in the response
    if (data.users && data.users.length > 0) {
      // Loop through the users to check credentials
      const signInDisplay = document.querySelector("#signInLink")
      for (const user of data.users) {
        if (user.username === email && user.password === password) {
          // Signed in successfully
          alert('Signed in successfully');
          const username = user.username;
          signInDisplay.innerHTML = `
          <a href="/src/signIn.html" 
          class="block py-2 px-0 text-[#1A6E09]  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#363636]  md:p-0    hover:text-[#FF9E37] md:dark:hover:bg-transparent">
          ${username}</a>
        `;
         window.location.href = '/src/index.html';
        return;
        }
      }
      // If no matching credentials were found
      alert('Invalid username or password');
    } else {
      // Handle the case where there are no users in the response
      alert('Invalid username or password');
    }
  })
  .catch(error => console.error('Error:', error));
}




  // using token to sign In with API
    // function signIn() {
    //   // Retrieve the username and password from the input fields
    //   const username = document.getElementById('username').value;
    //   const password = document.getElementById('password').value;

    //   // Make a fetch request to obtain the token from the API
    //   fetch('', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({ username, password }),
    //   })
    //   .then(response => {
    //     if (!response.ok) {
    //       throw new Error('Network response was not ok');
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     // Handle the successful response
    //     const token = data.token; // Extract the token from the response
    //     console.log('Token:', token);

    //   })
    //   .catch(error => {
      
    //     console.error('Error:', error.message);
    //   });
    // }

  