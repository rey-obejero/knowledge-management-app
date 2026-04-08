using KnowledgeManagementApp.Api.Models;

namespace KnowledgeManagementApp.Api.Repositories;

public interface IUserRepository : IRepository<User>
{
    Task<User?> FindByUsernameAsync(String username);
}
