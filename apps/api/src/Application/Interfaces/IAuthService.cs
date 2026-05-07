using KnowledgeManagementApp.Api.Application.Dtos;

namespace KnowledgeManagementApp.Api.Application.Interfaces;

public interface IAuthService
{
    Task<Result<TokenDto>> SignupAsync(
        SignupRequestDto request,
        CancellationToken cancellationToken = default
    );

    Task<Result<TokenDto>> LoginAsync(
        LoginRequestDto request,
        CancellationToken cancellationToken = default
    );
}
