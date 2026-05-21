using KnowledgeManagementApp.Api.Domain.Entities;

namespace KnowledgeManagementApp.Api.Application.Features.Authentication;

public record AuthenticationResultDto(User User, string AccessToken, int ExpiresIn);
