namespace KnowledgeManagementApp.Api.Domain.Entities;

public class Workspace
{
    public Guid Id { get; set; } = new Guid();
    public Guid UserId { get; set; }
    public string Name { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
