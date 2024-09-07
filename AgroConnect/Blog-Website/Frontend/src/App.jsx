import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import CreateBlog from './components/CreateBlog';
import Chatbot from './components/Chatbot';
import BlogManager from './components/BlogManager';
import UpdateBlog from './components/UpdateBlog';

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
                        <Route path="/manage-blogs" element={<BlogManager />} />
                        <Route path="/update/:id" element={<UpdateBlog />} />
                        <Route path='/chatbot' element={<Chatbot/>}/>
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;