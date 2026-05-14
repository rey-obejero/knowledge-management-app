namespace KnowledgeManagementApp.Api.Domain.Entities;

public class Workspace : BaseEntity
{
    public Guid UserId { get; set; }
    public required string Name { get; set; }
}
