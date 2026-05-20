namespace KnowledgeManagementApp.Api.Domain.Entities;

public class Entry : BaseEntity
{
    public Guid UserId { get; set; }
    public Guid WorkspaceId { get; set; }
    public required string Type { get; set; }
    public required string Title { get; set; }
    public required string Content { get; set; }
    public DateTime UpdatedAt { get; set; }
}
