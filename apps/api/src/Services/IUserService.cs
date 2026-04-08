using KnowledgeManagementApp.Api.Models;

namespace KnowledgeManagementApp.Api.Services;

public interface IUserService
{
    public Task<UserResponseModel> CreateAsync(UserRequestModel userRequestModel);

    public Task<List<UserResponseModel>> RetrieveAsync();

    public Task<UserResponseModel?> RetrieveByIdAsync(Guid id);

    public Task<UserResponseModel?> RetrieveByUsernameAsync(String username);

    public Task UpdateAsync(UserRequestModel userRequestModel);

    public Task DeleteAsync(String username);
}
