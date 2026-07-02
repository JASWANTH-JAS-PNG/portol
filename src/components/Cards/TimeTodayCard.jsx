import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TimeTodayCard.css";

const OTHER_OPTIONS = ["Work From Home", "On Duty"];

function TimeTodayCard({ date, time }) {
  const navigate = useNavigate();
  const [clockStatus, setClockStatus] = useState(null);
  const [showOtherMenu, setShowOtherMenu] = useState(false);
  const otherMenuRef = useRef(null);

  useEffect(() => {
    if (!showOtherMenu) return undefined;

    const handleClickOutside = (event) => {
      if (otherMenuRef.current && !otherMenuRef.current.contains(event.target)) {
        setShowOtherMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOtherMenu]);

  return (
    <div className="time-today-card">
      <div className="time-today-header">
        <span>Time Today - {date}</span>
        <button className="time-today-view-all" onClick={() => navigate("/me/attendance")}>
          View All
        </button>
      </div>
      <div className="time-today-label">Current Time</div>
      <div className="time-today-value">{time}</div>

      {clockStatus ? (
        <div className="time-today-status">{clockStatus}</div>
      ) : (
        <div className="time-today-actions">
          <button className="btn" onClick={() => setClockStatus(`Clocked in at ${time}`)}>
            Web Clock-In
          </button>
          <div className="time-today-other-wrap" ref={otherMenuRef}>
            <button
              className="btn time-today-other-btn"
              onClick={() => setShowOtherMenu((s) => !s)}
            >
              Other
            </button>
            {showOtherMenu && (
              <div className="time-today-other-menu">
                {OTHER_OPTIONS.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setClockStatus(`Marked as ${option} for today`);
                      setShowOtherMenu(false);
                    }}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeTodayCard;
