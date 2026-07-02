import { useState } from "react";
import "./Modal.css";

const PRIORITIES = ["Low", "Medium", "High"];
const CATEGORIES = ["IT Support", "Payroll", "Access Management", "Admin", "Other"];

function NewTicketModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("IT Support");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ title, priority, category, description });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="card modal-card modal-card-wide" onClick={(e) => e.stopPropagation()}>
        <div className="card-title">New ticket</div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="modal-form">
            <label>
              Title
              <input value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
              Priority
              <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                {PRIORITIES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Category
              <select value={category} onChange={(e) => setCategory(e.target.value)}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Description
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
            <div className="modal-actions">
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn">
                Create ticket
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewTicketModal;
