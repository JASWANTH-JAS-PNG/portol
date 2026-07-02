import { useAppContext } from "../context/AppContext";
import "./LoggedOut.css";

function LoggedOut() {
  const { login } = useAppContext();

  return (
    <div className="logged-out-screen">
      <div className="card logged-out-card">
        <h2>You've been logged out</h2>
        <p>Thanks for using Portol. You can sign back in whenever you're ready.</p>
        <button className="btn" onClick={login}>
          Log back in
        </button>
      </div>
    </div>
  );
}

export default LoggedOut;
