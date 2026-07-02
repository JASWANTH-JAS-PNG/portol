import { announcements } from "../../data/announcements";

function AnnouncementsCard() {
  return (
    <div className="card">
      <div className="card-body">
        {announcements.length === 0 ? (
          <p style={{ margin: 0, color: "var(--color-text-muted)", fontSize: 13 }}>No announcements</p>
        ) : (
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            {announcements.map((item) => (
              <li key={item.title}>
                {item.title} - {item.date}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AnnouncementsCard;
