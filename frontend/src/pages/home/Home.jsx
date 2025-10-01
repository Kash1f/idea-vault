import "./Home.css"

const Home = () => {
  const features = [
    {
      icon: "📝",
      title: "Organize Your Ideas",
      description:
        "Add, update, and delete startup ideas with categories, target audience, and priority to keep everything structured.",
    },
    {
      icon: "🚀",
      title: "Track Startup Progress",
      description:
        "Mark ideas as draft, research, in development, testing, launched, or archived to follow their lifecycle.",
    },
    {
      icon: "📊",
      title: "Evaluate Market Fit",
      description:
        "Rate market difficulty on a 1–5 scale and define revenue models to assess feasibility before building.",
    },
    {
      icon: "👥",
      title: "Private or Shareable",
      description:
        "Keep your ideas private or toggle them public to share with others and get valuable feedback.",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO at TechFlow",
      content:
        "IdeaVault transformed our development process. We're have started our startup journey faster than ever.",
      rating: 5,
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Developer at InnovateCorp",
      content:
        "The best decision I have made, launched 5 startups in 3 months which took years before.",
      rating: 5,
    },
    {
      name: "Emily Watson",
      role: "Product Manager at StartupXYZ",
      content:
        "Finally, a platform where I can write and manage my ideas without being distracted by other stuff.",
      rating: 5,
    },
  ];

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--background)" }}>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            {/* Logo */}
            <div className="logo">
              <span className="logo-text">💡IdeaVault</span>
            </div>

            {/* Navigation */}
            <nav className="nav">
              <a href="#features" className="nav-link">
                Features
              </a>
              <a href="#testimonials" className="nav-link">
                Testimonials
              </a>
              <a href="#contact" className="nav-link">
                Contact
              </a>
            </nav>

            <div className="header-buttons">
              <a href="/login" className="btn btn-ghost btn-hidden-sm">
                Sign In
              </a>
              <a href="/register" className="btn btn-primary">
                Register
              </a>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              {/* Main Headline */}
              <h1 className="hero-title">
                The complete platform to write and track startup{" "}
                <span className="hero-accent">ideas</span>
              </h1>

              {/* Description */}
              <p className="hero-description">
                Your toolkit to stop configuring and start innovating.
              </p>

              {/* CTA Buttons */}
              {/* <div className="hero-buttons">
                <a href="#" className="btn btn-primary btn-lg">
                  Get a demo
                  <span className="ml-2">→</span>
                </a>
                <a href="#" className="btn btn-outline btn-lg">
                  <span className="mr-2">▶</span>
                  Watch Demo
                </a>
              </div> */}

              {/* Stats Grid */}
              {/* <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-number">50+ days</div>
                  <div className="hero-stat-label">saved on setup</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">99% faster</div>
                  <div className="hero-stat-label">deployment time</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">500% increase</div>
                  <div className="hero-stat-label">in productivity</div>
                </div>
                <div className="hero-stat">
                  <div className="hero-stat-number">10x faster</div>
                  <div className="hero-stat-label">to market</div>
                </div>
              </div> */}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="section section-alt">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">
                Everything you need to build better
              </h2>
              <p className="section-description">
                Powerful features designed to accelerate your development
                workflow and scale your business.
              </p>
            </div>

            <div className="features-grid">
              {features.map((feature, index) => (
                <div key={index} className="card">
                  <div className="card-content">
                    <div className="feature-icon">
                      <span style={{ fontSize: "1.5rem" }}>{feature.icon}</span>
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Trusted by thousands of teams</h2>
              <p className="section-description">
                See what our customers are saying about their experience with
                IdeaVault.
              </p>
            </div>

            <div className="testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card">
                  <div className="card-content">
                    <div className="testimonial-stars">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <span key={i} style={{ color: "var(--accent)" }}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="testimonial-content">
                      "{testimonial.content}"
                    </p>
                    <div className="testimonial-author">
                      <div>
                        <div className="testimonial-name">
                          {testimonial.name}
                        </div>
                        <div className="testimonial-role">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-grid">
              {/* Logo and Description */}
              <div>
                <div className="footer-brand">
                  <div className="logo">
                    <span className="logo-text">💡IdeaVault</span>
                  </div>
                </div>
                <p className="footer-description">
                  The complete platform to track your startup ideas. Built for
                  individuals that want to innovate fast and build better.
                </p>
                <div className="footer-social">
                  <a href="#">🐦</a>
                  <a href="#">📧</a>
                  <a href="#">💼</a>
                  <a href="#">📧</a>
                </div>
              </div>

              {/* Product Links */}
              <div className="footer-section">
                <h3>Product</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#">Features</a>
                  </li>
                  <li>
                    <a href="#">Pricing</a>
                  </li>
                  <li>
                    <a href="#">Documentation</a>
                  </li>
                  <li>
                    <a href="#">API Reference</a>
                  </li>
                </ul>
              </div>

              {/* Company Links */}
              <div className="footer-section">
                <h3>Company</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Blog</a>
                  </li>
                  <li>
                    <a href="#">Careers</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom">
              <p className="footer-copyright">
                © 2025 IdeaVault. All rights reserved.
              </p>
              <div className="footer-legal">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
