using System.Net.Mime;
using KnowledgeManagementApp.Api.Models;
using KnowledgeManagementApp.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeManagementApp.Api.Controllers;

[ApiController]
[Route("users")]
[Produces("application/json")]
public class UserController(IUserService userService) : ControllerBase
{
    private const string NotFoundTitle = "Not Found";

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType<UserResponseModel>(StatusCodes.Status201Created)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status409Conflict)]
    public async Task<IResult> PostAsync([FromBody] UserRequestModel user)
    {
        if (await userService.RetrieveByUsernameAsync(user.Username) != null)
        {
            return TypedResults.Conflict(
                new ProblemDetails
                {
                    Type = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409",
                    Title = "Conflict",
                    Status = StatusCodes.Status409Conflict,
                    Detail = $"User with username '{user.Username}' already exists.",
                    Instance = HttpContext?.Request?.Path.ToString(),
                }
            );
        }

        var result = await userService.CreateAsync(user);

        return TypedResults.CreatedAtRoute(
            routeValues: new { username = result.Username },
            value: result
        );
    }

    [HttpGet()]
    public async Task<IResult> GetAsync()
    {
        var users = await userService.RetrieveAsync();

        return TypedResults.Ok(users);
    }

    [Authorize]
    [HttpGet("id:Guid")]
    public async Task<IResult> GetByIdAsync([FromRoute] Guid id)
    {
        var user = await userService.RetrieveByIdAsync(id);
        if (user != null)
        {
            return TypedResults.Ok(user);
        }
        else
        {
            return TypedResults.Problem(
                statusCode: StatusCodes.Status404NotFound,
                title: NotFoundTitle,
                detail: $"User with Id '{id}' was not found.",
                instance: HttpContext?.Request?.Path.ToString()
            );
        }
    }

    [HttpGet("username/{username}")]
    public async Task<IResult> GetByUsernameAsync([FromRoute] String username)
    {
        var user = await userService.RetrieveByUsernameAsync(username);
        if (user != null)
        {
            return TypedResults.Ok(user);
        }
        else
        {
            return TypedResults.Problem(
                statusCode: StatusCodes.Status404NotFound,
                title: NotFoundTitle,
                detail: $"User with username '{username}' was not found.",
                instance: HttpContext?.Request?.Path.ToString()
            );
        }
    }

    [HttpPut("username/{username}")]
    public async Task<IResult> PutAsync(
        [FromRoute] string username,
        [FromBody] UserRequestModel user
    )
    {
        if (user.Username != username)
            return TypedResults.Problem(
                statusCode: StatusCodes.Status400BadRequest,
                title: "Bad Request",
                detail: "Username in the route does not match the username in the request body.",
                instance: HttpContext?.Request?.Path.ToString()
            );
        if (userService.RetrieveByUsernameAsync(username) == null)
        {
            return TypedResults.Problem(
                statusCode: StatusCodes.Status404NotFound,
                title: NotFoundTitle,
                detail: $"User with username '{username}' was not found.",
                instance: HttpContext?.Request?.Path.ToString()
            );
        }

        await userService.UpdateAsync(user);

        return TypedResults.NoContent();
    }

    [HttpDelete("username/{username}")]
    public async Task<IResult> DeleteAsync([FromRoute] string username)
    {
        if (userService.RetrieveByUsernameAsync(username) == null)
        {
            return TypedResults.Problem(
                statusCode: StatusCodes.Status404NotFound,
                title: NotFoundTitle,
                detail: $"User with username '{username}' was not found.",
                instance: HttpContext?.Request?.Path.ToString()
            );
        }
        else
        {
            await userService.DeleteAsync(username);
            return TypedResults.NoContent();
        }
    }
}
