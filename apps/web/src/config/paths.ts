export const paths = {
  authentication: {
    root: {
      path: '/authentication',
      getHref: () => '/authentication',
    },
    signUp: {
      path: '/authentication/sign-up',
      getHref: () => '/authentication/sign-up',
    },
    signIn: {
      path: '/authentication/sign-in',
      getHref: () => '/authentication/sign-in',
    },
  },
  app: {
    root: {
      path: '/',
      getHref: () => '/',
    },
    home: {
      path: '/',
      getHref: () => '/',
    },
    workspaces: {
      path: '/w',
      getHref: () => '/w',
    },
    workspace: {
      path: '/w/:workspaceId',
      getHref: (id: string) => `/w/${id}`,
    },
    entries: {
      path: '/w/:workspaceId/entries/',
      getHref: (workspaceId: string) => `/w/${workspaceId}/entries`,
    },
    entry: {
      path: '/w/:workspaceId/entries/:entryId',
      getHref: (workspaceId: string, entryId: string) =>
        `/w/${workspaceId}/entries/${entryId}`,
    },
  },
};
