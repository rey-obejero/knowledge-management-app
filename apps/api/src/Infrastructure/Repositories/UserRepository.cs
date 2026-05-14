using KnowledgeManagementApp.Api.Domain.Entities;
using KnowledgeManagementApp.Api.Domain.Interfaces;
using KnowledgeManagementApp.Api.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeManagementApp.Api.Infrastructure.Repositories;

public class UserRepository : BaseRepository<User>, IUserRepository
{
    private readonly KnowledgeManagementAppDbContext _dbContext;
    private readonly DbSet<User> _dbSet;

    public UserRepository(KnowledgeManagementAppDbContext dbContext)
        : base(dbContext)
    {
        _dbContext = dbContext;
        _dbSet = dbContext.Set<User>();
    }
}
