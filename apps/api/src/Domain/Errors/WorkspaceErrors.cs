namespace KnowledgeManagementApp.Api.Domain.Errors;

public static class WorkspaceErrors
{
    public static Error WorkspaceNameExists = Error.Conflict(
        "WORKSPACE_NAME_EXISTS",
        "A workspace with this name already exists."
    );

    public static Error NotFound = Error.Conflict(
        "WORKSPACE_NOT_FOUND",
        "Requested workspace does not exist."
    );
}
