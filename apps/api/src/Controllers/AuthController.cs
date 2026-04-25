using AutoMapper;
using KnowledgeManagementApp.Api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class AuthController(
    UserManager<User> userManager,
    SignInManager<User> signInManager,
    IMapper mapper,
    TokenService _tokenService
) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRequestModel user)
    {
        var result = await userManager.CreateAsync(mapper.Map<User>(user), user.Password);

        if (!result.Succeeded)
        {
            return BadRequest(result.Errors);
        }

        return Ok("User registered successfully.");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] UserRequestModel user)
    {
        var queriedUser = await userManager.FindByEmailAsync(user.Email);

        if (queriedUser == null)
        {
            return Unauthorized("Invalid credentials.");
        }

        var result = await signInManager.CheckPasswordSignInAsync(
            queriedUser,
            user.Password,
            false
        );

        if (!result.Succeeded)
        {
            return Unauthorized("Invalid credentials.");
        }

        var token = _tokenService.CreateToken(queriedUser);

        return Ok(new { token });
    }
}
