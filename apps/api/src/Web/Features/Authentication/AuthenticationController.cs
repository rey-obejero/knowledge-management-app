using System.Security.Claims;
using KnowledgeManagementApp.Api.Application.Features.Authentication;
using KnowledgeManagementApp.Api.Application.Features.Authentication.Commands;
using KnowledgeManagementApp.Api.Application.Features.Authentication.Queries;
using KnowledgeManagementApp.Api.Web.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeManagementApp.Api.Web.Features.Authentication;

[ApiController]
[Route("api/v1/authentication")]
public class AuthenticationController : ControllerBase
{
    private readonly IAuthenticationService _authenticationService;
    private readonly ILogger<AuthenticationController> _logger;

    public AuthenticationController(
        IAuthenticationService authenticationService,
        ILogger<AuthenticationController> logger
    )
    {
        _authenticationService = authenticationService;
        _logger = logger;
    }

    [HttpPost("sign-up", Name = "SignUp")]
    [ProducesResponseType<AuthenticationResultDto>(StatusCodes.Status201Created)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> SignUp(
        SignUpRequest request,
        CancellationToken cancellationToken
    )
    {
        var command = new SignUpCommand(request.Email, request.Password);
        var result = await _authenticationService.SignUpAsync(command, cancellationToken);

        if (result.IsFailure)
        {
            _logger.LogWarning(
                "Sign up failed. {ErrorCode} {ErrorType}",
                result.Error.Code,
                result.Error.Type
            );
        }

        return result.ToActionResult<AuthenticationResultDto>(value =>
            CreatedAtRoute("SignUp", value)
        );
    }

    [HttpPost("sign-in", Name = "SignIn")]
    [ProducesResponseType<AuthenticationResultDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Login(
        SignInRequest request,
        CancellationToken cancellationToken
    )
    {
        var command = new SignInCommand(request.Email, request.Password);
        var result = await _authenticationService.SignInAsync(command, cancellationToken);

        if (result.IsFailure)
        {
            _logger.LogWarning(
                "Login failed. {ErrorCode} {ErrorType}",
                result.Error.Code,
                result.Error.Type
            );
        }

        return result.ToActionResult<AuthenticationResultDto>(value => Ok(value));
    }

    [Authorize]
    [HttpGet("get-me", Name = "GetMe")]
    [ProducesResponseType<UserDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetMe(CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        var query = new GetUserQuery(userId);
        var result = await _authenticationService.GetUserAsync(query, cancellationToken);

        if (result.IsFailure)
        {
            _logger.LogWarning(
                "User retrieval failed. {ErrorCode} {ErrorType}",
                result.Error.Code,
                result.Error.Type
            );
        }

        return result.ToActionResult<UserDto>(value => Ok(value));
    }
}
