import { FiCheckSquare } from "react-icons/fi";

function OnLeaveCard({ onLeaveCount = 0 }) {
  return (
    <div className="card">
      <div className="card-body" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <strong style={{ display: "block", marginBottom: 6 }}>On Leave Today</strong>
          <p style={{ margin: 0, fontSize: 13 }}>
            {onLeaveCount === 0 ? "Everyone is working today!" : `${onLeaveCount} people are on leave.`}
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 12, color: "var(--color-text-muted)" }}>
            {onLeaveCount === 0 ? "No one is on leave today." : ""}
          </p>
        </div>
        <FiCheckSquare size={28} color="#c7cbd6" />
      </div>
    </div>
  );
}

export default OnLeaveCard;
