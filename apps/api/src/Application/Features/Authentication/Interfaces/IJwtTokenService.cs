namespace KnowledgeManagementApp.Api.Application.Interfaces;

public interface IJwtTokenService
{
    TokenResult GenerateToken(Guid userId, string email, IEnumerable<string> roles);
}

public record TokenResult(string Token, int ExpiresIn);
