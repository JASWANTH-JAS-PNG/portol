import { useState } from "react";
import PageTabs from "../components/Common/PageTabs";
import { useAppContext, ACCENT_COLORS } from "../context/AppContext";

const TABS = ["USER PREFERENCES"];
const NOTIFICATION_OPTIONS = [
  { key: "email", label: "Email notifications" },
  { key: "push", label: "Push notifications" },
  { key: "digest", label: "Weekly digest" },
];

function Preferences() {
  const [activeTab, setActiveTab] = useState("USER PREFERENCES");
  const { theme, setTheme, accentName, setAccentName } = useAppContext();
  const [notifications, setNotifications] = useState({ email: true, push: true, digest: false });

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <PageTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <div className="page-body">
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-title">Display mode</div>
          <div className="card-body" style={{ display: "flex", gap: 12 }}>
            {["light", "dark"].map((mode) => (
              <button
                key={mode}
                className={`btn${theme === mode ? "" : " btn-outline"}`}
                onClick={() => setTheme(mode)}
                style={{ textTransform: "capitalize" }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        <div className="card" style={{ marginBottom: 16 }}>
          <div className="card-title">Theme color</div>
          <div className="card-body" style={{ display: "flex", gap: 12 }}>
            {ACCENT_COLORS.map((color) => (
              <button
                key={color.name}
                onClick={() => setAccentName(color.name)}
                aria-label={color.name}
                title={color.name}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: color.primary,
                  border: accentName === color.name ? "3px solid var(--color-text)" : "3px solid transparent",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-title">Notifications</div>
          <div className="card-body">
            {NOTIFICATION_OPTIONS.map((option) => (
              <label
                key={option.key}
                style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", fontSize: 13 }}
              >
                <input
                  type="checkbox"
                  checked={notifications[option.key]}
                  onChange={() => toggleNotification(option.key)}
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Preferences;
