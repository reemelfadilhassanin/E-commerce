export const signIn = async (userData) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        throw new Error(data.message || "فشل تسجيل الدخول!");
      }
      return data;
    } catch (error) {
      throw error;
    }
  };
  