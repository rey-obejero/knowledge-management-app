namespace KnowledgeManagementApp.Api.Domain.Entities;

public class User : BaseEntity
{
    public required string Email { get; set; }
    public Guid RecentWorkspaceId { get; set; }
}
