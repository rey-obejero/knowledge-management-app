using KnowledgeManagementApp.Api.Domain.Entities;

namespace KnowledgeManagementApp.Api.Domain.Interfaces;

public interface IWorkspaceRepository : IBaseRepository<Workspace>
{
    Task<IEnumerable<Workspace>> GetAllByUserIdAsync(Guid userId);

    Task<Workspace?> FindByNameAsync(string name);
}
