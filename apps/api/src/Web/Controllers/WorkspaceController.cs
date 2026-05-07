using System.Security.Claims;
using KnowledgeManagementApp.Api.Application.Dtos;
using KnowledgeManagementApp.Api.Application.Interfaces;
using KnowledgeManagementApp.Api.Web.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeManagementApp.Api.Web.Controllers;

[ApiController()]
[Route("api/[controller]")]
public class WorkspaceController : ControllerBase
{
    private readonly IWorkspaceService _workspaceService;
    private readonly ILogger<WorkspaceController> _logger;

    public WorkspaceController(
        IWorkspaceService workspaceService,
        ILogger<WorkspaceController> logger
    )
    {
        _workspaceService = workspaceService;
        _logger = logger;
    }

    [Authorize]
    [HttpPost(Name = "CreateWorkspace")]
    [ProducesResponseType<WorkspaceDto>(StatusCodes.Status201Created)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateWorkspace(CreateWorkspaceRequestDto request)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        var result = await _workspaceService.CreateWorkspaceAsync(userId, request.Name);

        if (result.IsFailure)
        {
            _logger.LogWarning(
                "Workspace creation failed. {ErrorCode} {ErrorType}",
                result.Error.Code,
                result.Error.Type
            );
        }

        return result.ToActionResult<WorkspaceDto>(value =>
            CreatedAtRoute("CreateWorkspace", value)
        );
    }
}
