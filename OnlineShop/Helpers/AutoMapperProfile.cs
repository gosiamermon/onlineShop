using AutoMapper;
using OnlineShop.DTO;
using OnlineShop.Models;
//https://www.infoworld.com/article/3192900/application-development/how-to-work-with-automapper-in-c.html
//https://www.codeproject.com/Articles/61629/AutoMapper
namespace OnlineShop.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>()
            .ForMember(ud => ud.City, m => m.MapFrom(
                u => u.Address.City
            ))
            .ForMember(ud => ud.Zippcode, m => m.MapFrom(
                u => u.Address.Zippcode
            ))
            .ForMember(ud => ud.Street, m => m.MapFrom(
                u => u.Address.Street
            ))
            .ForMember(ud => ud.HouseNumber, m => m.MapFrom(
                u => u.Address.HouseNumber
            ))
            .ForMember(ud => ud.ApartmentNumber, m => m.MapFrom(
                u => u.Address.ApartmentNumber
            ));
            CreateMap<UserDto, User>()
            .ForMember(u => u.Address, m => m.MapFrom(
                ud => new Address {
                    City = ud.City,
                    Zippcode = ud.Zippcode,
                    Street = ud.Street,
                    HouseNumber = ud.HouseNumber,
                    ApartmentNumber = ud.ApartmentNumber
                }
            ));
            CreateMap<Product, ProductDto>()
            .ForMember(pd => pd.Category, m => m.MapFrom(
                p => p.Category.Name
            ))
            .ForMember(pd => pd.Producer, m => m.MapFrom(
                p => p.Producer.Name
            ));
            CreateMap<ProductDto, Product>()
            .ForMember(p => p.Category, m => m.MapFrom(
                pd => new Category {Name = pd.Category}
            ))
            .ForMember(p => p.Producer, m => m.MapFrom(
                pd => new Producer{Name = pd.Producer}
            ));
            CreateMap<OrderItem, OrderItemDto>()
            .ForMember(oid => oid.ProductName, m => m.MapFrom(
                oi => oi.Product.Name
            ));
            CreateMap<Order, OrderObjDto>();
            CreateMap<OrderObjDto, Order>();
            CreateMap<Order, OrderDetailsDto>()
            .ForMember(op => op.UserEmail, m => m.MapFrom(
                o => o.User.Email
            ));
            CreateMap<Opinion, OpinionDto>();
            CreateMap<OpinionDto, Opinion>();
        }
    }
}