using KnowledgeManagementApp.Api.Application.Interfaces;

namespace KnowledgeManagementApp.Api.Infrastructure.Persistence;

public class UnitOfWork : IUnitOfWork
{
    private readonly KnowledgeManagementAppDbContext _dbContext;

    public UnitOfWork(KnowledgeManagementAppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await _dbContext.SaveChangesAsync(cancellationToken);
    }

    public void Dispose()
    {
        _dbContext.Dispose();
    }
}
