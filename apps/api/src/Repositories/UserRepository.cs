using KnowledgeManagementApp.Api.Data;
using KnowledgeManagementApp.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace KnowledgeManagementApp.Api.Repositories;

public sealed class UserRepository(KnowledgeManagementAppDbContext dbContext)
    : Repository<User>(dbContext),
        IUserRepository
{
    public async Task<User?> FindByUsernameAsync(String username) =>
        await _dbSet.FirstOrDefaultAsync(u => u.UserName == username);
}
