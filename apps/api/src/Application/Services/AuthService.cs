using KnowledgeManagementApp.Api.Application.Dtos;
using KnowledgeManagementApp.Api.Application.Interfaces;
using KnowledgeManagementApp.Api.Application.Mappers;
using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Domain.Interfaces;

namespace KnowledgeManagementApp.Api.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IIdentityService _identityService;
    private readonly IJwtTokenService _jwtTokenService;
    private readonly IUserRepository _userRepository;

    public AuthService(
        IUnitOfWork unitOfWork,
        IIdentityService identityService,
        IJwtTokenService jwtTokenService,
        IUserRepository userRepository
    )
    {
        _unitOfWork = unitOfWork;
        _identityService = identityService;
        _jwtTokenService = jwtTokenService;
        _userRepository = userRepository;
    }

    public async Task<Result<AuthResultDto>> SignupAsync(
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
            return Result<AuthResultDto>.Failure(identityResult.Error);
        }

        var userId = Guid.Parse(identityResult.Value);
        var user = new User()
        {
            Id = userId,
            Email = request.Email,
            CreatedAt = DateTime.UtcNow,
        };
        await _userRepository.AddAsync(user);

        await _unitOfWork.SaveChangesAsync();

        var tokenResult = _jwtTokenService.GenerateToken(
            userId,
            request.Email,
            Array.Empty<string>()
        );

        return Result<AuthResultDto>.Success(
            new AuthResultDto(user, tokenResult.Token, tokenResult.ExpiresAt)
        );
    }

    public async Task<Result<AuthResultDto>> LoginAsync(
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
            return Result<AuthResultDto>.Failure(verifyResult.Error);
        }

        var userId = Guid.Parse(verifyResult.Value);
        var user = await _userRepository.FindByIdAsync(userId);

        var tokenResult = _jwtTokenService.GenerateToken(
            userId,
            request.Email,
            Array.Empty<string>()
        );
        return Result<AuthResultDto>.Success(
            new AuthResultDto(user, tokenResult.Token, tokenResult.ExpiresAt)
        );
    }

    public async Task<Result<UserResultDto>> GetAuthenticatedUserAsync(
        Guid userId,
        CancellationToken cancellationToken = default
    )
    {
        var user = await _userRepository.FindByIdAsync(userId);
        var mapper = new UserMapper();

        return Result<UserResultDto>.Success(mapper.UserToUserResultDto(user));
    }
}
