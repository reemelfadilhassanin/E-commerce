
const GetElementForHomePage = async (filter) => {
    const params = new URLSearchParams(filter);
    try {
        const res = await fetch(`https://your-api.com/endpoint?${params.toString()}`);
        if (!res.ok) {
            throw new Error("لم يتم جلب البيانات!!!");
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw error || "هناك مشكلة في جلب البيانات";
    }
}

export default GetElementForHomePage

