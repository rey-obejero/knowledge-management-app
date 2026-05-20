using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Domain.Interfaces;
using KnowledgeManagementApp.Api.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeManagementApp.Api.Infrastructure.Repositories;

public class EntryRepository : BaseRepository<Entry>, IEntryRepository
{
    private readonly KnowledgeManagementAppDbContext _dbContext;
    private readonly DbSet<Entry> _dbSet;

    public EntryRepository(KnowledgeManagementAppDbContext dbContext)
        : base(dbContext)
    {
        _dbContext = dbContext;
        _dbSet = dbContext.Set<Entry>();
    }

    public async Task<IEnumerable<Entry>> GetAllByUserIdAsync(Guid userId)
    {
        return await _dbSet.AsNoTracking().Where(entry => entry.UserId == userId).ToListAsync();
    }
}
