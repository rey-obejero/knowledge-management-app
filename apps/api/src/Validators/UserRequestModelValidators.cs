using FluentValidation;
using KnowledgeManagementApp.Api.Models;
using KnowledgeManagementApp.Api.Repositories;

namespace KnowledgeManagementApp.Api.Validators;

public class UserRequestModelValidator : AbstractValidator<UserRequestModel>
{
    IUserRepository _userRepository;

    public UserRequestModelValidator(IUserRepository userRepository)
    {
        _userRepository = userRepository;
        RuleSet(
            "CreateUser",
            () =>
            {
                RuleFor(user => user.Username)
                    .NotEmpty()
                    .WithMessage("Username is required.")
                    .MustAsync(BeUniqueUsername)
                    .WithMessage("Username must be unique.");

                RuleFor(user => user.Email).NotEmpty().WithMessage("Email is required.");

                RuleFor(user => user.Password).NotEmpty().WithMessage("Password is required.");
            }
        );

        RuleSet(
            "UpdateUser",
            () =>
            {
                RuleFor(user => user.Username).NotEmpty().WithMessage("Username is required.");

                RuleFor(user => user.Email).NotEmpty().WithMessage("Email is required.");

                RuleFor(user => user.Password).NotEmpty().WithMessage("Password is required.");
            }
        );
    }

    private async Task<bool> BeUniqueUsername(string username, CancellationToken cancellationToken)
    {
        return await _userRepository.FindByUsernameAsync(username) is null;
    }
}
