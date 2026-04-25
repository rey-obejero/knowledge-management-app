using KnowledgeManagementApp.Api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeManagementApp.Api.Data;

public class KnowledgeManagementAppDbContext : IdentityDbContext<User>
{
    public KnowledgeManagementAppDbContext(
        DbContextOptions<KnowledgeManagementAppDbContext> options
    )
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(user => user.Id);
            entity.Property(user => user.Id).ValueGeneratedOnAdd();
        });
    }
}
