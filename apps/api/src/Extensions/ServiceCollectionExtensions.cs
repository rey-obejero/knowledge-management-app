using AutoMapper;
using KnowledgeManagementApp.Api.Data;
using KnowledgeManagementApp.Api.Mappings;
using KnowledgeManagementApp.Api.Repositories;
using KnowledgeManagementApp.Api.Services;
using Microsoft.EntityFrameworkCore;

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

        public IServiceCollection AddSwaggerConfiguration()
        {
            services.AddOpenApi();
            return services;
        }

        public IServiceCollection RegisterUserService()
        {
            services.AddScoped<IUserService, UserService>();
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
