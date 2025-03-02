const ProductManagement = async () => {
    try{
        const res = await fetch("here but the api",{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
            },
        })

        const data = await res.json()

        if(!res.ok){
            throw new Error (data.message||"لم يتم جلب البيانات للأسف")
        }

return data
    }catch (error) {
        throw error
    }
}

export default ProductManagement