import { useState } from "react";
import axios from "axios";

export default function CreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: "",
    tags: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create a post.");
      return;
    }

    const form = new FormData();
    form.append("title", formData.title);
    form.append("body", formData.body);
    form.append("category", formData.category);
    form.append("tags", formData.tags);
    if (imageFile) {
      form.append("image", imageFile);
    }

    try {
      await axios.post("http://localhost:5000/api/posts", form, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("✅ Post created successfully!");
      alert("Post created successfully!");
      setFormData({
        title: "",
        body: "",
        category: "",
        tags: "",
      });
      setImageFile(null);
    } catch (err) {
      setError(err.response?.data?.message || "❌ Failed to create post. Try again.");
      alert("Failed to create post. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Create a New Post</h2>

      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
      {success && <p className="text-green-500 mb-2 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Body</label>
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Category</label>
          <input
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Tags (comma separated)</label>
          <input
            name="tags"
            type="text"
            value={formData.tags}
            onChange={handleChange}
            className="w-full mt-1 p-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Image</label>
          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Create Post
        </button>
      </form>
    </div>
  );
}
