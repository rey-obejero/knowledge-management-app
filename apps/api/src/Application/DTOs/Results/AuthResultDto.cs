using KnowledgeManagementApp.Api.Domain.Entities;

namespace KnowledgeManagementApp.Api.Application.Dtos;

public record AuthResultDto(User User, string Token, DateTime ExpiresAt);
