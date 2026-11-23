import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

export function ProtectedRoute() {
  const [authenticated, setAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/me", {
          credentials: "include",
        });

        if (response.status === 401) {
          setAuthenticated(false);
          return;
        }

        if (response.status === 200) {
          setAuthenticated(true);
          return;
        }

        setError("Unable to verify authentication");
      } catch (error) {
        setError("Unable to connect to server");
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading === true) {
    return <p>Checking authentication...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
