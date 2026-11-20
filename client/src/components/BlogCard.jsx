import "./BlogCard.css";

function BlogCard({ blog }) {
  return (
    <article className="blog-card">
      <img src={blog.image} alt={blog.title} />

      <div className="blog-card-content">
        <span className="blog-category">{blog.category}</span>

        <h3>{blog.title}</h3>

        <p>{blog.description}</p>

        <div className="blog-author">
          <span>{blog.author}</span>
          <span>{blog.date}</span>
        </div>
      </div>
    </article>
  );
}

export default BlogCard;
