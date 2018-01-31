using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineShop.DTO
{
    public class OrderDetailsDto
    {
        public int OrderId { get; set; }
        public TimeSpan OrderDate { get; set; }
        public bool IsAccepted { get; set; }
        public TimeSpan AcceptedDate { get; set; }
        public double TotalValue { get; set; }
        public bool IsPaid { get; set; }
        public TimeSpan PaymentDate { get; set; }
        public int UserId { get; set; }
        public string UserEmail { get; set; }
        public ICollection<OrderItemDto> OrderItems { get; set; }
    }
}