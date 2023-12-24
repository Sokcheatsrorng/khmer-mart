
document.addEventListener("DOMContentLoaded", function () {
  function getUrlParameter(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    var results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  }

  // Check for the login parameter in the URL
  var loginStatus = getUrlParameter("login");
  // Check if the toast has already been shown
  var toastShown = sessionStorage.getItem("toastShown");
  // Display a toast message if login was successful
  if (loginStatus === "success" && !toastShown) {
    toastShown.success("Login successful! Welcome.", "Success", {
      closeButton: true,
      timeOut: 5000,
      extendedTimeOut: 1000,
    });
    // Set a flag in sessionStorage to indicate that the toast has been shown
    sessionStorage.setItem("toastShown", "true");
  }
});

// Function to update the navbar based on the sign-in status
const updateNavbar = () => {
  const isUserSignedIn = localStorage.getItem("token") !== null;
  const signInLink = document.getElementById("signInLink");
  const profileLink = document.createElement("li");
  profileLink.id = "profileLink";

  if (isUserSignedIn) {
    // User is signed in, show profile image
    profileLink.innerHTML = `<a href="/src/profile.html" 
      class="block py-2 px-0 text-[#1A6E09]  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#363636]  md:p-0    hover:text-[#FF9E37] md:dark:hover:bg-transparent">
      <img class="w-8 h-8 rounded-full" src="/Img/Sokcheat_pic.png"
        alt="user photo"></a>`;
    signInLink.replaceWith(profileLink);
  } else {
    // User is not signed in, show sign-in link
    profileLink.innerHTML = `<a href="/src/signIn.html" 
      class="block py-2 px-0 text-[#1A6E09]  hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#363636]  md:p-0    hover:text-[#FF9E37] md:dark:hover:bg-transparent">
      Sign In</a>`;
    signInLink.replaceWith(profileLink);
  }
};
// Call the updateNavbar function on page load
window.addEventListener("load", updateNavbar);

// Function to handle form submission
function submitForm() {
  // Get input values
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Prepare data for fetch request
  var data = {
    identifier: username,
    password: password,
  };

  // Make fetch request to the login API
  fetch("https://cms.istad.co/api/auth/local", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((response) => {
      console.log(response.user);
      // Check if login was successful
      if (response) {
        // Store the token in local storage or a cookie for future requests
        localStorage.setItem("token", response.jwt);
        localStorage.setItem("id", response.user.id);
        // Call updateNavbar after successful login
        updateNavbar();
        // Redirect to the home page or perform other actions
        window.location.href = "/src/index.html?login=success";
      } else {
        alert("You cannot sign In!!");
      }
    })
    .catch((error) => {
      console.error("Error during login:", error);
      toastr.error("Login failed. Please check your username and password.");
    });
}

