namespace KnowledgeManagementApp.Api.Application.Dtos;

public record UpdateEntryRequestDto(Guid Id, string Type, string Title, string Content);
