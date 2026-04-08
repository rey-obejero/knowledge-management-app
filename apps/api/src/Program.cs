using KnowledgeManagementApp.Api.Data;
using KnowledgeManagementApp.Api.Extensions;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSwaggerConfiguration();

builder.Services.AddControllers();

builder.Services.RegisterUserService();
builder.Services.AddMappings();

builder.Services.RegisterUserRepository();

builder.Services.AddDbContextWithSqlite(builder.Environment);

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUi(options =>
    {
        options.DocumentPath = "/openapi/v1.json";
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
