using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using OnlineShop.Models;

namespace OnlineShop.DAL
{
    public class ShopContext : DbContext
    {
        public ShopContext(DbContextOptions<ShopContext> options) : base(options)
        {
        }
//        public DbSet<Address> Addresses { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Opinion> Opinions { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
//        public DbSet<PaymentMethod> PaymentMethods { get; set; }
        public DbSet<Producer> Producers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
             // Relationships 1/3: one-to-zero or one
                // modelBuilder.Entity<Address>() // Address is principal 
                //     .HasOne(a => a.User)    // User is dependent
                //     .WithOne(u => u.Address)
                //     .HasForeignKey<User>(u => u.AddressId);

                // Relationship 2/3: one-to-many
                modelBuilder.Entity<Product>() // Product is dependent
                   .HasOne(p => p.Producer) // Producer is principal
                   .WithMany(pr => pr.Products)
                   .HasForeignKey(p => p.ProducerId)
                   .HasPrincipalKey(pr => pr.ProducerId);  // alternate key: unique

                modelBuilder.Entity<Product>()
                   .HasOne(p => p.Category)
                   .WithMany(c => c.Products)
                   .HasForeignKey(p => p.CategoryId)
                   .HasPrincipalKey(c => c.CategoryId); 

                modelBuilder.Entity<Order>()
                    .HasOne(o => o.User)
                    .WithMany(u => u.Orders)
                    .HasForeignKey(o => o.UserId)
                    .HasPrincipalKey(u => u.UserId);

                // modelBuilder.Entity<Order>()
                //     .HasOne(o => o.PaymentMethod)
                //     .WithMany(pm => pm.Orders)
                //     .HasForeignKey(o => o.PaymentMethodId)
                //     .HasPrincipalKey(u => u.PaymentMethodId);

                modelBuilder.Entity<OrderItem>()
                    .HasOne(o => o.Product)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(o => o.ProductId)
                    .HasPrincipalKey(p => p.ProductId);

                modelBuilder.Entity<OrderItem>()
                    .HasOne(o => o.Order)
                    .WithMany(p => p.OrderItems)
                    .HasForeignKey(o => o.OrderId)
                    .HasPrincipalKey(p => p.OrderId);

                modelBuilder.Entity<Opinion>()
                   .HasOne(o => o.User)
                   .WithMany(u => u.Opinions)
                   .HasForeignKey(o => o.UserId)
                   .HasPrincipalKey(u => u.UserId);

                modelBuilder.Entity<Opinion>()
                   .HasOne(o => o.Product)
                   .WithMany(p => p.Opinions)
                   .HasForeignKey(o => o.ProductId)
                   .HasPrincipalKey(p => p.ProductId);
        }
    }
}
