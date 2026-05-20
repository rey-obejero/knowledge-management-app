using KnowledgeManagementApp.Api.Application.Dtos;
using KnowledgeManagementApp.Api.Application.Interfaces;
using KnowledgeManagementApp.Api.Application.Mappers;
using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Domain.Interfaces;

namespace KnowledgeManagementApp.Api.Application.Services;

public class EntryService : IEntryService
{
    private readonly IEntryRepository _entryRepository;
    private readonly IUnitOfWork _unitOfWork;

    public EntryService(IEntryRepository entryRepository, IUnitOfWork unitOfWork)
    {
        _entryRepository = entryRepository;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result<EntryResultDto>> CreateEntryAsync(
        Guid userId,
        CreateEntryRequestDto request,
        CancellationToken cancellationToken
    )
    {
        var entry = new Entry()
        {
            UserId = userId,
            WorkspaceId = request.WorkspaceId,
            Type = request.Type,
            Title = request.Title,
            Content = request.Content,
            CreatedAt = DateTime.UtcNow,
        };
        var result = await _entryRepository.AddAsync(entry);
        await _unitOfWork.SaveChangesAsync();

        var mapper = new EntryMapper();

        return Result<EntryResultDto>.Success(mapper.EntryToEntryResultDto(entry));
    }

    public async Task<Result<IEnumerable<EntryResultDto>>> GetEntriesAsync(
        Guid userId,
        CancellationToken cancellationToken = default
    )
    {
        var result = await _entryRepository.GetAllByUserIdAsync(userId);
        var mapper = new EntryMapper();
        var entries = result.Select((entry, _) => mapper.EntryToEntryResultDto(entry));
        return Result<IEnumerable<EntryResultDto>>.Success(entries);
    }

    public async Task<Result<EntryResultDto>> GetEntryAsync(
        Guid userId,
        GetEntryRequestDto request,
        CancellationToken cancellationToken = default
    )
    {
        var result = await _entryRepository.FindByIdAsync(request.Id);
        var mapper = new EntryMapper();

        return Result<EntryResultDto>.Success(mapper.EntryToEntryResultDto(result));
    }

    public async Task<Result> UpdateEntryAsync(
        Guid userId,
        UpdateEntryRequestDto request,
        CancellationToken cancellationToken = default
    )
    {
        var entry = await _entryRepository.FindByIdAsync(request.Id);
        entry.Type = request.Type;
        entry.Title = request.Title;
        entry.Content = request.Content;

        await _unitOfWork.SaveChangesAsync();

        return Result.Success();
    }
}
