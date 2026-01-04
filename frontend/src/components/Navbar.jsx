import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        TaskFlow
      </Link>

      <div>
        {!user ? (
          <>
            <Link
              to="/login"
              className="mr-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="mr-4 font-medium capitalize">
              {user.role}
            </span>
            <button
              onClick={logout}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
