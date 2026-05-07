using KnowledgeManagementApp.Api.Application.Dtos;
using KnowledgeManagementApp.Api.Application.Interfaces;
using KnowledgeManagementApp.Api.Application.Mappers;
using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Domain.Errors;
using KnowledgeManagementApp.Api.Domain.Interfaces;

namespace KnowledgeManagementApp.Api.Application.Services;

public class WorkspaceService : IWorkspaceService
{
    private readonly IWorkspaceRepository _workspaceRepository;

    public WorkspaceService(IWorkspaceRepository workspaceRepository)
    {
        _workspaceRepository = workspaceRepository;
    }

    public async Task<Result<WorkspaceDto>> CreateWorkspaceAsync(
        Guid userId,
        string name,
        CancellationToken cancellationToken
    )
    {
        if (await _workspaceRepository.FindByNameAsync(name) is not null)
        {
            return Result<WorkspaceDto>.Failure(WorkspaceErrors.WorkspaceNameExists);
        }

        var result = await _workspaceRepository.AddAsync(
            new Workspace() { UserId = userId, Name = name }
        );
        var mapper = new WorkspaceMapper();

        return Result<WorkspaceDto>.Success(mapper.WorkspaceToWorkspaceDto(result));
    }

    public async Task<Result<IEnumerable<WorkspaceDto>>> RetrieveAsync(
        Guid userId,
        CancellationToken cancellationToken = default
    )
    {
        var result = await _workspaceRepository.GetAllByUserIdAsync(userId);
        var mapper = new WorkspaceMapper();

        return Result<IEnumerable<WorkspaceDto>>.Success(
            result.Select(workspace => mapper.WorkspaceToWorkspaceDto(workspace)).ToList()
        );
    }
}
