import { useState } from "react";
import { Link } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import PageTabs from "../components/Common/PageTabs";
import Avatar from "../components/Common/Avatar";
import { notInYetToday, teamCalendar, peers } from "../data/team";
import "./MyTeam.css";

const TABS = ["SUMMARY"];
const CALENDAR_DAYS = Array.from({ length: 28 }, (_, i) => i + 1);
const MONTHS = ["May 2026", "Jun 2026", "Jul 2026", "Aug 2026", "Sep 2026"];
const LEGEND = [
  { label: "Work from home", color: "#748ffc" },
  { label: "On duty", color: "#f06595" },
  { label: "Paid Leave", color: "#63e6be" },
  { label: "Unpaid Leave", color: "#ced4da" },
  { label: "Weekly off", color: "#f5c451" },
  { label: "Holiday", color: "#51cf66" },
];

function MyTeam() {
  const [activeTab, setActiveTab] = useState("SUMMARY");
  const [monthIndex, setMonthIndex] = useState(2);

  return (
    <>
      <PageTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <div className="page-body my-team-page">
        <div className="my-team-top-row">
          <div className="card">
            <div className="card-body my-team-off-today">Who is off today</div>
            <div className="my-team-off-banner">No employee is off today.</div>
          </div>
          <div className="card">
            <div className="card-title">Not in yet today</div>
            <div className="card-body my-team-avatars">
              {notInYetToday.map((person) => (
                <Avatar key={person.name} initials={person.initials} color={person.color} />
              ))}
              <span className="my-team-more">+5 more</span>
            </div>
          </div>
        </div>

        <div className="my-team-stats-row">
          <div className="stat-card">
            <div className="stat-label">Employees On Time today</div>
            <div className="stat-value">0</div>
          </div>
          <div className="stat-card" style={{ borderLeftColor: "var(--color-danger)" }}>
            <div className="stat-label">Late Arrivals today</div>
            <div className="stat-value">1</div>
            <Link to="/org" className="stat-link">View Employees</Link>
          </div>
          <div className="stat-card" style={{ borderLeftColor: "var(--color-success)" }}>
            <div className="stat-label">Work from Home / On Duty today</div>
            <div className="stat-value">2</div>
            <Link to="/org" className="stat-link">View Employees</Link>
          </div>
          <div className="stat-card">
            <div className="stat-label">Remote Clock-ins today</div>
            <div className="stat-value">0</div>
          </div>
        </div>

        <div className="card my-team-calendar-card">
          <div className="card-title">Team calendar</div>
          <div className="card-body">
            <div className="my-team-calendar-nav">
              <button
                aria-label="Previous month"
                disabled={monthIndex === 0}
                onClick={() => setMonthIndex((i) => Math.max(0, i - 1))}
              >
                <FiChevronLeft />
              </button>
              <span>{MONTHS[monthIndex]}</span>
              <button
                aria-label="Next month"
                disabled={monthIndex === MONTHS.length - 1}
                onClick={() => setMonthIndex((i) => Math.min(MONTHS.length - 1, i + 1))}
              >
                <FiChevronRight />
              </button>
            </div>
            <div className="my-team-calendar-grid">
              {teamCalendar.map((member) => (
                <div key={member.name} className="my-team-calendar-row">
                  <span className="my-team-calendar-name">{member.name}</span>
                  <div className="my-team-calendar-days">
                    {CALENDAR_DAYS.map((day) => (
                      <span key={day} className="my-team-calendar-day">{day}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="my-team-legend">
              {LEGEND.map((item) => (
                <span key={item.label} className="my-team-legend-item">
                  <i style={{ background: item.color }} /> {item.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <h4 className="section-heading">Peers ({peers.length})</h4>
        <div className="my-team-peers-grid">
          {peers.map((peer) => (
            <div key={peer.email} className="card my-team-peer-card">
              <div className="card-body">
                <div className="my-team-peer-header">
                  <Avatar initials={peer.initials} color={peer.color} />
                  <span className="badge badge-success">{peer.status}</span>
                </div>
                <div className="my-team-peer-name">{peer.name}</div>
                <div className="my-team-peer-role">{peer.role}</div>
                <div className="my-team-peer-detail">Location: {peer.location}</div>
                <div className="my-team-peer-detail">Department: {peer.department}</div>
                <div className="my-team-peer-detail">Email: {peer.email}</div>
                <div className="my-team-peer-detail">Mobile: {peer.mobile}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyTeam;
