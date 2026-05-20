namespace KnowledgeManagementApp.Api.Application.Dtos;

public record CreateEntryRequestDto(Guid WorkspaceId, string Type, string Title, string Content);
