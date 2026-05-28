import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx"; // Import your provider
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./components/HomePage.jsx";
import Submit from "./components/Submit.jsx";
import Program from "./components/Program.jsx";
import Guidelines from "./components/Guidelines.jsx";
import Registration from "./components/Registration.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/submit" element={<Submit />} />
              <Route path="/program" element={<Program />} />
              <Route path="/guidelines" element={<Guidelines />} />
              <Route path="/registration" element={<Registration />} />
              {/* Add other routes here as needed */}
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
