export const signIn = async (userData) => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: {
        // "Content-Type": "application/json", // Optional if not needed
      },
      credentials: 'include', // Ensure cookies are included in the request
      body: JSON.stringify(userData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Login failed!');
    }
    console.log('Login Response:', data);
    // Check if the session cookie is set after login
    // Delay the AddProduct function until cookies are set
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1000); // 1 second delay
    });
  } catch (error) {
    throw error;
  }
};
