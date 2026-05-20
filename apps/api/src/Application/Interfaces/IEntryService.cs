using KnowledgeManagementApp.Api.Application.Dtos;

namespace KnowledgeManagementApp.Api.Application.Interfaces;

public interface IEntryService
{
    Task<Result<EntryResultDto>> CreateEntryAsync(
        Guid userId,
        CreateEntryRequestDto request,
        CancellationToken cancellationToken = default
    );

    Task<Result<IEnumerable<EntryResultDto>>> GetEntriesAsync(
        Guid userId,
        CancellationToken cancellationToken = default
    );

    Task<Result<EntryResultDto>> GetEntryAsync(
        Guid userId,
        GetEntryRequestDto request,
        CancellationToken cancellationToken = default
    );

    Task<Result> UpdateEntryAsync(
        Guid userId,
        UpdateEntryRequestDto request,
        CancellationToken cancellationToken = default
    );
}
