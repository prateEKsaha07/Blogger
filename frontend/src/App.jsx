import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import PostForm from "./components/CreateForm";
import ShowPosts from "./pages/ShowPosts";
import UpdatePost from "./pages/UpdatePost";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-post" element={<PostForm />} />
        <Route path="/posts" element={<ShowPosts />} />
        <Route path="/update/:id" element={<UpdatePost />} />
        <Route path="/" element={<Home />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
