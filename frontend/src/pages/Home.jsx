import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Welcome to Blogger</h1>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Your blogging platform for sharing ideas and stories.</p>
            <p className="mt-2 text-gray-500 dark:text-gray-300">Please log in or sign up to continue.</p>
            <div className="mt-6">
                <a href="/login" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Login</a>
                <a href="/signup" className="ml-4 px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700">Sign Up</a>
            </div>
        </div>
         </>
    );
};
