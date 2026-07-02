import { useState } from "react";
import "./Modal.css";

function ChangePasswordModal({ onClose }) {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="card modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="card-title">Change password</div>
        <div className="card-body">
          {submitted ? (
            <>
              <p style={{ fontSize: 13 }}>Your password has been updated.</p>
              <button className="btn" onClick={onClose}>
                Done
              </button>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="modal-form">
              <label>
                Current password
                <input type="password" required />
              </label>
              <label>
                New password
                <input type="password" required minLength={8} />
              </label>
              <label>
                Confirm new password
                <input type="password" required minLength={8} />
              </label>
              <div className="modal-actions">
                <button type="button" className="btn btn-outline" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn">
                  Update password
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;
