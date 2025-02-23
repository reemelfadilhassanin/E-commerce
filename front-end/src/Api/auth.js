export const signIn = async (userData) => {
    const res = fetch ("",{
        method:'POST',
        headers:{
         'Content-Type': 'application/json',   
        },
        body:JSON.stringify(userData)
    });

    const data = await res.json()

    if(!res.ok){
        throw new Error(data.message);
    }

    return data;

}