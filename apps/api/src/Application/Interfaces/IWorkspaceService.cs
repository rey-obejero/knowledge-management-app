using KnowledgeManagementApp.Api.Application.Dtos;

namespace KnowledgeManagementApp.Api.Application.Interfaces;

public interface IWorkspaceService
{
    Task<Result<WorkspaceDto>> CreateWorkspaceAsync(
        Guid userId,
        string name,
        CancellationToken cancellationToken = default
    );
}
