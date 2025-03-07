const GetElementForHomePage = async () => {
    try{
        const res = await fetch("but your api here",{
            method:"GET",
            header:{
                "Content-Type" : "application/json"
            }
        })
        if(!res.ok){
            throw new Error ("لم يتم جلب البيانات!!!")
        }
        const data = await res.json();
        return data
    }catch(error){
        throw (error || "هناك مشكلة في جلب البيانات")
    }
}

export default GetElementForHomePage