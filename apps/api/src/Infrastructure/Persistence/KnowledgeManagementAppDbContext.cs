using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Infrastructure.Auth;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeManagementApp.Api.Infrastructure.Persistence;

public class KnowledgeManagementAppDbContext : IdentityDbContext<ApplicationUser>
{
    public KnowledgeManagementAppDbContext(
        DbContextOptions<KnowledgeManagementAppDbContext> options
    )
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>();

        modelBuilder.Entity<Workspace>(entity =>
        {
            entity.HasKey(workspace => workspace.Id);
            entity.Property(workspace => workspace.Id).ValueGeneratedOnAdd();
        });
    }
}
