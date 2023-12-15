function handleSignInClick() {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const rememberMe = document.getElementById('remember').checked;

  fetch('https://cms.istad.co/api/auth/local', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identifier: email,
      password: password,
    }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Server Response:', data);

      if (data.jwt) {
        // Successful authentication, handle accordingly
        alert('Signed in successfully');
        // You might want to store the token securely and handle redirection here
        window.location.href = '/src/index.html';
      } else {
        // Handle authentication failure
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

    // $(document).ready(function () {
    //     // Function to get URL parameters
    //     function getUrlParameter(name) {
    //       name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    //       var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    //       var results = regex.exec(location.search);
    //       return results === null
    //         ? ''
    //         : decodeURIComponent(results[1].replace(/\+/g, ' '));
    //     }
      
    //     // Check for the login parameter in the URL
    //     var loginStatus = getUrlParameter('login');
      
    //     // Check if the toast has already been shown
    //     var toastShown = sessionStorage.getItem('toastShown');
      
    //     // Display a toast message if login was successful
    //     if (loginStatus === 'success' && !toastShown) {
    //       toastr.success('Login successful! Welcome.', 'Success', {
    //         closeButton: true, // Display close button
    //         timeOut: 5000, // Close the toast after 5 seconds (adjust as needed)
    //         extendedTimeOut: 1000, // Increase the extended time for the close button
    //       });
      
    //       // Set a flag in sessionStorage to indicate that the toast has been shown
    //       sessionStorage.setItem('toastShown', 'true');
    //     }
      
    //     const passwordInput = $('#password');
    //     const togglePasswordButton = $('#togglePassword');
      
    //     togglePasswordButton.on('click', function () {
    //       const type =
    //         passwordInput.attr('type') === 'password' ? 'text' : 'password';
    //       passwordInput.attr('type', type);
      
    //       // Change the label text based on the password visibility
    //       const buttonText = type === 'password' ? 'Show' : 'Hide';
    //       togglePasswordButton.text(buttonText);
    //     });
    //   });
    //   function submitForm() {
    //     // Get input values
    //     var username = $('#username').val();
    //     var password = $('#password').val();
      
    //     // Prepare data for AJAX request
    //     var data = {
    //       identifier: username,
    //       password: password,
    //     };
      
    //     // Make AJAX request to the login API
    //     $.ajax({
    //       type: 'POST',
    //       url: 'https://cms.istad.co/api/auth/local',
    //       data: JSON.stringify(data),
    //       contentType: 'application/json',
    //       success: function (response) {
    //         console.log(response.user);
    //         // Check if login was successful
    //         if (response) {
    //           // Store the token in local storage or a cookie for future requests
    //           localStorage.setItem('token', response.jwt);
    //           localStorage.setItem('id', response.user.id);
    //           // Redirect to the home page or perform other actions
    //           window.location.href = '/src/index.html?login=success';
    //         } else {
    //           // Show toastr notification for login failure
    //         }
    //       },
    //       error: function (error) {
    //         console.error('Error during login:', error);
    //         toastr.error('Login failed. Please check your username and password.');
    //       },
    //     });
    //   }
  