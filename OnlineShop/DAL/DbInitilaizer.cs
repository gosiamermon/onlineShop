using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OnlineShop.Models;

namespace OnlineShop.DAL
{
    public class DbInitilaizer
    {
        public static void Initialize(ShopContext context)
        {
             //context.Database.EnsureDeleted();
             context.Database.EnsureCreated();

           if(!context.Products.Any()) {
            byte[] passwordHash, passwordSalt;
            HashHelper.CreatePasswordHash("blablabla", out passwordHash, out passwordSalt);
            var user = new User
            {
                Email = "test@shop.pl",
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Name = "Jan",
                Surname = "Kowalski",
                IsAdmin = false,
                Address = "44-100 Gliwice, Akademicka 13/2"
            };
            context.Add(user);
            HashHelper.CreatePasswordHash("admin", out passwordHash, out passwordSalt);
            var admin = new User
            {
                Email = "admin@shop.pl",
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Name = "Jan",
                Surname = "Kowalski",
                IsAdmin = true,
                Address = "44-100 Gliwice, Akademicka 13/2"
            };
            context.Add(admin);

            var adminUser = new User
            {
                Email = "nowak@yourwardrobe.pl",
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt,
                Name = "Jan",
                Surname = "Nowak",
                IsAdmin = true,
                Address = "44-100 Gliwice, Zygmunta Starego 13/2"
            };
            context.Add(adminUser);

            Category categoryTshirts = new Category { Name = "Shirt" };
            Category categoryPulover = new Category { Name = "Pullover" };
            Producer producerHm = new Producer { Name = "H&M" };
            Producer producerCropp = new Producer { Name = "Cropp" };
            Product p1 = new Product
            {
                Name = "Top",
                Description = "opis przedmiotu",
                ImageSmall = "/StaticFiles/images/1S.jpg",
                ImageBig = "/StaticFiles/images/1B.jpg",
                Cost = 32,
                Color = "Red",
                Sizes = "S M L",
                Fabric = "Bawełna",
                Gender = "Female",
                IsAvaiable = true,
                ItemNumber = 10
            };
            Product p12 = new Product
            {
                Name = "Top2",
                Description = "opis przedmiotu",
                ImageSmall = "/StaticFiles/images/1S.jpg",
                ImageBig = "/StaticFiles/images/1B.jpg",
                Cost = 32,
                Color = "Red",
                Sizes = "M L XL",
                Fabric = "Bawełna",
                Gender = "Female",
                IsAvaiable = true,
                ItemNumber = 10
            };
            categoryTshirts.Products = new List<Product>();
            categoryTshirts.Products.Add(p1);
            categoryTshirts.Products.Add(p12);
            producerHm.Products = new List<Product>();
            producerHm.Products.Add(p1);
            producerHm.Products.Add(p12);
            Product p2 = new Product
            {
                Name = "Top",
                Description = "opis przedmiotu",
                ImageSmall = "/StaticFiles/images/1S.jpg",
                ImageBig = "/StaticFiles/images/1B.jpg",
                Cost = 122,
                Color = "Red",
                Sizes = "M XL",
                Fabric = "Wełna",
                Gender = "Male",
                IsAvaiable = true,
                ItemNumber = 10
            };
            Product p22 = new Product
            {
                Name = "Top2",
                Description = "opis przedmiotu",
                ImageSmall = "/StaticFiles/images/1S.jpg",
                ImageBig = "/StaticFiles/images/1B.jpg",
                Cost = 122,
                Color = "Red",
                Sizes = "S M",
                Fabric = "Wełna",
                Gender = "Male",
                IsAvaiable = true,
                ItemNumber = 10
            };
            categoryPulover.Products = new List<Product>();
            categoryPulover.Products.Add(p2);
            categoryPulover.Products.Add(p22);
            producerCropp.Products = new List<Product>();
            producerCropp.Products.Add(p2);
            producerCropp.Products.Add(p22);

            Order order = new Order {
                OrderDate = DateTime.Now,
                Status = OrderStatus.Send,
                TotalValue = 0,
                User = user,
                OrderItems = new List<OrderItem>()
            };

            OrderItem oi1 = new OrderItem {
                ProductAmount = 1,
                Product = p1,
                Order = order
            };
            oi1.Subtotal = oi1.Product.Cost * oi1.ProductAmount;
            oi1.Product.ItemNumber = oi1.Product.ItemNumber - oi1.ProductAmount;

            OrderItem oi2 = new OrderItem {
                ProductAmount = 2,
                Product = p2,
                Order = order
            };
            oi2.Subtotal = oi2.Product.Cost * oi2.ProductAmount;
            oi2.Product.ItemNumber = oi2.Product.ItemNumber - oi2.ProductAmount;

            order.OrderItems.Add(oi1);
            order.OrderItems.Add(oi2);
            order.TotalValue = oi1.Subtotal + oi2.Subtotal;

            context.Categories.AddRange(categoryTshirts, categoryPulover);
            context.Producers.AddRange(producerHm, producerCropp);
            context.Orders.Add(order);
            context.SaveChangesAsync();
            }
        }

    }
}

