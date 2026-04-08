using KnowledgeManagementApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeManagementApp.Api.Data;

public class KnowledgeManagementAppDbContext : DbContext
{
    public KnowledgeManagementAppDbContext(
        DbContextOptions<KnowledgeManagementAppDbContext> options
    )
        : base(options) { }

    public DbSet<User> Users { get; set; } = null!;

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
