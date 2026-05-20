export type CreateEntryRequest = {
  workspaceId: string;
  type: string;
  title: string;
  content: string;
};

export type UpdateEntryRequest = {
  id: string;
  type: string;
  title: string;
  content: string;
};
