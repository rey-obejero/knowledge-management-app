namespace KnowledgeManagementApp.Api.Application.Dtos;

public record WorkspaceDto(Guid Id, Guid UserId, string Name, Guid CreatedAt);
