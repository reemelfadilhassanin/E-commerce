const AddProduct = async (dataOfProduct) => {
    try{
        const res = await fetch (" http://localhost:5000/api/products",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify(dataOfProduct)
        })
 
        if(!res.ok){
            throw new Error(data.message || "فشل الإرسال")
        }

        const data = await res.json()
    
        return data
    }catch(error){
        throw error
    }
}

export default AddProduct
