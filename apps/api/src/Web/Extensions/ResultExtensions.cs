using KnowledgeManagementApp.Api.Application;
using KnowledgeManagementApp.Api.Domain.Errors;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeManagementApp.Api.Web.Extensions;

public static class ResultExtensions
{
    public static IActionResult Match(this Result result, Func<IActionResult> onSuccess)
    {
        return result.IsSuccess ? onSuccess() : MapError(result.Error);
    }

    public static IActionResult Match<T>(this Result<T> result, Func<T, IActionResult> onSuccess)
    {
        return result.IsSuccess ? onSuccess(result.Value) : MapError(result.Error);
    }

    private static IActionResult MapError(Error error)
    {
        return error.Type switch
        {
            ErrorType.Validation => new BadRequestObjectResult(error),
            ErrorType.NotFound => new NotFoundObjectResult(error),
            ErrorType.Conflict => new ConflictObjectResult(error),
            _ => new ObjectResult(error) { StatusCode = 500 },
        };
    }
}
