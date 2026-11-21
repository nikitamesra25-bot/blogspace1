import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./BlogDetails.css";

const API_URL = import.meta.env.VITE_API_URL;

function BlogDetails() {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        setBlog(data.blog);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <div className="details-page">Loading blog...</div>;
  }

  if (error || !blog) {
    return (
      <div className="details-page">
        <p>{error || "Blog not found"}</p>
        <Link to="/dashboard">Back to Dashboard</Link>
      </div>
    );
  }

  return (
    <div className="details-page">

      <header className="details-header">
        <Link to="/" className="details-logo">
          Blog<span>Space.</span>
        </Link>

        <Link to="/dashboard" className="details-back">
          ← Dashboard
        </Link>
      </header>

      <main className="details-container">

        <Link to="/dashboard" className="details-home-link">
          ← Back to Dashboard
        </Link>

        <article className="details-article">

          <span className="details-category">
            {blog.category}
          </span>

          <h1>{blog.title}</h1>

          <div className="details-meta">
            <span>By {blog.author?.name || "Unknown Author"}</span>

            <span>
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>

          {blog.image && (
            <img
              className="details-image"
              src={blog.image}
              alt={blog.title}
            />
          )}

          <div className="details-content">
            <p>{blog.content}</p>
          </div>

        </article>

      </main>
    </div>
  );
}

export default BlogDetails;
