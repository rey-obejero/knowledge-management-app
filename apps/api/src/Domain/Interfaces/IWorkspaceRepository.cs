using KnowledgeManagementApp.Api.Domain.Entities;

namespace KnowledgeManagementApp.Api.Domain.Interfaces;

public interface IWorkspaceRepository
{
    Task<Workspace> AddAsync(Workspace workspace);

    Task<IEnumerable<Workspace>> GetAllAsync();

    Task<IEnumerable<Workspace>> GetAllByUserIdAsync(Guid userId);

    Task<Workspace>? FindByIdAsync(Guid id);

    Task<Workspace>? FindByNameAsync(string name);

    Task UpdateAsync(Workspace workspace);

    Task RemoveAsync(Guid id);
}
