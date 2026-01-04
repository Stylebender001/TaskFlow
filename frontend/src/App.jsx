import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import CustomerSetup from "./pages/customer/CustomerSetup";
import WorkerSetup from "./pages/worker/WorkerSetup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/customer/setup"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerSetup />
              </ProtectedRoute>
            }
          />

          <Route
            path="/worker/setup"
            element={
              <ProtectedRoute allowedRoles={["worker"]}>
                <WorkerSetup />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
