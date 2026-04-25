using System.Net.Mime;
using FluentValidation;
using KnowledgeManagementApp.Api.Models;
using KnowledgeManagementApp.Api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KnowledgeManagementApp.Api.Controllers;

[ApiController]
[Route("users")]
[Produces("application/json")]
public class UserController(
    IUserService userService,
    ILogger<UserController> logger,
    IValidator<UserRequestModel> validator
) : ControllerBase
{
    private const string NotFoundTitle = "Not Found";

    [HttpPost]
    [Consumes(MediaTypeNames.Application.Json)]
    [ProducesResponseType<UserResponseModel>(StatusCodes.Status201Created)]
    [ProducesResponseType<ProblemDetails>(StatusCodes.Status409Conflict)]
    public async Task<IResult> PostAsync([FromBody] UserRequestModel user)
    {
        var validation = await validator.ValidateAsync(
            user,
            options => options.IncludeRuleSets("CreateUser")
        );

        if (!validation.IsValid)
        {
            var errors = validation
                .Errors.GroupBy(error => error.PropertyName)
                .ToDictionary(
                    group => group.Key,
                    group => group.Select(error => error.ErrorMessage).ToArray()
                );

            logger.LogWarning("POST /users validation failed: {@Errors}", errors);
            return TypedResults.ValidationProblem(
                errors,
                detail: "See the errors field for details.",
                instance: HttpContext?.Request?.Path.ToString()
            );
        }

        if (await userService.RetrieveByUsernameAsync(user.UserName) != null)
        {
            logger.LogWarning(
                "POST /users failed: User with username {Username} already exists.",
                user.UserName
            );
            return TypedResults.Conflict(
                new ProblemDetails
                {
                    Type = "https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/409",
                    Title = "Conflict",
                    Status = StatusCodes.Status409Conflict,
                    Detail = $"User with username '{user.UserName}' already exists.",
                    Instance = HttpContext?.Request?.Path.ToString(),
                }
            );
        }

        var result = await userService.CreateAsync(user);

        logger.LogInformation("POST /users created: {@User}", result);

        return TypedResults.CreatedAtRoute(
            routeValues: new { username = result.UserName },
            value: result
        );
    }

    [HttpGet()]
    public async Task<IResult> GetAsync()
    {
        var users = await userService.RetrieveAsync();
        logger.LogInformation("GET /users retrieved {Count} user(s)", users.Count);

        return TypedResults.Ok(users);
    }

    [HttpGet("{id:Guid}")]
    public async Task<IResult> GetByIdAsync([FromRoute] Guid id)
    {
        var user = await userService.RetrieveByIdAsync(id);
        if (user != null)
        {
            logger.LogInformation("GET /users/{Id} retrieved: {@User}", id, user);
            return TypedResults.Ok(user);
        }
        else
        {
            logger.LogWarning("GET /users/{Id} not found", id);
            return TypedResults.Problem(
                statusCode: StatusCodes.Status404NotFound,
                title: NotFoundTitle,
                detail: $"User with Id '{id}' was not found.",
                instance: HttpContext?.Request?.Path.ToString()
            );
        }
    }

    [Authorize]
    [HttpGet("username/{username}")]
    public async Task<IResult> GetByUsernameAsync([FromRoute] String username)
    {
        var user = await userService.RetrieveByUsernameAsync(username);
        if (user != null)
        {
            logger.LogInformation(
                "GET /users/username/{Username} retrieved: {@User}",
                username,
                user
            );
            return TypedResults.Ok(user);
        }
        else
        {
            logger.LogWarning("GET /users/username/{Username} not found", username);
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
        var validation = await validator.ValidateAsync(
            user,
            options => options.IncludeRuleSets("UpdateUser")
        );

        if (!validation.IsValid)
        {
            var errors = validation
                .Errors.GroupBy(error => error.PropertyName)
                .ToDictionary(
                    group => group.Key,
                    group => group.Select(error => error.ErrorMessage).ToArray()
                );

            logger.LogWarning(
                "PUT /users/username/{Username} validation failed: {@Errors}",
                username,
                errors
            );

            return TypedResults.ValidationProblem(
                errors,
                detail: "See the errors field for details.",
                instance: HttpContext?.Request?.Path.ToString()
            );
        }

        if (user.UserName != username)
        {
            logger.LogWarning(
                "PutAsync username mismatch: route {Username} != body {UserUsername}",
                username,
                user.UserName
            );
            return TypedResults.Problem(
                statusCode: StatusCodes.Status400BadRequest,
                title: "Bad Request",
                detail: "Username in the route does not match the username in the request body.",
                instance: HttpContext?.Request?.Path.ToString()
            );
        }
        if (userService.RetrieveByUsernameAsync(username) == null)
        {
            logger.LogWarning("PUT /users/username/{Username} not found", username);
            return TypedResults.Problem(
                statusCode: StatusCodes.Status404NotFound,
                title: NotFoundTitle,
                detail: $"User with username '{username}' was not found.",
                instance: HttpContext?.Request?.Path.ToString()
            );
        }

        await userService.UpdateAsync(user);
        var sanitizedUserString = user.ToString()
            ?.Replace(Environment.NewLine, string.Empty)
            .Replace("\r", string.Empty)
            .Replace("\r", string.Empty);
        logger.LogInformation(
            "PUT /users/username/{Username} updated: {User}",
            username,
            sanitizedUserString
        );

        return TypedResults.NoContent();
    }

    // [HttpDelete("username/{username}")]
    // public async Task<IResult> DeleteAsync([FromRoute] string username)
    // {
    //     if (userService.RetrieveByUsernameAsync(username) == null)
    //     {
    //         logger.LogWarning("DELETE /users/username/{Username} not found", username);
    //         return TypedResults.Problem(
    //             statusCode: StatusCodes.Status404NotFound,
    //             title: NotFoundTitle,
    //             detail: $"User with username '{username}' was not found.",
    //             instance: HttpContext?.Request?.Path.ToString()
    //         );
    //     }
    //     else
    //     {
    //         await userService.DeleteAsync(username);
    //         logger.LogInformation("DELETE /users/username/{Username} deleted", username);
    //         return TypedResults.NoContent();
    //     }
    // }
}
