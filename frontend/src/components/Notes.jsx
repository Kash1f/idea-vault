"use client"

import { useState } from "react"
import "./Notes.css"

const Notes = () => {
  const [notes, setNotes] = useState([])
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "Draft",
  })
  const [openMenuId, setOpenMenuId] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim() || !formData.content.trim()) return

    const newNote = {
      id: Date.now(),
      title: formData.title,
      content: formData.content,
      status: formData.status,
      createdAt: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }

    setNotes((prev) => [newNote, ...prev])
    setFormData({ title: "", content: "", status: "Draft" })
  }

  const handleDelete = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id))
    setOpenMenuId(null)
  }

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  const getStatusClass = (status) => {
    switch (status) {
      case "In Progress":
        return "status-in-progress"
      case "Archived":
        return "status-archived"
      default:
        return "status-draft"
    }
  }

  return (
    <div className="notes-container">
      <div className="notes-header">
        <h1 className="notes-title">Notes App</h1>
        <p className="notes-subtitle">Organize your thoughts and ideas</p>
      </div>

      <div className="notes-form-container">
        <form className="notes-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter note title..."
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your note content here..."
              className="form-input form-textarea"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="status" className="form-label">
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="form-select"
            >
              <option value="Draft">Draft</option>
              <option value="In Progress">In Progress</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Create Note
          </button>
        </form>
      </div>

      {notes.length === 0 ? (
        <div className="empty-state">
          <h3 className="empty-state-title">No notes yet</h3>
          <p className="empty-state-description">Create your first note using the form above</p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-header">
                <h3 className="note-title">{note.title}</h3>
                <div className="note-menu">
                  <button className="menu-button" onClick={() => toggleMenu(note.id)} aria-label="Note options">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="5" r="2" />
                      <circle cx="12" cy="12" r="2" />
                      <circle cx="12" cy="19" r="2" />
                    </svg>
                  </button>
                  {openMenuId === note.id && (
                    <div className="menu-dropdown">
                      <button className="menu-item delete" onClick={() => handleDelete(note.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <p className="note-content">{note.content}</p>

              <div className="note-footer">
                <span className={`note-status ${getStatusClass(note.status)}`}>{note.status}</span>
                <span className="note-date">{note.createdAt}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Notes
