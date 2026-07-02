import { useState } from "react";
import PageTabs from "../components/Common/PageTabs";
import NewTicketModal from "../components/Common/NewTicketModal";
import { openTickets as initialOpenTickets, closedTickets } from "../data/tickets";

const TABS = ["TICKETS"];
const SUB_TABS = ["My Tickets", "Following"];
const COLUMNS = ["Ticket Number", "Title", "Raised On", "Priority", "Category", "Assigned To", "Ticket Status", "Last Updated"];

function TicketsTable({ title, description, tickets, onNewTicket }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 16 }}>
        <div>
          <h3 style={{ margin: "0 0 4px" }}>{title}</h3>
          <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-muted)" }}>{description}</p>
        </div>
        {onNewTicket && (
          <button className="btn" onClick={onNewTicket}>
            + New Ticket
          </button>
        )}
      </div>
      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              {COLUMNS.map((col) => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tickets.length === 0 ? (
              <tr>
                <td colSpan={COLUMNS.length} style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
                  No records found
                </td>
              </tr>
            ) : (
              tickets.map((ticket) => (
                <tr key={ticket.number}>
                  <td>{ticket.number}</td>
                  <td>{ticket.title}</td>
                  <td>{ticket.raisedOn}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.category}</td>
                  <td>{ticket.assignedTo}</td>
                  <td>
                    <span className={`badge ${ticket.status === "Open" || ticket.status === "In Progress" ? "badge-success" : "badge-muted"}`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td>{ticket.updated}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Helpdesk() {
  const [activeTab, setActiveTab] = useState("TICKETS");
  const [subTab, setSubTab] = useState("My Tickets");
  const [openTickets, setOpenTickets] = useState(initialOpenTickets);
  const [showNewTicket, setShowNewTicket] = useState(false);

  const handleCreateTicket = ({ title, priority, category, description }) => {
    const number = `HD-${1050 + openTickets.length}`;
    setOpenTickets((prev) => [
      {
        number,
        title,
        raisedOn: "Just now",
        priority,
        category,
        assignedTo: "Unassigned",
        status: "Open",
        updated: "just now",
        description,
      },
      ...prev,
    ]);
    setShowNewTicket(false);
  };

  return (
    <>
      <PageTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <div className="page-body">
        <div className="sub-tabs" style={{ marginBottom: 20 }}>
          {SUB_TABS.map((tab) => (
            <button
              key={tab}
              className={`sub-tab${tab === subTab ? " active" : ""}`}
              onClick={() => setSubTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {subTab === "My Tickets" ? (
          <>
            <TicketsTable
              title="Open Tickets"
              description="These are your tickets that are yet to be addressed."
              tickets={openTickets}
              onNewTicket={() => setShowNewTicket(true)}
            />
            <TicketsTable
              title="Closed Tickets"
              description="These are your tickets that have been addressed."
              tickets={closedTickets}
            />
          </>
        ) : (
          <TicketsTable
            title="Following"
            description="Tickets you're following but didn't raise yourself."
            tickets={[]}
          />
        )}
      </div>

      {showNewTicket && (
        <NewTicketModal onClose={() => setShowNewTicket(false)} onCreate={handleCreateTicket} />
      )}
    </>
  );
}

export default Helpdesk;
