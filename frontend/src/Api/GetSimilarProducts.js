const GetSimilarProducts = async (type) => {
   try{
    const res = await fetch("but your api here!",{
        method:"POST",
        body:JSON.stringify(type),
    })
    if(!res.ok){
        throw new Error("لم يتم جلب البيانات هناك مشكلة في المخدم")
    }
    const data = await res.json()
    return data
   }catch (error){
    throw new Error(error.message || "هناك مشكلة في السيرفر")
   }
}

export default GetSimilarProducts