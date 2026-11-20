import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CreateBlog.css";

function CreateBlog() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          category,
          image,
          content,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Blog could not be created");
      }

      setMessage("Blog published successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-page">
      <header className="create-header">
        <Link to="/" className="create-logo">
          Blog<span>Space.</span>
        </Link>

        <Link to="/dashboard" className="back-link">
          ← Back to Dashboard
        </Link>
      </header>

      <main className="create-container">
        <div className="create-heading">
          <span>SHARE YOUR IDEAS</span>
          <h1>Create a New Blog</h1>
          <p>Write something interesting and share it with the world.</p>
        </div>

        <form className="create-form" onSubmit={handleSubmit}>
          <div className="create-field">
            <label>Blog Title</label>
            <input
              type="text"
              placeholder="Enter an attractive blog title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="create-field">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>Select a category</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Development">Development</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="create-field">
            <label>Cover Image URL</label>
            <input
              type="url"
              placeholder="Paste your image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="create-field">
            <label>Blog Content</label>
            <textarea
              rows="10"
              placeholder="Start writing your story..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea>
          </div>

          {message && <p>{message}</p>}

          <div className="create-actions">
            <Link to="/dashboard" className="cancel-btn">
              Cancel
            </Link>

            <button
              type="submit"
              className="publish-btn"
              disabled={loading}
            >
              {loading ? "Publishing..." : "Publish Blog →"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default CreateBlog;
