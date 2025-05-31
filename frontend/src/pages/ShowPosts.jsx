import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ShowPosts() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const loggedInUserId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('http://localhost:5000/api/posts', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPosts(response.data);
                console.log('LoggedInUserId:', loggedInUserId);
    // console.log('Post Author:', post.author);
            } catch (err) {
                console.error('Error fetching posts:', err);
                setError('Failed to load posts.');
            }
        };

        fetchPosts();
    }, []);

    const handleDelete = async (postId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPosts(posts.filter(post => post._id !== postId));
            console.log('Post deleted:', postId);
            alert('Post deleted successfully!');
            navigate('/');
        } catch (err) {
            console.error('Error deleting post:', err);
            setError('Failed to delete post.');
        }
    };

    if (error) return <div className="text-center text-red-500 mt-4">{error}</div>;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {posts.map(post => (
                <div key={post._id} className="border rounded-lg shadow p-4 flex flex-col">
                    <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                    <img src={`http://localhost:5000/${post.image}`} alt={post.title} className="rounded mb-2" />
                    <p className="text-sm text-gray-600 mb-2">{post.category}</p>
                    <p className="flex-1">{post.body.substring(0, 100)}...</p>
                    <div className="mt-2 text-sm text-gray-500">
                        Author: {post.author.username}
                    </div>

                    {loggedInUserId === post.author._id && (
                        <div className="mt-4 flex space-x-2">
                            <button
                                onClick={() => navigate(`/update/${post._id}`)}
                                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(post._id)}
                                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
