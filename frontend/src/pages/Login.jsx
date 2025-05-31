import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Login() {
const navigate = useNavigate();
const [formData, setFormData] = useState({
    username: '',
    password: ''
});
const [error, setError] = useState('');
const [success, setSuccess] = useState('');

const handleChange = (e) => {
    setFormData({
        ...formData, [e.target.name]: e.target.value
    });
}

const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try{

        const response  = await axios.post('http://localhost:5000/api/auth/login', formData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const token = response.data.token;
        const userId = response.data._id;
        localStorage.setItem('token',token); // Store the token in localStorage
        localStorage.setItem('userId', userId); // Store the user ID in localStorage
        setSuccess(response.data.message);
        setFormData({
            username: '',
            password: ''
        });
        console.log('(frontend)Login successful:', response.data.username);
        alert('Login successful!', response.data.username);
        navigate('/Dashboard'); // Redirect to the dashboard or home page
    }catch(err) {
        console.error(err);
        console.error(err.response);
        alert('Login failed. Please try again.');
        if (err.response && err.response.data) {
            setError(err.response.data.message);
        } else {
            setError('An error occurred. Please try again.');
        }
    }
}


return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
            Blogger
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                        <input type="text" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="yourusername"
                        onChange={handleChange} required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={handleChange} required />
                    </div>
                    <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                   <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    don't have an account?{" "}
                        <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                            signup here
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
);
};
