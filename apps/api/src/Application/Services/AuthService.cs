using KnowledgeManagementApp.Api.Application.Dtos;
using KnowledgeManagementApp.Api.Application.Interfaces;

namespace KnowledgeManagementApp.Api.Application.Services;

public class AuthService : IAuthService
{
    private readonly IIdentityService _identityService;
    private readonly IJwtTokenService _jwtTokenService;

    public AuthService(IIdentityService identityService, IJwtTokenService jwtTokenService)
    {
        _identityService = identityService;
        _jwtTokenService = jwtTokenService;
    }

    public async Task<Result<TokenDto>> SignupAsync(
        SignupRequestDto request,
        CancellationToken cancellationToken = default
    )
    {
        var identityResult = await _identityService.CreateIdentityAsync(
            request.Email,
            request.Password,
            cancellationToken
        );
        if (!identityResult.IsSuccess)
        {
            return Result<TokenDto>.Failure(identityResult.Error);
        }

        var userId = Guid.Parse(identityResult.Value);

        var tokenResult = _jwtTokenService.GenerateToken(
            userId,
            request.Email,
            Array.Empty<string>()
        );

        return Result<TokenDto>.Success(new TokenDto(tokenResult.Token, tokenResult.ExpiresAt));
    }

    public async Task<Result<TokenDto>> LoginAsync(
        LoginRequestDto request,
        CancellationToken cancellationToken = default
    )
    {
        var verifyResult = await _identityService.VerifyCredentialsAsync(
            request.Email,
            request.Password,
            cancellationToken
        );
        if (!verifyResult.IsSuccess)
        {
            return Result<TokenDto>.Failure(verifyResult.Error);
        }

        var userId = Guid.Parse(verifyResult.Value);

        var tokenResult = _jwtTokenService.GenerateToken(
            userId,
            request.Email,
            Array.Empty<string>()
        );
        return Result<TokenDto>.Success(new TokenDto(tokenResult.Token, tokenResult.ExpiresAt));
    }
}
