import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReportsPage from "./pages/ReportsPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReportsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
