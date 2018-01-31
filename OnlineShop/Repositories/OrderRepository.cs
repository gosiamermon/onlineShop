using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using OnlineShop.DAL;
using OnlineShop.Helpers;
using OnlineShop.Models;

namespace OnlineShop
{
    public interface IOrderRepository
    {
        Order Create(int userId, int productId, int amount);
        Order AddToBasket(int orderId, int productId, int amount);
        Order RemoveFromBasket(int orderId, int productId);
        Order ChangeAmount(int orderId, int productId, int amount);
        void Delete(int orderId);
        void SubmitOrder(int orderId);
        IEnumerable<Order> GetAll();
        IEnumerable<Order> GetOrdersReletedByUser(int userId);
        Order GetOrderById(int oredrId);
        void PayOrder(int orderId);
    }

    public class OrderRepository : IOrderRepository
    {
        private ShopContext _context;

        public OrderRepository(ShopContext context)
        {
            _context = context;
        }

        public Order Create(int userId, int productId, int amount)
        {
            if(amount <= 0) 
                throw new AppException("Incorrect product amount");
            var user = _context.Users
            .Include(u => u.Orders)
            .SingleOrDefault(u => u.UserId == userId);
            if (user == null)
                throw new AppException("User not found");
            Product product = GetProduct(productId, amount);
            List<OrderItem> items = new List<OrderItem>();
            OrderItem orderItem = new OrderItem
            {
                ProductAmount = amount,
                Subtotal = amount * product.Cost
            };
            items.Add(orderItem);
            Order order = new Order
            {
                OrderDate = DateTime.Now,
                IsAccepted = false,
                IsPaid = false,
                TotalValue = orderItem.Subtotal,
                OrderItems = items,
                User = user,
                UserId = user.UserId
            };
            if (product.OrderItems == null)
                product.OrderItems = new List<OrderItem>();
            product.OrderItems.Add(orderItem);
            product.ItemNumber -= amount;
            if(product.ItemNumber == 0)
                product.IsAvaiable = false;
            if (user.Orders == null)
                user.Orders = new List<Order>();
            user.Orders.Add(order);
            _context.Products.Update(product);
            _context.Orders.Add(order);
            _context.Users.Update(user);
            _context.SaveChangesAsync();
            return order;
        }

        public Order AddToBasket(int orderId, int productId, int amount)
        {
            if(amount <= 0) 
                throw new AppException("Incorrect product amount");
            Order order = GetOrder(orderId);
            Product product = GetProduct(productId, amount);
            if(order.OrderItems == null)
                order.OrderItems = new List<OrderItem>();
            OrderItem item = new OrderItem 
            { 
                ProductAmount = amount,
                Subtotal = amount * product.Cost
            };
            order.OrderItems.Add(item);
            order.TotalValue += item.Subtotal;
            if(product.OrderItems == null) {
                product.OrderItems = new List<OrderItem>();
            }
            product.OrderItems.Add(item);
            _context.Products.Update(product);
            _context.Orders.Update(order);
            _context.SaveChangesAsync();
            return order;
        }

        public Order ChangeAmount(int orderId, int productId, int amount)
        {
            if(amount <= 0) 
                throw new AppException("Incorrect product amount");
            Order order = GetOrder(orderId);
            Product product = GetProduct(productId);
            if(order.OrderItems == null || product.OrderItems == null)
                 throw new AppException("Order item not found");
            foreach(OrderItem oi in order.OrderItems) {
                if(oi.ProductId == productId) {
                    if(oi.ProductAmount < amount) {
                        int toAdd = amount - oi.ProductAmount;
                        if(product.ItemNumber >= toAdd) {
                            oi.ProductAmount += toAdd;
                            oi.Subtotal += toAdd + oi.Product.Cost;
                            product.ItemNumber -= toAdd;
                            if(product.ItemNumber == 0) {
                                product.IsAvaiable = false;
                            }
                        } else {
                            throw new AppException("Not enough product items");
                        }
                    } else if(oi.ProductAmount > amount) {
                        int toRemove = oi.ProductAmount - amount;
                        oi.ProductAmount -= toRemove;
                        oi.Subtotal -= toRemove * oi.Product.Cost;
                        product.ItemNumber += toRemove;
                        if(product.IsAvaiable == false) {
                            product.IsAvaiable = true;
                        }
                    }
                    break;
                }
            }
            order.TotalValue = CalculateTotalValue(order);
            _context.Products.Update(product);
            _context.Orders.Update(order);
            _context.SaveChangesAsync();
            return order;
        }

        private double CalculateTotalValue(Order order) {
            double total = 0;
            foreach(OrderItem oi in order.OrderItems) {
                total += oi.Subtotal;
            }
            return total;
        }
        public void Delete(int orderId)
        {
            var order = _context.Orders.Find(orderId);
            if (order != null)
            {
                _context.Orders.Remove(order);
                _context.SaveChangesAsync();
            }
        }

