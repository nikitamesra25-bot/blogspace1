import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./CreateBlog.css";

const API_URL = import.meta.env.VITE_API_URL;

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    content: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(
          `${API_URL}/api/blogs/${id}`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch blog");
        }

        const blog = data.blog;

        setFormData({
          title: blog.title || "",
          category: blog.category || "",
          image: blog.image || "",
          content: blog.content || "",
        });
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        `${API_URL}/api/blogs/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update blog");
      }

      setMessage("Blog updated successfully!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (loading) {
    return <p>Loading blog...</p>;
  }

  return (
    <div className="create-page">
      <header className="create-header">
        <Link to="/" className="create-logo">
          Blog<span>Space</span>
        </Link>

        <Link to="/dashboard" className="back-link">
          Back to Dashboard
        </Link>
      </header>

      <main className="create-container">
        <div className="create-heading">
          <span>UPDATE YOUR STORY</span>
          <h1>Edit Blog</h1>
          <p>Make changes to your blog and share your updated story.</p>
        </div>

        <form className="create-form" onSubmit={handleSubmit}>
          <div className="create-field">
            <label>Blog Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div className="create-field">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select category</option>
              <option value="Technology">Technology</option>
              <option value="Education">Education</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Health">Health</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="create-field">
            <label>Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Enter image URL (optional)"
            />
          </div>

          <div className="create-field">
            <label>Blog Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog..."
              rows="10"
              required
            />
          </div>

          {message && <p>{message}</p>}

          <div className="create-actions">
            <Link to="/dashboard" className="cancel-btn">
              Cancel
            </Link>

            <button type="submit" className="publish-btn">
              Update Blog
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditBlog;
