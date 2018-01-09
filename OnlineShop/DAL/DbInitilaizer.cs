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
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            var user = new User
            {
                Email = "test@shop.pl",
                Password = "test",
                Name = "Jan",
                Surname = "Kowalski",
                IsAdmin = false,
                Address = new Address
                {
                    City = "Gliwice",
                    Zippcode = "44-100",
                    Street = "Akademicka",
                    HouseNumber = "13",
                    ApartmentNumber = "2"
                }
            };
            context.Add(user);

            Category categoryTshirts = new Category { Name = "Koszulki" };
            Category categoryPulover = new Category { Name = "Swetry" };
            Producer producerHm = new Producer { Name = "H&M" };
            Producer producerCropp = new Producer { Name = "Cropp" };
            Product p1 = new Product
            {
                Name = "Top",
                Description = "opis przedmiotu",
                ImageSmall = "",
                ImageBig = "",
                Cost = 32,
                Color = "Red",
                Size = "M",
                Fabric = "Bawełna",
                Gender = "K",
                IsAvaiable = true,
                ItemNumber = 10
            };
            categoryTshirts.Products = new List<Product>();
            categoryTshirts.Products.Add(p1);
            producerHm.Products = new List<Product>();
            producerHm.Products.Add(p1);
            Product p2 = new Product
            {
                Name = "Top",
                Description = "opis przedmiotu",
                ImageSmall = "",
                ImageBig = "",
                Cost = 122,
                Color = "Red",
                Size = "M",
                Fabric = "Wełna",
                Gender = "M",
                IsAvaiable = true,
                ItemNumber = 10
            };
            categoryPulover.Products = new List<Product>();
            categoryPulover.Products.Add(p2);
            producerCropp.Products = new List<Product>();
            producerCropp.Products.Add(p2);

            context.Categories.AddRange(categoryTshirts, categoryPulover);
            context.Producers.AddRange(producerHm, producerCropp);

            context.SaveChangesAsync();
        }

    }
}

