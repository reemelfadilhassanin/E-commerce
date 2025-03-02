const DeleteItem = async (id) => {
    try {
        const res = await fetch("but your api here",{
            method:"DELETE",
            headers:{
                "Content-Type" :"application/json"
            },
            body:JSON.stringify(id),
        })

        const data = await res.json();

        if(!res.ok){
            throw new Error(data.mesage)
        }

    } catch (error) {
        throw error        
    }

}

export default DeleteItem