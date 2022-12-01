import "./styles/theme.scss";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import { ToastProvider } from "./context/toastContext";
import { UserProvider } from "./context/userContext";

function App() {
  return (
    <UserProvider>
      <ToastProvider>
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
            <hr />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </ToastProvider>
    </UserProvider>
  );
}

export default App;
