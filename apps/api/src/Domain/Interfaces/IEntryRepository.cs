using KnowledgeManagementApp.Api.Domain.Entities;

namespace KnowledgeManagementApp.Api.Domain.Interfaces;

public interface IEntryRepository : IBaseRepository<Entry>
{
    Task<IEnumerable<Entry>> GetAllByUserIdAsync(Guid userId);
}
