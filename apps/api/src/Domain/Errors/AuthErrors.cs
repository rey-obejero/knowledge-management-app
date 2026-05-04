namespace KnowledgeManagementApp.Api.Domain.Errors;

public static class AuthErrors
{
    public static readonly Error RegistrationFailed = Error.Validation(
        "Auth.RegistrationFailed",
        "Registration failed. Please try again."
    );

    public static readonly Error InvalidCredentials = Error.Validation(
        "Auth.InvalidCredentials",
        "Invalid email or password."
    );

    public static readonly Error EmailAlreadyExists = Error.Validation(
        "Auth.InvalidCredentials",
        "An account with this email already exists."
    );
}
