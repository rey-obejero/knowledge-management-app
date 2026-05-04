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

        modelBuilder.Entity<ApplicationUser>(entity =>
        {
            entity.HasKey(user => user.Id);
            entity.Property(user => user.Id).ValueGeneratedOnAdd();
        });
    }
}
