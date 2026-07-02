import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiFileText, FiMessageCircle } from "react-icons/fi";
import PageTabs from "../components/Common/PageTabs";
import EmptyState from "../components/Common/EmptyState";
import { employees } from "../data/employees";
import "./Employees.css";

const TABS = ["EMPLOYEES", "DOCUMENTS", "ENGAGE"];
const SUB_TABS = ["Employee Directory", "Organization Tree"];
const FILTERS = ["Business Unit", "Department", "Location", "Cost Center", "Legal Entity"];

function EmployeeDirectory({ search, setSearch }) {
  const filtered = employees.filter((employee) =>
    employee.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="employees-filters">
        {FILTERS.map((filter) => (
          <select key={filter} defaultValue="">
            <option value="" disabled>
              {filter}
            </option>
          </select>
        ))}
        <div className="search-input">
          <FiSearch />
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card">
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Department</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.role}</td>
                <td>{employee.department}</td>
                <td>{employee.location}</td>
                <td>
                  <span className={`badge ${employee.status === "Active" ? "badge-success" : "badge-muted"}`}>
                    {employee.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", color: "var(--color-text-muted)" }}>
                  No employees match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function OrganizationTree() {
  const departments = [...new Set(employees.map((e) => e.department))];

  return (
    <div className="org-tree">
      {departments.map((department) => (
        <div key={department} className="card org-tree-department">
          <div className="card-title">{department}</div>
          <div className="card-body org-tree-members">
            {employees
              .filter((e) => e.department === department)
              .map((employee) => (
                <div key={employee.id} className="org-tree-member">
                  <span className="org-tree-member-name">{employee.name}</span>
                  <span className="org-tree-member-role">{employee.role}</span>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Employees() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("EMPLOYEES");
  const [subTab, setSubTab] = useState("Employee Directory");
  const [search, setSearch] = useState("");

  return (
    <>
      <PageTabs tabs={TABS} activeTab={activeTab} onChange={setActiveTab} />
      <div className="page-body employees-page">
        {activeTab === "DOCUMENTS" && (
          <div className="card">
            <EmptyState icon={FiFileText} title="No documents yet" description="Shared org documents will show up here." />
          </div>
        )}

        {activeTab === "ENGAGE" && (
          <div className="card">
            <EmptyState
              icon={FiMessageCircle}
              title="Engage with your org"
              description="Announcements, polls, and articles live on the Engage page."
              actionLabel="Go to Engage"
              onAction={() => navigate("/engage")}
            />
          </div>
        )}

        {activeTab === "EMPLOYEES" && (
          <>
            <div className="sub-tabs">
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

            <h2 style={{ margin: "16px 0" }}>{subTab}</h2>

            {subTab === "Employee Directory" ? (
              <EmployeeDirectory search={search} setSearch={setSearch} />
            ) : (
              <OrganizationTree />
            )}
          </>
        )}
      </div>
    </>
  );
}

export default Employees;
