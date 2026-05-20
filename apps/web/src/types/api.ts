export type BaseEntity = {
  id: string;
  createdAt: string;
};

export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type User = Entity<{
  email: string;
  recentWorkspaceId: string;
}>;

export type Workspace = Entity<{
  userId: string;
  name: string;
}>;

export type Entry = Entity<{
  type: string;
  title: string;
  content: string;
}>;
