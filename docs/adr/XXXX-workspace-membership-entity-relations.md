# ADR: Workspace Membership Entity Relations

## Context

The system is currently single-user-centric. To introduce collaboration, entity
relations for workspace memberships need to be defined.

## Decision

Four tables represent workspace membership.

Workspaces table keeps the existing `UserId` field as the workspace owner reference.

WorkspaceMemberships table tracks which users belong to which workspace. Each membership
row is paired with a role. The owner is also added here as a member with the
`Owner` role.

Roles table records available roles in the workspace. Global roles are seeded at
startup: `Owner`, `Administrator`, `Collaborator`, `Viewer`. C# constants ensure
typed references.

### Owner Invariant

`Workspace.UserId` must match a `WorkspaceMember` row where
`Role.Name == "Owner"`. This invariant is enforced in the application layer,
which creates or updates both the workspace and its membership in a single unit
of work.

### Constraints

- One membership per user per workspace. Needs unique constraint on
  WorkspaceMemberships table for pair (WorkspaceId, UserId).
- Workspace delete cascades to memberships and associated resources (hard
  delete for now, soft delete planned).
- User delete cascades to memberships. Orphaned entries from a deleted user are
  reassigned to the workspace owner (planned).
- Global roles seeded by a startup initializer, not in DbContext configuration.

### Visibility

Membership equals visibility. Any user with a membership row in the workspace can
access it. The `Viewer` role grants read-only access, is default; higher roles grant
elevated permissions.

## Alternatives Considered

Chosen option marked with asterisk.

### Maintain `Workspace.UserId` with ownership syncing (\*)

Keep `UserId` as a direct owner reference AND add `WorkspaceMember` table. Sync
both in application layer.

- **Pro:** Fast lookup for owner. Simple querying for "my workspaces."
  Compatible with existing data. Has redundancy but is negligible.
- **Con:** Owner invariant must be maintained. Two sources of truth that can
  diverge if enforcement is bypassed.

### Drop `Workspace.UserId`, derive owner from membership entry

Remove `Workspace.UserId` entirely. Ownership determined by querying
`WorkspaceMember` for the row with `Role.Name == "Owner"`.

- **Pro:** Single source of truth. No owner invariant needed.
- **Con:** Owner lookup requires a join. Migration changes existing data.
  Workspace entity loses direct reference to owner.

## Consequences

### Migration

Existing database will be wiped; existing workspaces and data are
non-critical. A `WorkspaceBootstrap` service class will be implemented (planned)
to accomodate potential backfills.

### API

Entity relations dictate the necessary endpoints.

The `CreateWorkspaceAsync` method will need to insert the requeqsting user as an
owner member in memberships table.

### ERD

See ERD: `docs/features/workspaces/ (planned).
