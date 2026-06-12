import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <Header />
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
