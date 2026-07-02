import { useState } from "react";
import PageTabs from "../components/Common/PageTabs";
import { salarySummary, paySlips } from "../data/finances";

const TABS = ["SUMMARY"];
const VERIFY_ITEMS = ["Salary details", "PAN details", "Payment Information", "Statutory details"];

function MyFinances() {
  const [activeTab, setActiveTab] = useState("SUMMARY");
  const [verified, setVerified] = useState(false);

  return (
    <>
      <PageTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <div className="page-body">
        {!verified ? (
          <div className="card" style={{ padding: 24, display: "flex", gap: 24, alignItems: "flex-start" }}>
            <div style={{ fontSize: 56 }}>🐷</div>
            <div>
              <h3 style={{ margin: "0 0 8px" }}>Let's review your finances</h3>
              <p style={{ margin: "0 0 12px", color: "var(--color-text-muted)", fontSize: 13 }}>
                Looks like you are accessing your finances for the first time. Just verify the following details:
              </p>
              <ul style={{ columns: 2, margin: "0 0 16px", paddingLeft: 18, fontSize: 13 }}>
                {VERIFY_ITEMS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p style={{ margin: "0 0 16px", fontSize: 12, color: "var(--color-text-muted)" }}>
                Once verified, you will see your finance details here
              </p>
              <button className="btn" onClick={() => setVerified(true)}>
                Review my finances
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="stat-card" style={{ marginBottom: 16 }}>
              <div className="stat-label">Cost to Company</div>
              <div className="stat-value" style={{ fontSize: 20 }}>{salarySummary.costToCompany}</div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              <div className="card">
                <div className="card-title">Salary Breakdown</div>
                <div className="card-body">
                  {salarySummary.components.map((c) => (
                    <div key={c.label} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", fontSize: 13 }}>
                      <span style={{ color: "var(--color-text-muted)" }}>{c.label}</span>
                      <span>{c.amount}</span>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0 0", fontWeight: 700, borderTop: "1px solid var(--color-border)", marginTop: 6 }}>
                    <span>Net Pay</span>
                    <span>{salarySummary.netPay}</span>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-title">Pay Slips</div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Month</th>
                      <th>Net Pay</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paySlips.map((slip) => (
                      <tr key={slip.month}>
                        <td>{slip.month}</td>
                        <td>{slip.netPay}</td>
                        <td>
                          <span className="badge badge-success">{slip.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default MyFinances;
