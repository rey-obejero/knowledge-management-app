using KnowledgeManagementApp.Api.Application.Features.Authentication.Commands;
using KnowledgeManagementApp.Api.Application.Features.Authentication.Queries;

namespace KnowledgeManagementApp.Api.Application.Features.Authentication;

public interface IAuthenticationService
{
    Task<Result<AuthenticationResultDto>> SignUpAsync(
        SignUpCommand command,
        CancellationToken cancellationToken = default
    );

    Task<Result<AuthenticationResultDto>> SignInAsync(
        SignInCommand command,
        CancellationToken cancellationToken = default
    );

    Task<Result<UserDto>> GetUserAsync(
        GetUserQuery query,
        CancellationToken cancellationToken = default
    );
}
