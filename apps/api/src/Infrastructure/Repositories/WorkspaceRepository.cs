using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Domain.Interfaces;
using KnowledgeManagementApp.Api.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeManagementApp.Api.Infrastructure.Repositories;

public class WorkspaceRepository : IWorkspaceRepository
{
    private readonly KnowledgeManagementAppDbContext _dbContext;
    private readonly DbSet<Workspace> _dbSet;

    public WorkspaceRepository(KnowledgeManagementAppDbContext dbContext)
    {
        _dbContext = dbContext;
        _dbSet = dbContext.Set<Workspace>();
    }

    public async Task<Workspace> AddAsync(Workspace workspace)
    {
        await _dbSet.AddAsync(workspace);
        await _dbContext.SaveChangesAsync();
        return workspace;
    }

    public async Task<IEnumerable<Workspace>> GetAllAsync()
    {
        return await _dbSet.AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<Workspace>> GetAllByUserIdAsync(Guid userId)
    {
        return await _dbSet
            .AsNoTracking()
            .Where(workspace => workspace.UserId == userId)
            .ToListAsync();
    }

    public async Task<Workspace>? FindByIdAsync(Guid id)
    {
        return await _dbSet.FindAsync(id);
    }

    public async Task<Workspace>? FindByNameAsync(string name)
    {
        return await _dbSet.FirstOrDefaultAsync(workspace => workspace.Name == name);
    }

    public async Task UpdateAsync(Workspace workspace)
    {
        _dbSet.Update(workspace);
        await _dbContext.SaveChangesAsync();
    }

    public async Task RemoveAsync(Guid id)
    {
        var workspace = await _dbSet.FindAsync(id);
        if (workspace is not null)
        {
            _dbSet.Remove(workspace);
            await _dbContext.SaveChangesAsync();
        }
    }
}
