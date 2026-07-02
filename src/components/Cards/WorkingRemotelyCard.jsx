import Avatar from "../Common/Avatar";

function WorkingRemotelyCard({ people = [] }) {
  return (
    <div className="card">
      <div className="card-title">Working Remotely</div>
      <div className="card-body" style={{ display: "flex", gap: 20 }}>
        {people.map((person) => (
          <div key={person.name} style={{ textAlign: "center", fontSize: 12 }}>
            <Avatar initials={person.initials} color={person.color} />
            <div style={{ marginTop: 6, color: "var(--color-text-muted)" }}>{person.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkingRemotelyCard;