        public IEnumerable<Order> GetAll()
        {
            return _context.Orders
            .Include(o => o.User)
            .Include(o => o.OrderItems);
      //      .Include(o => o.PaymentMethod);
        }

        public Order GetOrderById(int oredrId)
        {
            return _context.Orders
            .Include(o => o.User)
            .Include(o => o.OrderItems).ThenInclude(oi => oi.Product)
       //     .Include(o => o.PaymentMethod)
            .SingleOrDefault(o => o.OrderId == oredrId);
        }

        public IEnumerable<Order> GetOrdersReletedByUser(int userId)
        {
            return _context.Orders
            .Include(o => o.OrderItems)
            .Include(o => o.User)
       //     .Include(o => o.PaymentMethod)  
            .Where(o => o.UserId == userId);
        }
        
        public void PayOrder(int orderId)
        {  
            Order order = GetOrder(orderId);
            //payment
            order.IsPaid = true;
            order.PaymentDate = DateTime.Now;
            _context.Orders.Update(order);
            _context.SaveChangesAsync();
            string subject = "Potwierdzenie płatności";
            string body = "Dzień dobry " + order.User.Email.Remove(order.User.Email.IndexOf("@")) + " \r\n \r\n"+
            "Zakupiłaś(eś) " +  OrderItemsCount(order.OrderItems) +  " przedmiotów: \r\n" +
            OrderedItemsToString(order.OrderItems) +
            "Łączny koszt: " + order.TotalValue + " zł \r\n" +
            "Data płatności: " + order.PaymentDate.ToString() + " \r\n \r\n" +
            "Pozdrawiamy, OnlineShop Team";
            try 
            {
                MailSender.Send(order.User.Email, subject, body);
            } 
            catch(Exception ex) 
            {
                throw new AppException("Cannot send email: " + ex.Message);
            }
        }

        public Order RemoveFromBasket(int orderId, int productId)
        {
            Order order = GetOrder(orderId);
            Product product = GetProduct(productId);
            if(order.OrderItems == null || product.OrderItems == null)
                 throw new AppException("Order item not found");
            foreach(OrderItem oi in order.OrderItems) {
                if(oi.ProductId == productId){
                    product.ItemNumber += oi.ProductAmount;
                    order.TotalValue -= oi.Subtotal;
                    order.OrderItems.Remove(oi);
                    product.OrderItems.Remove(oi);
                    break;
                }
            }
            _context.Products.Update(product);
            _context.Orders.Update(order);
            _context.SaveChangesAsync();
            return order;
        }

        public void SubmitOrder(int orderId)
        {
            Order order = GetOrder(orderId);
            order.IsAccepted = true;
            order.AcceptedDate = DateTime.Now;
            _context.Orders.Update(order);
            _context.SaveChangesAsync();
            string subject = "Potwierdzenie zlożenia zamówienia";
            string body = "Dzień dobry " + order.User.Email.Remove(order.User.Email.IndexOf("@")) + " \r\n \r\n"+
            "Zamówiłaś(eś) " +  OrderItemsCount(order.OrderItems) +  " przedmiotów: \r\n" +
            OrderedItemsToString(order.OrderItems) +
            "Łączny koszt: " + order.TotalValue + " zł \r\n" +
            "Data złożenia zamówienia: " + order.AcceptedDate.ToString() + " \r\n \r\n" +
            "Pozdrawiamy, OnlineShop Team";
            try 
            {
                MailSender.Send(order.User.Email, subject, body);
            } 
            catch(Exception ex) 
            {
                throw new AppException("Cannot send email: " + ex.Message);
            }
        }

        private int OrderItemsCount(ICollection<OrderItem> orderItems) {
            int result = 0;
            foreach(OrderItem oi in orderItems) {
                result += oi.ProductAmount;
            }
            return result;
        }
        private string OrderedItemsToString(ICollection<OrderItem> orderItems) {
            string result = "";
            foreach(OrderItem oi in orderItems) {
                result += oi.Product.Name + " : " + oi.Product.Cost + " zł  x " + oi.ProductAmount + " = " + oi.Subtotal + " zł \r\n";
            }
            return result;
        }

        private Product GetProduct(int id, int amount) {
            var product = _context.Products
            .Include(p => p.OrderItems)
            .SingleOrDefault(p => p.ProductId == id);
            if (product == null)
                throw new AppException("Product not found");
            else if (product.ItemNumber < amount)
                throw new AppException("Not enough product items");
            return product;
        }
        private Product GetProduct(int id) {
            var product = _context.Products
            .Include(p => p.OrderItems)
            .SingleOrDefault(p => p.ProductId == id);
            if (product == null)
                throw new AppException("Product not found");
            return product;
        }
        private Order GetOrder(int id) {
            var order = _context.Orders
            .Include(o => o.OrderItems).ThenInclude(oi => oi.Product)
            .Include(o => o.User)
            .SingleOrDefault(o => o.OrderId == id);
            if (order == null)
                throw new AppException("Order not found");
            return order;
        }
    }
}