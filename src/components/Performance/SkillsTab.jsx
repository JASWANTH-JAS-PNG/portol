import { useState } from "react";
import { FiSmile, FiCpu } from "react-icons/fi";
import EmptyState from "../Common/EmptyState";
import { AddSkillModal } from "./PerformanceModals";

function SkillsTab({ skills, setSkills }) {
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [detailedView, setDetailedView] = useState(false);

  const addSkill = (skill) => {
    setSkills((prev) => [...prev, { id: Date.now(), ...skill }]);
    setShowAddSkill(false);
  };

  return (
    <>
      <div className="sub-tabs" style={{ marginBottom: 20 }}>
        <span className="sub-tab active">My skills</span>
      </div>

      <h2 style={{ margin: "0 0 16px" }}>My Skill Profile</h2>

      <div className="skills-filter-row">
        <select defaultValue="">
          <option value="" disabled>Rating</option>
        </select>
        <select defaultValue="">
          <option value="" disabled>Approval Status</option>
        </select>
        <div className="search-input">
          <input type="text" placeholder="Search" />
        </div>
        <label className="skills-toggle">
          <input type="checkbox" checked={detailedView} onChange={() => setDetailedView((v) => !v)} />
          Show detailed view
        </label>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        {skills.length === 0 ? (
          <EmptyState
            icon={FiSmile}
            title="No skills added yet :("
            actionLabel="Add skills"
            onAction={() => setShowAddSkill(true)}
          />
        ) : (
          <>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Skill</th>
                  <th>Rating</th>
                  <th>Category</th>
                  <th>Approval Status</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={skill.id}>
                    <td>{skill.name}</td>
                    <td>{skill.rating}</td>
                    <td>{skill.category}</td>
                    <td>
                      <span className="badge badge-muted">{skill.approval}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="card-body" style={{ textAlign: "center", borderTop: "1px solid var(--color-border)" }}>
              <button className="btn btn-outline" onClick={() => setShowAddSkill(true)}>
                + Add another skill
              </button>
            </div>
          </>
        )}
      </div>

      <h3 style={{ margin: "0 0 12px" }}>Pending Updates</h3>
      <div className="card" style={{ marginBottom: 20 }}>
        <EmptyState icon={FiCpu} title="No pending requests" description="Update your skill profile now!" />
      </div>

      {showAddSkill && <AddSkillModal onClose={() => setShowAddSkill(false)} onCreate={addSkill} />}
    </>
  );
}

export default SkillsTab;
