import { useState } from "react";
import { FiGift, FiAward, FiUserPlus, FiChevronUp, FiChevronDown } from "react-icons/fi";
import Avatar from "../Common/Avatar";
import { birthdaysToday, upcomingBirthdays, workAnniversaries } from "../../data/birthdays";
import "./CelebrationsCard.css";

const TABS = [
  { key: "birthdays", label: "Birthdays", icon: FiGift, count: birthdaysToday.length },
  { key: "anniversaries", label: "Work Anniversary", icon: FiAward, count: workAnniversaries.length },
  { key: "joinees", label: "New joinees", icon: FiUserPlus, count: 0 },
];

function CelebrationsCard() {
  const [expanded, setExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("birthdays");
  const [wished, setWished] = useState({});

  const sendWish = (name) => setWished((prev) => ({ ...prev, [name]: true }));

  return (
    <div className="card celebrations-card">
      <div className="celebrations-tabs">
        {TABS.map(({ key, label, icon: Icon, count }) => (
          <button
            key={key}
            className={`celebrations-tab${activeTab === key ? " active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            <Icon /> {count} {label}
          </button>
        ))}
        <button className="celebrations-toggle" onClick={() => setExpanded((e) => !e)}>
          {expanded ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </div>

      {expanded && (
        <div className="card-body">
          {activeTab === "birthdays" && (
            <>
              <h4 className="celebrations-heading">Birthdays today</h4>
              <div className="celebrations-row">
                {birthdaysToday.map((person) => (
                  <div key={person.name} className="celebrations-person">
                    <Avatar initials={person.initials} color={person.color} />
                    <div className="celebrations-name">{person.name.split(" ")[0]}</div>
                    <button
                      className="celebrations-wish-btn"
                      disabled={!!wished[person.name]}
                      onClick={() => sendWish(person.name)}
                    >
                      {wished[person.name] ? "Wished ✓" : "Wish"}
                    </button>
                  </div>
                ))}
              </div>

              <h4 className="celebrations-heading">Upcoming Birthdays</h4>
              <div className="celebrations-row">
                {upcomingBirthdays.map((person) => (
                  <div key={person.name} className="celebrations-person">
                    <Avatar initials={person.initials} color={person.color} />
                    <div className="celebrations-name">{person.name.split(" ")[0]}</div>
                    <span className="celebrations-date">{person.date}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "anniversaries" && (
            <>
              <h4 className="celebrations-heading">Work anniversaries this month</h4>
              <div className="celebrations-row">
                {workAnniversaries.map((person) => (
                  <div key={person.name} className="celebrations-person">
                    <Avatar initials={person.initials} color="#748ffc" />
                    <div className="celebrations-name">{person.name.split(" ")[0]}</div>
                    <span className="celebrations-date">{person.years} yrs</span>
                    <button
                      className="celebrations-wish-btn"
                      disabled={!!wished[person.name]}
                      onClick={() => sendWish(person.name)}
                    >
                      {wished[person.name] ? "Wished ✓" : "Wish"}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "joinees" && (
            <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-muted)" }}>
              No new joinees this week.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default CelebrationsCard;
