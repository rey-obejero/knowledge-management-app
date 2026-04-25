using Microsoft.AspNetCore.Identity;

namespace KnowledgeManagementApp.Api.Models;

public class User : IdentityUser
{
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }
    public bool? IsDeleted { get; set; } = false;
}
