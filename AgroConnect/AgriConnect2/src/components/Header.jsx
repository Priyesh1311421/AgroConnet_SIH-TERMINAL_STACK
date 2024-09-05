import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUserPlus, faSignInAlt, faUser, faEnvelope, faCog, faSignOutAlt, faBars, faTimes, faSeedling, faBox, faShoppingBag, faPen, faCartArrowDown } from '@fortawesome/free-solid-svg-icons';
import { boolAtom } from './Loged';
import { useRecoilValue } from 'recoil';

const Header = () => {
    const [side, setSide] = useState(false);
    // const [verified, setVerified] = useState(true);

    function setUp() {
        setSide(!side);
    }
    const verified = useRecoilValue(boolAtom);
    // console.log(verified)


    const [isHovered, setHovered] = useState(false);
    const toggleHover = () => {
        setHovered(!isHovered);
    };

    return (
        <header className="flex items-center justify-between bg-green-600 p-4 h-20 w-full">
            {/* Logo Section */}
            {/* <div className="text-white text-xl font-bold">
                AgriConnect
            </div> */}

            <div className="flex items-center justify-between p-0 sm:p-1 ">
                {/* Agriculture Icon for Mobile View */}
                <div className="block ">
                    <FontAwesomeIcon icon={faSeedling} className="text-white text-3xl sm:p-0" />
                </div>

                {/* Text for Desktop View */}
                <div className="hidden md:block text-white text-xl font-bold">
                    AgriConnect
                </div>

                {/* Other content like menu, buttons */}
                <div>
                    {/* Example: Menu or buttons */}
                </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="flex sm:space-x-4 space-x-3 ">
                <Link to="/" className="text-white hover:underline  md:text-xl sm:text-lg ">Home</Link>
                <Link to="/marketplace" className="text-white hover:underline  md:text-xl sm:text-lg ">Marketplace</Link>
                <Link to="/chatbot" className="text-white hover:underline   md:text-xl sm:text-lg ">Chatbot</Link>
                <Link to="/speakeasy" className="text-white hover:underline   md:text-xl sm:text-lg ">SpeakEasy</Link>
            </nav>
            {/* <HeaderWithCompletePanel/> */}

            {/* Profile Section */}
            {verified ? (
                <>
                    {/* <div>
                        <button onClick={setUp} className="text-white hover:underline">Profile</button>
                    </div> */}
                    {/* <ProfileButton /> */}

                    <div 
                        className="relative flex items-center justify-center" 
                        onMouseEnter={toggleHover} 
                        onMouseLeave={toggleHover}
                    >
                        {/* Profile Icon */}
                        <button 
                            onClick={setUp} 
                            className={`text-white transition-transform duration-300 ${
                                isHovered ? 'transform scale-110' : ''
                            }`}
                        >
                            <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
                        </button>

                        {/* Hover Text */}
                        {isHovered && (
                            <span className="absolute top-full mt-2 text-sm text-white bg-blue-600 px-2 py-1 rounded shadow-lg transform transition-opacity duration-300 opacity-100">
                                Profile
                            </span>
                        )}
                    </div>
                


                    {side && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={setUp}></div>}

                    <div className={`fixed right-0 top-0 h-full sm:w-80 w-48 bg-white shadow-lg transform transition-transform ease-in-out duration-300 z-50 ${side ? 'translate-x-0' : 'translate-x-full'}`}>
                        <div className="p-4">
                            <h2 className="text-2xl font-semibold mb-4">Your Account</h2>
                            <ul className="space-y-4">
                                <li className="flex items-center">
                                    <FontAwesomeIcon icon={faUser} className="text-purple-800" />
                                    <span className="ml-2">Username: Irshad</span>
                                </li>
                                <li className="flex items-center">
                                    <FontAwesomeIcon icon={faEnvelope} className="text-purple-800" />
                                    <span className="ml-2">Email: irshad@gmail.com</span>
                                </li>
                                <li className="flex items-center">
                                    <FontAwesomeIcon icon={faCartArrowDown} className="text-purple-800 hover:underline" />
                                    <span className="ml-2"><a href='/userProducts'>My Products</a></span>
                                </li>
                                <li className="flex items-center">
                                    <FontAwesomeIcon icon={faPen} className="text-purple-800 hover:underline" />
                                    <span className="ml-2"><a href='/userPosts'>My Posts</a></span>
                                </li>
                                <li className="flex items-center">
                                    <FontAwesomeIcon icon={faCog} className="text-purple-800 hover:underline" />
                                    <span className="ml-2">Settings</span>
                                </li>
                                <li className="flex items-center">
                                    <FontAwesomeIcon icon={faSignOutAlt} className="text-purple-800 hover:underline" />
                                    <span className="ml-2"><a href='/login'>Logout</a></span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </>
            ) : (
                // <div className="flex items-center justify-end space-x-4 p-4 bg-blue-600 mt-5">
                //     <Link to="/signup" className="flex items-center text-white hover:text-gray-200">
                //         <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                //         <p className="font-medium">Signup</p>
                //     </Link>
                //     <Link to="/login" className="flex items-center text-white hover:text-gray-200">
                //         <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                //         <p className="font-medium">Login</p>
                //     </Link>
                // </div>
                <HeaderWithAuthPanel/>
            )}
        </header>
    );
};



