namespace KnowledgeManagementApp.Api.Domain.Errors;

public static class WorkspaceErrors
{
    public static Error WorkspaceNameExists = Error.Conflict(
        "WORKSPACE_NAME_EXISTS",
        "A workspace with this name already exists."
    );
}
