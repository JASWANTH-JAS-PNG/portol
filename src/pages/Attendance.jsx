import { useState } from "react";
import { FiLogIn, FiHome, FiFileText } from "react-icons/fi";
import PageTabs from "../components/Common/PageTabs";
import Avatar from "../components/Common/Avatar";
import { attendanceLogs } from "../data/attendanceLogs";
import "../components/Common/Modal.css";
import "./Attendance.css";

const ATTENDANCE_POLICY_TEXT =
  "Standard shift is 9 hours including a 1-hour break. Clock in within 15 minutes of your scheduled start time to avoid a late-arrival mark. Work From Home days must be marked before 10 AM.";

const TABS = ["ATTENDANCE", "TIMESHEET", "LEAVE", "PERFORMANCE", "EXPENSES & TRAVEL", "HELPDESK", "APPS"];
const LOG_TABS = ["Attendance Log", "Calendar", "Attendance Requests"];
const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const RANGES = ["30 DAYS", "JUN", "MAY", "APR", "MAR", "FEB", "JAN"];

function Attendance() {
  const [activeTab, setActiveTab] = useState("ATTENDANCE");
  const [logTab, setLogTab] = useState("Attendance Log");
  const [range, setRange] = useState("30 DAYS");
  const [clockStatus, setClockStatus] = useState(null);
  const [showPolicy, setShowPolicy] = useState(false);

  if (activeTab !== "ATTENDANCE") {
    return (
      <>
        <PageTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        <div className="page-body">
          <div className="empty-state card">
            <h4>{activeTab}</h4>
            <p>This section isn't wired up yet.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <div className="page-body">
        <div className="attendance-top-row">
          <div className="card attendance-stats-card">
            <div className="card-title">
              Attendance Stats <span className="attendance-week-select">Last Week &darr;</span>
            </div>
            <div className="card-body">
              <div className="attendance-stat-row">
                <Avatar initials="ME" color="#f5a623" size={26} />
                <span>Me</span>
                <div className="attendance-stat-numbers">
                  <div>
                    <div className="attendance-stat-label">AVG HRS / DAY</div>
                    <div className="attendance-stat-value">5h 49m</div>
                  </div>
                  <div>
                    <div className="attendance-stat-label">ON TIME ARRIVAL</div>
                    <div className="attendance-stat-value">0%</div>
                  </div>
                </div>
              </div>
              <div className="attendance-stat-row">
                <Avatar initials="MT" color="#4dabf7" size={26} />
                <span>My Team</span>
                <div className="attendance-stat-numbers">
                  <div>
                    <div className="attendance-stat-value">4h 48m</div>
                  </div>
                  <div>
                    <div className="attendance-stat-value">6%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-title">Timings</div>
            <div className="card-body">
              <div className="attendance-day-row">
                {DAYS.map((day, i) => (
                  <span key={i} className={`attendance-day${i === 2 ? " active" : ""}`}>
                    {day}
                  </span>
                ))}
              </div>
              <p className="attendance-shift-label">Today (10:00 AM - 7:30 PM)</p>
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: "60%" }} />
              </div>
              <p className="attendance-shift-caption">Duration: 9h 30m &bull; 60 min break</p>
            </div>
          </div>

          <div className="card">
            <div className="card-title">Actions</div>
            <div className="card-body">
              <div className="attendance-clock">
                <div className="attendance-clock-time">12:07 PM</div>
                <div className="attendance-clock-date">Wed, 01 Jul 2026</div>
              </div>
              {clockStatus ? (
                <div className="attendance-clock-status">{clockStatus}</div>
              ) : (
                <ul className="attendance-actions-list">
                  <li>
                    <button onClick={() => setClockStatus("Clocked in at 12:07 PM")}>
                      <FiLogIn /> Web Clock-In
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setClockStatus("Marked as Work From Home for today")}>
                      <FiHome /> Work From Home
                    </button>
                  </li>
                </ul>
              )}
              <ul className="attendance-actions-list">
                <li>
                  <button onClick={() => setShowPolicy(true)}>
                    <FiFileText /> Attendance Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="card attendance-logs-card">
          <div className="attendance-logs-header">
            <div className="attendance-logs-tabs">
              {LOG_TABS.map((tab) => (
                <button
                  key={tab}
                  className={`attendance-logs-tab${tab === logTab ? " active" : ""}`}
                  onClick={() => setLogTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
            <label className="attendance-format-toggle">
              <input type="checkbox" defaultChecked /> 24 hour format
            </label>
          </div>

          <div className="attendance-range-row">
            <span className="attendance-range-title">Last 30 Days</span>
            <div className="attendance-range-buttons">
              {RANGES.map((r) => (
                <button
                  key={r}
                  className={`attendance-range-btn${r === range ? " active" : ""}`}
                  onClick={() => setRange(r)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Attendance Visual</th>
                <th>Effective Hours</th>
                <th>Break Taken</th>
                <th>Gross Hours</th>
                <th>Arrival</th>
              </tr>
            </thead>
            <tbody>
              {attendanceLogs.map((log) => (
                <tr key={log.date}>
                  <td>
                    {log.date}
                    {log.status === "weekly-off" && <span className="badge badge-muted" style={{ marginLeft: 8 }}>W-OFF</span>}
                  </td>
                  <td>
                    {log.status === "weekly-off" ? (
                      "Full day Weekly-off"
                    ) : log.status === "none" ? (
                      "No Time Entries Logged"
                    ) : (
                      <div className="attendance-visual-bar">
                        <div className="attendance-visual-fill" style={{ width: `${log.pct}%` }} />
                      </div>
                    )}
                  </td>
                  <td>{log.effective || "-"}</td>
                  <td>{log.breakTaken || "-"}</td>
                  <td>{log.gross || "-"}</td>
                  <td>{log.arrival || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showPolicy && (
        <div className="modal-overlay" onClick={() => setShowPolicy(false)}>
          <div className="card modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="card-title">Attendance Policy</div>
            <div className="card-body">
              <p style={{ fontSize: 13, margin: "0 0 16px" }}>{ATTENDANCE_POLICY_TEXT}</p>
              <button className="btn" onClick={() => setShowPolicy(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Attendance;
