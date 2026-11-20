import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import "./Home.css";
import Footer from "../components/Footer";

function Home() {
  const blogs = [
    {
      id: 1,
      category: "Technology",
      title: "The Future of Artificial Intelligence",
      description: "Explore how AI is changing the way we work, learn and live.",
      author: "Rahul Sharma",
      date: "Nov 15, 2026",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800"
    },
    {
      id: 2,
      category: "Development",
      title: "Why Every Developer Should Learn React",
      description: "Learn why React is one of the most popular frontend libraries.",
      author: "Priya Singh",
      date: "Nov 14, 2026",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800"
    },
    {
      id: 3,
      category: "Education",
      title: "The Power of Learning New Skills",
      description: "Small learning habits can create big opportunities in life.",
      author: "Aman Verma",
      date: "Nov 12, 2026",
      image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800"
    }
  ];

  return (
    <>
      <Navbar />

      <main className="home-page">

        <section className="hero-section">
          <div className="hero-content">
            <span className="hero-tag">WELCOME TO BLOGSPACE</span>

            <h1>
              Share Your Ideas.
              <br />
              <span>Inspire The World.</span>
            </h1>

            <p>
              Discover interesting stories, share your knowledge,
              and connect with people through the power of writing.
            </p>

            <div className="hero-buttons">
              <a href="/register" className="primary-btn">
                Start Writing →
              </a>

              <a href="#explore" className="secondary-btn">
                Explore Blogs
              </a>
            </div>
          </div>

          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900"
              alt="Writing on a desk"
            />
          </div>
        </section>

        <section className="blogs-section" id="explore">
          <div className="section-heading">
            <div>
              <span className="section-tag">OUR CONTENT</span>
              <h2>Latest Stories</h2>
              <p>Explore ideas and stories from our community.</p>
            </div>

            <a href="#explore" className="view-all">
              View All →
            </a>
          </div>

          <div className="blogs-grid">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}

export default Home;
