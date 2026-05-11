import { RootLayout } from "@/components/layouts";
import { Outlet } from 'react-router';

export const AppRoot = () => {
  return (
    <RootLayout>
      <Outlet />
    </RootLayout>
  );
};
