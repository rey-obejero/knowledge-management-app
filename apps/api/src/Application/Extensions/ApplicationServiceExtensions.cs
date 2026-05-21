using KnowledgeManagementApp.Api.Application.Features.Authentication;
using KnowledgeManagementApp.Api.Application.Interfaces;
using KnowledgeManagementApp.Api.Application.Mappers;
using KnowledgeManagementApp.Api.Application.Services;

namespace KnowledgeManagementApp.Api.Application.Extensions;

public static class ServiceCollectionExtensions
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<IAuthenticationService, AuthenticationService>();
        services.AddScoped<IWorkspaceService, WorkspaceService>();
        services.AddScoped<IEntryService, EntryService>();

        services.AddScoped<IUserMapper, UserMapper>();

        return services;
    }
}
