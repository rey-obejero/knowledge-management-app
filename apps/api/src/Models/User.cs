namespace KnowledgeManagementApp.Api.Models;

public class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string? Username { get; set; }
    public DateTime CreatedAt { get; set; } = new DateTime();
    public DateTime? UpdatedAt { get; set; }
}
