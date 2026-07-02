import { useState } from "react";
import { employees } from "../../data/employees";
import "../Common/Modal.css";

const RATINGS = ["Beginner", "Intermediate", "Advanced", "Expert"];
const CATEGORIES = ["Technical", "Soft Skill", "Leadership", "Domain Knowledge"];

export function AddSkillModal({ onClose, onCreate }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(RATINGS[1]);
  const [category, setCategory] = useState(CATEGORIES[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ name, rating, category, approval: "Pending" });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="card modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="card-title">Add skill</div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="modal-form">
            <label>
              Skill name
              <input value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g. React" />
            </label>
            <label>
              Rating
              <select value={rating} onChange={(e) => setRating(e.target.value)}>
                {RATINGS.map((r) => (
                  <option key={r} value={r}>
                    {r}
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
            <div className="modal-actions">
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn">
                Add skill
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function ScheduleMeetingModal({ onClose, onCreate }) {
  const [participant, setParticipant] = useState(employees[0]?.name || "");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [agenda, setAgenda] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate({ participant, date, time, agenda });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="card modal-card modal-card-wide" onClick={(e) => e.stopPropagation()}>
        <div className="card-title">Schedule 1:1 meeting</div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="modal-form">
            <label>
              With
              <select value={participant} onChange={(e) => setParticipant(e.target.value)}>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.name}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Date
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>
            <label>
              Time
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </label>
            <label>
              Agenda
              <textarea value={agenda} onChange={(e) => setAgenda(e.target.value)} placeholder="What do you want to discuss?" />
            </label>
            <div className="modal-actions">
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn">
                Schedule meeting
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export function NewPlanModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(title);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="card modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="card-title">Create growth plan</div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="modal-form">
            <label>
              Plan title
              <input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="e.g. FY26 growth plan" />
            </label>
            <div className="modal-actions">
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="btn">
                Create plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
