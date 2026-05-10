import { paths } from '@/config/paths';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router/dom';
import { LoginRoute } from './routes/auth/login';
import { HomeRoute } from './routes/app/home';

export const createAppRouter = () =>
  createBrowserRouter(
    [
      {
        path: paths.auth.login.path,
        element: <LoginRoute />,
      },
      {
        path: paths.app.root.path,
        children: [
          {
            path: paths.app.home.path,
            element: <HomeRoute />,
          }
        ],
      }
    ]
  )

export const AppRouter = () => {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
}
