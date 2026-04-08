namespace KnowledgeManagementApp.Api.Repositories;

public interface IRepository<T>
    where T : class
{
    Task AddAsync(T entity);

    Task<List<T>> GetAllAsync();

    ValueTask<T?> FindByIdAsync(Guid id);

    Task UpdateAsync(T entity);

    Task RemoveAsync(Guid id);
}
