import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { boolAtom } from './Loged';
import { useRecoilValue, useSetRecoilState } from 'recoil';




const LoginComponent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const Navigate = useNavigate()

    const setMyBoolean = useSetRecoilState(boolAtom);
    const bool = useRecoilValue(boolAtom)

    const toggleBoolean = () => {
        console.log(bool)
        setMyBoolean(prev => !prev);
        console.log(bool)
    };


    const handleLogin = async () => {
        if (!username || !password || username == "" || password == "") {
            setError('Please fill in both fields');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                body: JSON.stringify({
                    email: username,
                    password: password,
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const result = await response.json();
            if (response.ok) {
                console.log("Login successful:", result);
                Navigate('/')
                toggleBoolean()    // Call function Toggle to make TRUE & unseen Signup And LOgin tag
                console.log(bool)
                // Handle successful login here (e.g., redirect to dashboard)
            } else {
                console.error("Login failed:", result);
                setError(result.message || 'Login failed');
            }
        } catch (err) {
            console.error("Error during login:", err);
            setError('An error occurred during login');
        }
    };

    return (
        <div className="flex pt-16 justify-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg space-y-6">
                <h2 className="text-3xl font-semibold text-center text-blue-600 mb-6">Login</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {bool}
                <div className="space-y-4">
                    <div>
                        <input
                            type="email"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                        onClick={handleLogin}
                    >
                        Login
                    </button>
                    <p className='m-2'>Don't have an account? <a href='/signup' className='text-blue-600 font-medium hover:underline'>Sign Up</a></p>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
