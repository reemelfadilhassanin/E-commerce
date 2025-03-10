import { Link } from 'react-router-dom';
import { useState } from 'react';
import { AddProductImage } from '../../public/Assets/exporting';
import { useAddProduct } from '../components/hooks/UseAddProduct';
import UseError from '../components/ui/useError';
import UseSuccess from '../components/ui/useSuccess';

function AddProduct() {
  const [success, setSuccess] = useState(false);
  const [erroring, setErroring] = useState(false);
  const { mutate, isLoading, error } = useAddProduct({
    onSuccess: (message, data) => {
      console.log(message, data);
      setSuccess(true);
      setFormData({
        name: '',
        type: '',
        price: '',
        state: '',
        description: '',
        image: null,
      });
    },
    onError: (message, errorMessage) => {
      console.log(message, errorMessage);
      setErroring(true);
    },
  });

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    price: '',
    state: '',
    description: '',
    image: null,
  });

  const [urlImg, setUrlImg] = useState('');

  const imgHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type === 'image/png' || file.type === 'image/jpeg') {
        setFormData({ ...formData, image: file });
        const url = URL.createObjectURL(file);
        setUrlImg(url);
      } else {
        alert('الرجاء اختيار صورة بتنسيق PNG أو JPG.');
        setUrlImg('');
      }
    } else {
      setUrlImg('');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      setFormData({ ...formData, image: file });
      const url = URL.createObjectURL(file);
      setUrlImg(url);
    } else {
      alert('الرجاء اختيار صورة بتنسيق PNG أو JPG.');
      setUrlImg('');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.state ||
      !formData.type ||
      !formData.image
    ) {
      alert('جميع الحقول مطلوبة');
      return;
    }

    const formDataToSubmit = {
      name: formData.name,
      description: formData.description,
      price: formData.price,
      state: formData.state,
      type: formData.type.split(','),
      image: formData.image, // Ensure the image is handled correctly
    };

    console.log('Submitting form data:', formDataToSubmit);

    try {
      await mutate(formDataToSubmit); // Use mutate with the JSON data
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <>
      {erroring && (
        <UseError error={error?.message || 'An error occurred'} x={false} />
      )}
      {success && <UseSuccess signworld="تم اضافة المنتج" />}

      <form
        className="w-full min-h-[calc(100vh-10rem)]"
        onSubmit={submitHandler}
      >
        <div className="grid grid-cols-5 max-sm:grid-cols-1 gap-4">
          <div className="sm:col-span-2 xl:col-span-2">
            <div className="p-4 w-full h-fit rounded-xl shadow-[1px_0px_20px_rgba(0,0,0,0.2),-4px_0px_10px_rgba(0,0,0,0.2)] bg-white text-black">
              <h2 className="mt-6 text-xl font-semibold">تفاصيل المنتج</h2>
              <div className="flex flex-col gap-2 mt-4 mb-4">
                <label>اسم المنتج</label>
                <input
                  className="rounded-md border-[2px] border-[#eeeeee] bg-[#F8F8F8] p-[6px] h-[40px] focus:outline-0 focus:border-[#7F2881]"
                  required
                  value={formData.name}
                  name="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label>الصنف</label>
                <input
                  className="rounded-md border-[2px] border-[#eeeeee] bg-[#F8F8F8] p-[6px] h-[40px] focus:outline-0 focus:border-[#7F2881]"
                  required
                  value={formData.type}
                  name="type"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label>السعر</label>
                <input
                  className="rounded-md border-[2px] border-[#eeeeee] bg-[#F8F8F8] p-[6px] h-[40px] focus:border-[#7F2881] focus:outline-0"
                  required
                  value={formData.price}
                  name="price"
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="">الحالة</label>
                <select
                  onChange={(e) => {
                    handleInputChange(e);
                  }}
                  className="rounded-md border-[2px]  border-[#eeeeee] bg-[#F8F8F8] p-[6px] h-[40px] focus:border-[#7F2881] focus:outline-0"
                  required
                  id="price"
                  name="state"
                >
                  <option value="غير متوفر">غير متوفر</option>
                  <option value="متوفر">متوفر</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label>الوصف</label>
                <textarea
                  className="rounded-md border-[2px] border-[#eeeeee] bg-[#F8F8F8] p-[6px] focus:border-[#7F2881] focus:outline-0 h-[146px] resize-none"
                  value={formData.description}
                  name="description"
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-3 xl:col-span-3 p-4 w-full h-fit rounded-xl shadow-[1px_0px_20px_rgba(0,0,0,0.2),-4px_0px_10px_rgba(0,0,0,0.2)]">
            <div className="w-full h-[18rem] border-[10px] border-[#FAFAFA] bg-[#FAFAFA] rounded-md">
              {urlImg && (
                <img
                  className="bg-[#dfdfdf] w-full h-full rounded-md object-cover"
                  src={urlImg}
                  alt="Product Preview"
                />
              )}
            </div>
            <div
              className="h-fit rounded-md border-2 border-dashed border-[#636b6a] w-full mt-4 p-4 flex items-center flex-col gap-8 text-center"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <img src={AddProductImage} className="w-[40px]" />
              <p>
                اختر صورة بتنسيق Png, Jpg
                <br />
                أو قم بالسحب والإفلات
              </p>
              <div>
                <label
                  className="border-1 py-2 px-10 rounded-md cursor-pointer w-fit"
                  htmlFor="Browse"
                >
                  Browse
                </label>
                <input
                  type="file"
                  name="file"
                  className="hidden"
                  onChange={imgHandler}
                  id="Browse"
                />
              </div>
            </div>
            <div className="w-full bg-[#FAFAFA] rounded-md h-[4rem] mt-4 flex justify-between p-2 items-center flex-row gap-4">
              <div>
                <img
                  className="w-[50px] h-[50px] bg-[#00000020] rounded-md object-cover"
                  src={urlImg || 'default-image.png'} // Fallback image
                />
              </div>
              <div className="flex flex-col flex-1 gap-2">
                <p>اسم المنتج</p>
                <div className="w-full h-[2px] bg-[#DFDFDF] rounded-md">
                  <span className="h-full w-[70%] rounded-l-md block bg-[#7F2881]"></span>
                </div>
              </div>

              <div className="w-[50px] h-[50px] flex justify-center items-center">
                <i className="fa-solid fa-circle-check text-[#7F2881]"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 max-sm:grid-cols-1 gap-4">
          <div className="col-span-2 flex justify-start items-center mt-10 gap-2">
            <input
              type="submit"
              value={`${isLoading ? 'انتظر' : 'إضافة'}`}
              className={`block w-full py-2 border-[.5px] rounded-lg text-white bg-[#7F2881] cursor-pointer`}
              disabled={isLoading}
            />
            <Link
              to="/admin"
              className="block text-center w-full py-2 border-[.5px] rounded-lg bg-[#FAF6FA] border-[#7F2881] cursor-pointer"
            >
              إلغاء
            </Link>
          </div>
        </div>
      </form>
    </>
  );
}

export default AddProduct;
