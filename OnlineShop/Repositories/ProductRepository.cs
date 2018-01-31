using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using OnlineShop.DAL;
using OnlineShop.Helpers;
using OnlineShop.Models;

namespace OnlineShop.Repositories
{
    public interface IProductRepository
    {
        IEnumerable<Product> GetAll();
        IEnumerable<Product> GetFewFirst(int amount);
        IEnumerable<Product> GetByCategory(string category);
        IEnumerable<Product> GetToCompare(int id1, int id2);
        Product GetById(int id);
        Product Create(Product product);
        void Update(Product product);
        void Delete(int id);
    }

    public class ProductRepository : IProductRepository
    {
        private ShopContext _context;

        public ProductRepository(ShopContext context)
        {
            _context = context;
        }
        public Product Create(Product product)
        {
            UpadteOrCreateCategory(product, product.Category.Name);
            UpdateOrCreatProducer(product, product.Producer.Name);
            _context.SaveChangesAsync();
            return product;
        }

        public void Delete(int id)
        {
            var product = _context.Products.Find(id);
            if (product != null)
            {
                _context.Products.Remove(product);
                _context.SaveChangesAsync();
            }
        }

        public IEnumerable<Product> GetAll()
        {
            return _context.Products
            .Include(p => p.Category)
            .Include(p => p.Producer)
            .Include(p => p.Opinions);
        }

        public IEnumerable<Product> GetByCategory(string category)
        {
//            List<Product> result = new List<Product>();
//            foreach(string c in category) {
//               result.AddRange(_context.Products.Where(p =>p.Category.Name.Equals(c)));
//            }
//            return result;
            return _context.Products
            .Include(p => p.Category)
            .Include(p => p.Producer)
            .Include(p => p.Opinions)
            .Where(p =>p.Category.Name.Equals(category));
        }

        public Product GetById(int id)
        {
            return _context.Products
            .Include(p => p.Category)
            .Include(p => p.Producer)
            .Include(p => p.Opinions)
            .SingleOrDefault(x => x.ProductId == id);
        }

        public IEnumerable<Product> GetFewFirst(int amount)
        {
            return _context.Products
            .Include(p => p.Category)
            .Include(p => p.Producer)
            .Include(p => p.Opinions)
            .Take(amount).OrderBy(p => p.Name);
        }

        public IEnumerable<Product> GetToCompare(int id1, int id2)
        {
            List<Product> result = new List<Product>();
            result.Add(GetById(id1));
            result.Add(GetById(id2));
            return result;
        }

        public void Update(Product productParam)
        {
            var product = _context.Products.SingleOrDefault(p => p.ProductId == productParam.ProductId);
            if(product == null) {
                 throw new AppException("Product not found");
            }

            product.Name = productParam.Name;
            product.Description = productParam.Description;
            product.ImageSmall = productParam.ImageSmall;
            product.ImageBig = productParam.ImageBig;  
            product.Cost = productParam.Cost;
            product.Color = productParam.Color;
            product.Size = productParam.Size;
            product.Fabric = productParam.Fabric;
            product.Gender = productParam.Gender;
            product.IsAvaiable = productParam.IsAvaiable;
            product.ItemNumber = productParam.ItemNumber;
            UpadteOrCreateCategory(product, productParam.Category.Name);
            UpdateOrCreatProducer(product, productParam.Producer.Name);
            _context.Products.Update(product);
            _context.SaveChangesAsync();
        }

        private void UpadteOrCreateCategory(Product product, string categoryName) {
            var category = _context.Categories.SingleOrDefault(c => c.Name.Equals(categoryName));
            if(category == null) {
                category = new Category {Name = categoryName};
                category.Products = new List<Product>();
                category.Products.Add(product);
                product.Category = category;
                _context.Categories.Add(category);
            } else {
                product.Category = category;
                _context.Categories.Update(category);
            }
        }

        private void UpdateOrCreatProducer(Product product, string producerName) {
            var producer = _context.Producers.SingleOrDefault(p => p.Name.Equals(producerName));
            if(producer == null) {
                producer = new Producer {Name = producerName};
                producer.Products = new List<Product>();
                producer.Products.Add(product);
                product.Producer = producer;
                _context.Producers.Add(producer);
            } else {
                product.Producer = producer;
                _context.Producers.Update(producer);
            }
        }
    }

}