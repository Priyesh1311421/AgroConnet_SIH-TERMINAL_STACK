import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BlogList = ({ farmerId }) => {
    const [blogs, setBlogs] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const blogsPerPage = 10;
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/blogs')
            .then(response => {
                setBlogs(response.data);
                setFilteredBlogs(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching blogs:', error);
                setLoading(false);
            });
    }, []);

    const handleBlogClick = (id) => {
        navigate(`/blogs/${id}`);
    };

    const handleCreateBlog = () => {
        navigate('/create');
    };

    const debouncedSearch = useCallback(
        debounce((query) => {
            const lowerCaseQuery = query.toLowerCase();
            const filtered = blogs.filter(blog => 
                blog.title.toLowerCase().includes(lowerCaseQuery) ||
                (blog.author && `${blog.author.firstName} ${blog.author.lastName}`.toLowerCase().includes(lowerCaseQuery))
            );
            setFilteredBlogs(filtered);
            setCurrentPage(1); // Reset to first page on search
        }, 300),
        [blogs]
    );

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
    const startIndex = (currentPage - 1) * blogsPerPage;
    const currentBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-4xl font-bold">Blogs</h1>
                {farmerId && (
                    <button
                        onClick={handleCreateBlog}
                        className="bg-black text-white px-4 py-2 rounded-full shadow hover:bg-gray-800 transition-colors"
                    >
                        Create Blog
                    </button>
                )}
            </div>
            <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search by title or author"
                className="w-full p-3 mb-8 border rounded-lg"
            />
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
                {loading ? (
                    Array.from({ length: blogsPerPage }).map((_, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                            <Skeleton height={40} width={40} circle={true} className="mb-4" />
                            <Skeleton height={20} width={`60%`} className="mb-2" />
                            <Skeleton height={20} width={`80%`} className="mb-2" />
                            <Skeleton height={20} width={`90%`} className="mb-4" />
                            <Skeleton height={20} width={`30%`} />
                        </div>
                    ))
                ) : (
                    currentBlogs.map(blog => (
                        <div
                            key={blog._id}
                            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => handleBlogClick(blog._id)}
                        >
                            <div className="flex items-center mb-4">
                                {blog.author?.profilePicture ? (
                                    <img
                                        src={blog.author.profilePicture}
                                        alt={`${blog.author.firstName} ${blog.author.lastName}`}
                                        className="w-10 h-10 rounded-full mr-4"
                                    />
                                ) : (
                                    <FontAwesomeIcon icon={faUser} className="w-10 h-10 rounded-full mr-4 text-gray-500" />
                                )}
                                <div>
                                    {blog.author ? (
                                        <p className="text-gray-500 text-sm">By {blog.author.firstName} {blog.author.lastName}</p>
                                    ) : (
                                        <p className="text-gray-500 text-sm">By Unknown Author</p>
                                    )}
                                </div>
                            </div>
                            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                            <p className="text-gray-700 mb-4">{blog.description.substring(0, 100)}...</p>
                            <span className="text-blue-500 font-semibold">Read more</span>
                        </div>
                    ))
                )}
            </div>
            <div className="flex justify-center mt-8">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                >
                    <FontAwesomeIcon icon={faArrowLeft} />
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-1 rounded bg-gray-200 text-gray-700 disabled:opacity-50"
                >
                    <FontAwesomeIcon icon={faArrowRight} />
                </button>
            </div>
        </div>
    );
};

export default BlogList;