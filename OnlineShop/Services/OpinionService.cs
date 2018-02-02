using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using OnlineShop.DAL;
using OnlineShop.Helpers;
using OnlineShop.Models;

namespace OnlineShop.Service
{
    public interface IOpinionService 
    {
        Opinion Create(Opinion opinion);
        IEnumerable<Opinion> GetAll();
        IEnumerable<Opinion> GetAllReletedByUser(int userId);
        IEnumerable<Opinion> GetAllReletedByProduct(int productId);
    }

    public class OpinionService : IOpinionService
    {
        private ShopContext _context;
        public OpinionService(ShopContext context) 
        {
            _context = context;
        }

        Opinion IOpinionService.Create(Opinion opinion)
        {
            User user = _context.Users.SingleOrDefault(u => u.UserId == opinion.UserId);
            if(user == null)
                throw new AppException("User cannot add opinion");
            Product product = _context.Products.SingleOrDefault(p => p.ProductId == opinion.ProductId);
            if(product == null)
                throw new AppException("Cannot add opinion for this product");
            if(user.Opinions == null)
                user.Opinions = new List<Opinion>();
            if(product.Opinions == null)
                product.Opinions = new List<Opinion>();
            opinion.User = user;
            opinion.Product = product;
            user.Opinions.Add(opinion);
            product.Opinions.Add(opinion);
            _context.Opinions.Add(opinion);
            _context.Products.Update(product);
            _context.Users.Update(user);
            return opinion;
        }
        IEnumerable<Opinion> IOpinionService.GetAll()
        {
            return _context.Opinions;
        }

        IEnumerable<Opinion> IOpinionService.GetAllReletedByProduct(int productId)
        {
            return _context.Opinions.Where(o => o.ProductId == productId);
        }

        IEnumerable<Opinion> IOpinionService.GetAllReletedByUser(int userId)
        {
            return _context.Opinions.Where(o => o.UserId == userId);
        }
    }

}