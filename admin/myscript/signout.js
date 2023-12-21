function signOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
  
   // Redirect to the login page
    window.location.href = '/admin/features/login.html'; 
  }
  function cancel() {
    // Clear all items from localStorage
    localStorage.clear();
    
    // Redirect to the sign-out page
    window.location.href = '/admin/features/home.html';
}