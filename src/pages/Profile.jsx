import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiHash, FiX } from "react-icons/fi";
import PageTabs from "../components/Common/PageTabs";
import "./Profile.css";

const TABS = ["ABOUT", "PROFILE", "JOB", "DOCUMENTS", "ASSETS"];
const SUB_TABS = ["Summary", "Timeline", "Wall Activity"];

const profile = {
  name: "Alex Morgan",
  initials: "AM",
  title: "Lead Engineer",
  status: "NOT IN YET",
  email: "alex.morgan@portol.com",
  phone: "+91-90000 00000",
  location: "Hyderabad",
  employeeId: "P100",
  businessUnit: "Portol Technologies",
  reportingManager: "Jordan Lee",
  education: {
    degree: "B.Tech",
    branch: "Computer Science",
    college: "State University",
    year: "2012",
  },
  experience: { title: "Software Engineer, Previous Co.", period: "2010 - 2020" },
  primary: {
    gender: "—",
    maritalStatus: "—",
    nationality: "India",
  },
  address: "Not provided",
};

const ABOUT_FIELDS = [
  { key: "about", label: "About" },
  { key: "job", label: "What I love about my job?" },
  { key: "hobbies", label: "My interests and hobbies" },
];

function AddResponseRow({ label, value, onSave }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value || "");

  const handleSave = () => {
    onSave(draft.trim());
    setEditing(false);
  };

  if (editing) {
    return (
      <div className="profile-add-response profile-add-response-editing">
        <span>{label}</span>
        <div className="profile-response-edit">
          <input
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <button className="btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-add-response">
      <span>{label}</span>
      {value ? (
        <button className="profile-response-value" onClick={() => setEditing(true)}>
          {value}
        </button>
      ) : (
        <button className="btn btn-outline" onClick={() => setEditing(true)}>
          Add your response
        </button>
      )}
    </div>
  );
}

function Profile() {
  const [activeTab, setActiveTab] = useState("ABOUT");
  const [subTab, setSubTab] = useState("Summary");
  const [responses, setResponses] = useState({});
  const [skills, setSkills] = useState([]);
  const [addingSkill, setAddingSkill] = useState(false);
  const [skillDraft, setSkillDraft] = useState("");

  const saveResponse = (key, value) => setResponses((prev) => ({ ...prev, [key]: value }));

  const addSkill = () => {
    const value = skillDraft.trim();
    if (value && !skills.includes(value)) {
      setSkills((prev) => [...prev, value]);
    }
    setSkillDraft("");
    setAddingSkill(false);
  };

  const removeSkill = (skill) => setSkills((prev) => prev.filter((s) => s !== skill));

  return (
    <>
      <PageTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <div className="page-body profile-page">
        <div className="profile-cover">
          <div className="profile-avatar">{profile.initials}</div>
        </div>

        <div className="profile-header">
          <h2>
            {profile.name} <span className="badge badge-success">{profile.status}</span>
          </h2>
          <p className="profile-title">{profile.title}</p>

          <div className="profile-contact-row">
            <span><FiMail /> {profile.email}</span>
            <span><FiPhone /> {profile.phone}</span>
            <span><FiMapPin /> {profile.location}</span>
            <span><FiHash /> {profile.employeeId}</span>
          </div>

          <div className="profile-meta-row">
            <div>
              <div className="profile-meta-label">Business Unit</div>
              <div>{profile.businessUnit}</div>
            </div>
            <div>
              <div className="profile-meta-label">Reporting Manager</div>
              <div>{profile.reportingManager}</div>
            </div>
          </div>
        </div>

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

        <div className="profile-grid">
          <div className="card">
            <div className="card-title">About</div>
            <div className="card-body">
              {ABOUT_FIELDS.map((field) => (
                <AddResponseRow
                  key={field.key}
                  label={field.label}
                  value={responses[field.key]}
                  onSave={(value) => saveResponse(field.key, value)}
                />
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-body" style={{ textAlign: "center" }}>
              {skills.length === 0 ? (
                <>
                  <p style={{ fontWeight: 600, margin: "0 0 4px" }}>No skills added yet :(</p>
                  <p style={{ fontSize: 12, color: "var(--color-text-muted)", margin: "0 0 16px" }}>
                    Showcase your skills to your colleagues!
                  </p>
                </>
              ) : (
                <div className="profile-skills-list">
                  {skills.map((skill) => (
                    <span key={skill} className="profile-skill-chip">
                      {skill}
                      <button onClick={() => removeSkill(skill)} aria-label={`Remove ${skill}`}>
                        <FiX />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {addingSkill ? (
                <div className="profile-response-edit" style={{ justifyContent: "center" }}>
                  <input
                    autoFocus
                    placeholder="e.g. React"
                    value={skillDraft}
                    onChange={(e) => setSkillDraft(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                  />
                  <button className="btn" onClick={addSkill}>
                    Add
                  </button>
                </div>
              ) : (
                <button className="btn" onClick={() => setAddingSkill(true)}>
                  Add skills
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <div className="card-title">Education</div>
          <div className="card-body profile-fields">
            <div>
              <div className="profile-meta-label">Degree</div>
              <div>{profile.education.degree}</div>
            </div>
            <div>
              <div className="profile-meta-label">Branch / Specialization</div>
              <div>{profile.education.branch}</div>
            </div>
            <div>
              <div className="profile-meta-label">University / College</div>
              <div>{profile.education.college}</div>
            </div>
            <div>
              <div className="profile-meta-label">Year of Completion</div>
              <div>{profile.education.year}</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <div className="card-title">Experience</div>
          <div className="card-body">
            <div>{profile.experience.title}</div>
            <div className="profile-meta-label">{profile.experience.period}</div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <div className="card-title">Primary Details</div>
          <div className="card-body profile-fields">
            <div>
              <div className="profile-meta-label">Gender</div>
              <div>{profile.primary.gender}</div>
            </div>
            <div>
              <div className="profile-meta-label">Marital Status</div>
              <div>{profile.primary.maritalStatus}</div>
            </div>
            <div>
              <div className="profile-meta-label">Nationality</div>
              <div>{profile.primary.nationality}</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginTop: 16 }}>
          <div className="card-title">Addresses</div>
          <div className="card-body">
            <div className="profile-meta-label">Current Address</div>
            <div>{profile.address}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
