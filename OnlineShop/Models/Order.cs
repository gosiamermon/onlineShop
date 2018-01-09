using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.Models
{
    public class Order
    {
        public int OrderId { get; set; }
        public TimeSpan OrderDate { get; set; }
        public bool IsAccepted { get; set; }
        public TimeSpan AcceptedDate { get; set; }
        public double TotalValue { get; set; }
        public bool IsPaid { get; set; }
        public TimeSpan PaymentDate { get; set; }
        public bool IsCompleted { get; set; }
        public TimeSpan CompletedDate { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public int PaymentMethodId { get; set; }
        public PaymentMethod PaymentMethod { get; set; }

        public ICollection<OrderItem> OrderItems { get; set; }
    }
}
