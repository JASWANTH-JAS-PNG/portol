import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiBell,
  FiUser,
  FiSun,
  FiDroplet,
  FiSettings,
  FiKey,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";
import { useAppContext, ACCENT_COLORS } from "../../context/AppContext";
import ChangePasswordModal from "../Common/ChangePasswordModal";
import { notifications as initialNotifications } from "../../data/notifications";
import "./Navbar.css";

function Navbar({ companyName = "Portol Technologies Pvt. Ltd.", userInitials = "AM" }) {
  const navigate = useNavigate();
  const { theme, setTheme, accentName, setAccentName, logout } = useAppContext();

  const [notifications, setNotifications] = useState(initialNotifications);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const actionsRef = useRef(null);

  const closeProfileMenu = () => {
    setShowProfileMenu(false);
    setExpandedSection(null);
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  useEffect(() => {
    if (!showNotifications && !showProfileMenu) return undefined;

    const handleClickOutside = (event) => {
      if (actionsRef.current && !actionsRef.current.contains(event.target)) {
        setShowNotifications(false);
        closeProfileMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showNotifications, showProfileMenu]);

  return (
    <header className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">portol</span>
        <span className="navbar-company">{companyName}</span>
      </div>

      <div className="navbar-search">
        <FiSearch className="navbar-search-icon" />
        <input type="text" placeholder="Search employees or actions (Ex: Apply Leave)" />
        <span className="navbar-search-shortcut">Alt + K</span>
      </div>

      <div className="navbar-actions" ref={actionsRef}>
        <div className="navbar-icon-wrap">
          <button
            className="navbar-icon-btn"
            onClick={() => {
              setShowNotifications((open) => !open);
              closeProfileMenu();
            }}
            aria-label="Notifications"
          >
            <FiBell />
            {unreadCount > 0 && <span className="navbar-notification-badge">{unreadCount}</span>}
          </button>
          {showNotifications && (
            <div className="navbar-dropdown navbar-notifications">
              <h4>Notifications</h4>
              {notifications.length === 0 ? (
                <div className="empty-state">
                  <p>Nothing to show here</p>
                </div>
              ) : (
                <div className="navbar-notification-list">
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      className={`navbar-notification-item${n.read ? "" : " unread"}`}
                      onClick={() => markAsRead(n.id)}
                    >
                      <div className="navbar-notification-title">{n.title}</div>
                      <div className="navbar-notification-body">{n.body}</div>
                      <div className="navbar-notification-time">{n.time}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="navbar-icon-wrap">
          <button
            className="navbar-avatar"
            onClick={() => {
              setShowProfileMenu((open) => !open);
              setExpandedSection(null);
              setShowNotifications(false);
            }}
            aria-label="Profile menu"
          >
            {userInitials}
          </button>

          {showProfileMenu && (
            <div className="navbar-dropdown navbar-profile-menu">
              <button
                className="navbar-profile-menu-item"
                onClick={() => {
                  closeProfileMenu();
                  navigate("/profile");
                }}
              >
                <FiUser />
                <span>My profile</span>
              </button>

              <button
                className="navbar-profile-menu-item"
                onClick={() => setExpandedSection((s) => (s === "display" ? null : "display"))}
              >
                <FiSun />
                <span>Display mode</span>
                <FiChevronRight className="navbar-menu-chevron" />
              </button>
              {expandedSection === "display" && (
                <div className="navbar-menu-expand">
                  {["light", "dark"].map((mode) => (
                    <button
                      key={mode}
                      className={`navbar-menu-expand-option${theme === mode ? " active" : ""}`}
                      onClick={() => setTheme(mode)}
                    >
                      {mode.charAt(0).toUpperCase() + mode.slice(1)}
                    </button>
                  ))}
                </div>
              )}

              <button
                className="navbar-profile-menu-item"
                onClick={() => setExpandedSection((s) => (s === "color" ? null : "color"))}
              >
                <FiDroplet />
                <span>Theme color</span>
                <FiChevronRight className="navbar-menu-chevron" />
              </button>
              {expandedSection === "color" && (
                <div className="navbar-menu-expand navbar-menu-swatches">
                  {ACCENT_COLORS.map((color) => (
                    <button
                      key={color.name}
                      className={`navbar-menu-swatch${accentName === color.name ? " active" : ""}`}
                      style={{ background: color.primary }}
                      title={color.name}
                      aria-label={color.name}
                      onClick={() => setAccentName(color.name)}
                    />
                  ))}
                </div>
              )}

              <button
                className="navbar-profile-menu-item"
                onClick={() => {
                  closeProfileMenu();
                  navigate("/preferences");
                }}
              >
                <FiSettings />
                <span>User preferences</span>
              </button>

              <button
                className="navbar-profile-menu-item"
                onClick={() => {
                  closeProfileMenu();
                  setShowPasswordModal(true);
                }}
              >
                <FiKey />
                <span>Change password</span>
              </button>

              <button
                className="navbar-profile-menu-item"
                onClick={() => {
                  closeProfileMenu();
                  logout();
                }}
              >
                <FiLogOut />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {showPasswordModal && <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />}
    </header>
  );
}

export default Navbar;
