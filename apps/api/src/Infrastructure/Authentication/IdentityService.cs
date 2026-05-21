using KnowledgeManagementApp.Api.Application;
using KnowledgeManagementApp.Api.Application.Interfaces;
using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Domain.Errors;
using Microsoft.AspNetCore.Identity;

namespace KnowledgeManagementApp.Api.Infrastructure.Auth;

public class IdentityService : IIdentityService
{
    private readonly UserManager<ApplicationUser> _userManager;

    public IdentityService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }

    public async Task<Result<string>> CreateIdentityAsync(
        string email,
        string password,
        CancellationToken cancellationToken = default
    )
    {
        var existingUser = await _userManager.FindByEmailAsync(email);
        if (existingUser is not null)
        {
            return Result<string>.Failure(AuthErrors.EmailAlreadyExists);
        }

        var user = new ApplicationUser { UserName = email, Email = email };
        var result = await _userManager.CreateAsync(user, password);
        if (!result.Succeeded)
        {
            return Result<string>.Failure(AuthErrors.RegistrationFailed);
        }

        return Result<string>.Success(user.Id);
    }

    public async Task<Result<string>> VerifyCredentialsAsync(
        string email,
        string password,
        CancellationToken cancellationToken = default
    )
    {
        var user = await _userManager.FindByEmailAsync(email);
        if (user is null)
        {
            return Result<string>.Failure(AuthErrors.InvalidCredentials);
        }

        var isValid = await _userManager.CheckPasswordAsync(user, password);
        if (!isValid)
        {
            return Result<string>.Failure(AuthErrors.InvalidCredentials);
        }

        return Result<string>.Success(user.Id);
    }
}
