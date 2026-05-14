using KnowledgeManagementApp.Api.Application.Dtos;

namespace KnowledgeManagementApp.Api.Application.Interfaces;

public interface IAuthService
{
    Task<Result<AuthResultDto>> SignupAsync(
        SignupRequestDto request,
        CancellationToken cancellationToken = default
    );

    Task<Result<AuthResultDto>> LoginAsync(
        LoginRequestDto request,
        CancellationToken cancellationToken = default
    );

    Task<Result<UserResultDto>> GetAuthenticatedUserAsync(
        Guid userId,
        CancellationToken cancellationToken = default
    );
}
