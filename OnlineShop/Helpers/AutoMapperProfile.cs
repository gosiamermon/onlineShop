using System;
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
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            CreateMap<Product, ProductDto>()
            .ForMember(pd => pd.Category, m => m.MapFrom(
                p => p.Category.Name
            ))
            .ForMember(pd => pd.Producer, m => m.MapFrom(
                p => p.Producer.Name
            ))
            .ForMember(pd => pd.Sizes, m => m.MapFrom(
                p => TypeConverter.StringToListString(p.Sizes)
            ));
            CreateMap<ProductDto, Product>()
            .ForMember(p => p.Category, m => m.MapFrom(
                pd => new Category {Name = pd.Category}
            ))
            .ForMember(p => p.Producer, m => m.MapFrom(
                pd => new Producer{Name = pd.Producer}
            ))
            .ForMember(p => p.Sizes, m => m.MapFrom(
                pd => TypeConverter.ListStringToString(pd.Sizes)
            ));
            CreateMap<OrderItem, OrderItemDto>()
            .ForMember(oid => oid.ProductName, m => m.MapFrom(
                oi => oi.Product.Name
            ));
            CreateMap<Order, OrderObjDto>()
            .ForMember(od => od.Status, m => m.MapFrom(
                o => Enum.GetName(typeof(OrderStatus), o.Status)
            ));
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