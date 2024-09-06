const express = require('express');
const {
    getBlogs,
    getBlog,
    createBlog,
    updateBlog,
    deleteBlog,
    addLike,
    addComment
} = require('../controllers/BlogControllers');
const router = express.Router();

// Route to get all blogs
router.get('/', getBlogs);

// Route to get a blog by ID
router.get('/:id', getBlog);

// Route to create a new blog
router.post('/', createBlog);

// Route to update a blog
router.put('/:id', updateBlog);

// Route to delete a blog
router.delete('/:id', deleteBlog);

// Route to add a like to a blog
router.post('/:id/like', addLike);

// Route to add a comment to a blog
router.post('/:id/comment', addComment);

module.exports = router;