using KnowledgeManagementApp.Api.Application.Features.Authentication;
using KnowledgeManagementApp.Api.Domain.Entities;

namespace KnowledgeManagementApp.Api.Application.Mappers;

public partial interface IUserMapper
{
    UserDto UserToUserDto(User user);
}
