using KnowledgeManagementApp.Api.Domain.Entities;

namespace KnowledgeManagementApp.Api.Application.Interfaces;

public interface IIdentityService
{
    Task<Result<string>> CreateIdentityAsync(
        string email,
        string password,
        CancellationToken cancellationToken = default
    );

    Task<Result<string>> VerifyCredentialsAsync(
        string email,
        string password,
        CancellationToken cancellationToken = default
    );

    // Task<Result> DeleteIdentityAsync(
    //     string identityId,
    //     CancellationToken cancellationToken = default
    // );
    //
    // Task<Result<IReadOnlyList<string>>> GetRolesAsync(
    //     string identityId,
    //     CancellationToken cancellationToken = default
    // );
}