// PROFILE BUTTON------
// PROFILE BUTTON------
// PROFILE BUTTON------

function ProfileButton() {
    const [isHovered, setHovered] = useState(false);

    const toggleHover = () => {
        setHovered(!isHovered);
    };

    return (
        <div 
            className="relative flex items-center justify-center" 
            onMouseEnter={toggleHover} 
            onMouseLeave={toggleHover}
        >
            {/* Profile Icon */}
            <button 
                onClick={setUp} 
                className={`text-white transition-transform duration-300 ${
                    isHovered ? 'transform scale-110' : ''
                }`}
            >
                <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
            </button>

            {/* Hover Text */}
            {isHovered && (
                <span className="absolute top-full mt-2 text-sm text-white bg-blue-600 px-2 py-1 rounded shadow-lg transform transition-opacity duration-300 opacity-100">
                    Profile
                </span>
            )}
        </div>
    );
}








function HeaderWithAuthPanel() {
    const [isAuthPanelOpen, setAuthPanelOpen] = useState(false);

    const toggleAuthPanel = () => {
        setAuthPanelOpen(!isAuthPanelOpen);
    };

    return (
        <div className=" p-1 flex items-center justify-between">
            {/* Logo or Left side content */}
            {/* <div className="text-white font-bold"></div> */}

            {/* Toggle Button for Mobile View */}
            <button onClick={toggleAuthPanel} className="md:hidden text-white">
                <FontAwesomeIcon icon={faBars} className="w-8 h-8" />
            </button>

            {/* Desktop Links (hidden on mobile) */}
            <div className="hidden md:flex items-center justify-end space-x-4">
                <Link to="/signup" className="flex items-center text-white hover:text-gray-200">
                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                    <p className="font-medium">Signup</p>
                </Link>
                <Link to="/login" className="flex items-center text-white hover:text-gray-200">
                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                    <p className="font-medium">Login</p>
                </Link>
            </div>

            {/* Background Overlay for Mobile */}
            {isAuthPanelOpen && (
                <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={toggleAuthPanel}></div>
            )}

            {/* Sliding Side Panel (Mobile View) */}
            <div className={`fixed right-0 top-0 h-full w-60 bg-white shadow-lg transform transition-transform ease-in-out duration-300 z-50 ${isAuthPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
                    <ul className="space-y-4">
                        <li className="flex items-center">
                            <FontAwesomeIcon icon={faUserPlus} className="text-purple-800" />
                            <Link to="/signup" className="ml-2 text-blue-600 hover:underline" onClick={toggleAuthPanel}>Signup</Link>
                        </li>
                        <li className="flex items-center">
                            <FontAwesomeIcon icon={faSignInAlt} className="text-purple-800" />
                            <Link to="/login" className="ml-2 text-blue-600 hover:underline"onClick={toggleAuthPanel}>Login</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Header;
