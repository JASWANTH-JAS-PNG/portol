import "./PageTabs.css";

function PageTabs({ tabs, activeTab, onChange }) {
  return (
    <div className="page-tabs">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`page-tab${tab === activeTab ? " active" : ""}`}
          onClick={() => onChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default PageTabs;
