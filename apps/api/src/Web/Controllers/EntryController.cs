using System.Security.Claims;
using KnowledgeManagementApp.Api.Application.Dtos;
using KnowledgeManagementApp.Api.Application.Interfaces;
using KnowledgeManagementApp.Api.Web.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeManagementApp.Api.Web.Controllers;

[ApiController()]
[Route("api/v1/entries")]
public class EntryController : ControllerBase
{
    private readonly IEntryService _entryService;
    private readonly ILogger<EntryController> _logger;

    public EntryController(IEntryService entryService, ILogger<EntryController> logger)
    {
        _entryService = entryService;
        _logger = logger;
    }

    [Authorize]
    [HttpPost(Name = "CreateEntry")]
    [ProducesResponseType<EntryResultDto>(StatusCodes.Status201Created)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateEntry(
        CreateEntryRequestDto request,
        CancellationToken cancellationToken
    )
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        var result = await _entryService.CreateEntryAsync(userId, request, cancellationToken);

        if (result.IsFailure)
        {
            _logger.LogWarning(
                "Entry creation failed. {ErrorCode} {ErrorType}",
                result.Error.Code,
                result.Error.Type
            );
        }

        return result.ToActionResult<EntryResultDto>(value => CreatedAtRoute("CreateEntry", value));
    }

    [Authorize]
    [HttpGet(Name = "GetEntries")]
    [ProducesResponseType<IEnumerable<EntryResultDto>>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetEntries(CancellationToken cancellationToken)
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        var result = await _entryService.GetEntriesAsync(userId, cancellationToken);

        if (result.IsFailure)
        {
            _logger.LogWarning(
                "Entries retrieval failed. {ErrorCode} {ErrorType}",
                result.Error.Code,
                result.Error.Type
            );
        }

        return result.ToActionResult<IEnumerable<EntryResultDto>>(value => Ok(value));
    }

    [Authorize]
    [HttpGet("{Id:Guid}", Name = "GetEntry")]
    [ProducesResponseType<EntryResultDto>(StatusCodes.Status200OK)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetEntry(
        [FromRoute] GetEntryRequestDto request,
        CancellationToken cancellationToken
    )
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        var result = await _entryService.GetEntryAsync(userId, request, cancellationToken);

        if (result.IsFailure)
        {
            _logger.LogWarning(
                "Entry retrieval failed. {ErrorCode} {ErrorType}",
                result.Error.Code,
                result.Error.Type
            );
        }

        return result.ToActionResult<EntryResultDto>(value => Ok(value));
    }

    [Authorize]
    [HttpPut(Name = "UpdateEntry")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateEntry(
        UpdateEntryRequestDto request,
        CancellationToken cancellationToken
    )
    {
        var userId = Guid.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
        var result = await _entryService.UpdateEntryAsync(userId, request, cancellationToken);

        if (result.IsFailure)
        {
            _logger.LogWarning(
                "Entry update failed. {ErrorCode} {ErrorType}",
                result.Error.Code,
                result.Error.Type
            );
        }

        return result.ToActionResult(() => NoContent());
    }
}
