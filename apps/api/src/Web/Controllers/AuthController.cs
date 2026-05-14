using System.Security.Claims;
using KnowledgeManagementApp.Api.Application.Dtos;
using KnowledgeManagementApp.Api.Application.Interfaces;
using KnowledgeManagementApp.Api.Web.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeManagementApp.Api.Web.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;
    private readonly ILogger<AuthController> _logger;

    public AuthController(IAuthService authService, ILogger<AuthController> logger)
    {
        _authService = authService;
        _logger = logger;
    }

    [HttpPost("[action]", Name = "Signup")]
    [ProducesResponseType<AuthResultDto>(StatusCodes.Status201Created)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> SignUp(
        SignupRequestDto request,
        CancellationToken cancellationToken
    )
    {
        var result = await _authService.SignupAsync(request, cancellationToken);

        if (result.IsFailure)
        {
            _logger.LogWarning(
                "Signup failed. {ErrorCode} {ErrorType}",
                result.Error.Code,
                result.Error.Type
            );
        }

        return result.ToActionResult<AuthResultDto>(value => CreatedAtRoute("Signup", value));
    }

    [HttpPost("[action]", Name = "Login")]
    [ProducesResponseType<AuthResultDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Login(
        LoginRequestDto request,
        CancellationToken cancellationToken
    )
    {
        var result = await _authService.LoginAsync(request, cancellationToken);

        if (result.IsFailure)
        {
            _logger.LogWarning(
                "Login failed. {ErrorCode} {ErrorType}",
                result.Error.Code,
                result.Error.Type
            );
        }

        return result.ToActionResult<AuthResultDto>(value => Ok(value));
    }

    [Authorize]
    [HttpGet("[action]", Name = "GetMe")]
    [ProducesResponseType<UserResultDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetMe(CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        var result = await _authService.GetAuthenticatedUserAsync(userId, cancellationToken);

        if (result.IsFailure)
        {
            _logger.LogWarning(
                "User retrieval failed. {ErrorCode} {ErrorType}",
                result.Error.Code,
                result.Error.Type
            );
        }

        return result.ToActionResult<UserResultDto>(value => Ok(value));
    }
}
