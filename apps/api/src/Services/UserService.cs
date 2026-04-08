using AutoMapper;
using KnowledgeManagementApp.Api.Models;
using KnowledgeManagementApp.Api.Repositories;

namespace KnowledgeManagementApp.Api.Services;

public class UserService(IUserRepository userRepository, IMapper mapper) : IUserService
{
    public async Task<UserResponseModel> CreateAsync(UserRequestModel userRequestModel)
    {
        var user = mapper.Map<User>(userRequestModel);
        await userRepository.AddAsync(user);
        return mapper.Map<UserResponseModel>(user);
    }

    public async Task<List<UserResponseModel>> RetrieveAsync()
    {
        var users = await userRepository.GetAllAsync();
        var userResponseModels = mapper.Map<List<UserResponseModel>>(users);
        return userResponseModels;
    }

    public async Task<UserResponseModel?> RetrieveByIdAsync(Guid id)
    {
        var user = await userRepository.FindByIdAsync(id);
        return user is not null ? mapper.Map<UserResponseModel>(user) : null;
    }

    public async Task<UserResponseModel?> RetrieveByUsernameAsync(String username)
    {
        var user = await userRepository.FindByUsernameAsync(username);
        return user is not null ? mapper.Map<UserResponseModel>(user) : null;
    }

    public async Task UpdateAsync(UserRequestModel userRequestModel)
    {
        if ((await userRepository.FindByUsernameAsync(userRequestModel.Username)) is User user)
        {
            mapper.Map(userRequestModel, user);
            await userRepository.UpdateAsync(user);
        }
    }

    public async Task DeleteAsync(String username)
    {
        if ((await userRepository.FindByUsernameAsync(username)) is User user)
        {
            await userRepository.RemoveAsync(user.Id);
        }
    }
}
