import { AuthenticationLayout } from "@/features/authentication/components/authentication-layout";
import { Outlet } from "react-router-dom";

export const AuthenticationRoot = () => {
  return (
    <AuthenticationLayout>
      <Outlet />
    </AuthenticationLayout>
  );
};
