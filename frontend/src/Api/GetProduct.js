const GetProduct = async (id) => {
  try {
    const res =await fetch("but your Api here", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id})
    });
    if (!res.ok) {
      throw new Error("لم يتم جلب البيانات");
    }
     const data = await res.json()
     return data
  } catch (error) {
    throw new Error(error.message || "حدث خطاء اثناء جلب البيانات");
  }
};

export default GetProduct