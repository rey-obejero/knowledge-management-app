using Microsoft.AspNetCore.Identity;

namespace KnowledgeManagementApp.Api.Infrastructure.Auth;

public class ApplicationUser : IdentityUser
{
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public bool? IsDeleted { get; set; } = false;
}
