import React, { useState, useEffect } from 'react';

const Dashboard = () => {
    // State variables to store user information
    const [userName, setUserName] = useState('John Doe');
    const [balance, setBalance] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);

    // Use useEffect to simulate fetching data from an API
    useEffect(() => {
        // Simulate fetching user data
        const fetchUserData = async () => {
        // Here, you would normally fetch data from an API
        // For this example, we use static data

        const userData = {
            name: 'John Doe',
            balance: 1200,
            orders: [
            { id: 1234, date: '2024-08-24', status: 'Shipped', total: 50 },
            { id: 5678, date: '2024-08-23', status: 'Delivered', total: 100 },
            ],
        };

        // Update state with fetched data
        setUserName(userData.name);
        setBalance(userData.balance);
        setRecentOrders(userData.orders);
        };

        fetchUserData();
    }, []);

    return (
        <div className="container mx-auto p-4">
        <header className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold">Welcome back, {userName}!</h1>
            <button className="px-4 py-2 bg-blue-500 text-white rounded">Profile</button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Balance Card */}
            <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold">Balance</h2>
            <p className="text-2xl font-bold">${balance}</p>
            <button className="mt-2 px-4 py-2 bg-green-500 text-white rounded">Add Funds</button>
            </div>

            {/* Recent Orders Card */}
            <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <ul>
                {recentOrders.map(order => (
                <li key={order.id} className="flex justify-between py-2 border-b">
                    <span>Order #{order.id}</span>
                    <span>{order.status}</span>
                </li>
                ))}
            </ul>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">View All Orders</button>
            </div>
        </div>

        {/* Additional Dashboard Features */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Favorites/Shortcuts */}
            <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold">Favorites</h2>
            <ul>
                <li className="py-1">Shortcut 1</li>
                <li className="py-1">Shortcut 2</li>
            </ul>
            </div>

            {/* Messages/Announcements */}
            <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold">Messages</h2>
            <p>New Feature Update</p>
            </div>

            {/* Calendar/Events */}
            <div className="p-4 bg-white shadow rounded">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
            <p>No events scheduled</p>
            </div>
        </div>
        </div>
    );
};

export default Dashboard;
