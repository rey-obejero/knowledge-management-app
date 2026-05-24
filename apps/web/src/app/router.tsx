import { paths } from '@/config/paths';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router/dom';
import { SignInRoute } from './routes/authentication/sign-in';
import { SignUpRoute } from './routes/authentication/sign-up.tsx';
import { HomeRoute } from './routes/app/home';
import { AppRoot } from './routes/app/root';
import { WorkspacesRoute } from './routes/app/workspaces/workspaces';
import { AuthenticationRoot } from './routes/authentication/root';
import { EntriesRoute } from './routes/app/entries/entries';
import { EntryRoute } from './routes/app/entries/entry';

export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: paths.authentication.root.path,
      element: <AuthenticationRoot />,
      children: [
        {
          path: paths.authentication.signUp.path,
          element: <SignUpRoute />,
        },
        {
          path: paths.authentication.signIn.path,
          element: <SignInRoute />,
        },
      ],
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
          children: [
            {
              path: paths.app.workspace.path,
              element: <WorkspacesRoute />,
              children: [
                {
                  path: paths.app.entries.path,
                  element: <EntriesRoute />,
                },
                {
                  path: paths.app.entry.path,
                  element: <EntryRoute />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);

export const AppRouter = () => {
  const router = createAppRouter();
  return <RouterProvider router={router} />;
};
