using KnowledgeManagementApp.Api.Data;
using KnowledgeManagementApp.Api.Extensions;
using Microsoft.EntityFrameworkCore;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder
    .Configuration.SetBasePath(AppContext.BaseDirectory)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);

Log.Logger = new LoggerConfiguration().ReadFrom.Configuration(builder.Configuration).CreateLogger();
builder.Host.UseSerilog();

builder.Services.AddSwaggerConfiguration();

builder.Services.AddControllers();
builder.Services.AddValidators();

builder.Services.RegisterUserService();
builder.Services.AddMappings();

builder.Services.RegisterUserRepository();

builder.Services.AddDbContextWithSqlite(builder.Environment);

var app = builder.Build();

app.UseSerilogRequestLogging();

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
