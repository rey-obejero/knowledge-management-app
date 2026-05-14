using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Domain.Interfaces;
using KnowledgeManagementApp.Api.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeManagementApp.Api.Infrastructure.Repositories;

public class WorkspaceRepository : BaseRepository<Workspace>, IWorkspaceRepository
{
    private readonly KnowledgeManagementAppDbContext _dbContext;
    private readonly DbSet<Workspace> _dbSet;

    public WorkspaceRepository(KnowledgeManagementAppDbContext dbContext)
        : base(dbContext)
    {
        _dbContext = dbContext;
        _dbSet = dbContext.Set<Workspace>();
    }

    public async Task<IEnumerable<Workspace>> GetAllByUserIdAsync(Guid userId)
    {
        return await _dbSet
            .AsNoTracking()
            .Where(workspace => workspace.UserId == userId)
            .ToListAsync();
    }

    public async Task<Workspace?> FindByNameAsync(string name)
    {
        return await _dbSet.FirstOrDefaultAsync(workspace => workspace.Name == name);
    }
}
