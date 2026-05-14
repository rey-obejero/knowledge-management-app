using KnowledgeManagementApp.Api.Domain.Interfaces;
using KnowledgeManagementApp.Api.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeManagementApp.Api.Domain.Interfaces;

public class BaseRepository<T> : IBaseRepository<T>
    where T : BaseEntity
{
    private readonly KnowledgeManagementAppDbContext _dbContext;
    private readonly DbSet<T> _dbSet;

    public BaseRepository(KnowledgeManagementAppDbContext dbContext)
    {
        _dbContext = dbContext;
        _dbSet = dbContext.Set<T>();
    }

    public async Task<T> AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
        return entity;
    }

    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbSet.AsNoTracking().ToListAsync();
    }

    public async Task<T?> FindByIdAsync(Guid id)
    {
        return await _dbSet.FindAsync(id);
    }
}
