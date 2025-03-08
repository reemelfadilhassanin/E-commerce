const AddProduct = async (dataOfProduct) => {
  try {
    const formData = new FormData();

    
    if (!dataOfProduct.name || !dataOfProduct.type || !dataOfProduct.price || !dataOfProduct.state || !dataOfProduct.description) {
      throw new Error("All fields are required.");
    }

    
    formData.append('name', dataOfProduct.name);
    formData.append('type', dataOfProduct.type);

    
    const price = parseFloat(dataOfProduct.price);
    if (isNaN(price)) {
      throw new Error("Invalid price value.");
    }
    formData.append('price', price);

    
    const state = dataOfProduct.state === 'متوفر' ? 'متوفر' : 'غير متوفر';
    formData.append('state', state);

    formData.append('description', dataOfProduct.description);

    
    if (dataOfProduct.image) {
      formData.append('image', dataOfProduct.image);
    }

   
    for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    
    const res = await fetch('http://localhost:5000/api/admin/add', {
      method: 'POST',
      body: formData, 
    });

    
    if (!res.ok) {
      const data = await res.json();
      console.error('Error:', data.message || 'Unknown error');
      throw new Error('Failed to submit product. Server responded with ' + res.status);
    }

   
    const data = await res.json();
    console.log('Response:', data.message || 'Product added successfully');
    return data;

  } catch (error) {
    console.error('Error adding product:', error.message || error);
    throw error;
  }
};

export default AddProduct;
