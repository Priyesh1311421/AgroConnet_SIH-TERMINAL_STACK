import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [title, setTitle] = useState('');
    const [rate, setRate] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    // Fetch products on component mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/addProduct');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Handle form submission
    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            const newProduct = { title, rate, description, imageURL };
            await axios.post('http://localhost:5000/addProduct', newProduct);
            // Refresh product list
            const response = await axios.get('http://localhost:5000/products');
            setProducts(response.data);
            // Clear form fields
            setTitle('');
            setRate('');
            setDescription('');
            setImageURL('');
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Product Manager</h1>

            {/* Form to add new products */}
            <form onSubmit={handleAddProduct} className="mb-6">
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Rate</label>
                    <input
                        type="text"
                        value={rate}
                        onChange={(e) => setRate(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                        type="text"
                        value={imageURL}
                        onChange={(e) => setImageURL(e.target.value)}
                        className="border rounded p-2 w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded"
                >
                    Add Product
                </button>
            </form>

            {/* Display products */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product._id} className="bg-white p-4 rounded-lg shadow-md">
                        <img
                            src={product.imageURL}
                            alt={product.title}
                            className="w-full h-32 object-cover rounded"
                        />
                        <h3 className="text-xl font-bold mt-2">{product.title}</h3>
                        <p className="text-gray-700">{product.description}</p>
                        <p className="text-green-700 font-bold mt-2">${product.rate} per unit</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductManager;
