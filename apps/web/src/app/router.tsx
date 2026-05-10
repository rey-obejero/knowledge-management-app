import { paths } from '@/config/paths';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router/dom';

export const createAppRouter = () =>
  createBrowserRouter(
    [
      {
        path: paths.home.path
      }
    ]
  )

export const AppRouter = () => {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
}
