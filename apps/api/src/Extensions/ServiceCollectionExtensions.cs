using AutoMapper;
using FluentValidation;
using KnowledgeManagementApp.Api.Data;
using KnowledgeManagementApp.Api.Mappings;
using KnowledgeManagementApp.Api.Repositories;
using KnowledgeManagementApp.Api.Services;
using KnowledgeManagementApp.Api.Validators;
using Microsoft.EntityFrameworkCore;
using NSwag;
using NSwag.Generation.Processors.Security;

namespace KnowledgeManagementApp.Api.Extensions;

public static class ServiceCollectionExtensions
{
    extension(IServiceCollection services)
    {
        public IServiceCollection AddDbContextWithSqlite(IWebHostEnvironment environment)
        {
            services.AddDbContext<KnowledgeManagementAppDbContext>(options =>
            {
                var dataDirectory = Path.Combine(environment.ContentRootPath, "storage");
                Directory.CreateDirectory(dataDirectory);
                var dataSource = Path.Combine(dataDirectory, "knowledge-management-app.db");
                options.UseSqlite($"Data Source={dataSource}");
            });

            return services;
        }

        public IServiceCollection AddValidators()
        {
            services.AddValidatorsFromAssemblyContaining<UserRequestModelValidator>();
            return services;
        }

        public IServiceCollection AddSwaggerConfiguration()
        {
            services.AddOpenApiDocument(config =>
            {
                config.Title = "KnowledgeManagementApp";

                config.AddSecurity(
                    "Bearer",
                    new NSwag.OpenApiSecurityScheme
                    {
                        Type = NSwag.OpenApiSecuritySchemeType.Http,
                        Scheme = "bearer",
                        BearerFormat = "JWT",
                        Description = "Enter: Bearer {your JWT token}",
                    }
                );

                config.OperationProcessors.Add(
                    new AspNetCoreOperationSecurityScopeProcessor("Bearer")
                );
            });
            return services;
        }

        public IServiceCollection RegisterUserService()
        {
            services.AddScoped<IUserService, UserService>();
            return services;
        }

        public IServiceCollection RegisterTokenService()
        {
            services.AddScoped<TokenService>();
            return services;
        }

        public IServiceCollection AddMappings()
        {
            services.AddAutoMapper(config => config.AddProfile<UserMappingProfile>());
            return services;
        }

        public IServiceCollection RegisterUserRepository()
        {
            services.AddScoped<IUserRepository, UserRepository>();
            return services;
        }
    }
}
