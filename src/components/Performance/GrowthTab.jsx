import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiAward } from "react-icons/fi";
import EmptyState from "../Common/EmptyState";
import { NewPlanModal } from "./PerformanceModals";

function AddGoalForm({ onAdd, onCancel }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim());
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 8, marginTop: 10 }}>
      <input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Complete AWS certification"
        style={{ flex: 1, padding: "8px 10px", border: "1px solid var(--color-border)", borderRadius: 6, background: "var(--color-card)", color: "var(--color-text)" }}
      />
      <button type="submit" className="btn">Add</button>
      <button type="button" className="btn btn-outline" onClick={onCancel}>Cancel</button>
    </form>
  );
}

function GrowthPlanCard({ plan, onAddGoal }) {
  const [addingGoal, setAddingGoal] = useState(false);
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="card growth-plan-card">
      <div className="card-body">
        <button
          onClick={() => setExpanded((e) => !e)}
          style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", fontWeight: 600, fontSize: 14, padding: 0 }}
        >
          {expanded ? <FiChevronUp /> : <FiChevronDown />}
          Growth plan for {plan.name}
        </button>
        <div style={{ fontSize: 12, color: "var(--color-text-muted)", margin: "4px 0 12px", paddingLeft: 22 }}>
          {plan.status}
        </div>

        {expanded && (
          <div style={{ paddingLeft: 22 }}>
            {plan.goals.map((goal, i) => (
              <div key={i} className="growth-goal-item">
                <span>{goal}</span>
              </div>
            ))}

            {addingGoal ? (
              <AddGoalForm
                onAdd={(title) => {
                  onAddGoal(title);
                  setAddingGoal(false);
                }}
                onCancel={() => setAddingGoal(false)}
              />
            ) : (
              <button className="btn btn-outline" style={{ marginTop: 10 }} onClick={() => setAddingGoal(true)}>
                + Add learning goal
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function GrowthTab({ plans, setPlans }) {
  const [statusTab, setStatusTab] = useState("Active");
  const [showNewPlan, setShowNewPlan] = useState(false);

  const activePlans = plans.filter((p) => p.status !== "Completed");
  const completedPlans = plans.filter((p) => p.status === "Completed");
  const visiblePlans = statusTab === "Active" ? activePlans : completedPlans;

  const addGoalToPlan = (planId, goal) => {
    setPlans((prev) => prev.map((p) => (p.id === planId ? { ...p, goals: [...p.goals, goal] } : p)));
  };

  const createPlan = (title) => {
    setPlans((prev) => [...prev, { id: Date.now(), name: title || "Untitled plan", status: "NA", goals: [] }]);
    setShowNewPlan(false);
  };

  return (
    <>
      <div className="sub-tabs" style={{ marginBottom: 20 }}>
        <span className="sub-tab active">Growth Plans</span>
      </div>
      <div className="sub-tabs" style={{ marginBottom: 20 }}>
        <span className="sub-tab active">My growth plans</span>
      </div>

      <h2 style={{ margin: "0 0 4px" }}>My growth plans</h2>
      <p style={{ margin: "0 0 16px", fontSize: 13, color: "var(--color-text-muted)" }}>
        Chart your professional growth path. Set goals, acquire new skills, and track your progress.
      </p>

      <div className="growth-layout">
        <div>
          <div className="growth-tabs">
            <button
              className={`growth-tab${statusTab === "Active" ? " active" : ""}`}
              onClick={() => setStatusTab("Active")}
            >
              Active ({activePlans.length})
            </button>
            <button
              className={`growth-tab${statusTab === "Completed" ? " active" : ""}`}
              onClick={() => setStatusTab("Completed")}
            >
              Completed ({completedPlans.length})
            </button>
            <button className="growth-create-link" onClick={() => setShowNewPlan(true)}>
              + Create new plan
            </button>
          </div>

          {visiblePlans.length === 0 ? (
            <div className="card">
              <EmptyState title="No plans here yet" description="Create a growth plan to get started." />
            </div>
          ) : (
            visiblePlans.map((plan) => (
              <GrowthPlanCard key={plan.id} plan={plan} onAddGoal={(goal) => addGoalToPlan(plan.id, goal)} />
            ))
          )}
        </div>

        <div className="card" style={{ height: "fit-content" }}>
          <div className="card-body">
            <div style={{ fontSize: 11, letterSpacing: "0.05em", color: "var(--color-text-muted)", marginBottom: 8 }}>
              LEARNING ACHIEVEMENTS
            </div>
            <EmptyState
              icon={FiAward}
              title="No achievements yet"
              description="Complete your learning goals to track your skill improvements"
            />
          </div>
        </div>
      </div>

      {showNewPlan && <NewPlanModal onClose={() => setShowNewPlan(false)} onCreate={createPlan} />}
    </>
  );
}

export default GrowthTab;
