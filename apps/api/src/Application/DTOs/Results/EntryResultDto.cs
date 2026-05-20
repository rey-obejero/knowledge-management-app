namespace KnowledgeManagementApp.Api.Application.Dtos;

public record EntryResultDto(
    Guid Id,
    string Type,
    string Title,
    string Content,
    DateTime CreatedAt
);
