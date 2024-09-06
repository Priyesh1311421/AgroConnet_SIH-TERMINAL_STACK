import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import CreateBlog from './components/CreateBlog';
import Chatbot from './components/Chatbot';

const App = () => {
    const farmerId = localStorage.getItem('farmerId');

    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                {/* <Header /> */}
                <main className="p-4">
                    <Routes>
                        <Route path="/" element={<BlogList farmerId={farmerId} />} />
                        <Route path="/blogs/:id" element={<BlogDetail />} />
                        {farmerId && <Route path="/create" element={<CreateBlog />} />}
                        <Route path='/chatbot' element={<Chatbot/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

const Header = () => {
    return (
        <header className="bg-blue-600 text-white p-4 sticky top-0 flex justify-between items-center">
            <h1 className="text-3xl">Blog Application</h1>
        </header>
    );
};

export default App;