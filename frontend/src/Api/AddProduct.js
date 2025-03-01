const AddProduct = async (dataOfProduct) => {
    try{
        const res = await fetch ("https://api",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(dataOfProduct)
        })
 
        if(!res.ok){
            throw new Error(data.message || "فشل الإرسال")
        }

        const data = res.json()
    
        return data
    }catch(error){
        throw error
    }
}

export default AddProduct