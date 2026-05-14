using KnowledgeManagementApp.Api.Domain.Entities;

namespace KnowledgeManagementApp.Api.Domain.Interfaces;

public interface IBaseRepository<T>
    where T : BaseEntity
{
    Task<T> AddAsync(T entity);

    Task<IEnumerable<T>> GetAllAsync();

    Task<T?> FindByIdAsync(Guid id);

    // Task<T> GetByIdAsync(Guid id);
    // Task UpdateAsync(T entity);
    // Task DeleteAsync(Guid id);
}
