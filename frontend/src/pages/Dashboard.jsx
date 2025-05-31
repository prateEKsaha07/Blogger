import { Link } from "react-router-dom";
import ShowPosts from "./ShowPosts";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Welcome to your dashboard!
      </p>
      <Link
        to="/create-post"
        className="mt-6 px-4 py-2 text-white bg-gray-600 rounded hover:bg-gray-700">
        {" "}
        create post
      </Link>
      {/* Add more dashboard content here */}
      <ShowPosts />
    </div>
  );
}
