// import React, { useEffect, useState } from 'react'

// function Marketplace() {
//     const [products,setProducts] = useState([])

//     useEffect(()=>{
//         const fetchData = async ()=>{
//             try{
//                 const data = await fetch('http://localhost:5000/market_product')
//                 if(!data.ok){
//                     console.log("error in fetching the data")
//                 }
//                 console.log(data)
//                 const item = await data.json()
//                 console.log(item)
//                 setProducts(item)
//             }catch(err){
//                 console.log("error in fetching")
//             }
//         }
//         fetchData()
//     },[])
//     const handleRequestToBuy = (productId)=>{
//         console.log(`Request to buy product with ID: ${productId}`)

//         // useEffect(()=>{
//         //     const send_message_to_owner = fetch('http://localhost')
//         // },[])
//     }

//     return (
//         <>
//         {products.map(function(product){
//             return (
//                 <div key={product._id} className="flex bg-white p-4 rounded-lg shadow-md">
//                     <img src={product.imageUrl} alt={product.title} className="w-full h-32 object-cover rounded" />
//                     <h3 className="text-xl font-bold mt-2">{product.title}</h3>
//                     <p className="text-gray-700">{product.description}</p>
//                     <p className="text-green-700 font-bold mt-2">${product.rate} per unit</p>
//                     {product.Broker}
//                     <button
//                         onClick={() => handleRequestToBuy(product._id)}
//                         className="mt-4 bg-green-700 text-white py-1 px-4 rounded hover:bg-green-800"
//                     >
//                         Request to Buy
//                     </button>
//                 </div>
//             )
//         })}
//         </>
//     );
// }

// export default Marketplace;







// // 2
// import React, { useEffect, useState } from 'react'

// function Marketplace() {
//     const [products, setProducts] = useState([])

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const data = await fetch('http://localhost:5000/market_product')
//                 if (!data.ok) {
//                     console.log("Error in fetching the data")
//                 }
//                 const item = await data.json()
//                 setProducts(item)
//             } catch (err) {
//                 console.log("Error in fetching")
//             }
//         }
//         fetchData()
//     }, [])

//     const handleRequestToBuy = (productId) => {
//         console.log(`Request to buy product with ID: ${productId}`)
//     }

//     return (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
//             {products.map((product) => (
//                 <div
//                     key={product._id}
//                     className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:scale-105 duration-300"
//                 >
//                     <img
//                         src={product.imageUrl}
//                         alt={product.title}
//                         className="w-full h-40 object-cover rounded-md"
//                     />
//                     <h3 className="text-xl font-semibold mt-4 text-gray-800">{product.title}</h3>
//                     <p className="text-gray-600 mt-2">{product.description}</p>
//                     <p className="text-green-700 font-bold mt-3">${product.rate} per unit</p>
//                     <p className="text-gray-500 text-sm mt-1">Broker: {product.Broker}</p>
//                     <button
//                         onClick={() => handleRequestToBuy(product._id)}
//                         className="mt-4 bg-green-700 text-white py-2 px-5 rounded-full hover:bg-green-800 focus:outline-none transition-colors duration-300"
//                     >
//                         Request to Buy
//                     </button>
//                 </div>
//             ))}
//         </div>
//     )
// }

// export default Marketplace;




import React, { useEffect, useState } from 'react'

function Marketplace() {
    const [products, setProducts] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [quantity, setQuantity] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetch('http://localhost:5000/market_product')
                if (!data.ok) {
                    console.log("Error in fetching the data")
                }
                const item = await data.json()
                setProducts(item)
            } catch (err) {
                console.log("Error in fetching")
            }
        }
        fetchData()
    }, [])

    const handleRequestToBuy = (product) => {
        setSelectedProduct(product)
        setShowModal(true)
    }

    const handleConfirmPurchase = () => {
        console.log(`Confirm purchase of ${quantity} units of ${selectedProduct.title}`)
        // Here you can add the logic to send the purchase request to the backend
        setShowModal(false)
        setQuantity(1) // Reset the quantity
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {products.map((product) => (
                <div
                    key={product._id}
                    className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:scale-105 duration-300"
                >
                    <img
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-40 object-cover rounded-md"
                    />
                    <h3 className="text-xl font-semibold mt-4 text-gray-800">{product.title}</h3>
                    <p className="text-gray-600 mt-2">{product.description}</p>
                    <p className="text-green-700 font-bold mt-3">${product.rate} per unit</p>
                    <p className="text-gray-500 text-sm mt-1">Broker: {product.Broker}</p>
                    <button
                        onClick={() => handleRequestToBuy(product)}
                        className="mt-4 bg-green-700 text-white py-2 px-5 rounded-full hover:bg-green-800 focus:outline-none transition-colors duration-300"
                    >
                        Request to Buy
                    </button>
                </div>
            ))}

            {/* Modal */}
            {showModal && selectedProduct && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4">Buy {selectedProduct.title}</h2>
                        <p className="text-gray-600 mb-4">Price: ${selectedProduct.rate} per unit</p>
                        
                        <label className="block text-gray-700 font-medium mb-2">Quantity</label>
                        <input
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            min="1"
                            className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        />
                        
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConfirmPurchase}
                                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors"
                            >
                                Confirm Purchase
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Marketplace;
