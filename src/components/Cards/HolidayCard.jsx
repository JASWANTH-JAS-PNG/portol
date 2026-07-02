import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { holidays } from "../../data/holidays";
import "./HolidayCard.css";

function HolidayCard() {
  const [index, setIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const holiday = holidays[index];

  const goPrev = () => setIndex((i) => (i - 1 + holidays.length) % holidays.length);
  const goNext = () => setIndex((i) => (i + 1) % holidays.length);

  return (
    <div className="holiday-card">
      <div className="holiday-card-header">
        <span>Holidays</span>
        <button className="holiday-view-all" onClick={() => setShowAll((s) => !s)}>
          {showAll ? "Hide" : "View All"}
        </button>
      </div>
      <div className="holiday-card-body">
        <button className="holiday-arrow" onClick={goPrev} aria-label="Previous holiday">
          <FiChevronLeft />
        </button>
        <div className="holiday-card-info">
          <h3>{holiday.name}</h3>
          <p>{holiday.date}</p>
        </div>
        <button className="holiday-arrow" onClick={goNext} aria-label="Next holiday">
          <FiChevronRight />
        </button>
      </div>

      {showAll && (
        <ul className="holiday-list">
          {holidays.map((h) => (
            <li key={h.name}>
              <span>{h.name}</span>
              <span>{h.date}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HolidayCard;
