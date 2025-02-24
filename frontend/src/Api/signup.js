const signUp = async (userData) => {
  try{
    const res = await fetch("api.link",{
      method:"POST",
      header:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(userData),
    })
    if(!res.ok){
      throw new Error(data.message || "فشل تسجيل الدخول!")
    }
    const data = await res.json()
    return data
    
  }catch(err){
    throw (err)
  }
}

export default signUp