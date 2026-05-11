export const paths = {
  auth: {
    login: {
      path: '/auth/login',
      getHref: () => '/auth/login',
    }
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
      path: '/workspaces/:workspaceId',
      getHref: (id: string) => `/workspaces/${id}`,
    }
  }
}
