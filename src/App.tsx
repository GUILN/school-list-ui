import "./App.css";
import MainLayout from "./layout/main-layout";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}

export default App;
