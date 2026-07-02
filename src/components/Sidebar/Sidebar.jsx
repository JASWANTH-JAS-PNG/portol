import { NavLink } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiInbox,
  FiUsers,
  FiDollarSign,
  FiBriefcase,
  FiMessageCircle,
  FiLifeBuoy,
  FiTrendingUp,
} from "react-icons/fi";
import "./Sidebar.css";

const NAV_ITEMS = [
  { label: "Home", to: "/", icon: FiHome },
  {
    label: "Me",
    to: "/me/attendance",
    icon: FiUser,
    children: [
      { label: "Attendance", to: "/me/attendance" },
      { label: "Timesheet", to: "/me/attendance" },
      { label: "Leave", to: "/me/attendance" },
      { label: "Performance", to: "/performance" },
      { label: "Expenses & Travel", to: "/me/attendance" },
      { label: "Helpdesk", to: "/helpdesk" },
      { label: "Apps", to: "/me/attendance" },
    ],
  },
  { label: "Inbox", to: "/inbox", icon: FiInbox, badge: 6 },
  { label: "My Team", to: "/my-team", icon: FiUsers },
  {
    label: "My Finances",
    to: "/my-finances",
    icon: FiDollarSign,
    children: [
      { label: "Summary", to: "/my-finances" },
      { label: "My Pay", to: "/my-finances" },
      { label: "Manage Tax", to: "/my-finances" },
    ],
  },
  {
    label: "Org",
    to: "/org",
    icon: FiBriefcase,
    children: [
      { label: "Employees", to: "/org" },
      { label: "Documents", to: "/org" },
      { label: "Engage", to: "/engage" },
    ],
  },
  {
    label: "Engage",
    to: "/engage",
    icon: FiMessageCircle,
    children: [
      { label: "Announcements", to: "/engage" },
      { label: "Polls", to: "/engage" },
      { label: "Articles", to: "/engage" },
    ],
  },
  {
    label: "Helpdesk",
    to: "/helpdesk",
    icon: FiLifeBuoy,
    children: [
      { label: "My Tickets", to: "/helpdesk" },
      { label: "Following", to: "/helpdesk" },
    ],
  },
  {
    label: "Performance",
    to: "/performance",
    icon: FiTrendingUp,
    children: [
      { label: "KRAs", to: "/performance" },
      { label: "1:1 Meetings", to: "/performance" },
      { label: "Skills", to: "/performance" },
      { label: "Growth", to: "/performance" },
    ],
  },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <nav>
        <ul className="sidebar-list">
          {NAV_ITEMS.map(({ label, to, icon: Icon, badge, children }) => (
            <li key={label} className="sidebar-item">
              <NavLink
                to={to}
                end={to === "/"}
                className={({ isActive }) => `sidebar-link${isActive ? " active" : ""}`}
              >
                <span className="sidebar-icon">
                  <Icon />
                  {badge ? <span className="sidebar-badge">{badge}</span> : null}
                </span>
                <span className="sidebar-label">{label}</span>
              </NavLink>

              {children && (
                <ul className="sidebar-flyout">
                  {children.map((child) => (
                    <li key={child.label}>
                      <NavLink to={child.to}>{child.label}</NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
