import { useState } from "react";
import { FiInbox, FiSearch } from "react-icons/fi";
import PageTabs from "../components/Common/PageTabs";
import EmptyState from "../components/Common/EmptyState";
import { announcements } from "../data/announcements";
import "./Engage.css";

const TABS = ["ANNOUNCEMENTS", "POLLS", "ARTICLES"];
const STATUS_TABS = ["Active", "Drafts", "All"];

function Engage() {
  const [activeTab, setActiveTab] = useState("ANNOUNCEMENTS");
  const [statusTab, setStatusTab] = useState("Active");
  const [search, setSearch] = useState("");

  const counts = {
    Active: announcements.filter((a) => a.status === "Active").length,
    Drafts: announcements.filter((a) => a.status === "Draft").length,
    All: announcements.length,
  };

  const filtered = announcements
    .filter((a) => {
      if (statusTab === "Active") return a.status === "Active";
      if (statusTab === "Drafts") return a.status === "Draft";
      return true;
    })
    .filter((a) => a.title.toLowerCase().includes(search.toLowerCase()));

  if (activeTab !== "ANNOUNCEMENTS") {
    return (
      <>
        <PageTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        <div className="page-body">
          <div className="card">
            <EmptyState icon={FiInbox} title={`No ${activeTab.toLowerCase()} yet`} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <PageTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <div className="page-body">
        <h2 style={{ margin: "0 0 16px" }}>Announcements</h2>

        <div className="engage-status-tabs">
          {STATUS_TABS.map((label) => (
            <button
              key={label}
              className={`engage-status-tab${label === statusTab ? " active" : ""}`}
              onClick={() => setStatusTab(label)}
            >
              {label} <span>{counts[label]}</span>
            </button>
          ))}
        </div>

        <div className="engage-filters">
          <div className="search-input">
            <FiSearch />
            <input
              type="text"
              placeholder="Search announcements"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="card">
            <EmptyState icon={FiInbox} title="No announcements yet" />
          </div>
        ) : (
          <div className="engage-announcements-list">
            {filtered.map((item) => (
              <div key={item.title} className="card engage-announcement-card">
                <div className="card-body">
                  <div className="engage-announcement-header">
                    <span className="badge badge-muted">{item.type}</span>
                    <span className="engage-announcement-date">{item.date}</span>
                  </div>
                  <h3 style={{ margin: "8px 0 4px" }}>{item.title}</h3>
                  <p style={{ margin: "0 0 8px", fontSize: 13, color: "var(--color-text-muted)" }}>
                    {item.body}
                  </p>
                  <div className="engage-announcement-author">By {item.author}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Engage;
