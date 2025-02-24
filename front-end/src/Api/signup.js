const signUp = async (userData) => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { // Fix the header property to 'headers'
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userData), // Send the body data correctly as JSON
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.message || "فشل تسجيل الدخول!"); // Return error message from API if available
    }
    
    const data = await res.json();
    return data; // Return response data on success
    
  } catch (err) {
    throw err; // Rethrow the error if it occurs
  }
};

export default signUp;
