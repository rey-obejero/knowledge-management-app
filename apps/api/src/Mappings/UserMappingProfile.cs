using AutoMapper;
using KnowledgeManagementApp.Api.Models;

namespace KnowledgeManagementApp.Api.Mappings;

public class UserMappingProfile : Profile
{
    public UserMappingProfile()
    {
        CreateMap<UserRequestModel, User>();

        CreateMap<User, UserResponseModel>();
    }
}
