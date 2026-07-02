import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit3, FiUsers, FiSettings, FiCheckCircle } from "react-icons/fi";
import PageTabs from "../components/Common/PageTabs";
import WelcomeCard from "../components/Cards/WelcomeCard";
import InboxCard from "../components/Cards/InboxCard";
import HolidayCard from "../components/Cards/HolidayCard";
import OnLeaveCard from "../components/Cards/OnLeaveCard";
import WorkingRemotelyCard from "../components/Cards/WorkingRemotelyCard";
import TimeTodayCard from "../components/Cards/TimeTodayCard";
import ProjectTimeCard from "../components/Cards/ProjectTimeCard";
import AnnouncementsCard from "../components/Cards/AnnouncementsCard";
import CelebrationsCard from "../components/Cards/CelebrationsCard";
import FeedPost from "../components/Cards/FeedPost";
import { workingRemotelyToday } from "../data/team";
import { feedPosts } from "../data/feedPosts";
import "./Dashboard.css";

const TABS = ["DASHBOARD", "WELCOME"];
const ORG_TABS = ["Organization", "DotNet Department"];

const WELCOME_STEPS = [
  { icon: FiEdit3, label: "Complete your profile", description: "Add a bio and your work details", to: "/profile" },
  { icon: FiCheckCircle, label: "Showcase your skills", description: "Let your team know what you're great at", to: "/performance" },
  { icon: FiUsers, label: "Meet your team", description: "See who you're working with", to: "/my-team" },
  { icon: FiSettings, label: "Set your preferences", description: "Pick a theme and notification settings", to: "/preferences" },
];

function WelcomeTab() {
  const navigate = useNavigate();
  return (
    <div className="welcome-tab">
      <h2 style={{ margin: "0 0 4px" }}>Welcome to Portol!</h2>
      <p style={{ margin: "0 0 20px", color: "var(--color-text-muted)", fontSize: 13 }}>
        Here's a quick checklist to help you get set up.
      </p>
      <div className="welcome-steps">
        {WELCOME_STEPS.map(({ icon: Icon, label, description, to }) => (
          <button key={label} className="welcome-step-card" onClick={() => navigate(to)}>
            <Icon size={20} />
            <div>
              <div className="welcome-step-label">{label}</div>
              <div className="welcome-step-description">{description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function DepartmentComposer() {
  const [postTab, setPostTab] = useState("Post");
  const [draft, setDraft] = useState("");

  return (
    <div className="card department-composer">
      <div className="department-composer-tabs">
        {["Post", "Poll"].map((tab) => (
          <button
            key={tab}
            className={`department-composer-tab${tab === postTab ? " active" : ""}`}
            onClick={() => setPostTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="card-body">
        {postTab === "Post" ? (
          <textarea
            className="department-composer-textarea"
            placeholder="Write your post here and mention your peers"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
          />
        ) : (
          <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-muted)" }}>
            Poll creation isn't wired up yet.
          </p>
        )}
      </div>
    </div>
  );
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState("DASHBOARD");
  const [orgTab, setOrgTab] = useState("Organization");

  const now = new Date();
  const timeLabel = `${now.getHours() % 12 || 12}:${String(now.getMinutes()).padStart(2, "0")} ${now.getHours() >= 12 ? "PM" : "AM"}`;
  const dateLabel = now.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "2-digit", year: "numeric" });

  if (activeTab === "WELCOME") {
    return (
      <>
        <PageTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
        <div className="page-body">
          <WelcomeTab />
        </div>
      </>
    );
  }

  return (
    <>
      <PageTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <div className="page-body dashboard-page">
        <div className="dashboard-col dashboard-col-left">
          <WelcomeCard name="Alex Morgan" />

          <h4 className="section-heading">Quick Access</h4>
          <InboxCard count={6} />
          <HolidayCard />
          <OnLeaveCard onLeaveCount={0} />
          <WorkingRemotelyCard people={workingRemotelyToday} />
          <TimeTodayCard date={dateLabel} time={timeLabel} />
          <ProjectTimeCard />
        </div>

        <div className="dashboard-col dashboard-col-right">
          <div className="dashboard-org-tabs">
            {ORG_TABS.map((tab) => (
              <button
                key={tab}
                className={`dashboard-org-tab${tab === orgTab ? " active" : ""}`}
                onClick={() => setOrgTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {orgTab === "DotNet Department" ? (
            <>
              <DepartmentComposer />
              <div className="card">
                <div className="card-body">
                  <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: 13 }}>No announcements</p>
                </div>
              </div>
            </>
          ) : (
            <AnnouncementsCard />
          )}

          <CelebrationsCard />

          {feedPosts.map((post) => (
            <FeedPost key={post.id} post={post} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
