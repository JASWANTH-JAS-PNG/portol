import { useState } from "react";
import PageTabs from "../components/Common/PageTabs";
import SkillsTab from "../components/Performance/SkillsTab";
import MeetingsTab from "../components/Performance/MeetingsTab";
import GrowthTab from "../components/Performance/GrowthTab";
import { kras } from "../data/kras";
import { initialGrowthPlans } from "../data/performance";
import "./Performance.css";

const TABS = ["KRAS", "1:1 MEETINGS", "SKILLS", "GROWTH"];
const SUB_TABS = ["Me", "Department", "Company"];

function KrasTab() {
  const [subTab, setSubTab] = useState("Me");

  return (
    <>
      <div className="sub-tabs" style={{ marginBottom: 20 }}>
        {SUB_TABS.map((tab) => (
          <button
            key={tab}
            className={`sub-tab${tab === subTab ? " active" : ""}`}
            onClick={() => setSubTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <h2 style={{ margin: "0 0 16px" }}>{subTab === "Me" ? "My KRAs" : `${subTab} KRAs`}</h2>

      <div className="card">
        {kras.map((kra) => (
          <div key={kra.title} className="performance-kra-row">
            <div>
              <div className="performance-kra-title">{kra.title}</div>
              <div className="performance-kra-meta">
                Weight {kra.weight} &bull; Due {kra.dueDate}
              </div>
            </div>
            <div className="performance-kra-progress">
              <div className="progress-bar">
                <div className="progress-bar-fill" style={{ width: `${kra.progress}%` }} />
              </div>
              <span>{kra.progress}%</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function Performance() {
  const [activeTab, setActiveTab] = useState("KRAS");
  const [skills, setSkills] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [plans, setPlans] = useState(initialGrowthPlans);

  return (
    <>
      <PageTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <div className="page-body">
        {activeTab === "KRAS" && <KrasTab />}
        {activeTab === "1:1 MEETINGS" && <MeetingsTab meetings={meetings} setMeetings={setMeetings} />}
        {activeTab === "SKILLS" && <SkillsTab skills={skills} setSkills={setSkills} />}
        {activeTab === "GROWTH" && <GrowthTab plans={plans} setPlans={setPlans} />}
      </div>
    </>
  );
}

export default Performance;
