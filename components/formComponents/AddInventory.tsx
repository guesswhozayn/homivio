import React, { useState } from 'react'

const initialState = {
  name: '', brand: '', price: '', categories: [], image: '', description: '', currentInventory: ''
}

function AddInventory() {
  const [formData, setFormData] = useState(initialState);

  const clearForm = () => {
    setFormData(initialState);
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setFormData(prev => ({ ...prev, image: file || '' }));
    // const storageUrl = await Storage.put('example.png', file, {
    //     contentType: 'image/png'
    // })
    // setFormData(prev => ({ ...prev, image: storageUrl }));
  };

  const addItem = async () => {
    const { name, brand, price, categories, image, description, currentInventory } = formData;
    if (!name || !brand || !price || !categories.length || !description || !currentInventory || !image) return;
    // add to database
    clearForm();
  };

  const {
    name, brand, price, categories, image, description, currentInventory
  } = formData;

  return (
    <div>
      <h3 className="text-3xl">Add Item</h3>
      <div className="flex flex-1 justify-center">
        <div className="w-full max-w-144">
          <form className="bg-white shadow-xs rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Item name
              </label>
              <input
              onChange={onChange}
              value={name} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="name" type="text" placeholder="Item name" name="name" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                Item price
              </label>
              <input
              onChange={onChange}
              value={price} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="text" placeholder="Item price" name="price" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                Item Description
              </label>
              <input
              onChange={onChange}
              value={description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Item Description" name="description" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="item image">
                Item image
              </label>
              <input
                type="file"
                onChange={(e) => onImageChange(e)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="currentInventory">
                In stock
              </label>
              <input
              onChange={onChange}
              value={currentInventory} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="currentInventory" placeholder="Items in stock" name="currentInventory" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categories">
                Item categories
              </label>
              <input
              onChange={onChange}
              value={categories} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="categories" placeholder="Comma separated list of item categories" name="categories" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
                Item brand
              </label>
              <input
              onChange={onChange}
              value={brand} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="brand" placeholder="Item brand" name="brand" />
            </div>
            <div className="flex items-center justify-between mt-4">
              <button onClick={addItem} className="bg-primary hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                Add Item
              </button>
              <a onClick={clearForm} className="inline-block align-baseline font-bold text-sm" href="#">
                Clear Form
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddInventory