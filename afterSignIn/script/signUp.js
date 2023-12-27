function handleSignUpClick() {
  const username = document.getElementById("username").value
  const email = document.getElementById("email").value
  const password = document.getElementById("password").value

  const userData = {
    username,
    email,
    password,
  };
  fetch("https://cms.istad.co/api/auth/local/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      console.log("Response:", response);
      if (!response.ok) {
        // Check if the response contains JSON
        return response.json().then((errorData) => {
          const errorMessage = errorData.message || "Unknown error";
          throw new Error(errorMessage);
        });
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data:", data);
      if (data.user) {
        alert("Account created! Please check your email for verification.");
        //console.log(userData);
        setTimeout(() => {
          window.location.replace('/afterSignIn')
        }, 1000);
      } else {
        alert(data.message || "Signup failed. Please try again");
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
      alert("Signup failed. Please try again.");
    });
}
