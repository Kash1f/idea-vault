"use client";

import { useEffect, useState } from "react";
import api from "../api";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { Pen, Trash } from "lucide-react";
import Modal from "../components/Modal";

const Dashboard = () => {
  const [items, setItems] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  const [status, setStatus] = useState("draft");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("medium");
  const [marketPotential, setMarketPotential] = useState(1);
  const [targetAudience, setTargetAudience] = useState("");
  const [revenueModel, setRevenueModel] = useState("");
  const [competitionLevel, setCompetitionLevel] = useState("medium");

  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterCategory, setFilterCategory] = useState("All");
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getItems();
    getUserProfile();
  }, []);

  const getItems = async () => {
    api
      .get("/api/items/")
      .then((res) => res.data)
      .then((data) => {
        setItems(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteItem = async (id) => {
    api
      .delete(`/api/items/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Item deleted successfully");
        else alert("Failed to Delete the Item!");
        getItems();
      })
      .catch((err) => alert(err));
  };

  const createItem = async (e) => {
    e.preventDefault();

    const itemData = {
      title,
      content,
      status,
      category,
      priority,
      market_potential: marketPotential,
      target_audience: targetAudience,
      revenue_model: revenueModel,
      competition_level: competitionLevel,
    };

    api
      .post("/api/items/", itemData)
      .then((res) => {
        if (res.status === 201) {
          alert("Item added successfully!");
          setTitle("");
          setContent("");
          setStatus("draft");
          setCategory("");
          setPriority("medium");
          setMarketPotential(1);
          setTargetAudience("");
          setRevenueModel("");
          setCompetitionLevel("medium");
        } else alert("Failed to add an item!");
        getItems();
      })
      .catch((err) => alert(err));
  };

  const updateItem = async (id, formData) => {
    api
      .put(`/api/items/update/${id}/`, formData)
      .then((res) => {
        if (res.status === 200) alert("Item updated successfully");
        else alert("Failed to update the Item!");
        getItems();
      })
      .catch((err) => alert(err));
  };

  const getUserProfile = async () => {
    try {
      const res = await api.get("/api/user/profile/");
      if (res.status === 200) {
        console.log("API Response:", res.data);
        setUser(res.data);
      } else {
        alert("Failed to fetch user profile");
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      alert("Failed to fetch user profile");
    } 
  };

  // Add this to see the user state changes
  useEffect(() => {
    console.log("User state updated:", user);
  }, [user]);

  const openUpdateModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "development":
        return "status-in-development";
      case "testing":
        return "status-testing";
      case "launched":
        return "status-launched";
      case "archived":
        return "status-archived";
      default:
        return "status-draft";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "low":
        return "priority-low";
      default:
        return "priority-medium";
    }
  };

  const getMarketPotentialStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "All" || (item.status && item.status === filterStatus);
    const matchesCategory =
      filterCategory === "All" ||
      (item.category && item.category === filterCategory);
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    alert("Logged out successfully!");
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <div className="header-top">
          <div className="logo-section">
            <div className="logo">💡</div>
            <div>
              <h1 className="notes-title">IdeaVault</h1>
              <p className="notes-subtitle">
                Track, develop, and launch your startup ideas
              </p>
            </div>
          </div>
          <div className="user-section">
            <div
              className="user-profile"
              onClick={() => setShowProfile(!showProfile)}
            >
              <div className="user-avatar">{user?.username?.charAt(0) || "U"}</div>
              <div className="user-info">
                <span className="user-name">{user?.username || "User"}</span>
              </div>
              <svg
                className="chevron"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7 10l5 5 5-5z" />
              </svg>
            </div>
            {showProfile && (
              <div className="profile-dropdown">
                <button className="profile-item">Profile Settings</button>
                <button className="profile-item">Export Ideas</button>
                <button className="profile-item logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="stats-dashboard">
          <div className="stat-card">
            <div className="stat-number">{items.length}</div>
            <div className="stat-label">Total Ideas</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {items.filter((i) => i.status === "development").length}
            </div>
            <div className="stat-label">In Development</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {items.filter((i) => i.status === "launched").length}
            </div>
            <div className="stat-label">Launched</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {items.filter((i) => i.priority === "high").length}
            </div>
            <div className="stat-label">High Priority</div>
          </div>
        </div>
      </div>

      <div className="search-filter-section">
        <div className="search-bar">
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
          <input
            type="text"
            placeholder="Search ideas, content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filters">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Status</option>
            <option value="draft">Draft</option>
            <option value="research">Research Phase</option>
            <option value="planning">Planning</option>
            <option value="development">In Development</option>
            <option value="testing">Testing</option>
            <option value="launched">Launched</option>
            <option value="archived">Archived</option>
          </select>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Health">Health</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Social">Social</option>
            <option value="Gaming">Gaming</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      <div className="notes-form-container">
        <h2 className="form-title">Add New Startup Idea</h2>
        <form className="notes-form" onSubmit={createItem}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Idea Title *
              </label>
              <input
                id="title"
                name="title"
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., AI-powered fitness coach"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="category" className="form-label">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
              >
                <option value="">Select Category</option>
                <option value="Tech">Tech</option>
                <option value="Health">Health</option>
                <option value="Finance">Finance</option>
                <option value="Education">Education</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Social">Social</option>
                <option value="Gaming">Gaming</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Detailed Description *
            </label>
            <textarea
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Describe your idea, target market, unique value proposition, potential challenges..."
              className="form-input form-textarea"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status" className="form-label">
                Development Status
              </label>
              <select
                id="status"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-select"
              >
                <option value="draft">Draft</option>
                <option value="research">Research Phase</option>
                <option value="planning">Planning</option>
                <option value="development">In Development</option>
                <option value="testing">Testing</option>
                <option value="launched">Launched</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="priority" className="form-label">
                Priority Level
              </label>
              <select
                id="priority"
                name="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="form-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="marketPotential" className="form-label">
                Market Potential (1-5 stars)
              </label>
              <select
                id="marketPotential"
                name="marketPotential"
                value={marketPotential}
                onChange={(e) => setMarketPotential(Number(e.target.value))}
                className="form-select"
              >
                <option value="1">1 Star - Limited</option>
                <option value="2">2 Stars - Small</option>
                <option value="3">3 Stars - Moderate</option>
                <option value="4">4 Stars - Large</option>
                <option value="5">5 Stars - Massive</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="targetAudience" className="form-label">
                Target Audience
              </label>
              <input
                type="text"
                id="targetAudience"
                name="targetAudience"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., Young professionals, Small businesses"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="revenueModel" className="form-label">
                Revenue Model
              </label>
              <input
                type="text"
                id="revenueModel"
                name="revenueModel"
                value={revenueModel}
                onChange={(e) => setRevenueModel(e.target.value)}
                placeholder="e.g., Subscription, Freemium, One-time purchase"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="competitionLevel" className="form-label">
                Competition Level
              </label>
              <select
                id="competitionLevel"
                name="competitionLevel"
                value={competitionLevel}
                onChange={(e) => setCompetitionLevel(e.target.value)}
                className="form-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <button type="submit" className="submit-button">
            Add Idea to Vault
          </button>
        </form>
      </div>

      {filteredItems.length === 0 ? (
        <div className="empty-state">
          {items.length === 0 ? (
            <>
              <div className="empty-icon">💡</div>
              <h3 className="empty-state-title">Your IdeaVault is empty</h3>
              <p className="empty-state-description">
                Start building your startup empire by adding your first
                brilliant idea!
              </p>
            </>
          ) : (
            <>
              <div className="empty-icon">🔍</div>
              <h3 className="empty-state-title">No ideas match your search</h3>
              <p className="empty-state-description">
                Try adjusting your search terms or filters
              </p>
            </>
          )}
        </div>
      ) : (
        <>
          <div className="results-header">
            <h2>Your Ideas ({filteredItems.length})</h2>
            {searchTerm && (
              <span className="search-results">
                Showing results for "{searchTerm}"
              </span>
            )}
          </div>
          <div className="notes-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="note-card">
                <div className="note-header">
                  <div className="note-title-section">
                    <h3 className="note-title">{item.title}</h3>
                    <div className="note-meta">
                      {item.category && (
                        <span className="category-badge">{item.category}</span>
                      )}
                      {item.priority && (
                        <span
                          className={`priority-badge ${getPriorityClass(
                            item.priority
                          )}`}
                        >
                          {item.priority}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="note-menu">
                    <button
                      className="menu-button"
                      onClick={() => toggleMenu(item.id)}
                      aria-label="Idea options"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <circle cx="12" cy="5" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="19" r="2" />
                      </svg>
                    </button>
                    {openMenuId === item.id && (
                      <div className="menu-dropdown">
                        <button
                          className="menu-item delete"
                          onClick={() => deleteItem(item.id)}
                        >
                          Delete <Trash size={16} />
                        </button>
                        <button
                          className="menu-item update"
                          onClick={() => openUpdateModal(item)}
                        >
                          Update <Pen size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p className="note-content">{item.content}</p>

                {item.target_audience && (
                  <div className="additional-info">
                    <strong>Target Audience:</strong> {item.target_audience}
                  </div>
                )}

                {item.revenue_model && (
                  <div className="additional-info">
                    <strong>Revenue Model:</strong> {item.revenue_model}
                  </div>
                )}

                {item.market_potential && (
                  <div className="market-potential">
                    <span className="market-label">Market Potential:</span>
                    <div className="stars">
                      {getMarketPotentialStars(item.market_potential)}
                    </div>
                  </div>
                )}

                <div className="note-footer">
                  {item.status && (
                    <span
                      className={`note-status ${getStatusClass(item.status)}`}
                    >
                      {item.status}
                    </span>
                  )}
                  <div className="note-dates">
                    <span className="note-date">
                      Created: {new Date(item.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        item={selectedItem}
        onUpdate={updateItem}
      />
    </div>
  );
};

export default Dashboard;
