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
    private readonly IUnitOfWork _unitOfWork;

    public WorkspaceService(IWorkspaceRepository workspaceRepository, IUnitOfWork unitOfWork)
    {
        _workspaceRepository = workspaceRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<WorkspaceResultDto>> CreateWorkspaceAsync(
        Guid userId,
        string name,
        CancellationToken cancellationToken
    )
    {
        if (await _workspaceRepository.FindByNameAsync(name) is not null)
        {
            return Result<WorkspaceResultDto>.Failure(WorkspaceErrors.WorkspaceNameExists);
        }

        var result = await _workspaceRepository.AddAsync(
            new Workspace() { UserId = userId, Name = name }
        );
        await _unitOfWork.SaveChangesAsync();

        var mapper = new WorkspaceMapper();

        return Result<WorkspaceResultDto>.Success(mapper.WorkspaceToWorkspaceResultDto(result));
    }

    public async Task<Result<IEnumerable<WorkspaceResultDto>>> RetrieveAsync(
        Guid userId,
        CancellationToken cancellationToken = default
    )
    {
        var result = await _workspaceRepository.GetAllByUserIdAsync(userId);
        var mapper = new WorkspaceMapper();

        return Result<IEnumerable<WorkspaceResultDto>>.Success(
            result.Select(workspace => mapper.WorkspaceToWorkspaceResultDto(workspace)).ToList()
        );
    }

    public async Task<Result<WorkspaceResultDto>> FindByIdAsync(
        Guid userId,
        Guid id,
        CancellationToken cancellationToken = default
    )
    {
        var result = await _workspaceRepository.FindByIdAsync(id);
        if (result is null)
        {
            return Result<WorkspaceResultDto>.Failure(WorkspaceErrors.NotFound);
        }

        var mapper = new WorkspaceMapper();

        return Result<WorkspaceResultDto>.Success(mapper.WorkspaceToWorkspaceResultDto(result));
    }
}
