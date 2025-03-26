// Function to set a secure cookie with HttpOnly, Secure, SameSite attributes
function setSecureCookie(name, value, expirationMinutes = 60) {
    const date = new Date();
    date.setTime(date.getTime() + (expirationMinutes * 60 * 1000)); // Set expiration date
  
    document.cookie = `${name}=${value}; path=/; expires=${date.toUTCString()}; Secure; HttpOnly; SameSite=Strict`;
  }
  
  // Store accessToken and refreshToken in cookies
  const storeTokens= ({accessToken, refreshToken})=> {
    setSecureCookie('accessToken', accessToken, 60); // Store for 60 minutes
    setSecureCookie('refreshToken', refreshToken, 1440); // Store refreshToken for 24 hours
 };

 export{
    storeTokens,
 }
  