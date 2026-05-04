using KnowledgeManagementApp.Api.Application.Dtos;

namespace KnowledgeManagementApp.Api.Application.Interfaces;

public interface IAuthService
{
    public Task<Result<TokenDto>> SignUpAsync(
        SignupRequestDto request,
        CancellationToken cancellationToken = default
    );

    public Task<Result<TokenDto>> LoginAsync(
        LoginRequestDto request,
        CancellationToken cancellationToken = default
    );
}
