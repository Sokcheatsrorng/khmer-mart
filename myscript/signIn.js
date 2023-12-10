function handleSignInClick() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rememberMe = document.getElementById('remember').checked;
  
    // Simulate a successful sign-in for demonstration purposes
    alert('Sign-in successful! Welcome to Khmer Mart!');
  
    // In a real scenario, replace the alert with a fetch request to your server
    fetch('/jsondata/signin.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password,
        rememberMe: rememberMe,
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the server response, which might include a token
        console.log('Server Response:', data);
  
        // Update the link to display the username
        const signInLink = document.getElementById('signInLink');
        if (signInLink) {
          signInLink.textContent = email;
          signInLink.removeAttribute('onclick'); // Remove the onclick attribute
        }
      })
      .catch(error => console.error('Error:', error));
  }

  