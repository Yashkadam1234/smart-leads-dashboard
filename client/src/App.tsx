import { Toaster } from "react-hot-toast";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import LeadsPage from "./pages/LeadsPage";
import NotFoundPage from "./pages/NotFoundPage";

import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={
            <RegisterPage />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/leads"
          element={
            <ProtectedRoute>
              <LeadsPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <NotFoundPage />
          }
        />
      </Routes>

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,

          style: {
            background:
              "#0D1326",
            color: "#ffffff",
            border:
              "1px solid rgba(255,255,255,0.1)",
          },

          success: {
            iconTheme: {
              primary:
                "#00D4FF",
              secondary:
                "#0D1326",
            },
          },

          error: {
            iconTheme: {
              primary:
                "#EF4444",
              secondary:
                "#0D1326",
            },
          },
        }}
      />
    </>
  );
}

export default App;