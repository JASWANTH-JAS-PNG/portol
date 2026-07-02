import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { ScheduleMeetingModal } from "./PerformanceModals";
import { agendaTemplates, actionItems } from "../../data/performance";

const SUB_TABS = ["My Meetings", "Action Items", "Agenda Templates"];
const ACTION_COLUMNS = ["Name of the Action Item", "Employee", "Department", "Sub Department", "Due Date", "Status"];

function MeetingsSection({ title, items, defaultOpen }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="meetings-section">
      <button className="meetings-section-header" onClick={() => setOpen((o) => !o)}>
        <span>{title.toUpperCase()}</span>
        {open ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      {open && (
        <div className="meetings-section-body">
          {items.length === 0 ? (
            <span style={{ color: "var(--color-text-muted)" }}>No {title.toLowerCase()}</span>
          ) : (
            items.map((meeting) => (
              <div key={meeting.id} className="meeting-item">
                <div className="meeting-item-title">1:1 with {meeting.participant}</div>
                <div className="meeting-item-meta">
                  {meeting.date} at {meeting.time}
                  {meeting.agenda ? ` — ${meeting.agenda}` : ""}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function MeetingsTab({ meetings, setMeetings }) {
  const [subTab, setSubTab] = useState("My Meetings");
  const [showSchedule, setShowSchedule] = useState(false);

  const scheduleMeeting = (meeting) => {
    setMeetings((prev) => [...prev, { id: Date.now(), ...meeting }]);
    setShowSchedule(false);
  };

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

      {subTab === "My Meetings" && (
        <>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <h2 style={{ margin: "0 0 4px" }}>1:1 meetings</h2>
              <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-muted)" }}>
                Discover meetings you've initiated or ones where you're involved as a participant.
              </p>
            </div>
            <button className="btn" onClick={() => setShowSchedule(true)}>
              Schedule 1:1 meeting
            </button>
          </div>

          <div className="meetings-filter-row">
            <select defaultValue="">
              <option value="" disabled>Meeting Type</option>
            </select>
            <input type="text" placeholder="Search meetings" />
          </div>

          <MeetingsSection title="Upcoming Meetings" items={meetings} defaultOpen />
          <MeetingsSection title="Pending Meetings" items={[]} defaultOpen />
          <MeetingsSection title="Completed Meetings" items={[]} defaultOpen />
        </>
      )}

      {subTab === "Action Items" && (
        <>
          <h2 style={{ margin: "0 0 4px" }}>Action Items</h2>
          <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--color-text-muted)" }}>
            You can find all the action items assigned to you across all the meetings.
          </p>
          <div className="meetings-filter-row">
            <select defaultValue="">
              <option value="" disabled>Status</option>
            </select>
            <input type="text" placeholder="Search action items" />
          </div>
          <div className="card">
            <table className="data-table">
              <thead>
                <tr>
                  {ACTION_COLUMNS.map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {actionItems.length === 0 ? (
                  <tr>
                    <td colSpan={ACTION_COLUMNS.length} style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
                      No records found
                    </td>
                  </tr>
                ) : (
                  actionItems.map((item) => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.employee}</td>
                      <td>{item.department}</td>
                      <td>{item.subDepartment}</td>
                      <td>{item.dueDate}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {subTab === "Agenda Templates" && (
        <>
          <h2 style={{ margin: "0 0 16px" }}>Agenda Templates</h2>
          <div className="agenda-template-list">
            {agendaTemplates.map((template) => (
              <div key={template.id} className="agenda-template-item">
                {template.name}
              </div>
            ))}
          </div>
        </>
      )}

      {showSchedule && (
        <ScheduleMeetingModal onClose={() => setShowSchedule(false)} onCreate={scheduleMeeting} />
      )}
    </>
  );
}

export default MeetingsTab;
