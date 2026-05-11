import { paths } from '@/config/paths';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router/dom';
import { LoginRoute } from './routes/auth/login';
import { HomeRoute } from './routes/app/home';
import { AppRoot } from './routes/app/root';

export const createAppRouter = () =>
  createBrowserRouter(
    [
      {
        path: paths.auth.login.path,
        element: <LoginRoute />,
      },
      {
        path: paths.app.root.path,
        element: <AppRoot />,
        children: [
          {
            path: paths.app.home.path,
            element: <HomeRoute />,
          },
          {
            path: paths.app.workspaces.path,
          }
        ],
      }
    ]
  )

export const AppRouter = () => {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
}
