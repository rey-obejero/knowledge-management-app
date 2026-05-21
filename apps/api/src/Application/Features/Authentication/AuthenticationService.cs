using KnowledgeManagementApp.Api.Application.Features.Authentication.Commands;
using KnowledgeManagementApp.Api.Application.Features.Authentication.Queries;
using KnowledgeManagementApp.Api.Application.Interfaces;
using KnowledgeManagementApp.Api.Application.Mappers;
using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Domain.Interfaces;

namespace KnowledgeManagementApp.Api.Application.Features.Authentication;

public class AuthenticationService : IAuthenticationService
{
    private readonly IUserRepository _userRepository;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IUserMapper _userMapper;
    private readonly IIdentityService _identityService;
    private readonly IJwtTokenService _jwtTokenService;

    public AuthenticationService(
        IUserRepository userRepository,
        IUnitOfWork unitOfWork,
        IUserMapper userMapper,
        IIdentityService identityService,
        IJwtTokenService jwtTokenService
    )
    {
        _userRepository = userRepository;
        _unitOfWork = unitOfWork;
        _userMapper = userMapper;
        _identityService = identityService;
        _jwtTokenService = jwtTokenService;
    }

    public async Task<Result<AuthenticationResultDto>> SignUpAsync(
        SignUpCommand command,
        CancellationToken cancellationToken = default
    )
    {
        var identityResult = await _identityService.CreateIdentityAsync(
            command.Email,
            command.Password,
            cancellationToken
        );
        if (!identityResult.IsSuccess)
        {
            return Result<AuthenticationResultDto>.Failure(identityResult.Error);
        }

        var userId = Guid.Parse(identityResult.Value);
        var user = new User()
        {
            Id = userId,
            Email = command.Email,
            CreatedAt = DateTime.UtcNow,
        };
        await _userRepository.AddAsync(user);

        await _unitOfWork.SaveChangesAsync();

        var tokenResult = _jwtTokenService.GenerateToken(
            userId,
            command.Email,
            Array.Empty<string>()
        );

        return Result<AuthenticationResultDto>.Success(
            new AuthenticationResultDto(user, tokenResult.Token, tokenResult.ExpiresIn)
        );
    }

    public async Task<Result<AuthenticationResultDto>> SignInAsync(
        SignInCommand command,
        CancellationToken cancellationToken = default
    )
    {
        var verifyResult = await _identityService.VerifyCredentialsAsync(
            command.Email,
            command.Password,
            cancellationToken
        );
        if (!verifyResult.IsSuccess)
        {
            return Result<AuthenticationResultDto>.Failure(verifyResult.Error);
        }

        var userId = Guid.Parse(verifyResult.Value);
        var user = await _userRepository.FindByIdAsync(userId);

        var tokenResult = _jwtTokenService.GenerateToken(
            userId,
            command.Email,
            Array.Empty<string>()
        );
        return Result<AuthenticationResultDto>.Success(
            new AuthenticationResultDto(user, tokenResult.Token, tokenResult.ExpiresIn)
        );
    }

    public async Task<Result<UserDto>> GetUserAsync(
        GetUserQuery query,
        CancellationToken cancellationToken = default
    )
    {
        var user = await _userRepository.FindByIdAsync(query.UserId);
        var userDto = _userMapper.UserToUserDto(user);

        return Result<UserDto>.Success(userDto);
    }
}
