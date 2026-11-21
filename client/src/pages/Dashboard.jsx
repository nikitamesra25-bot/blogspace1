import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const user = JSON.parse(localStorage.getItem("user") || "null");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleDelete = async (blogId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_URL}/api/blogs/${blogId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to delete blog");
      }

      setBlogs((previousBlogs) =>
        previousBlogs.filter((blog) => blog._id !== blogId)
      );
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${API_URL}/api/blogs`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to fetch blogs");
        }

        const myBlogs = data.blogs.filter(
          (blog) => blog.author?._id === user?.id
        );

        setBlogs(myBlogs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [navigate, user?.id]);

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <Link to="/" className="dashboard-logo">
          Blog<span>Space.</span>
        </Link>

        <div className="dashboard-user">
          <span>Welcome, {user?.name || "User"}!</span>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <main className="dashboard-container">
        <section className="dashboard-welcome">
          <div>
            <p className="dashboard-tag">YOUR PERSONAL SPACE</p>
            <h1>My Dashboard</h1>
            <p>Manage your stories and share new ideas.</p>
          </div>

          <Link to="/create-blog" className="create-blog-btn">
            + Create New Blog
          </Link>
        </section>

        <section className="dashboard-stats">
          <div className="stat-card">
            <h3>{blogs.length.toString().padStart(2, "0")}</h3>
            <p>Total Blogs</p>
          </div>

          <div className="stat-card">
            <h3>{blogs.length.toString().padStart(2, "0")}</h3>
            <p>Published Blogs</p>
          </div>

          <div className="stat-card">
            <h3>00</h3>
            <p>Drafts</p>
          </div>
        </section>

        <section className="my-blogs-section">
          <h2>My Blogs</h2>

          {loading && <p>Loading blogs...</p>}
          {error && <p>{error}</p>}

          {!loading && !error && blogs.length === 0 && (
            <div className="empty-blogs">
              <h3>No blogs yet!</h3>
              <p>Start writing your first story today.</p>

              <Link to="/create-blog" className="create-blog-btn">
                Create Your First Blog
              </Link>
            </div>
          )}

          {!loading && blogs.length > 0 && (
            <div className="dashboard-blog-list">
              {blogs.map((blog) => (
                <div className="dashboard-blog-card" key={blog._id}>
                  {blog.image && (
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="dashboard-blog-image"
                    />
                  )}

                  <div className="dashboard-blog-info">
                    <span>{blog.category}</span>

                    <Link to={`/blog/${blog._id}`}>
                      <h3>{blog.title}</h3>
                    </Link>

                    <p>
                      {blog.content.length > 150
                        ? blog.content.slice(0, 150) + "..."
                        : blog.content}
                    </p>

                    <small>
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </small>

                    <div className="blog-actions">
                      <Link
                        to={`/edit-blog/${blog._id}`}
                        className="edit-btn"
                      >
                        Edit
                      </Link>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(blog._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
