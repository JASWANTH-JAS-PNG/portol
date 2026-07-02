import { useState } from "react";
import { FiInbox } from "react-icons/fi";
import PageTabs from "../components/Common/PageTabs";
import EmptyState from "../components/Common/EmptyState";
import Avatar from "../components/Common/Avatar";
import { onboardingTasks } from "../data/inboxTasks";
import "./Inbox.css";

const TABS = ["TAKE ACTION (6)", "NOTIFICATIONS", "ARCHIVE"];

function Inbox() {
  const [activeTab, setActiveTab] = useState("TAKE ACTION (6)");
  const [selectedTask, setSelectedTask] = useState(onboardingTasks[0]);

  return (
    <>
      <PageTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />

      {activeTab !== "TAKE ACTION (6)" ? (
        <div className="page-body">
          <div className="card">
            <EmptyState
              icon={FiInbox}
              title={activeTab === "NOTIFICATIONS" ? "No Notifications Found" : "Nothing archived"}
              description={
                activeTab === "NOTIFICATIONS"
                  ? "You haven't got any notifications recently"
                  : "Resolved items from the last 3 months show up here"
              }
            />
          </div>
        </div>
      ) : (
        <div className="page-body inbox-page">
          <div className="card inbox-task-list">
            <div className="inbox-task-list-header">Pending Tasks</div>
            <div className="inbox-task-category">Onboarding ({onboardingTasks.length})</div>
            {onboardingTasks.map((task) => (
              <button
                key={task.id}
                className={`inbox-task-item${task.id === selectedTask.id ? " active" : ""}`}
                onClick={() => setSelectedTask(task)}
              >
                <Avatar initials="AM" color="#f5a623" size={30} />
                <div>
                  <div className="inbox-task-name">{task.name}</div>
                  <div className="inbox-task-title">{task.task}</div>
                </div>
                <span className="inbox-task-time">{task.daysAgo}</span>
              </button>
            ))}
          </div>

          <div className="card inbox-task-detail">
            <div className="card-body">
              <h3 style={{ margin: "0 0 4px" }}>{selectedTask.task}</h3>
              <p style={{ margin: "0 0 16px", fontSize: 12, color: "var(--color-text-muted)" }}>
                Initiated {selectedTask.daysAgo}
              </p>
              <p style={{ fontSize: 13 }}>
                Hello {selectedTask.name}, please complete the pending {selectedTask.task.toLowerCase()} step.
              </p>
              <h4 style={{ fontSize: 13, marginTop: 24 }}>Activity</h4>
              <p style={{ fontSize: 13, color: "var(--color-text-muted)" }}>No activity logged here</p>
            </div>
            <div className="inbox-task-message-bar">
              <input type="text" placeholder="Type your message here" />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Inbox;
