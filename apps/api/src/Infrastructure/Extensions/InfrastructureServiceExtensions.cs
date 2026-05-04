using KnowledgeManagementApp.Api.Application.Interfaces;
using KnowledgeManagementApp.Api.Infrastructure.Auth;
using KnowledgeManagementApp.Api.Infrastructure.Persistence;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeManagementApp.Api.Infrastructure.Extensions;

public static class InfrastructureServiceExtensions
{
    public static IServiceCollection AddInfrastructure(
        this IServiceCollection services,
        IConfiguration configuration
    )
    {
        services.AddDbContext<KnowledgeManagementAppDbContext>(options =>
        {
            var connectionString = configuration.GetConnectionString("SqliteConnection");
            options.UseSqlite(connectionString);
        });

        services
            .AddIdentity<ApplicationUser, IdentityRole>()
            .AddEntityFrameworkStores<KnowledgeManagementAppDbContext>()
            .AddDefaultTokenProviders();

        services.AddScoped<IIdentityService, IdentityService>();
        services.AddScoped<IJwtTokenService, JwtTokenService>();

        services.Configure<JwtOptions>(configuration.GetSection(("Jwt")));

        return services;
    }
}
