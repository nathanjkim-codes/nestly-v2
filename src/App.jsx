import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {
  return (
    <div>
      <Sidebar />

      <main>
        <Header />
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
