import { Navigate } from "react-router-dom";
import { paths } from "./paths";
import { useAuth } from "../hooks/useAuth";
import type { ReactNode } from "react";

interface ProtectedRoutesProps {
  children: ReactNode;
}

export default function ProtectedRoutes({ children }: ProtectedRoutesProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          background: "linear-gradient(135deg, #0a1929 0%, #0e7490 100%)",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            border: "4px solid rgba(16, 185, 129, 0.3)",
            borderTopColor: "#10b981",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        ></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={paths.login} />;
  }

  return <>{children}</>;
}
