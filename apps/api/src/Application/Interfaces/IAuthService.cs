using KnowledgeManagementApp.Api.Application.Dtos;

namespace KnowledgeManagementApp.Api.Application.Interfaces;

public interface IAuthService
{
    Task<Result<TokenDto>> SignUpAsync(
        SignupRequestDto request,
        CancellationToken cancellationToken = default
    );

    Task<Result<TokenDto>> LoginAsync(
        LoginRequestDto request,
        CancellationToken cancellationToken = default
    );
}
