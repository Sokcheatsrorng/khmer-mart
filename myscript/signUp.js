function handleSignUpClick() {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('remember').checked;
    //catch all data that input
    const userData = {
      firstName,
      lastName,
      email,
      password,
      rememberMe,
    };
    console.log(userData)
    window.location.href = '/src/index.html';
    // fetch('/jsondata/signup.json', {
    //   method: 'GET',
    // //   headers: {
    // //     'Content-Type': 'application/json',
    // //   },
    // //   body: JSON.stringify(userData),
    // })
    //   .then(response => {
    //     if (!response.ok) {
    //       const errorMessage = response.statusText || 'Unknown error';
    //       throw new Error(errorMessage);
    //     }
    //     return response.json();
    //   })
    //   .then(data => {
    //     if (data.userSignUp && data.userSignUp.length > 0) {
    //       alert('Account created! Please check your email for verification.');
    //       window.location.href = '/src/index.html';
    //     } else {
    //       alert(data.message || 'Signup failed. Please try again');
    //     }
    //   })
    //   .catch(error => console.error('Error:', error));
  }
  