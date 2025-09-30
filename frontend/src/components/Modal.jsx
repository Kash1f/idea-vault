"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import "../styles/Modal.css";

const Modal = ({ isOpen, onClose, item, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "draft",
    category: "",
    priority: "medium",
    market_potential: 1,
    target_audience: "",
    revenue_model: "",
    competition_level: "medium",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        title: item.title || "",
        content: item.content || "",
        status: item.status || "draft",
        category: item.category || "",
        priority: item.priority || "medium",
        market_potential: item.market_potential || 1,
        target_audience: item.target_audience || "",
        revenue_model: item.revenue_model || "",
        competition_level: item.competition_level || "medium",
      });
    }
  }, [item]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "market_potential" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(item.id, formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Update Startup Idea</h2>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="modal-title" className="form-label">
                Idea Title *
              </label>
              <input
                id="modal-title"
                name="title"
                required
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., AI-powered fitness coach"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="modal-category" className="form-label">
                Category
              </label>
              <select
                id="modal-category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
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
            <label htmlFor="modal-content" className="form-label">
              Detailed Description *
            </label>
            <textarea
              id="modal-content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Describe your idea, target market, unique value proposition, potential challenges..."
              className="form-input form-textarea"
              required
              rows="4"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="modal-status" className="form-label">
                Development Status
              </label>
              <select
                id="modal-status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
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
              <label htmlFor="modal-priority" className="form-label">
                Priority Level
              </label>
              <select
                id="modal-priority"
                name="priority"
                value={formData.priority}
                onChange={handleInputChange}
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
              <label htmlFor="modal-market-potential" className="form-label">
                Market Potential (1-5 stars)
              </label>
              <select
                id="modal-market-potential"
                name="market_potential"
                value={formData.market_potential}
                onChange={handleInputChange}
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
              <label htmlFor="modal-target-audience" className="form-label">
                Target Audience
              </label>
              <input
                type="text"
                id="modal-target-audience"
                name="target_audience"
                value={formData.target_audience}
                onChange={handleInputChange}
                placeholder="e.g., Young professionals, Small businesses"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="modal-revenue-model" className="form-label">
                Revenue Model
              </label>
              <input
                type="text"
                id="modal-revenue-model"
                name="revenue_model"
                value={formData.revenue_model}
                onChange={handleInputChange}
                placeholder="e.g., Subscription, Freemium, One-time purchase"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="modal-competition-level" className="form-label">
                Competition Level
              </label>
              <select
                id="modal-competition-level"
                name="competition_level"
                value={formData.competition_level}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="update-button">
              Update Idea
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
