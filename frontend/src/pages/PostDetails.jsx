import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`http://localhost:5000/api/posts/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPost(response.data);
            } catch (err) {
                console.error('Error fetching post:', err);
                setError('Failed to load post.');
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/posts/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            navigate('/'); // Redirect to home after deletion
        } catch (err) {
            console.error('Error deleting post:', err);
            setError('Failed to delete post.');
        }
    };

    const loggedInUserId = localStorage.getItem('userId'); // Make sure to store userId on login

    if (error) return <div className="text-center text-red-500 mt-4">{error}</div>;
    if (!post) return <div className="text-center mt-4">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
            <img src={`http://localhost:5000/${post.image}`} alt={post.title} className="w-full rounded mb-4" />
            <p className="mb-4">{post.body}</p>
            <p className="text-sm text-gray-500 mb-2">Category: {post.category}</p>
            <p className="text-sm text-gray-500 mb-4">Tags: {post.tags.join(', ')}</p>
            <p className="text-sm text-gray-500 mb-4">Author: {post.author.username} ({post.author.email})</p>

            {loggedInUserId === post.author._id && (
                <div className="flex space-x-4">
                    <button
                        onClick={() => navigate(`/update/${id}`)}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Update
                    </button>
                    <button
                        onClick={handleDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}
