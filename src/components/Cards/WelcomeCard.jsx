import "./WelcomeCard.css";

function WelcomeCard({ name = "there" }) {
  return (
    <div className="welcome-banner">
      <h2>Welcome {name}!</h2>
    </div>
  );
}

export default WelcomeCard;
