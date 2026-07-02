import { Link } from "react-router-dom";
import "./InboxCard.css";

function InboxCard({ count = 0 }) {
  return (
    <div className="card inbox-card">
      <div className="card-title">Inbox</div>
      <div className="card-body inbox-card-body">
        <div className="inbox-card-count">{count}</div>
        <p>
          Tasks waiting for your approval. Please click on take action for more details.
        </p>
        <Link to="/inbox">
          <button className="btn">Take Action</button>
        </Link>
      </div>
    </div>
  );
}

export default InboxCard;
