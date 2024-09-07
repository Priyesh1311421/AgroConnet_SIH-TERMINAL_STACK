import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const userId = localStorage.getItem('userId') || localStorage.getItem('farmerId');
    const userType = localStorage.getItem('userId') ? 'User' : 'Farmer';

    useEffect(() => {
        axios.get(`http://localhost:3000/blogs/${id}`)
            .then(response => setBlog(response.data))
            .catch(error => console.error('Error fetching blog:', error));
    }, [id]);

    const handleLike = async () => {
        try {
            const response = await axios.post(`http://localhost:3000/blogs/${id}/like`, { userId, userType });
            setBlog(response.data);
        } catch (error) {
            console.error('Error liking blog:', error);
            if (error.response && error.response.data.message) {
                console.log(error.response.data.message);
            }
        }
    };

    if (!blog) {
        return <div>Loading...</div>;
    }

    // Ensure blog.likedBy is an array
    const likedBy = Array.isArray(blog.likedBy) ? blog.likedBy : [];

    const alreadyLiked = likedBy.some(
        (like) => like.userId === userId && like.userType === userType
    );

    return (
        <div className="container mx-auto p-4 ">
            <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
            <p>{blog.description}</p>
            <div className="mt-4 flex items-center">
                <button
                    onClick={handleLike}
                    className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 transition-colors flex items-center"
                    disabled={alreadyLiked}
                >
                    <FontAwesomeIcon icon={faThumbsUp} className="mr-2" />
                    ({blog.likes})
                </button>
            </div>
        </div>
    );
};

export default BlogDetail;