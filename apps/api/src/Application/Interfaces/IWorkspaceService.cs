using KnowledgeManagementApp.Api.Application.Dtos;

namespace KnowledgeManagementApp.Api.Application.Interfaces;

public interface IWorkspaceService
{
    Task<Result<WorkspaceResultDto>> CreateWorkspaceAsync(
        Guid userId,
        string name,
        CancellationToken cancellationToken = default
    );

    Task<Result<IEnumerable<WorkspaceResultDto>>> RetrieveAsync(
        Guid userId,
        CancellationToken cancellationToken = default
    );

    Task<Result<WorkspaceResultDto>> FindByIdAsync(
        Guid userId,
        Guid id,
        CancellationToken cancellationToken = default
    );
}
