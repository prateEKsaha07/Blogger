import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const UpdatePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [image, setImage] = useState('');
    const [tags, setTags] = useState('');
    const [category, setCategory] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);
                setTitle(data.title);
                setBody(data.body);
                setImage(data.image);
                setTags(data.tags.join(', '));
                setCategory(data.category);
            } catch (error) {
                console.error('Error fetching post:', error.response?.data || error);
            }
        };

        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put(
                `http://localhost:5000/api/posts/${id}`,
                {
                    title,
                    body,
                    image,
                    tags: tags.split(',').map(tag => tag.trim()),
                    category,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            alert('Post updated successfully!');
            navigate('/posts');
        } catch (error) {
            console.error('Error updating post:', error.response?.data || error);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4 mt-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Update Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <textarea
                    placeholder="Body"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full p-2 border rounded"
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Update Post
                </button>
            </form>
        </div>
    );
};

export default UpdatePost;
