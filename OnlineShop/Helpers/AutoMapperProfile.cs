using AutoMapper;
using OnlineShop.DTO;
using OnlineShop.Models;

namespace OnlineShop.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}